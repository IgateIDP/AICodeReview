var CodeReviewScriptGatherer = Class.create()

CodeReviewScriptGatherer.prototype = {
    initialize: function () {},

    /** Max characters of script source passed to the LLM (context-window guard). */
    MAX_SCRIPT_CHARS: 20000,

    /**
     * Candidate description-ish fields, tried in order. Different script tables
     * name this field differently (sys_ws_operation uses short_description,
     * UI Actions use comments), so the first valid non-empty one wins rather
     * than hardcoding a guess per table.
     */
    DESCRIPTION_FIELDS: ['description', 'short_description', 'comments'],

    /**
     * Tables this gatherer is allowed to read. Acts as an allow-list so an
     * arbitrary table name cannot be injected via skill input.
     *
     * scriptField - the column holding the source code. NOTE: this is NOT
     *   uniform: sys_ws_operation stores code in 'operation_script' while the
     *   other tables use 'script'.
     * fields - extra configuration that matters when reviewing that type.
     */
    getAllowedTables: function () {
        return {
            sys_script: {
                label: 'Business Rule',
                scriptField: 'script',
                fields: [
                    'collection',
                    'when',
                    'order',
                    'action_insert',
                    'action_update',
                    'action_delete',
                    'action_query',
                    'condition',
                    'filter_condition',
                    'advanced',
                ],
            },
            sys_script_include: {
                label: 'Script Include',
                scriptField: 'script',
                fields: ['api_name', 'client_callable', 'access', 'caller_access'],
            },
            sys_script_client: {
                label: 'Client Script',
                scriptField: 'script',
                fields: ['table', 'type', 'field', 'ui_type', 'isolate_script'],
            },
            sys_ui_action: {
                label: 'UI Action',
                scriptField: 'script',
                fields: [
                    'table',
                    'action_name',
                    'client',
                    'form_button',
                    'list_button',
                    'condition',
                    'onclick',
                    'isolate_script',
                ],
            },
            sys_ws_operation: {
                label: 'Scripted REST Resource',
                scriptField: 'operation_script',
                fields: [
                    'http_method',
                    'relative_path',
                    'operation_uri',
                    'requires_authentication',
                    'requires_acl_authorization',
                    'requires_snc_internal_role',
                    'enforce_acl',
                    'consumes',
                    'produces',
                    'support_trailing_slash',
                ],
            },
            sys_ui_page: {
                label: 'UI Page',
                // A UI Page has THREE code surfaces. The Jelly/HTML body is the
                // primary one; the two scripts are returned via extraCodeFields.
                scriptField: 'html',
                extraCodeFields: ['client_script', 'processing_script'],
                fields: ['category', 'direct', 'endpoint'],
            },
        }
    },

    /** Returns the first valid, non-empty description-ish field value. */
    _getDescription: function (gr) {
        for (var i = 0; i < this.DESCRIPTION_FIELDS.length; i++) {
            var f = this.DESCRIPTION_FIELDS[i]
            if (gr.isValidField(f)) {
                var v = gr.getValue(f)
                if (v) {
                    return v
                }
            }
        }
        return ''
    },

    /**
     * Fetches a script artifact's source and review-relevant metadata.
     *
     * @param {string} sourceTable   - one of the allowed script tables
     * @param {string} artifactSysId - sys_id of the artifact record
     * @returns {string} JSON string consumed by the Script Reviewer skill prompt
     */
    gatherScriptArtifact: function (sourceTable, artifactSysId) {
        var allowed = this.getAllowedTables()

        if (!sourceTable || !artifactSysId) {
            return JSON.stringify({ error: 'Both sourceTable and artifactSysId are required.' })
        }
        if (!allowed.hasOwnProperty(sourceTable)) {
            return JSON.stringify({
                error: 'Unsupported source table: ' + sourceTable,
                supported: Object.keys(allowed),
            })
        }

        var cfg = allowed[sourceTable]

        // GlideRecordSecure: input-driven read whose content is returned to the caller.
        var gr = new GlideRecordSecure(sourceTable)
        if (!gr.get(artifactSysId)) {
            return JSON.stringify({
                error: 'Artifact not found or not readable.',
                source_table: sourceTable,
                sys_id: artifactSysId,
            })
        }

        var scriptField = cfg.scriptField || 'script'
        var rawScript = gr.isValidField(scriptField) ? gr.getValue(scriptField) || '' : ''

        // Raw extra code surfaces, untruncated (UI Pages carry a client script and
        // a processing script alongside the Jelly body).
        var rawExtras = {}
        if (cfg.extraCodeFields && cfg.extraCodeFields.length) {
            for (var e = 0; e < cfg.extraCodeFields.length; e++) {
                var ef = cfg.extraCodeFields[e]
                if (gr.isValidField(ef)) {
                    rawExtras[ef] = gr.getValue(ef) || ''
                }
            }
        }

        // Pre-scan the FULL untruncated source of every surface, so defects beyond
        // the truncation cap are still detected and reported (Finding E).
        var surfaces = {}
        surfaces[scriptField] = { full: rawScript, cap: this.MAX_SCRIPT_CHARS }
        for (var sk in rawExtras) {
            if (rawExtras.hasOwnProperty(sk)) {
                surfaces[sk] = { full: rawExtras[sk], cap: this.MAX_SCRIPT_CHARS }
            }
        }
        var preScan = new CodeReviewPreScanner().scan(surfaces)

        var result = {
            artifact_type: cfg.label,
            source_table: sourceTable,
            script_field: scriptField,
            sys_id: artifactSysId,
            name: gr.getValue('name') || '(unnamed)',
            description: this._getDescription(gr),
            active: gr.getValue('active'),
            application: gr.getDisplayValue('sys_scope'),
            pre_scan: preScan,
            context: {},
        }

        var extra = cfg.fields
        for (var i = 0; i < extra.length; i++) {
            var f = extra[i]
            if (gr.isValidField(f)) {
                result.context[f] = gr.getValue(f)
            }
        }

        // Tier 3: too large for automated review. Return signals only, no code.
        if (preScan.skip_review) {
            result.review_status = 'skipped_too_large'
            result.message =
                'Artifact exceeds the automated review size limit of ' +
                preScan.skip_threshold +
                ' characters (actual ' +
                preScan.total_chars +
                ' characters, ' +
                preScan.total_lines +
                ' lines). No code was sent for AI review. Report this as a finding and rely on the pre_scan markers.'
            return JSON.stringify(result)
        }

        result.review_status = preScan.partial_review ? 'partial_oversized' : 'full'

        var script = rawScript
        var truncated = false
        if (script.length > this.MAX_SCRIPT_CHARS) {
            script = script.substring(0, this.MAX_SCRIPT_CHARS)
            truncated = true
        }
        result.script = script
        result.script_chars = rawScript.length
        result.script_truncated = truncated

        if (cfg.extraCodeFields && cfg.extraCodeFields.length) {
            result.additional_code = {}
            for (var e2 = 0; e2 < cfg.extraCodeFields.length; e2++) {
                var ef2 = cfg.extraCodeFields[e2]
                if (!rawExtras.hasOwnProperty(ef2)) {
                    continue
                }
                var fullLen = rawExtras[ef2].length
                var ev = rawExtras[ef2]
                var evTruncated = false
                if (ev.length > this.MAX_SCRIPT_CHARS) {
                    ev = ev.substring(0, this.MAX_SCRIPT_CHARS)
                    evTruncated = true
                }
                result.additional_code[ef2] = {
                    code: ev,
                    chars: fullLen,
                    truncated: evTruncated,
                }
            }
        }

        return JSON.stringify(result)
    },

    type: 'CodeReviewScriptGatherer',
}
