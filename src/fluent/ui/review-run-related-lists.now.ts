import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

/**
 * Related lists on the Code Review Run form.
 *
 * Both are IMPLICIT relationships (a reference field already points at the run),
 * so no sys_relationship is needed — just the related-list layout so the lists
 * appear by default for all users instead of per-user personalization:
 *   - Findings (`x_rptp_ai_code_rev_finding.review_run`) — the review results
 *   - Queue    (`x_rptp_ai_code_rev_queue.review_run`)   — per-artifact progress/errors
 */
const reviewRunRelatedLists = Record({
    $id: Now.ID['acr_run_related_list'],
    table: 'sys_ui_related_list',
    data: {
        name: 'x_rptp_ai_code_rev_review_run',
        view: 'Default view',
    },
})

// Findings produced by this run
Record({
    $id: Now.ID['acr_run_findings_entry'],
    table: 'sys_ui_related_list_entry',
    data: {
        list_id: reviewRunRelatedLists,
        position: 0,
        related_list: 'x_rptp_ai_code_rev_finding.review_run',
    },
})

// Queue rows for this run (live progress + any per-artifact errors)
Record({
    $id: Now.ID['acr_run_queue_entry'],
    table: 'sys_ui_related_list_entry',
    data: {
        list_id: reviewRunRelatedLists,
        position: 1,
        related_list: 'x_rptp_ai_code_rev_queue.review_run',
    },
})
