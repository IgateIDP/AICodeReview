import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Client-callable helper for the "Accept / Waive" UI Action (Phase 7).
 * `waive` creates an active waiver from a finding and suppresses that finding
 * immediately, so the action completes server-side and returns the reviewer to
 * the finding list — no intermediate waiver form.
 *
 * NOTE: the class is defined INLINE (not via Now.include) because a scoped
 * GlideAjax processor must extend `global.AbstractAjaxProcessor`, and the bare
 * `global` identifier fails the server `.js` type-check. Inline script strings
 * are not type-checked, so this is the SDK-blessed pattern for AJAX processors.
 */
export const CodeReviewWaiverAjax = ScriptInclude({
    $id: Now.ID['code_review_waiver_ajax'],
    name: 'CodeReviewWaiverAjax',
    apiName: 'x_rptp_ai_code_rev.CodeReviewWaiverAjax',
    clientCallable: true,
    active: true,
    description:
        'Client-callable: creates a code-review waiver from a finding and suppresses the finding immediately, for the Accept / Waive UI Action.',
    script: `var CodeReviewWaiverAjax = Class.create();
CodeReviewWaiverAjax.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    WAIVER_TABLE: 'x_rptp_ai_code_rev_waiver',
    FINDING_TABLE: 'x_rptp_ai_code_rev_finding',

    /**
     * Client-callable (GlideAjax) entry point for the "Accept / Waive" UI Action.
     * Params: sysparm_finding (sys_id), sysparm_justification (required text).
     * Returns (JSON string): { ok: boolean, waiver?: sys_id, error?: string }
     */
    waive: function () {
        var findingId = this.getParameter('sysparm_finding');
        var justification = this.getParameter('sysparm_justification');

        if (!findingId) return JSON.stringify({ ok: false, error: 'missing_finding' });
        if (!justification || !('' + justification).trim()) {
            return JSON.stringify({ ok: false, error: 'justification_required' });
        }

        var f = new GlideRecord(this.FINDING_TABLE);
        if (!f.get(findingId)) return JSON.stringify({ ok: false, error: 'finding_not_found' });

        var severity = f.getValue('severity');
        // Server-side gate (defense in depth): high/critical require the reviewer role.
        if ((severity === 'high' || severity === 'critical') && !gs.hasRole('x_rptp_ai_code_rev.reviewer')) {
            return JSON.stringify({ ok: false, error: 'not_authorized' });
        }

        var w = new GlideRecord(this.WAIVER_TABLE);
        w.initialize();
        w.setValue('application', f.getValue('application'));
        w.setValue('source_table', f.getValue('source_table'));
        w.setValue('source_id', f.getValue('source_id'));
        w.setValue('artifact_name', f.getValue('artifact_name'));
        w.setValue('category', f.getValue('category'));
        w.setValue('severity', severity);
        w.setValue('fingerprint', f.getValue('fingerprint'));
        w.setValue('justification', ('' + justification).trim());
        w.setValue('state', 'active');
        w.setValue('finding', findingId);
        var waiverId = w.insert();

        if (!waiverId) return JSON.stringify({ ok: false, error: 'waiver_insert_failed' });

        // Suppress the current finding now (don't wait for the next run).
        f.setValue('status', 'suppressed');
        f.setValue('waiver', waiverId);
        f.update();

        return JSON.stringify({ ok: true, waiver: waiverId });
    },

    type: 'CodeReviewWaiverAjax'
});`,
})
