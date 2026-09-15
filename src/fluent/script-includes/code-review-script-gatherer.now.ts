import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Fetches a script artifact's source code plus review-relevant metadata for the
 * Script Reviewer GenAI Skill. Uses an allow-list of script tables and
 * GlideRecordSecure, since the table/sys_id come from skill input.
 *
 * accessibleFrom: 'public' is required so the GenAI Skill's Script tool can
 * invoke it.
 */
export const CodeReviewScriptGatherer = ScriptInclude({
    $id: Now.ID['code_review_script_gatherer'],
    name: 'CodeReviewScriptGatherer',
    script: Now.include('../../server/script-includes/code-review-script-gatherer.js'),
    description:
        'Returns a script artifact (Business Rule, Script Include, Client Script, UI Action) source code and review context as JSON, for consumption by the Script Reviewer GenAI Skill.',
    accessibleFrom: 'public',
})
