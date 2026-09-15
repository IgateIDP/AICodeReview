import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Top-level orchestrator for a per-application code review.
 *
 * `run(appSysId, maxArtifacts)`:
 *   1. startRun            → create the review_run record
 *   2. enumerate           → CodeReviewArtifactCollector.getArtifacts()
 *   3. loop (batch-limited) → invoke the "Review One Artifact" subflow via
 *                            sn_fd.FlowAPI, passing reviewer_type/source_table/sys_id
 *   4. recordReview        → CodeReviewFindingWriter parses the returned object and
 *                            writes finding rows
 *   5. finalizeRun         → status, counts, severity summary
 *
 * The subflow is the only piece that invokes the GenAI skill (Execute Skill);
 * everything else lives here so it is testable and versioned in source.
 */
export const CodeReviewOrchestrator = ScriptInclude({
    $id: Now.ID['code_review_orchestrator'],
    name: 'CodeReviewOrchestrator',
    script: Now.include('../../server/script-includes/code-review-orchestrator.js'),
    description:
        'Runs a full per-application AI code review: creates a run, enumerates artifacts, invokes the Review One Artifact subflow per artifact (batch-limited), persists findings, and finalises the run.',
    accessibleFrom: 'package_private',
})
