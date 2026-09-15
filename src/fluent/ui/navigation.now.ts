import { ApplicationMenu, Record } from '@servicenow/sdk/core'

/**
 * Navigation for the AI Code Reviewer app.
 *
 * Application menu ("AI Code Reviewer") exposing the finding + run lists and a
 * critical/high filter.
 *
 * NOTE ON REPORTS/DASHBOARDS: `sys_report` records are heavily auto-populated by
 * the platform and round-trip badly through Fluent metadata sync (the sync
 * serializes `sys_domain_path` as '/', which the Fluent type rejects — a
 * recurring sync/build blocker). Reports and dashboards are therefore created in
 * the ServiceNow UI (Reports / Platform Analytics) rather than managed here.
 * The finding + run tables and this menu are the source-controlled surface.
 */

const FINDING_TABLE = 'x_rptp_ai_code_rev_finding'
const RUN_TABLE = 'x_rptp_ai_code_rev_review_run'

export const aiCodeReviewerMenu = ApplicationMenu({
    $id: Now.ID['acr_app_menu'],
    title: 'AI Code Reviewer',
    hint: 'AI-driven code review findings and runs',
    description: 'Review findings and runs for the AI Code Reviewer',
    roles: ['admin'],
    active: true,
})

// Findings list
Record({
    $id: Now.ID['acr_module_findings'],
    table: 'sys_app_module',
    data: {
        title: 'Review Findings',
        application: aiCodeReviewerMenu,
        link_type: 'LIST',
        name: FINDING_TABLE,
        active: true,
        order: 100,
        roles: ['admin'],
    },
})

// Critical & High findings (filtered list)
Record({
    $id: Now.ID['acr_module_critical_high'],
    table: 'sys_app_module',
    data: {
        title: 'Critical & High Findings',
        application: aiCodeReviewerMenu,
        link_type: 'FILTER',
        name: FINDING_TABLE,
        filter: 'severityINcritical,high',
        active: true,
        order: 150,
        roles: ['admin'],
    },
})

// Administration separator
Record({
    $id: Now.ID['acr_module_sep_admin'],
    table: 'sys_app_module',
    data: {
        title: 'Administration',
        application: aiCodeReviewerMenu,
        link_type: 'SEPARATOR',
        active: true,
        order: 300,
        roles: ['admin'],
    },
})

// Review runs list
Record({
    $id: Now.ID['acr_module_runs'],
    table: 'sys_app_module',
    data: {
        title: 'Review Runs',
        application: aiCodeReviewerMenu,
        link_type: 'LIST',
        name: RUN_TABLE,
        active: true,
        order: 310,
        roles: ['admin'],
    },
})
