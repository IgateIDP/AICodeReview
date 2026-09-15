/**
 * Code Review Worker — one paced tick of the async orchestrator.
 *
 * Runs every ~1 minute (and on Execute Now). Delegates to
 * CodeReviewOrchestrator.processNextBatch(), which enqueues any manually-inserted
 * "requested" runs, reviews one batch of pending queue rows, and finalises runs
 * whose queue has drained. Keeping each tick to a small batch avoids the
 * single-transaction ceiling that a whole-app review would otherwise hit.
 */
;(function () {
    try {
        var result = new CodeReviewOrchestrator().processNextBatch()
        gs.info('[CodeReviewWorker] ' + result)
    } catch (e) {
        gs.error('[CodeReviewWorker] failed: ' + e)
    }
})()
