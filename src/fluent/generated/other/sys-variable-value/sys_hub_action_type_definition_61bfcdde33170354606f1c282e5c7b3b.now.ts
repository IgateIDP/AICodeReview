import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['a2bf0d1233570354606f1c282e5c7b08'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_action_type_definition',
        document_key: '61bfcdde33170354606f1c282e5c7b3b',
        order: 2,
        value: '{"version":"1.0","complexObjectSchema":{"FlowDesigner:FD92bf49128f5703543ffc4bae25ba2d3e":{"code":"Integer","code.$field_facets":{"SimpleMapFacet":"{\\"uiTypeLabel\\":\\"Integer\\",\\"read_only\\":\\"false\\",\\"hint\\":\\"\\",\\"uiType\\":\\"integer\\",\\"choiceOption\\":\\"\\",\\"default_value\\":\\"\\",\\"label\\":\\"Code\\",\\"action_error_output\\":\\"true\\",\\"mandatory\\":\\"false\\",\\"order\\":\\"1\\",\\"max_length\\":\\"40\\"}"},"message":"String","message.$field_facets":{"SimpleMapFacet":"{\\"uiTypeLabel\\":\\"String\\",\\"read_only\\":\\"false\\",\\"hint\\":\\"\\",\\"uiType\\":\\"string\\",\\"choiceOption\\":\\"\\",\\"default_value\\":\\"\\",\\"label\\":\\"Message\\",\\"action_error_output\\":\\"true\\",\\"mandatory\\":\\"false\\",\\"order\\":\\"2\\",\\"max_length\\":\\"4000\\"}"}},"FlowDesigner:FD92bf49128f5703543ffc4bae25ba2d3e.$type_facets":{"SimpleMapFacet":"{\\"sourceId\\":\\"\\",\\"choiceOption\\":\\"\\",\\"default_value\\":\\"\\",\\"label\\":\\"Action Status\\",\\"action_error_output\\":\\"true\\",\\"mandatory\\":\\"false\\",\\"uiUniqueId\\":\\"fdb78a29-007a-45c0-aedf-d77c266d465f\\",\\"uiTypeLabel\\":\\"Object\\",\\"co_type_name\\":\\"FD92bf49128f5703543ffc4bae25ba2d3e\\",\\"element_mapping_provider\\":\\"com.glide.flow_design.action.data.FlowDesignVariableMapper\\",\\"read_only\\":\\"false\\",\\"sourceUiUniqueId\\":\\"\\",\\"sourceType\\":\\"\\",\\"hint\\":\\"\\",\\"uiType\\":\\"object\\",\\"order\\":\\"3\\",\\"max_length\\":\\"65000\\"}"}},"complexObject":{"code":{"$cv":{"$c":"java.lang.String","$v":""}},"message":{"$cv":{"$c":"java.lang.String","$v":""}}},"serializationFormat":"JSON"}',
        variable: '16bf491233570354606f1c282e5c7bfa',
    },
})
Record({
    $id: Now.ID['06bf451233570354606f1c282e5c7b25'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_step_instance',
        document_key: '71bf811233570354606f1c282e5c7b65',
        order: 400,
        value: '35aa573fd7802200bdbaee5b5e610375',
        variable: 'f5e56d79b3101300176b051a16a8dce4',
    },
})
Record({
    $id: Now.ID['0ebf451233570354606f1c282e5c7b25'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_step_instance',
        document_key: '71bf811233570354606f1c282e5c7b65',
        order: 600,
        value: `(function execute(inputs, outputs) {
    var cleanInputs = {};
    var skillInputs = inputs.skill_inputs;

    // If skill_inputs is a JSON string, parse it first
    if (typeof skillInputs === 'string') {
        try {
            skillInputs = JSON.parse(skillInputs);
        } catch (e) {
            gs.warn('Failed to parse skill_inputs as JSON: ' + e.message);
            skillInputs = {};
        }
    }

    for (var key in skillInputs) {
        var val = skillInputs[key];

        if (val && typeof val === 'object') {
            if (val.table && val.sys_id) {
                // GlideRecord reference field
                cleanInputs[key] = {
                    tableName: val.table,
                    sysId: val.sys_id.toString(),
                    queryString: ''
                };
            } else if (val.hasOwnProperty('value') && val.hasOwnProperty('variableName')) {
                // Verbose skill input format — extract just the value
                cleanInputs[key] = val.value;
            } else {
                cleanInputs[key] = val;
            }
        } else {
            cleanInputs[key] = val;
        }
    }
    var capabilityId = "";
	if (global.JSUtil.notNil(inputs.skill_id)) {
		var skillConfigGr = new GlideRecord("sn_nowassist_skill_config");
		skillConfigGr.addQuery('skill_table', 'sys_one_extend_capability');
		skillConfigGr.addQuery('sys_id', inputs.skill_id);
		skillConfigGr.query();
		var skillId = "";
		if (skillConfigGr.next()) {
			skillId = skillConfigGr.getValue('skill_id') || "";
		}
		if (global.JSUtil.notNil(skillId)) {
			capabilityId = skillId;
		}
    }

    outputs.payload = {
        "executionRequests": [
        {
            "payload": JSON.stringify(cleanInputs),
            "meta": {
            "skillConfigId": inputs.skill_id
            },
            "capabilityId": capabilityId
        }
        ]
    }

})(inputs, outputs);`,
        variable: '71aa7f6647032200b4fad7527c9a719b',
    },
})
Record({
    $id: Now.ID['d2bf491233570354606f1c282e5c7b36'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_step_instance',
        document_key: 'cabf451233570354606f1c282e5c7bc3',
        order: 600,
        value: `(function execute(inputs, outputs) {

    var skillOutput = {};

    for (var key in inputs) {
        if (!inputs.hasOwnProperty(key)) continue;

        if (key === 'response') {
            try {
                var parsed = JSON.parse(inputs[key]);
                if (parsed && parsed.model_output) {
                    var result = typeof parsed.model_output === 'string'
                        ? JSON.parse(parsed.model_output)
                        : parsed.model_output;

                    skillOutput[key] = result;
                    Object.keys(result).forEach(function(resultKey) {
                        skillOutput[resultKey] = result[resultKey];
                    });
                } else {
                    skillOutput[key] = inputs[key];
                }
            } catch (e) {
                skillOutput[key] = inputs[key];
            }
        } else {
            skillOutput[key] = inputs[key];
        }
    }

    outputs.skill_output = skillOutput;
    
})(inputs, outputs);`,
        variable: '71aa7f6647032200b4fad7527c9a719b',
    },
})
Record({
    $id: Now.ID['dabf491233570354606f1c282e5c7b35'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_step_instance',
        document_key: 'cabf451233570354606f1c282e5c7bc3',
        order: 400,
        value: '35aa573fd7802200bdbaee5b5e610375',
        variable: 'f5e56d79b3101300176b051a16a8dce4',
    },
})
Record({
    $id: Now.ID['ffef899633570354606f1c282e5c7bf6'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_action_type_snapshot',
        document_key: '0fef419633570354606f1c282e5c7bf3',
        order: 2,
        value: '{"version":"1.0","complexObjectSchema":{"FlowDesigner:FDACTIONSTATUS":{"code":"Integer","code.$field_facets":{"SimpleMapFacet":"{\\"uiTypeLabel\\":\\"Integer\\",\\"read_only\\":\\"true\\",\\"hint\\":null,\\"uiType\\":\\"integer\\",\\"default_value\\":\\"\\",\\"action_error_output\\":\\"true\\",\\"label\\":\\"Code\\",\\"mandatory\\":\\"false\\",\\"order\\":\\"1\\",\\"max_length\\":\\"40\\"}"},"message":"String","message.$field_facets":{"SimpleMapFacet":"{\\"uiTypeLabel\\":\\"String\\",\\"read_only\\":\\"true\\",\\"hint\\":null,\\"uiType\\":\\"string\\",\\"default_value\\":null,\\"action_error_output\\":\\"true\\",\\"label\\":\\"Message\\",\\"mandatory\\":\\"false\\",\\"order\\":\\"2\\",\\"max_length\\":\\"4000\\"}"}},"FlowDesigner:FDACTIONSTATUS.$type_facets":{"SimpleMapFacet":"{\\"uiTypeLabel\\":\\"Object\\",\\"co_type_name\\":\\"FDACTIONSTATUS\\",\\"read_only\\":\\"true\\",\\"hint\\":null,\\"uiType\\":\\"object\\",\\"default_value\\":\\"\\",\\"label\\":\\"Action Status\\",\\"read_only_complex_object\\":\\"true\\",\\"mandatory\\":\\"false\\",\\"order\\":\\"1\\",\\"max_length\\":\\"0\\",\\"uiUniqueId\\":\\"8e3eb395-c990-4a7d-b8da-081a1acab7eb\\"}"}},"complexObject":{"code":{"$cv":{"$c":"java.lang.String","$v":""}},"message":{"$cv":{"$c":"java.lang.String","$v":""}}},"serializationFormat":"JSON"}',
        variable: '33ef499633570354606f1c282e5c7be3',
    },
})
Record({
    $id: Now.ID['d3ef459633570354606f1c282e5c7b69'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_step_instance',
        document_key: '17efc19633570354606f1c282e5c7bf1',
        order: 400,
        value: '35aa573fd7802200bdbaee5b5e610375',
        variable: 'f5e56d79b3101300176b051a16a8dce4',
    },
})
Record({
    $id: Now.ID['dbef459633570354606f1c282e5c7b69'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_step_instance',
        document_key: '17efc19633570354606f1c282e5c7bf1',
        order: 600,
        value: `(function execute(inputs, outputs) {
    var cleanInputs = {};
    var skillInputs = inputs.skill_inputs;

    // If skill_inputs is a JSON string, parse it first
    if (typeof skillInputs === 'string') {
        try {
            skillInputs = JSON.parse(skillInputs);
        } catch (e) {
            gs.warn('Failed to parse skill_inputs as JSON: ' + e.message);
            skillInputs = {};
        }
    }

    for (var key in skillInputs) {
        var val = skillInputs[key];

        if (val && typeof val === 'object') {
            if (val.table && val.sys_id) {
                // GlideRecord reference field
                cleanInputs[key] = {
                    tableName: val.table,
                    sysId: val.sys_id.toString(),
                    queryString: ''
                };
            } else if (val.hasOwnProperty('value') && val.hasOwnProperty('variableName')) {
                // Verbose skill input format — extract just the value
                cleanInputs[key] = val.value;
            } else {
                cleanInputs[key] = val;
            }
        } else {
            cleanInputs[key] = val;
        }
    }
    var capabilityId = "";
	if (global.JSUtil.notNil(inputs.skill_id)) {
		var skillConfigGr = new GlideRecord("sn_nowassist_skill_config");
		skillConfigGr.addQuery('skill_table', 'sys_one_extend_capability');
		skillConfigGr.addQuery('sys_id', inputs.skill_id);
		skillConfigGr.query();
		var skillId = "";
		if (skillConfigGr.next()) {
			skillId = skillConfigGr.getValue('skill_id') || "";
		}
		if (global.JSUtil.notNil(skillId)) {
			capabilityId = skillId;
		}
    }

    outputs.payload = {
        "executionRequests": [
        {
            "payload": JSON.stringify(cleanInputs),
            "meta": {
            "skillConfigId": inputs.skill_id
            },
            "capabilityId": capabilityId
        }
        ]
    }

})(inputs, outputs);`,
        variable: '71aa7f6647032200b4fad7527c9a719b',
    },
})
Record({
    $id: Now.ID['e7ef099633570354606f1c282e5c7bef'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_step_instance',
        document_key: '6fef859633570354606f1c282e5c7b5c',
        order: 600,
        value: `(function execute(inputs, outputs) {

    var skillOutput = {};

    for (var key in inputs) {
        if (!inputs.hasOwnProperty(key)) continue;

        if (key === 'response') {
            try {
                var parsed = JSON.parse(inputs[key]);
                if (parsed && parsed.model_output) {
                    var result = typeof parsed.model_output === 'string'
                        ? JSON.parse(parsed.model_output)
                        : parsed.model_output;

                    skillOutput[key] = result;
                    Object.keys(result).forEach(function(resultKey) {
                        skillOutput[resultKey] = result[resultKey];
                    });
                } else {
                    skillOutput[key] = inputs[key];
                }
            } catch (e) {
                skillOutput[key] = inputs[key];
            }
        } else {
            skillOutput[key] = inputs[key];
        }
    }

    outputs.skill_output = skillOutput;
    
})(inputs, outputs);`,
        variable: '71aa7f6647032200b4fad7527c9a719b',
    },
})
Record({
    $id: Now.ID['efef099633570354606f1c282e5c7bee'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_step_instance',
        document_key: '6fef859633570354606f1c282e5c7b5c',
        order: 400,
        value: '35aa573fd7802200bdbaee5b5e610375',
        variable: 'f5e56d79b3101300176b051a16a8dce4',
    },
})
Record({
    $id: Now.ID['b9bf411233570354606f1c282e5c7b39'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_action_input_action_instance',
        document_key: 'fdbf411233570354606f1c282e5c7b37',
        order: 1,
        value: '{{action.skill_config_id}}',
        variable: 'eec86a78870883102f3220ac8bbb3598',
    },
})
Record({
    $id: Now.ID['f5bf011233570354606f1c282e5c7bbd'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_action_input_action_instance',
        document_key: '35bf011233570354606f1c282e5c7bba',
        order: 1,
        value: '{{action.skill_config_id}}',
        variable: '5e585a7b7f255210f465c3b76d866595',
    },
})
Record({
    $id: Now.ID['56bf491233570354606f1c282e5c7bf9'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_action_input_action_instance',
        document_key: 'dabf491233570354606f1c282e5c7bf7',
        order: 1,
        value: '{{action.skill_config_id}}',
        variable: 'eec86a78870883102f3220ac8bbb3598',
    },
})
Record({
    $id: Now.ID['1befc19633570354606f1c282e5c7b73'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_action_input_action_instance',
        document_key: '5befc19633570354606f1c282e5c7b72',
        order: 1,
        value: '{{action.skill_config_id}}',
        variable: 'eec86a78870883102f3220ac8bbb3598',
    },
})
Record({
    $id: Now.ID['57ef819633570354606f1c282e5c7bed'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_action_input_action_instance',
        document_key: '17ef819633570354606f1c282e5c7bec',
        order: 1,
        value: '{{action.skill_config_id}}',
        variable: '5e585a7b7f255210f465c3b76d866595',
    },
})
Record({
    $id: Now.ID['ffef499633570354606f1c282e5c7b33'],
    table: 'sys_variable_value',
    data: {
        document: 'sys_hub_action_input_action_instance',
        document_key: '77ef499633570354606f1c282e5c7b32',
        order: 1,
        value: '{{action.skill_config_id}}',
        variable: 'eec86a78870883102f3220ac8bbb3598',
    },
})
