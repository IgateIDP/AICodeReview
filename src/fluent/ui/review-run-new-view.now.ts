import '@servicenow/sdk/global'
import { Record, Form } from '@servicenow/sdk/core'

/**
 * "New Review" intake experience for x_rptp_ai_code_rev_review_run.
 *
 * Goal: creating a review should ask for ONE thing — the Application. All the
 * operational fields (name, status, started/finished, counts, summary) are filled
 * by the Code Review Worker, so they are noise at creation time.
 *
 *  - `newReviewView`  — a dedicated view titled "New Review".
 *  - `Form(...)`      — that view's layout: a single section with only the
 *                       (mandatory, see the table def) Application field.
 *  - View Rule        — routes brand-new records (i.e. clicking "New" on the run
 *                       list) into the New Review view. Existing records keep the
 *                       full default view (all fields + related lists).
 *
 * On save, status defaults to 'requested' and the worker enqueues + names the run.
 */
export const newReviewView = Record({
    $id: Now.ID['acr_new_review_view'],
    table: 'sys_ui_view',
    data: { name: 'acr_new_review', title: 'New Review' },
})

Form({
    table: 'x_rptp_ai_code_rev_review_run',
    view: newReviewView,
    sections: [
        {
            caption: 'New Review',
            content: [
                {
                    layout: 'one-column',
                    elements: [{ field: 'application', type: 'table_field' }],
                },
            ],
        },
    ],
})

// Route new-record forms to the New Review view; leave existing records on Default.
Record({
    $id: Now.ID['acr_new_review_view_rule'],
    table: 'sysrule_view',
    data: {
        name: 'Route new Code Review Run to New Review view',
        table: 'x_rptp_ai_code_rev_review_run',
        advanced: true,
        active: true,
        device_type: 'browser',
        overrides_user_preference: true,
        order: 100,
        script: `(function overrideView(view, is_list) {
    try {
        var isNew = (!is_list && typeof current !== 'undefined' && current.isNewRecord());
        gs.info('[ACR view rule] is_list=' + is_list + ' currentDefined=' + (typeof current !== 'undefined') + ' isNew=' + isNew + ' view=' + view);
        answer = isNew ? 'acr_new_review' : null;
    } catch (e) {
        gs.error('[ACR view rule] error: ' + e);
        answer = null;
    }
})(view, is_list);`,
    },
})
