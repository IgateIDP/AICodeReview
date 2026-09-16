import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['61bfcdde33170354606f1c282e5c7b3b'],
    table: 'sys_hub_action_type_definition',
    data: {
        access: 'public',
        active: 'true',
        attributes: '{labelCacheCleanUpExecuted=true}',
        authored_on_release_version: '29000',
        callable_by_client_api: 'false',
        copied_from: '24dcd810c340071025823ac9050131c0',
        copied_from_name: 'Execute an AI skill',
        ih_action: 'false',
        internal_name: 'copy_of_execute_an_ai_skill',
        label_cache:
            '[{"name":"{{action.skill_config_id}}","label":"action➛AI Skill","type":"action","ref":"","reference_display":"Now Assist Skill Config","base_type":"reference","parent_table_name":"","column_name":"","choices":null,"attributes":{"uiTypeLabel":"Reference","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiType":"reference","uiUniqueId":"5c374dee-a90a-415c-9f52-94abe2d7b0f9"}},{"name":"{{action.skill_inputs}}","label":"action➛Skill Inputs","type":"action","ref":"","reference_display":"","base_type":"dynamic_inputs","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{action.skill_config_id.sys_id}}","label":"action➛AI Skill➛Sys ID","type":"action","ref":"","reference_display":"Sys ID","base_type":"GUID","parent_table_name":"sn_nowassist_skill_config","column_name":"sys_id","choices":null,"attributes":{}},{"name":"{{step[b98305ec-e0ae-4099-ae16-a7c8008cb3e8].payload}}","label":"step➛Script step➛Payload","type":"step","ref":"","reference_display":"","base_type":"json","parent_table_name":"","column_name":"","choices":null,"attributes":{"sourceId":"","uiTypeLabel":"String","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","sourceUiUniqueId":"","sourceType":"","uiType":"string","uiUniqueId":"15c6a124-a3c1-4126-a30e-6d61ba29fcb2"}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].status}}","label":"step➛Call Now Assist Skill step➛Status","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].result}}","label":"step➛Call Now Assist Skill step➛Result","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].error}}","label":"step➛Call Now Assist Skill step➛Error","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].provider}}","label":"step➛Call Now Assist Skill step➛Provider","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].response}}","label":"step➛Call Now Assist Skill step➛Response","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[5e2a5210-e4a1-4308-90d1-dc7faad820a5].skill_output}}","label":"step➛Script step➛Skill Output","type":"step","ref":"","reference_display":"","base_type":"json","parent_table_name":"","column_name":"","choices":null,"attributes":{"uiTypeLabel":"JSON","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiType":"json","uiUniqueId":"2a9efd80-ee17-4468-8c7e-3e4457ae79c6"}}]',
        master_snapshot: '0fef419633570354606f1c282e5c7bf3',
        name: 'Copy of Execute an AI skill',
        pre_compiled: 'false',
        state: 'published',
        sys_domain: 'global',
        sys_domain_path: '/',
        system_level: 'false',
        latest_snapshot: '0fef419633570354606f1c282e5c7bf3',
        compiler_build: 'glide-australia-02-11-2026__patch5w37-09-04-2026_09-08-2026_1754.zip',
    },
})
Record({
    $id: Now.ID['02bf451233570354606f1c282e5c7b6b'],
    table: 'sys_hub_step_instance',
    data: {
        action: '61bfcdde33170354606f1c282e5c7b3b',
        cid: '90c73768-edef-4666-81dc-c8192df176a4',
        error_handling_type: '1',
        label: 'Call Now Assist Skill step',
        order: '2',
        step_type: '7db1be8aff10221013f0ffffffffff2c',
    },
})
Record({
    $id: Now.ID['71bf811233570354606f1c282e5c7b65'],
    table: 'sys_hub_step_instance',
    data: {
        action: '61bfcdde33170354606f1c282e5c7b3b',
        cid: 'b98305ec-e0ae-4099-ae16-a7c8008cb3e8',
        error_handling_type: '1',
        label: 'Script step',
        order: '1',
        step_type: '106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['cabf451233570354606f1c282e5c7bc3'],
    table: 'sys_hub_step_instance',
    data: {
        action: '61bfcdde33170354606f1c282e5c7b3b',
        cid: '5e2a5210-e4a1-4308-90d1-dc7faad820a5',
        error_handling_type: '1',
        label: 'Script step',
        order: '3',
        step_type: '106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['17efc19633570354606f1c282e5c7bf1'],
    table: 'sys_hub_step_instance',
    data: {
        action: '0fef419633570354606f1c282e5c7bf3',
        cid: 'b98305ec-e0ae-4099-ae16-a7c8008cb3e8',
        error_handling_type: '1',
        label: 'Script step',
        order: '1',
        step_type: '106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['6fef459633570354606f1c282e5c7bf8'],
    table: 'sys_hub_step_instance',
    data: {
        action: '0fef419633570354606f1c282e5c7bf3',
        cid: '90c73768-edef-4666-81dc-c8192df176a4',
        error_handling_type: '1',
        label: 'Call Now Assist Skill step',
        order: '2',
        step_type: '7db1be8aff10221013f0ffffffffff2c',
    },
})
Record({
    $id: Now.ID['6fef859633570354606f1c282e5c7b5c'],
    table: 'sys_hub_step_instance',
    data: {
        action: '0fef419633570354606f1c282e5c7bf3',
        cid: '5e2a5210-e4a1-4308-90d1-dc7faad820a5',
        error_handling_type: '1',
        label: 'Script step',
        order: '3',
        step_type: '106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['71bf811233570354606f1c282e5c7be9'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=json,uiTypeLabel=JSON',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_inputs',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        mandatory: 'true',
        max_length: '4000',
        model: '71bf811233570354606f1c282e5c7b65',
        model_id: '71bf811233570354606f1c282e5c7b65',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_71bf811233570354606f1c282e5c7b65',
        order: '0',
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
    $id: Now.ID['7dbf051233570354606f1c282e5c7b03'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=GUID,uiTypeLabel=Sys ID (GUID)',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_id',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'GUID',
        mandatory: 'true',
        max_length: '32',
        model: '71bf811233570354606f1c282e5c7b65',
        model_id: '71bf811233570354606f1c282e5c7b65',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_71bf811233570354606f1c282e5c7b65',
        order: '100',
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
    $id: Now.ID['1abf851233570354606f1c282e5c7b9a'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'response',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        mandatory: 'true',
        max_length: '8000',
        model: 'cabf451233570354606f1c282e5c7bc3',
        model_id: 'cabf451233570354606f1c282e5c7bc3',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        order: '300',
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
    $id: Now.ID['42bf851233570354606f1c282e5c7b04'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'error',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        mandatory: 'true',
        max_length: '8000',
        model: 'cabf451233570354606f1c282e5c7bc3',
        model_id: 'cabf451233570354606f1c282e5c7bc3',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        order: '100',
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
    $id: Now.ID['5abfc51233570354606f1c282e5c7b36'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'status',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        mandatory: 'true',
        max_length: '8000',
        model: 'cabf451233570354606f1c282e5c7bc3',
        model_id: 'cabf451233570354606f1c282e5c7bc3',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        order: '400',
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
    $id: Now.ID['86bf451233570354606f1c282e5c7bca'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'results',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        mandatory: 'true',
        max_length: '8000',
        model: 'cabf451233570354606f1c282e5c7bc3',
        model_id: 'cabf451233570354606f1c282e5c7bc3',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        order: '0',
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
    $id: Now.ID['8ebf851233570354606f1c282e5c7b0a'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'provider',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        mandatory: 'true',
        max_length: '8000',
        model: 'cabf451233570354606f1c282e5c7bc3',
        model_id: 'cabf451233570354606f1c282e5c7bc3',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        order: '200',
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
    $id: Now.ID['5bef059633570354606f1c282e5c7b42'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=json,uiTypeLabel=JSON',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_inputs',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        label: 'skill_inputs',
        mandatory: 'true',
        max_length: '4000',
        model: '17efc19633570354606f1c282e5c7bf1',
        model_id: '17efc19633570354606f1c282e5c7bf1',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_17efc19633570354606f1c282e5c7bf1',
        order: '0',
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
    $id: Now.ID['5bef059633570354606f1c282e5c7b4a'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=GUID,uiTypeLabel=Sys ID (GUID)',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_id',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'GUID',
        label: 'skill_id',
        mandatory: 'true',
        max_length: '32',
        model: '17efc19633570354606f1c282e5c7bf1',
        model_id: '17efc19633570354606f1c282e5c7bf1',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_17efc19633570354606f1c282e5c7bf1',
        order: '100',
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
    $id: Now.ID['2fefc59633570354606f1c282e5c7b2c'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'provider',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'provider',
        mandatory: 'true',
        max_length: '8000',
        model: '6fef859633570354606f1c282e5c7b5c',
        model_id: '6fef859633570354606f1c282e5c7b5c',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        order: '200',
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
    $id: Now.ID['6bef859633570354606f1c282e5c7ba9'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'error',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'error',
        mandatory: 'true',
        max_length: '8000',
        model: '6fef859633570354606f1c282e5c7b5c',
        model_id: '6fef859633570354606f1c282e5c7b5c',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        order: '100',
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
    $id: Now.ID['6befc59633570354606f1c282e5c7b33'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'response',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'response',
        mandatory: 'true',
        max_length: '8000',
        model: '6fef859633570354606f1c282e5c7b5c',
        model_id: '6fef859633570354606f1c282e5c7b5c',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        order: '300',
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
    $id: Now.ID['ebef859633570354606f1c282e5c7ba1'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'results',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'results',
        mandatory: 'true',
        max_length: '8000',
        model: '6fef859633570354606f1c282e5c7b5c',
        model_id: '6fef859633570354606f1c282e5c7b5c',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        order: '0',
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
    $id: Now.ID['efefc59633570354606f1c282e5c7bf4'],
    table: 'sys_hub_step_ext_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=string,uiTypeLabel=String',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'status',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'status',
        mandatory: 'true',
        max_length: '8000',
        model: '6fef859633570354606f1c282e5c7b5c',
        model_id: '6fef859633570354606f1c282e5c7b5c',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        order: '400',
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
    $id: Now.ID['4abf051233570354606f1c282e5c7b0b'],
    table: 'sys_hub_step_ext_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=json,uiTypeLabel=JSON,uiUniqueId=15c6a124-a3c1-4126-a30e-6d61ba29fcb2',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'payload',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        label: 'Payload',
        mandatory: 'false',
        max_length: '4000',
        model: '71bf811233570354606f1c282e5c7b65',
        model_id: '71bf811233570354606f1c282e5c7b65',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_output_71bf811233570354606f1c282e5c7b65',
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
    $id: Now.ID['92bfc51233570354606f1c282e5c7b3e'],
    table: 'sys_hub_step_ext_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=json,uiTypeLabel=JSON,uiUniqueId=2a9efd80-ee17-4468-8c7e-3e4457ae79c6',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_output',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        label: 'Skill Output',
        mandatory: 'false',
        max_length: '8000',
        model: 'cabf451233570354606f1c282e5c7bc3',
        model_id: 'cabf451233570354606f1c282e5c7bc3',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_output_cabf451233570354606f1c282e5c7bc3',
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
    $id: Now.ID['dfef059633570354606f1c282e5c7bda'],
    table: 'sys_hub_step_ext_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=json,uiTypeLabel=JSON,uiUniqueId=15c6a124-a3c1-4126-a30e-6d61ba29fcb2',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'payload',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        label: 'Payload',
        mandatory: 'false',
        max_length: '4000',
        model: '17efc19633570354606f1c282e5c7bf1',
        model_id: '17efc19633570354606f1c282e5c7bf1',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_output_17efc19633570354606f1c282e5c7bf1',
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
    $id: Now.ID['2befc59633570354606f1c282e5c7bfc'],
    table: 'sys_hub_step_ext_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=json,uiTypeLabel=JSON,uiUniqueId=2a9efd80-ee17-4468-8c7e-3e4457ae79c6',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_output',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        label: 'Skill Output',
        mandatory: 'false',
        max_length: '8000',
        model: '6fef859633570354606f1c282e5c7b5c',
        model_id: '6fef859633570354606f1c282e5c7b5c',
        model_table: 'sys_hub_step_instance',
        name: 'var__m_sys_hub_step_ext_output_6fef859633570354606f1c282e5c7b5c',
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
    $id: Now.ID['29bfcdde33170354606f1c282e5c7bd1'],
    table: 'sys_hub_action_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=reference,uiTypeLabel=Reference,uiUniqueId=5c374dee-a90a-415c-9f52-94abe2d7b0f9',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        choice_table: 'sn_nowassist_skill_config',
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_config_id',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'reference',
        label: 'AI Skill',
        mandatory: 'true',
        max_length: '32',
        model: '61bfcdde33170354606f1c282e5c7b3b',
        model_id: '61bfcdde33170354606f1c282e5c7b3b',
        model_table: 'sys_hub_action_type_definition',
        name: 'var__m_sys_hub_action_input_61bfcdde33170354606f1c282e5c7b3b',
        order: '1',
        primary: 'false',
        read_only: 'false',
        reference: 'sn_nowassist_skill_config',
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
    $id: Now.ID['71bf411233570354606f1c282e5c7b30'],
    table: 'sys_hub_action_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'dynamic=true,dynamic_output_hidden_for=skill_output,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiUniqueId=17e3aee3-948b-481b-bb4e-ed3fb992d91a,visible_in_ui=false',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'dynamic_hidden_input_skill_output',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'Skill Output',
        mandatory: 'false',
        max_length: '4096000',
        model: '61bfcdde33170354606f1c282e5c7b3b',
        model_id: '61bfcdde33170354606f1c282e5c7b3b',
        model_table: 'sys_hub_action_type_definition',
        name: 'var__m_sys_hub_action_input_61bfcdde33170354606f1c282e5c7b3b',
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
    $id: Now.ID['b9bf011233570354606f1c282e5c7b42'],
    table: 'sys_hub_action_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'dynamic=true,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiUniqueId=67eab5bc-ed9b-468c-a485-673dcc9d2dde',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_inputs',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        label: 'Skill Inputs',
        mandatory: 'false',
        max_length: '4000',
        model: '61bfcdde33170354606f1c282e5c7b3b',
        model_id: '61bfcdde33170354606f1c282e5c7b3b',
        model_table: 'sys_hub_action_type_definition',
        name: 'var__m_sys_hub_action_input_61bfcdde33170354606f1c282e5c7b3b',
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
    $id: Now.ID['07ef819633570354606f1c282e5c7b5d'],
    table: 'sys_hub_action_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=reference,uiTypeLabel=Reference,uiUniqueId=5c374dee-a90a-415c-9f52-94abe2d7b0f9',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        choice_table: 'sn_nowassist_skill_config',
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_config_id',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'reference',
        label: 'AI Skill',
        mandatory: 'true',
        max_length: '32',
        model: '0fef419633570354606f1c282e5c7bf3',
        model_id: '0fef419633570354606f1c282e5c7bf3',
        model_table: 'sys_hub_action_type_snapshot',
        name: 'var__m_sys_hub_action_input_0fef419633570354606f1c282e5c7bf3',
        order: '1',
        primary: 'false',
        read_only: 'false',
        reference: 'sn_nowassist_skill_config',
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
    $id: Now.ID['17ef819633570354606f1c282e5c7bee'],
    table: 'sys_hub_action_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'dynamic=true,dynamic_output_hidden_for=skill_output,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiUniqueId=17e3aee3-948b-481b-bb4e-ed3fb992d91a,visible_in_ui=false',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'dynamic_hidden_input_skill_output',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'Skill Output',
        mandatory: 'false',
        max_length: '4096000',
        model: '0fef419633570354606f1c282e5c7bf3',
        model_id: '0fef419633570354606f1c282e5c7bf3',
        model_table: 'sys_hub_action_type_snapshot',
        name: 'var__m_sys_hub_action_input_0fef419633570354606f1c282e5c7bf3',
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
    $id: Now.ID['5bef819633570354606f1c282e5c7be4'],
    table: 'sys_hub_action_input',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'dynamic=true,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiUniqueId=67eab5bc-ed9b-468c-a485-673dcc9d2dde',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_inputs',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        label: 'Skill Inputs',
        mandatory: 'false',
        max_length: '4000',
        model: '0fef419633570354606f1c282e5c7bf3',
        model_id: '0fef419633570354606f1c282e5c7bf3',
        model_table: 'sys_hub_action_type_snapshot',
        name: 'var__m_sys_hub_action_input_0fef419633570354606f1c282e5c7bf3',
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
    $id: Now.ID['16bf491233570354606f1c282e5c7bfa'],
    table: 'sys_hub_action_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'action_error_output=true,co_type_name=FD92bf49128f5703543ffc4bae25ba2d3e,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=object,uiTypeLabel=Object,uiUniqueId=fdb78a29-007a-45c0-aedf-d77c266d465f',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: '__action_status__',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'Action Status',
        mandatory: 'false',
        max_length: '65000',
        model: '61bfcdde33170354606f1c282e5c7b3b',
        model_id: '61bfcdde33170354606f1c282e5c7b3b',
        model_table: 'sys_hub_action_type_definition',
        name: 'var__m_sys_hub_action_output_61bfcdde33170354606f1c282e5c7b3b',
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
    $id: Now.ID['56bf891233570354606f1c282e5c7bc9'],
    table: 'sys_hub_action_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'action_error_output=true,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=boolean,uiTypeLabel=True/False,uiUniqueId=909d4399-7443-47ca-b4a8-64f5d59fe765,visible_in_ui=false',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        default_value: 'true',
        display: 'false',
        dynamic_creation: 'false',
        element: '__dont_treat_as_error__',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'boolean',
        label: "Don't Treat as Error",
        mandatory: 'false',
        max_length: '40',
        model: '61bfcdde33170354606f1c282e5c7b3b',
        model_id: '61bfcdde33170354606f1c282e5c7b3b',
        model_table: 'sys_hub_action_type_definition',
        name: 'var__m_sys_hub_action_output_61bfcdde33170354606f1c282e5c7b3b',
        order: '4',
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
    $id: Now.ID['d1532912331b8354606f1c282e5c7bf3'],
    table: 'sys_hub_action_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=json,uiTypeLabel=JSON,uiUniqueId=244fe8d3-5188-48b6-9c43-dd29c9393918',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'output',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        label: 'output',
        mandatory: 'false',
        max_length: '4000',
        model: '61bfcdde33170354606f1c282e5c7b3b',
        model_id: '61bfcdde33170354606f1c282e5c7b3b',
        model_table: 'sys_hub_action_type_definition',
        name: 'var__m_sys_hub_action_output_61bfcdde33170354606f1c282e5c7b3b',
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
    $id: Now.ID['debf491233570354606f1c282e5c7b3f'],
    table: 'sys_hub_action_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'dynamic=true,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiUniqueId=17e3aee3-948b-481b-bb4e-ed3fb992d91a',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_output',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'Skill Output',
        mandatory: 'false',
        max_length: '8000',
        model: '61bfcdde33170354606f1c282e5c7b3b',
        model_id: '61bfcdde33170354606f1c282e5c7b3b',
        model_table: 'sys_hub_action_type_definition',
        name: 'var__m_sys_hub_action_output_61bfcdde33170354606f1c282e5c7b3b',
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
    $id: Now.ID['33ef499633570354606f1c282e5c7be3'],
    table: 'sys_hub_action_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'action_error_output=true,co_type_name=FDACTIONSTATUS,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=object,uiTypeLabel=Object,uiUniqueId=fdb78a29-007a-45c0-aedf-d77c266d465f',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: '__action_status__',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'Action Status',
        mandatory: 'false',
        max_length: '65000',
        model: '0fef419633570354606f1c282e5c7bf3',
        model_id: '0fef419633570354606f1c282e5c7bf3',
        model_table: 'sys_hub_action_type_snapshot',
        name: 'var__m_sys_hub_action_output_0fef419633570354606f1c282e5c7bf3',
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
    $id: Now.ID['ac14a95e335b8354606f1c282e5c7bf7'],
    table: 'sys_hub_action_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=json,uiTypeLabel=JSON,uiUniqueId=244fe8d3-5188-48b6-9c43-dd29c9393918',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'output',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'json',
        label: 'output',
        mandatory: 'false',
        max_length: '4000',
        model: '0fef419633570354606f1c282e5c7bf3',
        model_id: '0fef419633570354606f1c282e5c7bf3',
        model_table: 'sys_hub_action_type_snapshot',
        name: 'var__m_sys_hub_action_output_0fef419633570354606f1c282e5c7bf3',
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
    $id: Now.ID['b3ef499633570354606f1c282e5c7beb'],
    table: 'sys_hub_action_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'action_error_output=true,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiType=boolean,uiTypeLabel=True/False,uiUniqueId=909d4399-7443-47ca-b4a8-64f5d59fe765,visible_in_ui=false',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        default_value: 'true',
        display: 'false',
        dynamic_creation: 'false',
        element: '__dont_treat_as_error__',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'boolean',
        label: "Don't Treat as Error",
        mandatory: 'false',
        max_length: '40',
        model: '0fef419633570354606f1c282e5c7bf3',
        model_id: '0fef419633570354606f1c282e5c7bf3',
        model_table: 'sys_hub_action_type_snapshot',
        name: 'var__m_sys_hub_action_output_0fef419633570354606f1c282e5c7bf3',
        order: '4',
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
    $id: Now.ID['fbef499633570354606f1c282e5c7b29'],
    table: 'sys_hub_action_output',
    data: {
        active: 'true',
        array: 'false',
        array_denormalized: 'false',
        attributes:
            'dynamic=true,element_mapping_provider=com.glide.flow_design.action.data.FlowDesignVariableMapper,uiUniqueId=17e3aee3-948b-481b-bb4e-ed3fb992d91a',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        display: 'false',
        dynamic_creation: 'false',
        element: 'skill_output',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'string',
        label: 'Skill Output',
        mandatory: 'false',
        max_length: '8000',
        model: '0fef419633570354606f1c282e5c7bf3',
        model_id: '0fef419633570354606f1c282e5c7bf3',
        model_table: 'sys_hub_action_type_snapshot',
        name: 'var__m_sys_hub_action_output_0fef419633570354606f1c282e5c7bf3',
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
    $id: Now.ID['eabf0d1233570354606f1c282e5c7b0d'],
    table: 'sys_hub_action_status_metadata',
    data: {
        action_type_id: '61bfcdde33170354606f1c282e5c7b3b',
    },
})
Record({
    $id: Now.ID['73ef899633570354606f1c282e5c7bfc'],
    table: 'sys_hub_action_status_metadata',
    data: {
        action_type_id: '0fef419633570354606f1c282e5c7bf3',
    },
})
Record({
    $id: Now.ID['b3efc99633570354606f1c282e5c7b42'],
    table: 'sys_hub_action_plan',
    data: {
        action_id: '61bfcdde33170354606f1c282e5c7b3b',
        plan: '{"@class":"com.snc.process_flow.engine.serialization.plan_data.ChunkingPlanData","chunk_data":{"table":"sys_hub_action_plan","id":"b3efc99633570354606f1c282e5c7b42","name":"plan","plan_signature":null},"plan_data":"CHUNKING_PLAN"}',
        snapshot: '8d9d5ee6339b87d4606f1c282e5c7b7a',
        sys_domain: 'global',
        sys_domain_path: '/',
    },
})
Record({
    $id: Now.ID['0fef419633570354606f1c282e5c7bf3'],
    table: 'sys_hub_action_type_snapshot',
    data: {
        access: 'public',
        attributes: '{labelCacheCleanUpExecuted=true}',
        authored_on_release_version: '29000',
        callable_by_client_api: 'false',
        copied_from: '24dcd810c340071025823ac9050131c0',
        internal_name: 'copy_of_execute_an_ai_skill',
        label_cache:
            '[{"name":"{{action.skill_config_id}}","label":"action➛AI Skill","type":"action","ref":"","reference_display":"Now Assist Skill Config","base_type":"reference","parent_table_name":"","column_name":"","choices":null,"attributes":{"uiTypeLabel":"Reference","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiType":"reference","uiUniqueId":"5c374dee-a90a-415c-9f52-94abe2d7b0f9"}},{"name":"{{action.skill_inputs}}","label":"action➛Skill Inputs","type":"action","ref":"","reference_display":"","base_type":"dynamic_inputs","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{action.skill_config_id.sys_id}}","label":"action➛AI Skill➛Sys ID","type":"action","ref":"","reference_display":"Sys ID","base_type":"GUID","parent_table_name":"sn_nowassist_skill_config","column_name":"sys_id","choices":null,"attributes":{}},{"name":"{{step[b98305ec-e0ae-4099-ae16-a7c8008cb3e8].payload}}","label":"step➛Script step➛Payload","type":"step","ref":"","reference_display":"","base_type":"json","parent_table_name":"","column_name":"","choices":null,"attributes":{"sourceId":"","uiTypeLabel":"String","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","sourceUiUniqueId":"","sourceType":"","uiType":"string","uiUniqueId":"15c6a124-a3c1-4126-a30e-6d61ba29fcb2"}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].status}}","label":"step➛Call Now Assist Skill step➛Status","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].result}}","label":"step➛Call Now Assist Skill step➛Result","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].error}}","label":"step➛Call Now Assist Skill step➛Error","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].provider}}","label":"step➛Call Now Assist Skill step➛Provider","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[90c73768-edef-4666-81dc-c8192df176a4].response}}","label":"step➛Call Now Assist Skill step➛Response","type":"step","ref":"","reference_display":"","base_type":"string","parent_table_name":"","column_name":"","choices":null,"attributes":{}},{"name":"{{step[5e2a5210-e4a1-4308-90d1-dc7faad820a5].skill_output}}","label":"step➛Script step➛Skill Output","type":"step","ref":"","reference_display":"","base_type":"json","parent_table_name":"","column_name":"","choices":null,"attributes":{"uiTypeLabel":"JSON","element_mapping_provider":"com.glide.flow_design.action.data.FlowDesignVariableMapper","uiType":"json","uiUniqueId":"2a9efd80-ee17-4468-8c7e-3e4457ae79c6"}}]',
        master: 'true',
        name: 'Copy of Execute an AI skill',
        parent_action: '61bfcdde33170354606f1c282e5c7b3b',
        sys_domain: 'global',
        sys_domain_path: '/',
        system_level: 'false',
    },
})
Record({
    $id: Now.ID['fdbf411233570354606f1c282e5c7b37'],
    table: 'sys_hub_action_input_action_instance',
    data: {
        action_input: '71bf411233570354606f1c282e5c7b30',
        action_type: 'c52766b4870883102f3220ac8bbb35de',
    },
})
Record({
    $id: Now.ID['35bf011233570354606f1c282e5c7bba'],
    table: 'sys_hub_action_input_action_instance',
    data: {
        action_input: 'b9bf011233570354606f1c282e5c7b42',
        action_type: '0943937b7f9d5210f465c3b76d866541',
    },
})
Record({
    $id: Now.ID['dabf491233570354606f1c282e5c7bf7'],
    table: 'sys_hub_action_input_action_instance',
    data: {
        action_input: 'debf491233570354606f1c282e5c7b3f',
        action_type: 'c52766b4870883102f3220ac8bbb35de',
    },
})
Record({
    $id: Now.ID['5befc19633570354606f1c282e5c7b72'],
    table: 'sys_hub_action_input_action_instance',
    data: {
        action_input: '17ef819633570354606f1c282e5c7bee',
        action_type: 'c52766b4870883102f3220ac8bbb35de',
    },
})
Record({
    $id: Now.ID['17ef819633570354606f1c282e5c7bec'],
    table: 'sys_hub_action_input_action_instance',
    data: {
        action_input: '5bef819633570354606f1c282e5c7be4',
        action_type: '0943937b7f9d5210f465c3b76d866541',
    },
})
Record({
    $id: Now.ID['77ef499633570354606f1c282e5c7b32'],
    table: 'sys_hub_action_input_action_instance',
    data: {
        action_input: 'fbef499633570354606f1c282e5c7b29',
        action_type: 'c52766b4870883102f3220ac8bbb35de',
    },
})
