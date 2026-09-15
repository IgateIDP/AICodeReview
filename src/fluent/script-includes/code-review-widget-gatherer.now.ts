import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Fetches a Service Portal widget's six code surfaces (server script, client
 * script, template, CSS, link function, option schema) plus review context, for
 * consumption by the Service Portal Widget Reviewer GenAI Skill.
 *
 * Applies per-surface character caps because real widgets reach 58-65 KB across
 * their surfaces, which exceeds a usable LLM context.
 *
 * accessibleFrom: 'public' is required so the GenAI Skill's Script tool can
 * invoke it.
 */
export const CodeReviewWidgetGatherer = ScriptInclude({
    $id: Now.ID['code_review_widget_gatherer'],
    name: 'CodeReviewWidgetGatherer',
    script: Now.include('../../server/script-includes/code-review-widget-gatherer.js'),
    description:
        'Returns a Service Portal widget (sp_widget) source across all six code surfaces plus configuration context as JSON, with per-surface truncation caps, for the Service Portal Widget Reviewer GenAI Skill.',
    accessibleFrom: 'public',
})
