import '@servicenow/sdk/global'
import { ScheduledScript } from '@servicenow/sdk/core'

/**
 * Code Review Worker — drives the asynchronous review pipeline.
 *
 * Every ~1 minute it calls CodeReviewOrchestrator.processNextBatch(): enqueue
 * requested runs, review one batch of pending artifacts, finalise drained runs.
 * Small batches keep each execution within one transaction, so whole-app reviews
 * (e.g. LOS ~112 artifacts) complete over successive ticks. Use "Execute Now" for
 * an immediate tick.
 */
export const codeReviewWorker = ScheduledScript({
    $id: Now.ID['code_review_worker'],
    name: 'Code Review Worker',
    script: Now.include('../../server/scheduled/code-review-worker.js'),
    frequency: 'periodically',
    executionInterval: { minutes: 1 },
    advanced: true,
})
