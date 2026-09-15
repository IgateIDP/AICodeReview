var CodeReviewArtifactCollector = Class.create()

CodeReviewArtifactCollector.prototype = {
    initialize: function () {},

    /**
     * Map of source table -> reviewer routing key.
     * The orchestrator uses the routing key to decide which reviewer skill to call.
     *
     * 'script'    -> Script Code Reviewer. Covers the four script tables plus
     *                Scripted REST (operation_script) and UI Pages (html +
     *                client_script + processing_script), both folded in because
     *                only the rubric differs, not the gathering approach.
     * 'sp_widget' -> Service Portal Widget Reviewer. A separate skill: widgets
     *                have six code surfaces and an AngularJS/CSS rubric.
     */
    getTypeMap: function () {
        return {
            sys_script: 'script', // Business Rules
            sys_script_include: 'script', // Script Includes
            sys_script_client: 'script', // Client Scripts
            sys_ui_action: 'script', // UI Actions
            sys_ws_operation: 'script', // Scripted REST resources (folded in)
            sys_ui_page: 'script', // UI Pages (folded in, basic rubric only)
            sp_widget: 'sp_widget', // Service Portal Widgets (dedicated reviewer)
        }
    },

    /**
     * Returns an array of artifacts owned by the given application scope.
     *
     * Performance note: this reads ONLY sys_id and name. getDisplayValue() is
     * deliberately avoided because it forces the platform to load every column
     * of the row -- on sys_ui_page that pulled the heavy html / client_script /
     * processing_script fields just to resolve a label.
     *
     * @param {string} appScopeSysId - sys_id of the sys_scope (application) to enumerate.
     * @returns {Array} [{ source_table, sys_id, name, reviewer_type }]
     */
    getArtifacts: function (appScopeSysId) {
        var artifacts = []
        if (!appScopeSysId) {
            return artifacts
        }

        var typeMap = this.getTypeMap()
        for (var table in typeMap) {
            if (!typeMap.hasOwnProperty(table)) {
                continue
            }
            var reviewerType = typeMap[table]

            var gr = new GlideRecord(table)
            if (!gr.isValid()) {
                continue
            }
            gr.addQuery('sys_scope', appScopeSysId)
            gr.orderBy('name')
            gr.query()
            while (gr.next()) {
                var artifactName = gr.getValue('name')
                if (!artifactName) {
                    artifactName = '(unnamed ' + table + ')'
                }
                artifacts.push({
                    source_table: table,
                    sys_id: gr.getUniqueValue(),
                    name: artifactName,
                    reviewer_type: reviewerType,
                })
            }
        }
        return artifacts
    },

    /**
     * Convenience JSON-string form of getArtifacts, for callers (GlideAjax,
     * flow inputs) that need a serialized value.
     */
    getArtifactsJson: function (appScopeSysId) {
        return JSON.stringify(this.getArtifacts(appScopeSysId))
    },

    type: 'CodeReviewArtifactCollector',
}
