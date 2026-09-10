import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Enumerates the supported code artifacts (scripts, scripted REST, UI pages)
 * owned by an application scope and returns each with a reviewer routing key.
 * Consumed by the AI code review orchestrator (Phase 4) and any skill tools.
 */
export const CodeReviewArtifactCollector = ScriptInclude({
    $id: Now.ID['code_review_artifact_collector'],
    name: 'CodeReviewArtifactCollector',
    script: Now.include('../../server/script-includes/code-review-artifact-collector.js'),
    description:
        'Enumerates supported code artifacts owned by an application scope (scripts, scripted REST, UI pages) and returns each with a reviewer routing key (script / scripted_rest / ui_page).',
    accessibleFrom: 'package_private',
})
