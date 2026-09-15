import { CrossScopePrivilege } from '@servicenow/sdk/core'

/**
 * Cross-scope read privileges required by CodeReviewArtifactCollector (and the
 * reviewer skills' gather tools) to enumerate/read code artifacts owned by other
 * scopes. Declared explicitly so the app does not rely on runtime auto-grant.
 *
 * status: 'requested' -> installs as pending; an admin approves them on the
 * instance. Switch to 'allowed' to pre-authorize without manual approval.
 */

export const cspReadSysScript = CrossScopePrivilege({
    $id: Now.ID['csp_read_sys_script'],
    status: 'requested',
    operation: 'read',
    targetName: 'sys_script',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

export const cspReadSysScriptInclude = CrossScopePrivilege({
    $id: Now.ID['csp_read_sys_script_include'],
    status: 'requested',
    operation: 'read',
    targetName: 'sys_script_include',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

export const cspReadSysScriptClient = CrossScopePrivilege({
    $id: Now.ID['csp_read_sys_script_client'],
    status: 'requested',
    operation: 'read',
    targetName: 'sys_script_client',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

export const cspReadSysUiAction = CrossScopePrivilege({
    $id: Now.ID['csp_read_sys_ui_action'],
    status: 'requested',
    operation: 'read',
    targetName: 'sys_ui_action',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

export const cspReadSysWsOperation = CrossScopePrivilege({
    $id: Now.ID['csp_read_sys_ws_operation'],
    status: 'requested',
    operation: 'read',
    targetName: 'sys_ws_operation',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

export const cspReadSysUiPage = CrossScopePrivilege({
    $id: Now.ID['csp_read_sys_ui_page'],
    status: 'requested',
    operation: 'read',
    targetName: 'sys_ui_page',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

/**
 * Read access to Service Portal widgets, required by CodeReviewWidgetGatherer
 * for the Service Portal Widget Reviewer skill.
 */
export const cspReadSpWidget = CrossScopePrivilege({
    $id: Now.ID['csp_read_sp_widget'],
    status: 'allowed',
    operation: 'read',
    targetName: 'sp_widget',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

/**
 * Scriptable API privilege required at runtime by CodeReviewScriptGatherer, which
 * uses GlideRecordSecure (rather than GlideRecord) because the table and sys_id it
 * reads come from GenAI Skill input and the content is returned to the caller.
 *
 * Confirmed empirically: the platform auto-granted
 * 'GlideRecordSecure.getValue' (targetType 'scriptable', operation 'execute')
 * the first time the gatherer ran. Declared here so unattended execution by the
 * Phase 4 orchestrator Flow does not depend on interactive auto-grant.
 *
 * NOTE: the platform grants these per method. If the gatherer is extended to use
 * additional GlideRecordSecure methods, matching entries may need to be added.
 */
export const cspExecuteGlideRecordSecureGetValue = CrossScopePrivilege({
    $id: Now.ID['csp_execute_gliderecordsecure_getvalue'],
    status: 'requested',
    operation: 'execute',
    targetName: 'GlideRecordSecure.getValue',
    targetScope: 'global',
    targetType: 'scriptable',
})

/**
 * Privileges required at runtime by CodeReviewOrchestrator, which reads the
 * subflow definition and invokes it via sn_fd.FlowAPI.getRunner(). Confirmed
 * empirically: the platform auto-granted each of these the first time the
 * orchestrator ran a review. Declared here so unattended/scheduled runs and
 * fresh installs do not depend on interactive auto-grant.
 */
export const cspReadSysHubFlow = CrossScopePrivilege({
    $id: Now.ID['csp_read_sys_hub_flow'],
    status: 'requested',
    operation: 'read',
    targetName: 'sys_hub_flow',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

export const cspExecScriptableFlowRunnerSubflow = CrossScopePrivilege({
    $id: Now.ID['csp_exec_flowrunner_subflow'],
    status: 'requested',
    operation: 'execute',
    targetName: 'ScriptableFlowRunner.subflow',
    targetScope: 'global',
    targetType: 'scriptable',
})

export const cspExecScriptableFlowRunnerInForeground = CrossScopePrivilege({
    $id: Now.ID['csp_exec_flowrunner_inforeground'],
    status: 'requested',
    operation: 'execute',
    targetName: 'ScriptableFlowRunner.inForeground',
    targetScope: 'global',
    targetType: 'scriptable',
})

export const cspExecScriptableFlowRunnerWithInputs = CrossScopePrivilege({
    $id: Now.ID['csp_exec_flowrunner_withinputs'],
    status: 'requested',
    operation: 'execute',
    targetName: 'ScriptableFlowRunner.withInputs',
    targetScope: 'global',
    targetType: 'scriptable',
})

export const cspExecScriptableFlowRunnerRun = CrossScopePrivilege({
    $id: Now.ID['csp_exec_flowrunner_run'],
    status: 'requested',
    operation: 'execute',
    targetName: 'ScriptableFlowRunner.run',
    targetScope: 'global',
    targetType: 'scriptable',
})

export const cspExecScopedGlideElement = CrossScopePrivilege({
    $id: Now.ID['csp_exec_scoped_glide_element'],
    status: 'requested',
    operation: 'execute',
    targetName: 'ScopedGlideElement',
    targetScope: 'global',
    targetType: 'scriptable',
})
