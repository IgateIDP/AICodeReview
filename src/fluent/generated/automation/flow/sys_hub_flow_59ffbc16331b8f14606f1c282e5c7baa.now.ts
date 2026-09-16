import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['59ffbc16331b8f14606f1c282e5c7baa'],
    table: 'sys_hub_flow',
    data: {
        access: 'public',
        acls: '',
        active: true,
        allow_high_security_roles: false,
        attributes:
            'browserActivatedIn=chrome,integrationActivatedIn=standalone,labelCacheCleanUpExecuted=true,timeFromCreateToActivate=91655000,viewActivatedIn=naturalLanguage',
        authored_on_release_version: 29000,
        callable_by_client_api: false,
        flow_priority: 'MEDIUM',
        internal_name: 'review_one_artifact',
        label_cache:
            '[{"name":"subflow.reviewer_type","label":"input➛reviewer_type","type":"string","base_type":"string","choices":[{"order":0.0}],"usedInstances":{"1479606c-97af-491b-9152-00bd603df60f":["condition"]},"attributes":{"sourceId":"","sourceUiUniqueId":"","sourceType":"","uiUniqueId":"bbf21cd4-2e9a-46d4-a832-6b97a1521ed2"}},{"name":"flow_variable.skill_out","label":"Flow Variables➛skill_out","reference":"","reference_display":"","type":"string","base_type":"string","column_name":"","usedInstances":{"bcaa428c-c532-4592-8e7a-3253d2ab25d9":["skill_response-0"]},"attributes":{"element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiType":"string","uiUniqueId":"b51f978e-05fa-41c4-806f-f81fb977139d","sourceUiUniqueId":"","sourceType":"","sourceId":""}},{"name":"subflow.artifact_sys_id","label":"input➛artifact_sys_id","reference":"","reference_display":"","type":"string","base_type":"string","column_name":"","usedInstances":{"dc223aa6-02a4-461f-9c27-35bd345b2c7a":["widgetsysid"],"f785895b-59a1-4b02-ab86-962f19ccd646":["artifactsysid"],"a97bec99-c85d-4c9e-ab6f-367d28ec50fb":["artifactsysid"],"2f0db8c5-87f9-461a-87b1-3d9cfb83c1fc":["widgetsysid"]},"attributes":{"uiType":"string","uiTypeLabel":"String","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiUniqueId":"c26a3349-ab4e-48fb-a013-cd65926c8f8e","sourceUiUniqueId":"","sourceType":"","sourceId":""}},{"name":"a97bec99-c85d-4c9e-ab6f-367d28ec50fb.skill_output","label":"5 - Copy of Execute an AI skill➛Skill Output","reference_display":"Skill Output","type":"object","base_type":"object","usedInstances":{},"attributes":{"element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","dynamic":"true","uiUniqueId":"17e3aee3-948b-481b-bb4e-ed3fb992d91a"}},{"name":"a97bec99-c85d-4c9e-ab6f-367d28ec50fb.output","label":"5 - Copy of Execute an AI skill➛output","reference_display":"output","type":"json","base_type":"json","usedInstances":{"1d4f189f-9893-461b-ae3b-e4cf5d39fc34":["skill_out_json-1"]},"attributes":{"uiType":"json","uiTypeLabel":"JSON","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiUniqueId":"244fe8d3-5188-48b6-9c43-dd29c9393918"}},{"name":"flow_variable.skill_out_json","label":"Flow Variables➛skill_out_json","reference":"","reference_display":"","type":"object","base_type":"object","column_name":"","usedInstances":{"2973dd78-a014-499c-b5bc-5678c6c68f54":["skill_response-0"]},"attributes":{"uiType":"object","uiTypeLabel":"Object","co_type_name":"","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiUniqueId":"5463285a-d3a8-47fe-8116-50222cfca8a6","sourceUiUniqueId":"","sourceType":"","sourceId":""}},{"name":"2f0db8c5-87f9-461a-87b1-3d9cfb83c1fc.output","label":"2 - Copy of Execute an AI skill➛output","type":"json","base_type":"json","usedInstances":{"927321a5-33d8-4e42-a893-2b5a9a2ee951":["skill_out_json-0"]},"attributes":{"uiTypeLabel":"JSON","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiType":"json","uiUniqueId":"244fe8d3-5188-48b6-9c43-dd29c9393918"}}]',
        master_snapshot: '501449d633df8f14606f1c282e5c7bb5',
        name: 'Review One Artifact',
        pre_compiled: false,
        run_as: 'system',
        run_with_roles: '',
        sc_callable: false,
        show_draft_actions: false,
        show_triggered_flows: false,
        status: 'published',
        sys_domain: 'global',
        sys_domain_path: '/',
        type: 'subflow',
        version: '2',
        latest_snapshot: '501449d633df8f14606f1c282e5c7bb5',
        compiler_build: 'glide-australia-02-11-2026__patch5w37-09-04-2026_09-08-2026_1754.zip',
    },
})
Record({
    $id: Now.ID['95ffbc16331b8f14606f1c282e5c7baf'],
    table: 'sys_flow_cat_variable_model',
    data: {
        id: '59ffbc16331b8f14606f1c282e5c7baa',
        name: 'Review One Artifact',
    },
})
Record({
    $id: Now.ID['901449d633df8f14606f1c282e5c7bb7'],
    table: 'sys_flow_cat_variable_model',
    data: {
        id: '501449d633df8f14606f1c282e5c7bb5',
        name: 'Review One Artifact',
    },
})
Record({
    $id: Now.ID['11608552335b8f14606f1c282e5c7b4b'],
    table: 'sys_hub_flow_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String,uiUniqueId=c26a3349-ab4e-48fb-a013-cd65926c8f8e',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'artifact_sys_id',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'artifact_sys_id',
        mandatory: 'false',
        max_length: '65000',
        model: '59ffbc16331b8f14606f1c282e5c7baa',
        model_id: '59ffbc16331b8f14606f1c282e5c7baa',
        model_table: 'sys_hub_flow',
        name: 'var__m_sys_hub_flow_input_59ffbc16331b8f14606f1c282e5c7baa',
        order: '3',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['996045de331b8f14606f1c282e5c7b88'],
    table: 'sys_hub_flow_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String,uiUniqueId=bbf21cd4-2e9a-46d4-a832-6b97a1521ed2',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'reviewer_type',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'reviewer_type',
        mandatory: 'false',
        max_length: '65000',
        model: '59ffbc16331b8f14606f1c282e5c7baa',
        model_id: '59ffbc16331b8f14606f1c282e5c7baa',
        model_table: 'sys_hub_flow',
        name: 'var__m_sys_hub_flow_input_59ffbc16331b8f14606f1c282e5c7baa',
        order: '1',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['d5608552335b8f14606f1c282e5c7b51'],
    table: 'sys_hub_flow_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String,uiUniqueId=4cf9140c-c66f-4a4d-a92a-a7157855bf58',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'source_table',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'source_table',
        mandatory: 'false',
        max_length: '65000',
        model: '59ffbc16331b8f14606f1c282e5c7baa',
        model_id: '59ffbc16331b8f14606f1c282e5c7baa',
        model_table: 'sys_hub_flow',
        name: 'var__m_sys_hub_flow_input_59ffbc16331b8f14606f1c282e5c7baa',
        order: '2',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['101489d633df8f14606f1c282e5c7b1d'],
    table: 'sys_hub_flow_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String,uiUniqueId=bbf21cd4-2e9a-46d4-a832-6b97a1521ed2',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'reviewer_type',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'reviewer_type',
        mandatory: 'false',
        max_length: '65000',
        model: '501449d633df8f14606f1c282e5c7bb5',
        model_id: '501449d633df8f14606f1c282e5c7bb5',
        model_table: 'sys_hub_flow_snapshot',
        name: 'var__m_sys_hub_flow_input_501449d633df8f14606f1c282e5c7bb5',
        order: '1',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['1c1489d633df8f14606f1c282e5c7bc7'],
    table: 'sys_hub_flow_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String,uiUniqueId=4cf9140c-c66f-4a4d-a92a-a7157855bf58',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'source_table',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'source_table',
        mandatory: 'false',
        max_length: '65000',
        model: '501449d633df8f14606f1c282e5c7bb5',
        model_id: '501449d633df8f14606f1c282e5c7bb5',
        model_table: 'sys_hub_flow_snapshot',
        name: 'var__m_sys_hub_flow_input_501449d633df8f14606f1c282e5c7bb5',
        order: '2',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['5014c9d633df8f14606f1c282e5c7bf2'],
    table: 'sys_hub_flow_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String,uiUniqueId=c26a3349-ab4e-48fb-a013-cd65926c8f8e',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'artifact_sys_id',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'artifact_sys_id',
        mandatory: 'false',
        max_length: '65000',
        model: '501449d633df8f14606f1c282e5c7bb5',
        model_id: '501449d633df8f14606f1c282e5c7bb5',
        model_table: 'sys_hub_flow_snapshot',
        name: 'var__m_sys_hub_flow_input_501449d633df8f14606f1c282e5c7bb5',
        order: '3',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['6aa00d1a335b8f14606f1c282e5c7b51'],
    table: 'sys_hub_flow_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'co_type_name=FD4a282592ef93c354cd1e642ee9c359fd,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,is_scriptable=true,pwd2droppable=true,sourceType=input,sourceUiUniqueId=5463285a-d3a8-47fe-8116-50222cfca8a6,uiType=object,uiTypeLabel=Object,uiUniqueId=4719706b-e76a-4671-b6d7-35562508c6eb',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_response',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'skill_response',
        mandatory: 'false',
        max_length: '65000',
        model: '59ffbc16331b8f14606f1c282e5c7baa',
        model_id: '59ffbc16331b8f14606f1c282e5c7baa',
        model_table: 'sys_hub_flow',
        name: 'var__m_sys_hub_flow_output_59ffbc16331b8f14606f1c282e5c7baa',
        order: '1',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['28140dd633df8f14606f1c282e5c7be1'],
    table: 'sys_hub_flow_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'co_type_name=FD7a28e992d393c35456a79a64f64861b0,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,is_scriptable=true,pwd2droppable=true,sourceType=input,sourceUiUniqueId=5463285a-d3a8-47fe-8116-50222cfca8a6,uiType=object,uiTypeLabel=Object,uiUniqueId=4719706b-e76a-4671-b6d7-35562508c6eb',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_response',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'skill_response',
        mandatory: 'false',
        max_length: '65000',
        model: '501449d633df8f14606f1c282e5c7bb5',
        model_id: '501449d633df8f14606f1c282e5c7bb5',
        model_table: 'sys_hub_flow_snapshot',
        name: 'var__m_sys_hub_flow_output_501449d633df8f14606f1c282e5c7bb5',
        order: '1',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['562309de335f8f14606f1c282e5c7be4'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: '6f73455a339f8f14606f1c282e5c7bb8',
        flow: '59ffbc16331b8f14606f1c282e5c7baa',
        flow_variables_assigned: 'skill_out_json',
        logic_definition: '4f787d1e0f9b0010ecf0cc52ff767ea0',
        order: '3',
        parent_ui_id: '1479606c-97af-491b-9152-00bd603df60f',
        ui_id: '927321a5-33d8-4e42-a893-2b5a9a2ee951',
        values: 'H4sIAAAAAAAA/+1VTU/jMBD9Lz43VT6a1OWGQEhIu4u0sFxWKJrYY2pw42A7QLfqf99xk7YIdi97XHGz33zkvTceZcNsH7o++Bt76r2+b9nJz7sJ023E6LxhWrITNsN5KhZlXhRlw1U2q9JKZSLnOZZi3sw4m7AWVkiZ/lEbU1PT+sHblvBnMH0MbDa5SmXDRZnwuVoksyoDOjVZUsiFUA0vRKbEdKCz3VKl1L4zsL795wZiqY10OGrqwBHFgI6dbN6FdhpJS4mlxKLIFC/KdxpTRQ0NNGj+JPJv4sO6i7htHlCE8f5lbHK1B62TkVQ2YfgasJVIbBQYjxO2glZCsG59QByCvGrNEVjqNlA3FpNfvf5F36vKNE1jqkKSKHAIH671aOwAq3MIcB1cL0LvxlSxtFqgH8yRqKA34ewtNiRcdUGTzF1JgMbsq63pV+23wRJ2aLCfIyG9JxLYRa2R/KhEXS/ty/c9ywvd7mwZg8YKMIcbhOB004fIZ8N6ffPO5wH54LSwdZxAPY7r4lxgzqtykTfZohA08xzpcfOMS5lDOp9LqkGDK2JZr6DrdHtfd84+6x0zarea3hu6TJWxL6QoLtAURHRlSnOD6QXh5zv4FpyOFn2lNlQcKf5o9VOPl/Ht0Wsrcl5CIgvgyWyuMOFZViVlmue5UAI4VGw7YX7tzwx4fzSXplo/9dGawerR1HqYSywRTnfhlEg94+jf9i6u5cDnc8k/l/xzyf/TJZcotCeeN5HU5f6fHgNrckeLt9CLdY9R4RHb/gYtefE9HQgAAA==',
    },
})
Record({
    $id: Now.ID['8bb0c592331b8f14606f1c282e5c7bf9'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: '0fb0c592331b8f14606f1c282e5c7bf7',
        flow: '59ffbc16331b8f14606f1c282e5c7baa',
        logic_definition: 'af4e1945c3e232002841b63b12d3ae3e',
        order: '1',
        ui_id: '1479606c-97af-491b-9152-00bd603df60f',
        values: 'H4sIAAAAAAAA/+1VTY/TMBT8K5XPUZQ024rtbdXVSkjASrRaDrCKXmyntXDs4I92Q9T/znM+2ootggqO3OLxe88zk3HSEu1d7Z1d6ztrxUaRxefniAgVMHxuiYKKkwWhWjHhhFYkIjuQPmBta31RSr2PDd8Jvucmd03ND4cvPkkyZut8L9iGO2xhwtYSmqfrO+lWSGb4QKwGg3wcN2TR/rQlGA6+hVk5S5MZzabzbJok0zc3aTHPinTKMuA3cxwooeASS5dnii6IDHwQss4ItRnW74bW1QhqwwKVaRIR/uK4YhxJlCAtj0gFioHTpiELZzwChgN7VLI5VmyFcjiNhNoXK77zMClJQmXJURfl/e5xmQ829nB5Dw6QiqfOm6GUbrWg3PaOMF6Cl255jvUFj3WnsmtxUMixW0tfqQ+9GeQ4YHxriHiLJHgdlAbug5BytdX7jyPLB6E6V4ZNqSnI4woceld4F/i0hEte4aC8grpGR/Pa6J3ompFLFW8kLuKQEzw0pDMGGojHaCzED4jfd/ATGBFUvMcx2IxZsLmlRtSjtu5wcoiIbexSgrUnjWhu/s0Hhr3iQVve2xNaukF3ePCODzIO0et7kXfA6XKsMS8TYSerOv/0i1twqeS6uJcJlOktTS/HHbJLcZ/0KX4d+lHBNclPf5P8Afmj6M9m/5P/18kPNAuwgubdNxzHhY/PP4z+c4h4f+jRbCosclsH7O345wgbDSZK0HNor83XoOqEHX4Aeh5PcIMGAAA=',
    },
})
Record({
    $id: Now.ID['984345da335f8f14606f1c282e5c7b07'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: 'e773455a339f8f14606f1c282e5c7bbf',
        flow: '59ffbc16331b8f14606f1c282e5c7baa',
        flow_variables_assigned: 'skill_out,skill_out_json',
        logic_definition: '4f787d1e0f9b0010ecf0cc52ff767ea0',
        order: '6',
        parent_ui_id: '468236cc-39ec-468f-a9cf-92c2b9b2f388',
        ui_id: '1d4f189f-9893-461b-ae3b-e4cf5d39fc34',
        values: 'H4sIAAAAAAAA/+1XXU/bMBT9L35uqnzH4Q2BkJC2IQ3Gy4Qix76mBjcJsQN0Vf/7rpsPWGESG9O0SX2rj33tc459epU1qTvbdNZc1IfGqOuKHHy9mhFVOQx/r4kS5IDEkPk8T8IoSkoqgzj1UxnwkIaQ8KyMKZmRii0BV5pbpXWBmyJ0z3TnsPWa5VkJPM89ThPhxTwHj5Wp9KI0EyEFnviynE+lePZmg/VCmUaz1eU7t+ELpUULg7SGtcjUQksO1jtTb5WqWQl6R+sr8u2q2UK2VdX1MP4wlJ6PYN0KRyWcEXi0UAlADpJpAzOyZJVgtm5XE9ICE2eVfgIWqrK4G3GLH436huelie/7bqkEFMahn56GxWBqD8tjZhly6bjt2mEpX9SKg+ktESBZp+3Rc6xfcNZYVVd9iWWlHqtr3S2rT70bZNpgvENEOoMkoHFaHflBiTxf1A+fR5YnqtraMkzqmjM9jZhF88rOOj5r0qmLHZ975IXToGGJJxZL1jSIFE1b36vtKUh6Ob/WOJhLXT8gO5eEOeNO4RzvgM1PED/ewpesVU7uR9wGi91xXyp118Gpez1lEsg8o+D5iWReHPDYo/iAPEkDWeZZFkS5IJsZMStzpJkxT0bhDRV3nZPZ2zYYVPQeuxLeqsYeIql7GLzYzIZ84uNMIBEQRYGkUbLzaH35ygMtbgxu/cshfXc8fzuYb9D4IpijyJ+JHyJalzfA7U5Ez0ZwiGiwj+h7Izr5/GNEJ6d5XbgbKIbrOjnmENI0ycMyyCOOdx4C/iPTgAoRMj/LxN+KNb62KKQJ80TEqBdnEjwaBKmX+GEYcskZZekfjPWVi2XPZ9+E9034P0r4vgnvm/C+Cf/TEd034Tc3YQFcGeR54Uidjt/EbmKF7ij+HHqo21un8AnbfAcOJ019XQ8AAA==',
    },
})
Record({
    $id: Now.ID['e5710d1a335b8f14606f1c282e5c7bf8'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: '65710d1a335b8f14606f1c282e5c7bf7',
        comment: 'Type is script',
        connected_to: '1479606c-97af-491b-9152-00bd603df60f',
        flow: '59ffbc16331b8f14606f1c282e5c7baa',
        logic_definition: '1f781bf3c32232002841b63b12d3aee6',
        order: '4',
        ui_id: '468236cc-39ec-468f-a9cf-92c2b9b2f388',
        values: 'H4sIAAAAAAAA/6tWyi8tKSgtKQ7JdywuzkzPU7KKjtVRyswDiUHYZYlFmYlJOalQbkpqcmZxZn5eCEjME0ldSmVeYm5mMrJQeX5RdlpOfjlCrBYAD1ouqHEAAAA=',
    },
})
Record({
    $id: Now.ID['34148dd633df8f14606f1c282e5c7bbd'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: 'e773455a339f8f14606f1c282e5c7bbf',
        flow: '501449d633df8f14606f1c282e5c7bb5',
        flow_variables_assigned: 'skill_out,skill_out_json',
        logic_definition: '4f787d1e0f9b0010ecf0cc52ff767ea0',
        order: '6',
        parent_ui_id: '468236cc-39ec-468f-a9cf-92c2b9b2f388',
        ui_id: '1d4f189f-9893-461b-ae3b-e4cf5d39fc34',
        values: 'H4sIAAAAAAAA/+1XXU/bMBT9L35uqnzH4Q2BkJC2IQ3Gy4Qix76mBjcJsQN0Vf/7rpsPWGESG9O0SX2rj33tc459epU1qTvbdNZc1IfGqOuKHHy9mhFVOQx/r4kS5IDEkPk8T8IoSkoqgzj1UxnwkIaQ8KyMKZmRii0BV5pbpXWBmyJ0z3TnsPWa5VkJPM89ThPhxTwHj5Wp9KI0EyEFnviynE+lePZmg/VCmUaz1eU7t+ELpUULg7SGtcjUQksO1jtTb5WqWQl6R+sr8u2q2UK2VdX1MP4wlJ6PYN0KRyWcEXi0UAlADpJpAzOyZJVgtm5XE9ICE2eVfgIWqrK4G3GLH436huelie/7bqkEFMahn56GxWBqD8tjZhly6bjt2mEpX9SKg+ktESBZp+3Rc6xfcNZYVVd9iWWlHqtr3S2rT70bZNpgvENEOoMkoHFaHflBiTxf1A+fR5YnqtraMkzqmjM9jZhF88rOOj5r0qmLHZ975IXToGGJJxZL1jSIFE1b36vtKUh6Ob/WOJhLXT8gO5eEOeNO4RzvgM1PED/ewpesVU7uR9wGi91xXyp118Gpez1lEsg8o+D5iWReHPDYo/iAPEkDWeZZFkS5IJsZMStzpJkxT0bhDRV3nZPZ2zYYVPQeuxLeqsYeIql7GLzYzIZ84uNMIBEQRYGkUbLzaH35ygMtbgxu/cshfXc8fzuYb9D4IpijyJ+JHyJalzfA7U5Ez0ZwiGiwj+h7Izr5/GNEJ6d5XbgbKIbrOjnmENI0ycMyyCOOdx4C/iPTgAoRMj/LxN+KNb62KKQJ80TEqBdnEjwaBKmX+GEYcskZZekfjPWVi2XPZ9+E9034P0r4vgnvm/C+Cf/TEd034Tc3YQFcGeR54Uidjt/EbmKF7ij+HHqo21un8AnbfAcOJ019XQ8AAA==',
    },
})
Record({
    $id: Now.ID['a0148dd633df8f14606f1c282e5c7bba'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: '6f73455a339f8f14606f1c282e5c7bb8',
        flow: '501449d633df8f14606f1c282e5c7bb5',
        flow_variables_assigned: 'skill_out_json',
        logic_definition: '4f787d1e0f9b0010ecf0cc52ff767ea0',
        order: '3',
        parent_ui_id: '1479606c-97af-491b-9152-00bd603df60f',
        ui_id: '927321a5-33d8-4e42-a893-2b5a9a2ee951',
        values: 'H4sIAAAAAAAA/+1VTU/jMBD9Lz43VT6a1OWGQEhIu4u0sFxWKJrYY2pw42A7QLfqf99xk7YIdi97XHGz33zkvTceZcNsH7o++Bt76r2+b9nJz7sJ023E6LxhWrITNsN5KhZlXhRlw1U2q9JKZSLnOZZi3sw4m7AWVkiZ/lEbU1PT+sHblvBnMH0MbDa5SmXDRZnwuVoksyoDOjVZUsiFUA0vRKbEdKCz3VKl1L4zsL795wZiqY10OGrqwBHFgI6dbN6FdhpJS4mlxKLIFC/KdxpTRQ0NNGj+JPJv4sO6i7htHlCE8f5lbHK1B62TkVQ2YfgasJVIbBQYjxO2glZCsG59QByCvGrNEVjqNlA3FpNfvf5F36vKNE1jqkKSKHAIH671aOwAq3MIcB1cL0LvxlSxtFqgH8yRqKA34ewtNiRcdUGTzF1JgMbsq63pV+23wRJ2aLCfIyG9JxLYRa2R/KhEXS/ty/c9ywvd7mwZg8YKMIcbhOB004fIZ8N6ffPO5wH54LSwdZxAPY7r4lxgzqtykTfZohA08xzpcfOMS5lDOp9LqkGDK2JZr6DrdHtfd84+6x0zarea3hu6TJWxL6QoLtAURHRlSnOD6QXh5zv4FpyOFn2lNlQcKf5o9VOPl/Ht0Wsrcl5CIgvgyWyuMOFZViVlmue5UAI4VGw7YX7tzwx4fzSXplo/9dGawerR1HqYSywRTnfhlEg94+jf9i6u5cDnc8k/l/xzyf/TJZcotCeeN5HU5f6fHgNrckeLt9CLdY9R4RHb/gYtefE9HQgAAA==',
    },
})
Record({
    $id: Now.ID['ac148dd633df8f14606f1c282e5c7bbb'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: '65710d1a335b8f14606f1c282e5c7bf7',
        comment: 'Type is script',
        connected_to: '1479606c-97af-491b-9152-00bd603df60f',
        flow: '501449d633df8f14606f1c282e5c7bb5',
        logic_definition: '1f781bf3c32232002841b63b12d3aee6',
        order: '4',
        ui_id: '468236cc-39ec-468f-a9cf-92c2b9b2f388',
        values: 'H4sIAAAAAAAA/6tWyi8tKSgtKQ7JdywuzkzPU7KKjtVRyswDiUHYZYlFmYlJOalQbkpqcmZxZn5eCEjME0ldSmVeYm5mMrJQeX5RdlpOfjlCrBYAD1ouqHEAAAA=',
    },
})
Record({
    $id: Now.ID['ec148dd633df8f14606f1c282e5c7b47'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: '0fb0c592331b8f14606f1c282e5c7bf7',
        flow: '501449d633df8f14606f1c282e5c7bb5',
        logic_definition: 'af4e1945c3e232002841b63b12d3ae3e',
        order: '1',
        ui_id: '1479606c-97af-491b-9152-00bd603df60f',
        values: 'H4sIAAAAAAAA/+1VTY/TMBT8K5XPUZQ024rtbdXVSkjASrRaDrCKXmyntXDs4I92Q9T/znM+2ootggqO3OLxe88zk3HSEu1d7Z1d6ztrxUaRxefniAgVMHxuiYKKkwWhWjHhhFYkIjuQPmBta31RSr2PDd8Jvucmd03ND4cvPkkyZut8L9iGO2xhwtYSmqfrO+lWSGb4QKwGg3wcN2TR/rQlGA6+hVk5S5MZzabzbJok0zc3aTHPinTKMuA3cxwooeASS5dnii6IDHwQss4ItRnW74bW1QhqwwKVaRIR/uK4YhxJlCAtj0gFioHTpiELZzwChgN7VLI5VmyFcjiNhNoXK77zMClJQmXJURfl/e5xmQ829nB5Dw6QiqfOm6GUbrWg3PaOMF6Cl255jvUFj3WnsmtxUMixW0tfqQ+9GeQ4YHxriHiLJHgdlAbug5BytdX7jyPLB6E6V4ZNqSnI4woceld4F/i0hEte4aC8grpGR/Pa6J3ompFLFW8kLuKQEzw0pDMGGojHaCzED4jfd/ATGBFUvMcx2IxZsLmlRtSjtu5wcoiIbexSgrUnjWhu/s0Hhr3iQVve2xNaukF3ePCODzIO0et7kXfA6XKsMS8TYSerOv/0i1twqeS6uJcJlOktTS/HHbJLcZ/0KX4d+lHBNclPf5P8Afmj6M9m/5P/18kPNAuwgubdNxzHhY/PP4z+c4h4f+jRbCosclsH7O345wgbDSZK0HNor83XoOqEHX4Aeh5PcIMGAAA=',
    },
})
Record({
    $id: Now.ID['4e70c952335b8f14606f1c282e5c7b48'],
    table: 'sys_hub_flow_variable',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String,uiUniqueId=b51f978e-05fa-41c4-806f-f81fb977139d',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_out',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'skill_out',
        mandatory: 'false',
        max_length: '65000',
        model: '59ffbc16331b8f14606f1c282e5c7baa',
        model_id: '59ffbc16331b8f14606f1c282e5c7baa',
        model_table: 'sys_hub_flow',
        name: 'var__m_sys_hub_flow_variable_59ffbc16331b8f14606f1c282e5c7baa',
        order: '2',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['28144dd633df8f14606f1c282e5c7b81'],
    table: 'sys_hub_flow_variable',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String,uiUniqueId=b51f978e-05fa-41c4-806f-f81fb977139d',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_out',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'skill_out',
        mandatory: 'false',
        max_length: '65000',
        model: '501449d633df8f14606f1c282e5c7bb5',
        model_id: '501449d633df8f14606f1c282e5c7bb5',
        model_table: 'sys_hub_flow_snapshot',
        name: 'var__m_sys_hub_flow_variable_501449d633df8f14606f1c282e5c7bb5',
        order: '2',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['501449d633df8f14606f1c282e5c7bb5'],
    table: 'sys_hub_flow_snapshot',
    data: {
        access: 'public',
        active: 'true',
        allow_high_security_roles: 'false',
        attributes:
            'browserActivatedIn=chrome,integrationActivatedIn=standalone,labelCacheCleanUpExecuted=true,viewActivatedIn=naturalLanguage',
        authored_on_release_version: '29000',
        callable_by_client_api: 'false',
        flow_priority: 'MEDIUM',
        internal_name: 'review_one_artifact',
        label_cache:
            '[{"name":"subflow.reviewer_type","label":"input➛reviewer_type","type":"string","base_type":"string","choices":[{"order":0.0}],"usedInstances":{"1479606c-97af-491b-9152-00bd603df60f":["condition"]},"attributes":{"sourceId":"","sourceUiUniqueId":"","sourceType":"","uiUniqueId":"bbf21cd4-2e9a-46d4-a832-6b97a1521ed2"}},{"name":"flow_variable.skill_out","label":"Flow Variables➛skill_out","reference":"","reference_display":"","type":"string","base_type":"string","column_name":"","usedInstances":{"bcaa428c-c532-4592-8e7a-3253d2ab25d9":["skill_response-0"]},"attributes":{"element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiType":"string","uiUniqueId":"b51f978e-05fa-41c4-806f-f81fb977139d","sourceUiUniqueId":"","sourceType":"","sourceId":""}},{"name":"subflow.artifact_sys_id","label":"input➛artifact_sys_id","reference":"","reference_display":"","type":"string","base_type":"string","column_name":"","usedInstances":{"dc223aa6-02a4-461f-9c27-35bd345b2c7a":["widgetsysid"],"f785895b-59a1-4b02-ab86-962f19ccd646":["artifactsysid"],"a97bec99-c85d-4c9e-ab6f-367d28ec50fb":["artifactsysid"],"2f0db8c5-87f9-461a-87b1-3d9cfb83c1fc":["widgetsysid"]},"attributes":{"uiType":"string","uiTypeLabel":"String","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiUniqueId":"c26a3349-ab4e-48fb-a013-cd65926c8f8e","sourceUiUniqueId":"","sourceType":"","sourceId":""}},{"name":"a97bec99-c85d-4c9e-ab6f-367d28ec50fb.skill_output","label":"5 - Copy of Execute an AI skill➛Skill Output","reference_display":"Skill Output","type":"object","base_type":"object","usedInstances":{},"attributes":{"element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","dynamic":"true","uiUniqueId":"17e3aee3-948b-481b-bb4e-ed3fb992d91a"}},{"name":"a97bec99-c85d-4c9e-ab6f-367d28ec50fb.output","label":"5 - Copy of Execute an AI skill➛output","reference_display":"output","type":"json","base_type":"json","usedInstances":{"1d4f189f-9893-461b-ae3b-e4cf5d39fc34":["skill_out_json-1"]},"attributes":{"uiType":"json","uiTypeLabel":"JSON","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiUniqueId":"244fe8d3-5188-48b6-9c43-dd29c9393918"}},{"name":"flow_variable.skill_out_json","label":"Flow Variables➛skill_out_json","reference":"","reference_display":"","type":"object","base_type":"object","column_name":"","usedInstances":{"2973dd78-a014-499c-b5bc-5678c6c68f54":["skill_response-0"]},"attributes":{"uiType":"object","uiTypeLabel":"Object","co_type_name":"","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiUniqueId":"5463285a-d3a8-47fe-8116-50222cfca8a6","sourceUiUniqueId":"","sourceType":"","sourceId":""}},{"name":"2f0db8c5-87f9-461a-87b1-3d9cfb83c1fc.output","label":"2 - Copy of Execute an AI skill➛output","type":"json","base_type":"json","usedInstances":{"927321a5-33d8-4e42-a893-2b5a9a2ee951":["skill_out_json-0"]},"attributes":{"uiTypeLabel":"JSON","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiType":"json","uiUniqueId":"244fe8d3-5188-48b6-9c43-dd29c9393918"}}]',
        master: 'true',
        name: 'Review One Artifact',
        parent_flow: '59ffbc16331b8f14606f1c282e5c7baa',
        run_as: 'system',
        sc_callable: 'false',
        status: 'published',
        sys_domain: 'global',
        sys_domain_path: '/',
        type: 'subflow',
        version: '2',
    },
})
Record({
    $id: Now.ID['8114cdd633df8f14606f1c282e5c7bd9'],
    table: 'sys_flow_subflow_plan',
    data: {
        plan: 'com.snc.process_flow.engine.ProcessPlan@35a42f6',
        plan_id: '59ffbc16331b8f14606f1c282e5c7baa',
        snapshot: '501449d633df8f14606f1c282e5c7bb5',
        sys_domain: 'global',
        sys_domain_path: '/',
    },
})
Record({
    $id: Now.ID['2e55e5de331f8354606f1c282e5c7b0f'],
    table: 'sys_hub_flow_variable',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'co_type_name=FDce286592b193c3542ef14818dd2a077d,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=object,uiTypeLabel=Object,uiUniqueId=5463285a-d3a8-47fe-8116-50222cfca8a6',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_out_json',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'skill_out_json',
        mandatory: 'false',
        max_length: '65000',
        model: '59ffbc16331b8f14606f1c282e5c7baa',
        model_id: '59ffbc16331b8f14606f1c282e5c7baa',
        model_table: 'sys_hub_flow',
        name: 'var__m_sys_hub_flow_variable_59ffbc16331b8f14606f1c282e5c7baa',
        order: '1',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['7750d1d233970354606f1c282e5c7bc2'],
    table: 'sys_hub_flow_variable',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'co_type_name=FDce286592b193c3542ef14818dd2a077d,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=object,uiTypeLabel=Object,uiUniqueId=5463285a-d3a8-47fe-8116-50222cfca8a6',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_out_json',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'skill_out_json',
        mandatory: 'false',
        max_length: '65000',
        model: '501449d633df8f14606f1c282e5c7bb5',
        model_id: '501449d633df8f14606f1c282e5c7bb5',
        model_table: 'sys_hub_flow_snapshot',
        name: 'var__m_sys_hub_flow_variable_501449d633df8f14606f1c282e5c7bb5',
        order: '1',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
Record({
    $id: Now.ID['9e28e5923393c354606f1c282e5c7b17'],
    table: 'sys_hub_action_instance_v2',
    data: {
        action_type: '0fef419633570354606f1c282e5c7bf3',
        action_type_parent: '61bfcdde33170354606f1c282e5c7b3b',
        compiled_snapshot: '0fef419633570354606f1c282e5c7bf3',
        flow: '59ffbc16331b8f14606f1c282e5c7baa',
        order: '5',
        parent_ui_id: '468236cc-39ec-468f-a9cf-92c2b9b2f388',
        ui_id: 'a97bec99-c85d-4c9e-ab6f-367d28ec50fb',
        values: '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',
    },
})
Record({
    $id: Now.ID['de28a5923393c354606f1c282e5c7b92'],
    table: 'sys_hub_action_instance_v2',
    data: {
        action_type: '0fef419633570354606f1c282e5c7bf3',
        action_type_parent: '61bfcdde33170354606f1c282e5c7b3b',
        compiled_snapshot: '0fef419633570354606f1c282e5c7bf3',
        flow: '59ffbc16331b8f14606f1c282e5c7baa',
        order: '2',
        parent_ui_id: '1479606c-97af-491b-9152-00bd603df60f',
        ui_id: '2f0db8c5-87f9-461a-87b1-3d9cfb83c1fc',
        values: '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',
    },
})
Record({
    $id: Now.ID['8f286d923393c354606f1c282e5c7b7b'],
    table: 'sys_hub_action_instance_v2',
    data: {
        action_type: '0fef419633570354606f1c282e5c7bf3',
        action_type_parent: '61bfcdde33170354606f1c282e5c7b3b',
        compiled_snapshot: '0fef419633570354606f1c282e5c7bf3',
        flow: '501449d633df8f14606f1c282e5c7bb5',
        order: '2',
        parent_ui_id: '1479606c-97af-491b-9152-00bd603df60f',
        ui_id: '2f0db8c5-87f9-461a-87b1-3d9cfb83c1fc',
        values: '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',
    },
})
Record({
    $id: Now.ID['c728ad923393c354606f1c282e5c7b05'],
    table: 'sys_hub_action_instance_v2',
    data: {
        action_type: '0fef419633570354606f1c282e5c7bf3',
        action_type_parent: '61bfcdde33170354606f1c282e5c7b3b',
        compiled_snapshot: '0fef419633570354606f1c282e5c7bf3',
        flow: '501449d633df8f14606f1c282e5c7bb5',
        order: '5',
        parent_ui_id: '468236cc-39ec-468f-a9cf-92c2b9b2f388',
        ui_id: 'a97bec99-c85d-4c9e-ab6f-367d28ec50fb',
        values: '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',
    },
})
Record({
    $id: Now.ID['9e28e5923393c354606f1c282e5c7b1c'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: '1e28e5923393c354606f1c282e5c7b1b',
        flow: '59ffbc16331b8f14606f1c282e5c7baa',
        logic_definition: 'df4e1945c3e232002841b63b12d3ae3e',
        order: '7',
        outputs_assigned: 'skill_response',
        ui_id: '2973dd78-a014-499c-b5bc-5678c6c68f54',
        values: 'H4sIAAAAAAAA/41TXU/jMBD8L35uqnw35Q2BkJC4QzoKL6dTtLE3YHDtYDstvar//dZN+qE7TuItO9m1Z2fGW2Z63/XeLcylc/JZs4ufWyYFu2AlQByLBLKsaKo2ycu4bBOeVikWfNYUCZswDUukTvcmlaotus5oh4SvQPXhx3bbKrOuV2AlNAqnQyPdWL86o3c7ahXSdQo2T1+f4C9SCYuB6a8J68ASCY+WXRBvTR8a1J3Ub3TYP81f3UtBg+qzxf63sN90ATfNK3I/1nfjIfcH0FgRaCYThh8etUBi04JyOGFL0AK8sZsjYhHEvVYn4IWWG3ZawoeTv+m+sojjOLS2SCtyHH4fy3rUdoDba/Dw4G3PfW/xoI6RHN0gjsAWeuWvzrGh4b7z0uhhxAdbxmmj+qX+PkjCjgccrCSkd0QCu7BrID9u0j68mPWPA8sbqfeyjD+V4aCOFXhvZdP7wGfLern4TFdu6qB3PZpzc50DuVnMU2znGc+KnIsEyzxFnFM1bwXNoMIlcaqX0HVSP9edNSu550HHLafPiorpPooCw7OYAg8aTMklmN4Qfr2Hn8acfqNjaHjCnOktx8UQB6npZR3BR/mo5XuPtyGERV5maVVAJDKoonzWYlQlSRkVcZqmvOVQQUmT3VqkwpquG1Un+0LcBiHOAydd7biVnf+78ezOfJbMZ3HZRDgrIcrLWRI1pZhFWVGUaRFXvMSG7Yjuxl0pcO7kLEWqfu+DL4PPo6P1EIowsr/7kjRa4WjeLry3IMAYpcOTPqaNS0eKLgJ2e9YnNuSj5OfQ2ti34MUJ2/0BLFcZjrgEAAA=',
    },
})
Record({
    $id: Now.ID['8328ad923393c354606f1c282e5c7b86'],
    table: 'sys_hub_flow_logic_instance_v2',
    data: {
        block: '1e28e5923393c354606f1c282e5c7b1b',
        flow: '501449d633df8f14606f1c282e5c7bb5',
        logic_definition: 'df4e1945c3e232002841b63b12d3ae3e',
        order: '7',
        outputs_assigned: 'skill_response',
        ui_id: '2973dd78-a014-499c-b5bc-5678c6c68f54',
        values: 'H4sIAAAAAAAA/41TXU/jMBD8L35uqnw35Q2BkJC4QzoKL6dTtLE3YHDtYDstvar//dZN+qE7TuItO9m1Z2fGW2Z63/XeLcylc/JZs4ufWyYFu2AlQByLBLKsaKo2ycu4bBOeVikWfNYUCZswDUukTvcmlaotus5oh4SvQPXhx3bbKrOuV2AlNAqnQyPdWL86o3c7ahXSdQo2T1+f4C9SCYuB6a8J68ASCY+WXRBvTR8a1J3Ub3TYP81f3UtBg+qzxf63sN90ATfNK3I/1nfjIfcH0FgRaCYThh8etUBi04JyOGFL0AK8sZsjYhHEvVYn4IWWG3ZawoeTv+m+sojjOLS2SCtyHH4fy3rUdoDba/Dw4G3PfW/xoI6RHN0gjsAWeuWvzrGh4b7z0uhhxAdbxmmj+qX+PkjCjgccrCSkd0QCu7BrID9u0j68mPWPA8sbqfeyjD+V4aCOFXhvZdP7wGfLern4TFdu6qB3PZpzc50DuVnMU2znGc+KnIsEyzxFnFM1bwXNoMIlcaqX0HVSP9edNSu550HHLafPiorpPooCw7OYAg8aTMklmN4Qfr2Hn8acfqNjaHjCnOktx8UQB6npZR3BR/mo5XuPtyGERV5maVVAJDKoonzWYlQlSRkVcZqmvOVQQUmT3VqkwpquG1Un+0LcBiHOAydd7biVnf+78ezOfJbMZ3HZRDgrIcrLWRI1pZhFWVGUaRFXvMSG7Yjuxl0pcO7kLEWqfu+DL4PPo6P1EIowsr/7kjRa4WjeLry3IMAYpcOTPqaNS0eKLgJ2e9YnNuSj5OfQ2ti34MUJ2/0BLFcZjrgEAAA=',
    },
})
