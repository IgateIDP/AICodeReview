import {
    Table,
    StringColumn,
    ReferenceColumn,
    ChoiceColumn,
    IntegerColumn,
    DateTimeColumn,
    MultiLineTextColumn,
    TableNameColumn,
} from '@servicenow/sdk/core'

/**
 * Parent record: one row per AI code-review execution against an application.
 * Enables per-application rollups (mirrors how scan_finding groups by package).
 * Table name kept short to stay within the 30-char limit
 * (x_rptp_ai_code_rev_ prefix = 19 chars).
 */
export const x_rptp_ai_code_rev_review_run = Table({
    name: 'x_rptp_ai_code_rev_review_run',
    label: 'Code Review Run',
    display: 'name',
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 200 }),
        application: ReferenceColumn({ label: 'Application', referenceTable: 'sys_scope' }),
        status: ChoiceColumn({
            label: 'Status',
            dropdown: 'dropdown_without_none',
            default: 'requested',
            choices: {
                requested: 'Requested',
                running: 'Running',
                complete: 'Complete',
                error: 'Error',
            },
        }),
        started: DateTimeColumn({ label: 'Started' }),
        finished: DateTimeColumn({ label: 'Finished' }),
        artifact_count: IntegerColumn({ label: 'Artifacts reviewed' }),
        finding_count: IntegerColumn({ label: 'Findings' }),
        summary: MultiLineTextColumn({ label: 'Summary' }),
    },
})

/**
 * Child record: one row per issue found while reviewing an artifact.
 * References the parent run and (denormalized) the application for direct
 * per-application grouping/filtering.
 */
export const x_rptp_ai_code_rev_finding = Table({
    name: 'x_rptp_ai_code_rev_finding',
    label: 'Code Review Finding',
    display: 'artifact_name',
    schema: {
        review_run: ReferenceColumn({
            label: 'Review run',
            referenceTable: 'x_rptp_ai_code_rev_review_run',
            cascadeRule: 'delete',
        }),
        application: ReferenceColumn({ label: 'Application', referenceTable: 'sys_scope' }),
        artifact_type: ChoiceColumn({
            label: 'Artifact type',
            dropdown: 'dropdown_without_none',
            choices: {
                script: 'Script',
                scripted_rest: 'Scripted REST',
                ui_page: 'UI Page',
                flow: 'Flow / Action',
                table: 'Table',
            },
        }),
        source_table: TableNameColumn({ label: 'Source table' }),
        source_id: StringColumn({ label: 'Source sys_id', maxLength: 32 }),
        artifact_name: StringColumn({ label: 'Artifact', maxLength: 200 }),
        severity: ChoiceColumn({
            label: 'Severity',
            dropdown: 'dropdown_without_none',
            choices: {
                critical: 'Critical',
                high: 'High',
                moderate: 'Moderate',
                low: 'Low',
            },
        }),
        category: ChoiceColumn({
            label: 'Category',
            dropdown: 'dropdown_without_none',
            choices: {
                hardcoding: 'Hardcoding',
                security: 'Security',
                performance: 'Performance',
                maintainability: 'Maintainability',
                best_practice: 'Best practice',
            },
        }),
        issue: MultiLineTextColumn({ label: 'Issue' }),
        recommendation: MultiLineTextColumn({ label: 'Recommendation' }),
        line_reference: StringColumn({ label: 'Line / location', maxLength: 200 }),
        raw_response: MultiLineTextColumn({ label: 'Raw AI response' }),
    },
})
