import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Shared pre-scanner used by both reviewer gatherers.
 *
 * Runs cheap, deterministic regexes over the FULL untruncated source of every
 * code surface and classifies each hit as visible or hidden relative to the
 * truncated payload actually sent to the LLM. This closes the false-negative
 * gap identified as Finding E: a defect sitting past a truncation cap is still
 * detected and reported to the model.
 *
 * Also assigns a size tier (normal / oversized / skipped) so very large
 * artifacts are never silently dropped -- they become explicit findings.
 */
export const CodeReviewPreScanner = ScriptInclude({
    $id: Now.ID['code_review_pre_scanner'],
    name: 'CodeReviewPreScanner',
    script: Now.include('../../server/script-includes/code-review-pre-scanner.js'),
    description:
        'Regex pre-scan of full untruncated artifact source. Returns high-signal marker hits with visible/hidden classification relative to truncation caps, plus a size tier (normal, oversized, skipped). Shared by the script and widget gatherers.',
    accessibleFrom: 'public',
})
