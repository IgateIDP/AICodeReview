var CodeReviewArtifactCollector = Class.create()

CodeReviewArtifactCollector.prototype = {
    initialize: function () {},

    /**
     * Map of source table -> reviewer routing key.
     * The orchestrator uses the routing key to decide which reviewer skill to call.
     */
    getTypeMap: function () {
        return {
            sys_script: 'script', // Business Rules
            sys_script_include: 'script', // Script Includes
            sys_script_client: 'script', // Client Scripts
            sys_ui_action: 'script', // UI Actions
            sys_ws_operation: 'scripted_rest', // Scripted REST resources
            sys_ui_page: 'ui_page', // UI Pages
        }
    },

    /**
     * Returns an array of artifacts owned by the given application scope.
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
            gr.query()
            while (gr.next()) {
                artifacts.push({
                    source_table: table,
                    sys_id: gr.getUniqueValue(),
                    name: gr.getValue('name') || gr.getDisplayValue(),
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
