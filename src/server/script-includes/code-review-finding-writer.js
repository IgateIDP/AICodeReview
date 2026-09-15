var CodeReviewFindingWriter = Class.create()

CodeReviewFindingWriter.prototype = {
    initialize: function () {
        this.RUN_TABLE = 'x_rptp_ai_code_rev_review_run'
        this.FINDING_TABLE = 'x_rptp_ai_code_rev_finding'
    },

    VALID_SEVERITY: ['critical', 'high', 'moderate', 'low'],
    VALID_CATEGORY: ['hardcoding', 'security', 'performance', 'maintainability', 'best_practice'],

    /** Maps a source table to the finding.artifact_type choice value. */
    _artifactType: function (sourceTable) {
        var map = {
            sys_script: 'business_rule',
            sys_script_include: 'script_include',
            sys_script_client: 'client_script',
            sys_ui_action: 'ui_action',
            sys_ws_operation: 'scripted_rest',
            sys_ui_page: 'ui_page',
            sp_widget: 'widget',
        }
        return map[sourceTable] || 'other'
    },

    /**
     * Creates a review run row for an application and returns its sys_id.
     */
    startRun: function (appSysId) {
        if (!appSysId) return ''
        var app = new GlideRecord('sys_scope')
        var appName = app.get(appSysId) ? app.getValue('name') : appSysId

        var run = new GlideRecord(this.RUN_TABLE)
        run.initialize()
        run.setValue('name', 'Code review: ' + appName + ' (' + new GlideDateTime().getDisplayValue() + ')')
        run.setValue('application', appSysId)
        run.setValue('status', 'running')
        run.setValue('started', new GlideDateTime())
        run.setValue('artifact_count', 0)
        run.setValue('finding_count', 0)
        return run.insert()
    },

    /**
     * Normalises the subflow's skill_response into a plain JS object.
     * Accepts either an Object (as returned by the Execute Skill subflow via
     * FlowAPI) or a JSON string (tolerant of markdown fences / surrounding prose).
     */
    _toObject: function (raw) {
        if (raw === null || raw === undefined) return null
        if (typeof raw === 'object') {
            // Normalise any non-plain (e.g. scriptable/Java) object into a plain one.
            try {
                return JSON.parse(JSON.stringify(raw))
            } catch (e) {
                return raw
            }
        }
        var text = ('' + raw).trim()
        if (!text) return null
        text = text.replace(/```json/gi, '').replace(/```/g, '').trim()
        var first = text.indexOf('{')
        var last = text.lastIndexOf('}')
        if (first > -1 && last > first) {
            text = text.substring(first, last + 1)
        }
        try {
            return JSON.parse(text)
        } catch (e2) {
            return null
        }
    },

    _isArray: function (x) {
        return Object.prototype.toString.call(x) === '[object Array]'
    },

    /**
     * Extracts { findings, overall_assessment } from the skill output object.
     *
     * The "Execute an AI skill" action returns an envelope that carries the review
     * both at the top level and nested under `response`. Findings may therefore be:
     *   1. top-level:            obj.findings
     *   2. nested (object):      obj.response.findings
     *   3. nested (JSON string): obj.response = "{...}"
     */
    _extractReview: function (obj) {
        if (!obj) return null

        if (this._isArray(obj.findings)) {
            return { findings: obj.findings, overall_assessment: obj.overall_assessment || '' }
        }

        var resp = obj.response
        if (resp) {
            if (typeof resp === 'string') {
                var parsed = this._toObject(resp)
                if (parsed && this._isArray(parsed.findings)) {
                    return { findings: parsed.findings, overall_assessment: parsed.overall_assessment || '' }
                }
            } else if (typeof resp === 'object' && this._isArray(resp.findings)) {
                return { findings: resp.findings, overall_assessment: resp.overall_assessment || '' }
            }
        }
        return null
    },

    _clean: function (val, allowed, fallback) {
        var v = val === null || val === undefined ? '' : ('' + val).toLowerCase().trim()
        return allowed.indexOf(v) > -1 ? v : fallback
    },

    /**
     * Parses one artifact's reviewer response (Object or String) and writes its findings.
     * @returns {string} JSON: { parsed, finding_count, error }
     */
    recordReview: function (runSysId, appSysId, sourceTable, artifactSysId, artifactName, rawResponse) {
        var artifactType = this._artifactType(sourceTable)
        var obj = this._toObject(rawResponse)
        var review = this._extractReview(obj)

        if (!review) {
            // Unparseable / empty output is itself a reportable problem, not a silent drop.
            this._insertFinding({
                run: runSysId,
                app: appSysId,
                artifactType: artifactType,
                sourceTable: sourceTable,
                sourceId: artifactSysId,
                artifactName: artifactName,
                severity: 'low',
                category: 'maintainability',
                issue: 'The reviewer returned no parseable findings for this artifact.',
                recommendation: 'Re-run the review for this artifact; if it recurs, inspect the skill output.',
                lineReference: '',
                raw: typeof rawResponse === 'string' ? rawResponse : JSON.stringify(rawResponse),
            })
            return JSON.stringify({ parsed: false, finding_count: 1, error: 'no_parseable_findings' })
        }

        var findings = review.findings || []
        if (!findings.length) {
            return JSON.stringify({ parsed: true, finding_count: 0, error: '' })
        }

        var count = 0
        for (var i = 0; i < findings.length; i++) {
            var f = findings[i] || {}
            this._insertFinding({
                run: runSysId,
                app: appSysId,
                artifactType: artifactType,
                sourceTable: sourceTable,
                sourceId: artifactSysId,
                artifactName: artifactName,
                severity: this._clean(f.severity, this.VALID_SEVERITY, 'moderate'),
                category: this._clean(f.category, this.VALID_CATEGORY, 'best_practice'),
                issue: f.issue || '',
                recommendation: f.recommendation || '',
                lineReference: f.line_reference || '',
                raw: '',
            })
            count++
        }
        return JSON.stringify({ parsed: true, finding_count: count, error: '' })
    },

    /**
     * Records a hard failure (e.g. subflow invocation error) as an explicit finding
     * so a failed artifact is visible rather than silently missing.
     */
    recordError: function (runSysId, appSysId, sourceTable, artifactSysId, artifactName, message) {
        this._insertFinding({
            run: runSysId,
            app: appSysId,
            artifactType: this._artifactType(sourceTable),
            sourceTable: sourceTable,
            sourceId: artifactSysId,
            artifactName: artifactName,
            severity: 'low',
            category: 'maintainability',
            issue: 'Review could not be completed: ' + message,
            recommendation: 'Re-run the review for this artifact.',
            lineReference: '',
            raw: '',
        })
    },

    _insertFinding: function (o) {
        var gr = new GlideRecord(this.FINDING_TABLE)
        gr.initialize()
        gr.setValue('review_run', o.run)
        gr.setValue('application', o.app)
        gr.setValue('artifact_type', o.artifactType)
        gr.setValue('source_table', o.sourceTable)
        gr.setValue('source_id', o.sourceId)
        gr.setValue('artifact_name', o.artifactName)
        gr.setValue('severity', o.severity)
        gr.setValue('category', o.category)
        gr.setValue('issue', o.issue)
        gr.setValue('recommendation', o.recommendation)
        gr.setValue('line_reference', o.lineReference)
        if (o.raw) {
            gr.setValue('raw_response', o.raw)
        }
        return gr.insert()
    },

    /**
     * Finalises a run: rolls up counts from its findings and sets status.
     */
    finalizeRun: function (runSysId, artifactCount, status) {
        var run = new GlideRecord(this.RUN_TABLE)
        if (!run.get(runSysId)) {
            return JSON.stringify({ error: 'run_not_found' })
        }

        var total = 0
        var bySev = { critical: 0, high: 0, moderate: 0, low: 0 }
        var ga = new GlideAggregate(this.FINDING_TABLE)
        ga.addQuery('review_run', runSysId)
        ga.addAggregate('COUNT')
        ga.groupBy('severity')
        ga.query()
        while (ga.next()) {
            var sev = ga.getValue('severity')
            var c = parseInt(ga.getAggregate('COUNT'), 10)
            total += c
            if (bySev.hasOwnProperty(sev)) bySev[sev] = c
        }

        run.setValue('finding_count', total)
        if (artifactCount !== null && artifactCount !== undefined && ('' + artifactCount) !== '') {
            run.setValue('artifact_count', parseInt(artifactCount, 10))
        }
        run.setValue('status', status || 'complete')
        run.setValue('finished', new GlideDateTime())

        // Composition by artifact type (answers "which findings are script vs widget").
        var byTypeParts = []
        var gt = new GlideAggregate(this.FINDING_TABLE)
        gt.addQuery('review_run', runSysId)
        gt.addAggregate('COUNT')
        gt.groupBy('artifact_type')
        gt.orderByAggregate('COUNT')
        gt.query()
        while (gt.next()) {
            byTypeParts.push(gt.getValue('artifact_type') + ': ' + gt.getAggregate('COUNT'))
        }
        var byTypeStr = byTypeParts.length ? ' By type — ' + byTypeParts.join(', ') + '.' : ''

        run.setValue(
            'summary',
            'Reviewed ' + (run.getValue('artifact_count') || '0') + ' artifact(s); ' + total +
                ' finding(s).' + byTypeStr +
                ' By severity — critical: ' + bySev.critical + ', high: ' + bySev.high +
                ', moderate: ' + bySev.moderate + ', low: ' + bySev.low + '.'
        )
        run.update()

        return JSON.stringify({ run: runSysId, findings: total, by_severity: bySev })
    },

    type: 'CodeReviewFindingWriter',
}
