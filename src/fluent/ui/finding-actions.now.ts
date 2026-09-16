import { UiAction } from '@servicenow/sdk/core'

/**
 * Phase 7 — "Accept / Waive" UI Action on the Code Review Finding form.
 *
 * Flow (client-side): prompt for a required justification → call the
 * CodeReviewWaiverAjax script include (GlideAjax) which creates an ACTIVE waiver
 * and suppresses this finding immediately → on success, return the user to the
 * finding LIST. No intermediate waiver form, and the decision is applied at once
 * (future runs also stay suppressed because the waiver fingerprint matches).
 *
 * Lightweight governance (no ACL):
 *  - `condition` hides the button once a finding is suppressed and, for
 *    HIGH/CRITICAL findings, only shows it to holders of x_rptp_ai_code_rev.reviewer
 *    (admin implicitly). The script include re-checks this server-side.
 */
export const waiveFindingAction = UiAction({
    $id: Now.ID['acr_ui_action_waive_finding'],
    table: 'x_rptp_ai_code_rev_finding',
    name: 'Accept / Waive',
    actionName: 'acr_waive_finding',
    showUpdate: true,
    order: 100,
    hint: 'Accept this finding as a known/acceptable risk (records a waiver and suppresses it). High/Critical require the reviewer role.',
    form: {
        showButton: true,
        style: 'primary',
    },
    condition:
        "current.getValue('status') != 'suppressed' && ('critical,high'.indexOf(current.getValue('severity')) < 0 || gs.hasRole('x_rptp_ai_code_rev.reviewer'))",
    client: {
        isClient: true,
        onClick: 'acrWaiveFinding()',
    },
    script: `function acrWaiveFinding() {
    var justification = prompt('Why is this finding being accepted as a known / acceptable risk? (required)', '');
    if (justification === null) { return; } // user cancelled
    justification = justification.trim();
    if (!justification) {
        alert('A justification is required to accept / waive a finding.');
        return;
    }

    var ga = new GlideAjax('x_rptp_ai_code_rev.CodeReviewWaiverAjax');
    ga.addParam('sysparm_name', 'waive');
    ga.addParam('sysparm_finding', g_form.getUniqueValue());
    ga.addParam('sysparm_justification', justification);
    ga.getXMLAnswer(function (answer) {
        var res = null;
        try { res = JSON.parse(answer); } catch (e) { res = null; }

        if (res && res.ok) {
            // Close the form and return to the finding list view.
            var listUrl = 'x_rptp_ai_code_rev_finding_list.do?sysparm_clear_stack=true';
            if (typeof g_navigation != 'undefined' && g_navigation.open) {
                g_navigation.open(listUrl);
            } else {
                window.location = listUrl;
            }
            return;
        }

        var err = res && res.error ? res.error : 'unknown_error';
        if (err === 'not_authorized') {
            alert('You need the reviewer role to accept high or critical findings.');
        } else if (err === 'justification_required') {
            alert('A justification is required to accept / waive a finding.');
        } else {
            alert('Could not accept / waive this finding (' + err + '). Please try again.');
        }
    });
}`,
})
