var CodeReviewOrchestrator = Class.create()

CodeReviewOrchestrator.prototype = {
    initialize: function () {
        this.APP_SCOPE_SYS_ID = '68e08f6c471b4bd0e9ddbf66706d4379'
        this.APP_SCOPE = 'x_rptp_ai_code_rev'
        this.RUN_TABLE = 'x_rptp_ai_code_rev_review_run'
        this.QUEUE_TABLE = 'x_rptp_ai_code_rev_queue'
        this.DEFAULT_MAX = 25 // sync run cap
        this.ENQUEUE_MAX = 500 // async enqueue cap (per run)
        this.BATCH_SIZE = 5 // artifacts processed per worker tick
    },

    /* -------------------------------------------------- shared helpers */

    _resolveSubflow: function () {
        var f = new GlideRecord('sys_hub_flow')
        f.addQuery('sys_scope', this.APP_SCOPE_SYS_ID)
        f.query()
        while (f.next()) {
            var intern = f.getValue('internal_name') || ''
            var nm = (f.getValue('name') || '').toLowerCase()
            if (intern.indexOf('review_one_artifact') > -1 || nm.indexOf('review one artifact') > -1) {
                return this.APP_SCOPE + '.' + intern
            }
        }
        return ''
    },

    _readOutput: function (outputs) {
        if (!outputs) return null
        if (outputs.skill_response !== undefined && outputs.skill_response !== null) {
            return outputs.skill_response
        }
        if (outputs.skill_out_json !== undefined) return outputs.skill_out_json
        return null
    },

    /** Invokes the subflow for one artifact and records its findings. */
    _reviewOne: function (scopedSubflow, runId, appSysId, sourceTable, sysId, name, writer) {
        try {
            var result = sn_fd.FlowAPI.getRunner()
                .subflow(scopedSubflow)
                .inForeground()
                .withInputs({
                    reviewer_type: this._reviewerType(sourceTable),
                    source_table: sourceTable,
                    artifact_sys_id: sysId,
                })
                .run()
            var skillResponse = this._readOutput(result ? result.getOutputs() : null)
            writer.recordReview(runId, appSysId, sourceTable, sysId, name, skillResponse)
            return true
        } catch (e) {
            writer.recordError(runId, appSysId, sourceTable, sysId, name, '' + e)
            return false
        }
    },

    /** sp_widget → widget reviewer; everything else → script reviewer. */
    _reviewerType: function (sourceTable) {
        return sourceTable === 'sp_widget' ? 'sp_widget' : 'script'
    },

    /* -------------------------------------------------- synchronous path */

    /**
     * Synchronous, batch-limited review — kept for small apps / testing.
     * For whole-app reviews use requestReview() + the scheduled worker.
     */
    run: function (appSysId, maxArtifacts) {
        if (!appSysId) return JSON.stringify({ error: 'appSysId is required' })
        var limit = parseInt(maxArtifacts, 10)
        if (isNaN(limit) || limit <= 0) limit = this.DEFAULT_MAX

        var scopedSubflow = this._resolveSubflow()
        if (!scopedSubflow) return JSON.stringify({ error: 'subflow_not_found' })

        var writer = new CodeReviewFindingWriter()
        var collector = new CodeReviewArtifactCollector()
        var runId = writer.startRun(appSysId)
        if (!runId) return JSON.stringify({ error: 'run_not_created' })

        var artifacts = collector.getArtifacts(appSysId)
        var reviewed = 0
        for (var i = 0; i < artifacts.length && reviewed < limit; i++) {
            this._reviewOne(scopedSubflow, runId, appSysId, artifacts[i].source_table, artifacts[i].sys_id, artifacts[i].name, writer)
            reviewed++
        }
        return writer.finalizeRun(runId, reviewed, 'complete')
    },

    /* -------------------------------------------------- asynchronous path */

    /**
     * Creates a run and enqueues its artifacts for the scheduled worker.
     * Returns the run sys_id. The review itself is performed asynchronously by
     * processNextBatch() (driven by the Code Review Worker scheduled job).
     *
     * @param {string} appSysId
     * @param {number} [maxArtifacts] - cap on artifacts enqueued (default ENQUEUE_MAX)
     */
    requestReview: function (appSysId, maxArtifacts) {
        if (!appSysId) return JSON.stringify({ error: 'appSysId is required' })
        var max = parseInt(maxArtifacts, 10)
        if (isNaN(max) || max <= 0) max = this.ENQUEUE_MAX

        var writer = new CodeReviewFindingWriter()
        var runId = writer.startRun(appSysId) // status = running
        if (!runId) return JSON.stringify({ error: 'run_not_created' })

        var enqueued = this._enqueue(runId, appSysId, max)
        return JSON.stringify({ run: runId, enqueued: enqueued })
    },

    /** Inserts one pending queue row per artifact (idempotent per run). */
    _enqueue: function (runId, appSysId, max) {
        // Guard against double-enqueue.
        var existing = new GlideAggregate(this.QUEUE_TABLE)
        existing.addQuery('review_run', runId)
        existing.addAggregate('COUNT')
        existing.query()
        if (existing.next() && parseInt(existing.getAggregate('COUNT'), 10) > 0) {
            return 0
        }

        var artifacts = new CodeReviewArtifactCollector().getArtifacts(appSysId)
        var count = 0
        for (var i = 0; i < artifacts.length && count < max; i++) {
            var a = artifacts[i]
            var q = new GlideRecord(this.QUEUE_TABLE)
            q.initialize()
            q.setValue('review_run', runId)
            q.setValue('application', appSysId)
            q.setValue('source_table', a.source_table)
            q.setValue('source_id', a.sys_id)
            q.setValue('artifact_name', a.name)
            q.setValue('reviewer_type', a.reviewer_type)
            q.setValue('state', 'pending')
            q.insert()
            count++
        }
        return count
    },

    /**
     * One worker tick. Called by the Code Review Worker scheduled job (and usable
     * via Execute Now). Enqueues any manually-inserted "requested" runs, processes
     * one batch of pending queue rows, and finalises runs whose queue is drained.
     * @returns {string} JSON summary of the tick.
     */
    processNextBatch: function () {
        var writer = new CodeReviewFindingWriter()
        var scopedSubflow = this._resolveSubflow()
        if (!scopedSubflow) return JSON.stringify({ error: 'subflow_not_found' })

        // 1. Auto-enqueue runs that were inserted manually (status = requested).
        var reqRuns = new GlideRecord(this.RUN_TABLE)
        reqRuns.addQuery('status', 'requested')
        reqRuns.query()
        var enqueuedRuns = 0
        while (reqRuns.next()) {
            var app = reqRuns.getValue('application')
            this._enqueue(reqRuns.getUniqueValue(), app, this.ENQUEUE_MAX)
            // Name runs created via the minimal "New Review" view (only Application set).
            if (!reqRuns.getValue('name')) {
                var appGr = new GlideRecord('sys_scope')
                var appName = appGr.get(app) ? appGr.getValue('name') : app
                reqRuns.setValue('name', 'Code review: ' + appName + ' (' + new GlideDateTime().getDisplayValue() + ')')
            }
            reqRuns.setValue('status', 'running')
            if (!reqRuns.getValue('started')) reqRuns.setValue('started', new GlideDateTime())
            reqRuns.update()
            enqueuedRuns++
        }

        // 2. Claim a batch of pending rows (concurrency guard: flip to processing first).
        var batch = []
        var pending = new GlideRecord(this.QUEUE_TABLE)
        pending.addQuery('state', 'pending')
        pending.orderBy('sys_created_on')
        pending.setLimit(this.BATCH_SIZE)
        pending.query()
        while (pending.next()) {
            pending.setValue('state', 'processing')
            pending.update()
            batch.push({
                queueId: pending.getUniqueValue(),
                run: pending.getValue('review_run'),
                app: pending.getValue('application'),
                table: pending.getValue('source_table'),
                sysId: pending.getValue('source_id'),
                name: pending.getValue('artifact_name'),
            })
        }

        // 3. Review each claimed artifact.
        var processed = 0
        for (var i = 0; i < batch.length; i++) {
            var b = batch[i]
            var ok = this._reviewOne(scopedSubflow, b.run, b.app, b.table, b.sysId, b.name, writer)
            var q = new GlideRecord(this.QUEUE_TABLE)
            if (q.get(b.queueId)) {
                q.setValue('state', ok ? 'done' : 'error')
                if (!ok) q.setValue('message', 'Subflow invocation failed')
                q.setValue('processed_on', new GlideDateTime())
                q.update()
            }
            processed++
        }

        // 4. Finalise runs whose queue is fully drained.
        var finalised = this._finalizeDrainedRuns(writer)

        return JSON.stringify({
            enqueued_runs: enqueuedRuns,
            processed: processed,
            finalised_runs: finalised,
        })
    },

    /** Finalises any 'running' run with no pending/processing queue rows left. */
    _finalizeDrainedRuns: function (writer) {
        var finalised = 0
        var runs = new GlideRecord(this.RUN_TABLE)
        runs.addQuery('status', 'running')
        runs.query()
        while (runs.next()) {
            var runId = runs.getUniqueValue()

            var outstanding = new GlideAggregate(this.QUEUE_TABLE)
            outstanding.addQuery('review_run', runId)
            outstanding.addQuery('state', 'IN', 'pending,processing')
            outstanding.addAggregate('COUNT')
            outstanding.query()
            var remaining = outstanding.next() ? parseInt(outstanding.getAggregate('COUNT'), 10) : 0
            if (remaining > 0) continue

            // Only finalise runs that actually have queue rows (i.e. async runs).
            var total = new GlideAggregate(this.QUEUE_TABLE)
            total.addQuery('review_run', runId)
            total.addAggregate('COUNT')
            total.query()
            var totalRows = total.next() ? parseInt(total.getAggregate('COUNT'), 10) : 0
            if (totalRows === 0) continue

            writer.finalizeRun(runId, totalRows, 'complete')
            finalised++
        }
        return finalised
    },

    type: 'CodeReviewOrchestrator',
}
