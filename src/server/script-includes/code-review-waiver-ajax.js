var CodeReviewWaiverAjax = Class.create()
CodeReviewWaiverAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    WAIVER_TABLE: 'x_rptp_ai_code_rev_waiver',
    FINDING_TABLE: 'x_rptp_ai_code_rev_finding',

    /**
     * Client-callable (GlideAjax) entry point for the "Accept / Waive" UI Action.
     * Creates an active waiver from a finding and suppresses that finding immediately,
     * so the reviewer lands back on the list with the decision already applied.
     *
     * Params:
     *   sysparm_finding        - sys_id of the x_rptp_ai_code_rev_finding record
     *   sysparm_justification  - required free-text reason
     * Returns (JSON string): { ok: boolean, waiver?: sys_id, error?: string }
     */
    waive: function () {
        var findingId = this.getParameter('sysparm_finding')
        var justification = this.getParameter('sysparm_justification')

        if (!findingId) return JSON.stringify({ ok: false, error: 'missing_finding' })
        if (!justification || !('' + justification).trim()) {
            return JSON.stringify({ ok: false, error: 'justification_required' })
        }

        var f = new GlideRecord(this.FINDING_TABLE)
        if (!f.get(findingId)) return JSON.stringify({ ok: false, error: 'finding_not_found' })

        var severity = f.getValue('severity')
        // Server-side gate (defense in depth beyond the UI Action condition):
        // high/critical require the reviewer role. gs.hasRole returns true for admin.
        if ((severity === 'high' || severity === 'critical') && !gs.hasRole('x_rptp_ai_code_rev.reviewer')) {
            return JSON.stringify({ ok: false, error: 'not_authorized' })
        }

        var w = new GlideRecord(this.WAIVER_TABLE)
        w.initialize()
        w.setValue('application', f.getValue('application'))
        w.setValue('source_table', f.getValue('source_table'))
        w.setValue('source_id', f.getValue('source_id'))
        w.setValue('artifact_name', f.getValue('artifact_name'))
        w.setValue('category', f.getValue('category'))
        w.setValue('severity', severity)
        w.setValue('fingerprint', f.getValue('fingerprint'))
        w.setValue('justification', ('' + justification).trim())
        w.setValue('state', 'active')
        w.setValue('finding', findingId)
        var waiverId = w.insert()

        if (!waiverId) return JSON.stringify({ ok: false, error: 'waiver_insert_failed' })

        // Suppress the current finding now (don't wait for the next run).
        f.setValue('status', 'suppressed')
        f.setValue('waiver', waiverId)
        f.update()

        return JSON.stringify({ ok: true, waiver: waiverId })
    },

    type: 'CodeReviewWaiverAjax',
})
