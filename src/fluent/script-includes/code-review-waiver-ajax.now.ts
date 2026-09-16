import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Client-callable helper for the "Accept / Waive" UI Action (Phase 7).
 * Its `waive` method creates an active waiver from a finding and suppresses that
 * finding immediately, so the action can complete server-side and return the
 * reviewer straight to the finding list — no intermediate waiver form.
 *
 * Enforces the same governance as the UI Action's condition (high/critical require
 * the reviewer role) server-side, as defense in depth.
 */
export const CodeReviewWaiverAjax = ScriptInclude({
    $id: Now.ID['code_review_waiver_ajax'],
    name: 'CodeReviewWaiverAjax',
    apiName: 'x_rptp_ai_code_rev.CodeReviewWaiverAjax',
    clientCallable: true,
    active: true,
    script: Now.include('../../server/script-includes/code-review-waiver-ajax.js'),
    description:
        'Client-callable: creates a code-review waiver from a finding and suppresses the finding immediately, for the Accept / Waive UI Action.',
})
