var CodeReviewPreScanner = Class.create()

CodeReviewPreScanner.prototype = {
    initialize: function () {},

    /**
     * Size tiers, measured as total characters across all of an artifact's code
     * surfaces. Deliberately generous: the largest widgets on this instance are
     * the most complex and therefore the most worth reviewing, so only
     * pathological artifacts are skipped outright.
     */
    TIER_OVERSIZED: 45000, // above this: reviewed, but flagged as a partial review
    TIER_SKIP: 120000, // above this: no LLM call at all

    /**
     * High-signal markers. These are cheap, deterministic regexes run against the
     * FULL untruncated source, so a defect sitting past a truncation cap is still
     * detected and reported to the model.
     *
     * Each marker maps to the finding category the reviewer should use.
     */
    getMarkers: function () {
        return [
            { key: 'hardcoded_sys_id', category: 'hardcoding', re: /['"][0-9a-f]{32}['"]/g },
            /**
             * Lower-confidence companion to hardcoded_sys_id. Catches 32-char hex
             * sequences that are NOT quote-wrapped -- embedded in a URL, an HTML
             * attribute, or a string concatenation -- which the quoted pattern
             * misses. Can also match non-sys_id hex such as hashes, so the prompt
             * treats it as a candidate to confirm against the code rather than a
             * certain defect.
             */
            { key: 'sys_id_like_hex', category: 'hardcoding', re: /\b[0-9a-f]{32}\b/g },
            {
                key: 'credential_literal',
                category: 'security',
                re: /(setBasicAuth\s*\(|password\s*[:=]|passwd\s*[:=]|pwd\s*[:=]|secret\s*[:=]|api_?key\s*[:=]|access_?token\s*[:=])/gi,
            },
            {
                key: 'instance_url',
                category: 'hardcoding',
                re: /https?:\/\/[a-z0-9-]+\.service-now\.com/gi,
            },
            { key: 'external_url', category: 'hardcoding', re: /https?:\/\//gi },
            {
                key: 'email_address',
                category: 'hardcoding',
                re: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi,
            },
            { key: 'math_random', category: 'security', re: /Math\.random\s*\(/g },
            { key: 'eval_usage', category: 'security', re: /\beval\s*\(/g },
            { key: 'glide_record', category: 'security', re: /new\s+GlideRecord\s*\(/g },
            { key: 'gs_log', category: 'maintainability', re: /gs\.log\s*\(/g },
            {
                key: 'console_statement',
                category: 'maintainability',
                re: /console\.(log|debug|info|warn|error)\s*\(/g,
            },
            {
                key: 'dom_access',
                category: 'best_practice',
                re: /document\.(getElementById|getElementsBy|querySelector)|jQuery\s*\(/g,
            },
            { key: 'angular_http', category: 'best_practice', re: /\$http\s*[.(]/g },
            { key: 'ng_bind_html', category: 'security', re: /ng-bind-html/g },
            { key: 'get_row_count', category: 'performance', re: /\.getRowCount\s*\(/g },
            { key: 'css_important', category: 'maintainability', re: /!important/g },
            { key: 'todo_marker', category: 'maintainability', re: /\b(TODO|FIXME|HACK|XXX)\b/g },
        ]
    },

    /** Approximate 1-based line number of a character offset. */
    _lineAt: function (text, index) {
        var upto = text.substring(0, index)
        return upto.split('\n').length
    },

    /**
     * Scans an artifact's surfaces and returns marker hits plus a size verdict.
     *
     * @param {Object} surfaces - map of surfaceName -> { full: <untruncated string>, cap: <number> }
     *                            cap is the character budget actually sent to the model; hits beyond
     *                            it are reported as hidden.
     * @returns {Object} {
     *            total_chars, total_lines, tier, partial_review, skip_review,
     *            markers: [{ marker, category, surface, count, hidden_count, first_line, excerpt }],
     *            hidden_marker_summary: string
     *          }
     */
    scan: function (surfaces) {
        var markers = this.getMarkers()
        var results = []
        var totalChars = 0
        var totalLines = 0

        for (var name in surfaces) {
            if (!surfaces.hasOwnProperty(name)) continue
            var entry = surfaces[name] || {}
            var text = entry.full || ''
            var cap = typeof entry.cap === 'number' ? entry.cap : text.length
            if (!text) continue

            totalChars += text.length
            totalLines += text.split('\n').length

            for (var m = 0; m < markers.length; m++) {
                var def = markers[m]
                // Fresh regex per surface so lastIndex never leaks between passes.
                var re = new RegExp(def.re.source, def.re.flags)
                var match
                var count = 0
                var hidden = 0
                var firstLine = 0
                var excerpt = ''

                while ((match = re.exec(text)) !== null) {
                    count++
                    if (match.index >= cap) {
                        hidden++
                    }
                    if (count === 1) {
                        firstLine = this._lineAt(text, match.index)
                        var start = Math.max(0, match.index - 30)
                        excerpt = text.substring(start, match.index + 60).replace(/\s+/g, ' ')
                    }
                    if (match.index === re.lastIndex) {
                        re.lastIndex++ // guard against zero-length matches
                    }
                    if (count > 200) break // sanity cap
                }

                if (count > 0) {
                    results.push({
                        marker: def.key,
                        category: def.category,
                        surface: name,
                        count: count,
                        hidden_count: hidden,
                        first_line: firstLine,
                        excerpt: excerpt,
                    })
                }
            }
        }

        var tier = 'normal'
        if (totalChars > this.TIER_SKIP) {
            tier = 'skipped'
        } else if (totalChars > this.TIER_OVERSIZED) {
            tier = 'oversized'
        }

        // Human-readable summary of markers the model will NOT be able to see.
        var hiddenBits = []
        for (var r = 0; r < results.length; r++) {
            if (results[r].hidden_count > 0) {
                hiddenBits.push(
                    results[r].marker +
                        ' x' +
                        results[r].hidden_count +
                        ' in ' +
                        results[r].surface +
                        ' (from line ' +
                        results[r].first_line +
                        ')'
                )
            }
        }

        return {
            total_chars: totalChars,
            total_lines: totalLines,
            tier: tier,
            partial_review: tier === 'oversized',
            skip_review: tier === 'skipped',
            oversized_threshold: this.TIER_OVERSIZED,
            skip_threshold: this.TIER_SKIP,
            markers: results,
            hidden_marker_summary: hiddenBits.length
                ? hiddenBits.join('; ')
                : 'none - all detected markers fall inside the visible excerpt',
        }
    },

    type: 'CodeReviewPreScanner',
}
