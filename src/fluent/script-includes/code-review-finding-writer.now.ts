import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Orchestration backbone for the code-review run lifecycle. Called by the
 * orchestrator (a subflow-driven loop, or directly via script):
 *
 *  - startRun(appSysId)                → creates a review_run, returns its sys_id
 *  - recordReview(run, app, table, id, name, rawSkillOutput)
 *                                      → parses the reviewer's JSON (tolerant of
 *                                        markdown fences / prose), validates
 *                                        severity + category, writes finding rows
 *  - finalizeRun(run, artifactCount, status)
 *                                      → rolls up counts + severity, sets status
 *
 * Parsing/persistence lives here (not in the Flow) because Flows are declarative
 * and cannot parse JSON. Unparseable responses are recorded as an explicit
 * finding rather than silently dropped.
 */
export const CodeReviewFindingWriter = ScriptInclude({
    $id: Now.ID['code_review_finding_writer'],
    name: 'CodeReviewFindingWriter',
    script: Now.include('../../server/script-includes/code-review-finding-writer.js'),
    description:
        'Run lifecycle + finding persistence for the AI code review orchestrator: creates review_run rows, parses reviewer JSON output into finding rows (validating severity/category), and finalises runs with severity rollups.',
    accessibleFrom: 'public',
})
