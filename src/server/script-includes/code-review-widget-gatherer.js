var CodeReviewWidgetGatherer = Class.create()

CodeReviewWidgetGatherer.prototype = {
    initialize: function () {},

    /**
     * Per-surface character budgets for the code actually sent to the LLM.
     *
     * Widget code is large -- real widgets in this instance reach 58-65 KB across
     * their surfaces, which cannot be sent whole. Each surface therefore gets its
     * own cap and a truncation flag.
     *
     * Truncation alone caused false negatives (Finding E), so CodeReviewPreScanner
     * additionally regexes the FULL untruncated source and reports any marker that
     * falls beyond these caps as "hidden". The model is instructed to report those
     * even though it cannot see them.
     *
     * CSS gets the smallest budget deliberately: scoping problems are visible in
     * the first few KB and long stylesheets are mostly noise.
     */
    LIMITS: {
        script: 10000, // server script
        client_script: 10000, // AngularJS controller
        template: 8000, // HTML template
        css: 4000, // widget CSS
        link: 3000, // link function
        option_schema: 3000, // option definitions
    },

    /** Non-code configuration that matters when reviewing a widget. */
    CONTEXT_FIELDS: [
        'id',
        'category',
        'controller_as',
        'data_table',
        'field_list',
        'roles',
        'public',
        'has_preview',
        'servicenow',
        'internal',
    ],

    /** Applies the per-surface cap, returning the value and whether it was cut. */
    _capped: function (value, limit) {
        var v = value || ''
        if (v.length > limit) {
            return { code: v.substring(0, limit), chars: v.length, truncated: true }
        }
        return { code: v, chars: v.length, truncated: false }
    },

    /**
     * Fetches a Service Portal widget's six code surfaces plus review context.
     *
     * @param {string} widgetSysId - sys_id of the sp_widget record
     * @returns {string} JSON string consumed by the Service Portal Widget Reviewer skill
     */
    gatherWidget: function (widgetSysId) {
        if (!widgetSysId) {
            return JSON.stringify({ error: 'widgetSysId is required.' })
        }

        // GlideRecordSecure: the sys_id comes from skill input and the content is
        // returned to the caller.
        var gr = new GlideRecordSecure('sp_widget')
        if (!gr.get(widgetSysId)) {
            return JSON.stringify({
                error: 'Widget not found or not readable.',
                source_table: 'sp_widget',
                sys_id: widgetSysId,
            })
        }

        // --- raw surfaces, untruncated ---
        var raw = {
            server_script: gr.getValue('script') || '',
            client_script: gr.getValue('client_script') || '',
            template: gr.getValue('template') || '',
            css: gr.getValue('css') || '',
            link_function: gr.getValue('link') || '',
            option_schema: gr.getValue('option_schema') || '',
        }

        // --- pre-scan the FULL source, with the caps that will be applied ---
        var preScan = new CodeReviewPreScanner().scan({
            server_script: { full: raw.server_script, cap: this.LIMITS.script },
            client_script: { full: raw.client_script, cap: this.LIMITS.client_script },
            template: { full: raw.template, cap: this.LIMITS.template },
            css: { full: raw.css, cap: this.LIMITS.css },
            link_function: { full: raw.link_function, cap: this.LIMITS.link },
            option_schema: { full: raw.option_schema, cap: this.LIMITS.option_schema },
        })

        var base = {
            artifact_type: 'Service Portal Widget',
            source_table: 'sp_widget',
            sys_id: widgetSysId,
            name: gr.getValue('name') || '(unnamed)',
            description: gr.getValue('description') || '',
            application: gr.getDisplayValue('sys_scope'),
            pre_scan: preScan,
        }

        base.context = {}
        for (var i = 0; i < this.CONTEXT_FIELDS.length; i++) {
            var f = this.CONTEXT_FIELDS[i]
            if (gr.isValidField(f)) {
                base.context[f] = gr.getValue(f)
            }
        }

        // --- tier 3: too large to review. Return no code at all, only signals. ---
        if (preScan.skip_review) {
            base.review_status = 'skipped_too_large'
            base.message =
                'Widget exceeds the automated review size limit of ' +
                preScan.skip_threshold +
                ' characters (actual ' +
                preScan.total_chars +
                ' characters, ' +
                preScan.total_lines +
                ' lines). No code was sent for AI review. Report this as a finding and rely on the pre_scan markers.'
            return JSON.stringify(base)
        }

        // --- tier 1 / 2: send capped code ---
        var server = this._capped(raw.server_script, this.LIMITS.script)
        var client = this._capped(raw.client_script, this.LIMITS.client_script)
        var template = this._capped(raw.template, this.LIMITS.template)
        var css = this._capped(raw.css, this.LIMITS.css)
        var link = this._capped(raw.link_function, this.LIMITS.link)
        var optionSchema = this._capped(raw.option_schema, this.LIMITS.option_schema)

        base.review_status = preScan.partial_review ? 'partial_oversized' : 'full'

        base.server_script = server.code
        base.server_script_chars = server.chars
        base.server_script_truncated = server.truncated

        base.client_script = client.code
        base.client_script_chars = client.chars
        base.client_script_truncated = client.truncated

        base.template = template.code
        base.template_chars = template.chars
        base.template_truncated = template.truncated

        base.css = css.code
        base.css_chars = css.chars
        base.css_truncated = css.truncated

        base.link_function = link.code
        base.link_function_chars = link.chars
        base.link_function_truncated = link.truncated

        base.option_schema = optionSchema.code
        base.option_schema_chars = optionSchema.chars
        base.option_schema_truncated = optionSchema.truncated

        // Key signal for the hardcoding-vs-options check: a widget with no
        // option_schema cannot be configured per instance, so any value that
        // varies by placement must be hardcoded somewhere.
        base.has_option_schema = optionSchema.chars > 0

        return JSON.stringify(base)
    },

    type: 'CodeReviewWidgetGatherer',
}
