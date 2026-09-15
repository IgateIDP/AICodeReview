import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['b5836596331b8354606f1c282e5c7b0c'],
    table: 'sys_element_mapping',
    data: {
        field: 'output',
        id: '61bfcdde33170354606f1c282e5c7b3b',
        table: 'var__m_sys_hub_action_output_61bfcdde33170354606f1c282e5c7b3b',
        value: '{{step[5e2a5210-e4a1-4308-90d1-dc7faad820a5].skill_output}}',
    },
})
Record({
    $id: Now.ID['adef455633570354606f1c282e5c7b74'],
    table: 'sys_element_mapping',
    data: {
        field: 'skill_output',
        id: '61bfcdde33170354606f1c282e5c7b3b',
        table: 'var__m_sys_hub_action_output_61bfcdde33170354606f1c282e5c7b3b',
        value: '{{step[5e2a5210-e4a1-4308-90d1-dc7faad820a5].skill_output}}',
    },
})
Record({
    $id: Now.ID['eebf0d1233570354606f1c282e5c7b07'],
    table: 'sys_element_mapping',
    data: {
        field: '__action_status__',
        id: '61bfcdde33170354606f1c282e5c7b3b',
        table: 'var__m_sys_hub_action_output_61bfcdde33170354606f1c282e5c7b3b',
    },
})
Record({
    $id: Now.ID['42bf451233570354606f1c282e5c7bc2'],
    table: 'sys_element_mapping',
    data: {
        field: 'payload',
        id: '02bf451233570354606f1c282e5c7b6b',
        table: 'var__m_sys_flow_step_definition_input_7db1be8aff10221013f0ffffffffff2c',
        value: '{{step[b98305ec-e0ae-4099-ae16-a7c8008cb3e8].payload}}',
    },
})
Record({
    $id: Now.ID['8abf451233570354606f1c282e5c7bc1'],
    table: 'sys_element_mapping',
    data: {
        field: 'skill_config',
        id: '02bf451233570354606f1c282e5c7b6b',
        table: 'var__m_sys_flow_step_definition_input_7db1be8aff10221013f0ffffffffff2c',
        value: '{{action.skill_config_id}}',
    },
})
Record({
    $id: Now.ID['8abf451233570354606f1c282e5c7b24'],
    table: 'sys_element_mapping',
    data: {
        field: 'application',
        id: '71bf811233570354606f1c282e5c7b65',
        table: 'var__m_sys_flow_step_definition_input_106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['42bf451233570354606f1c282e5c7b25'],
    table: 'sys_element_mapping',
    data: {
        field: 'script',
        id: '71bf811233570354606f1c282e5c7b65',
        table: 'var__m_sys_flow_step_definition_input_106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['86bf451233570354606f1c282e5c7b27'],
    table: 'sys_element_mapping',
    data: {
        field: 'skill_id',
        id: '71bf811233570354606f1c282e5c7b65',
        table: 'var__m_sys_hub_step_ext_input_71bf811233570354606f1c282e5c7b65',
        value: '{{action.skill_config_id.sys_id}}',
    },
})
Record({
    $id: Now.ID['4ebf451233570354606f1c282e5c7b27'],
    table: 'sys_element_mapping',
    data: {
        field: 'skill_inputs',
        id: '71bf811233570354606f1c282e5c7b65',
        table: 'var__m_sys_hub_step_ext_input_71bf811233570354606f1c282e5c7b65',
        value: '{{action.skill_inputs}}',
    },
})
Record({
    $id: Now.ID['d2bf491233570354606f1c282e5c7b35'],
    table: 'sys_element_mapping',
    data: {
        field: 'application',
        id: 'cabf451233570354606f1c282e5c7bc3',
        table: 'var__m_sys_flow_step_definition_input_106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['5abf491233570354606f1c282e5c7b37'],
    table: 'sys_element_mapping',
    data: {
        field: 'error',
        id: 'cabf451233570354606f1c282e5c7bc3',
        table: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].error}}',
    },
})
Record({
    $id: Now.ID['12bf491233570354606f1c282e5c7b38'],
    table: 'sys_element_mapping',
    data: {
        field: 'provider',
        id: 'cabf451233570354606f1c282e5c7bc3',
        table: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].provider}}',
    },
})
Record({
    $id: Now.ID['9ebf491233570354606f1c282e5c7b38'],
    table: 'sys_element_mapping',
    data: {
        field: 'response',
        id: 'cabf451233570354606f1c282e5c7bc3',
        table: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].response}}',
    },
})
Record({
    $id: Now.ID['d6bf491233570354606f1c282e5c7b38'],
    table: 'sys_element_mapping',
    data: {
        field: 'results',
        id: 'cabf451233570354606f1c282e5c7bc3',
        table: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].result}}',
    },
})
Record({
    $id: Now.ID['1abf491233570354606f1c282e5c7b35'],
    table: 'sys_element_mapping',
    data: {
        field: 'script',
        id: 'cabf451233570354606f1c282e5c7bc3',
        table: 'var__m_sys_flow_step_definition_input_106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['56bf491233570354606f1c282e5c7b39'],
    table: 'sys_element_mapping',
    data: {
        field: 'status',
        id: 'cabf451233570354606f1c282e5c7bc3',
        table: 'var__m_sys_hub_step_ext_input_cabf451233570354606f1c282e5c7bc3',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].status}}',
    },
})
Record({
    $id: Now.ID['3c142d5e335b8354606f1c282e5c7bed'],
    table: 'sys_element_mapping',
    data: {
        field: 'output',
        id: '0fef419633570354606f1c282e5c7bf3',
        table: 'var__m_sys_hub_action_output_0fef419633570354606f1c282e5c7bf3',
        value: '{{step[5e2a5210-e4a1-4308-90d1-dc7faad820a5].skill_output}}',
    },
})
Record({
    $id: Now.ID['77ef899633570354606f1c282e5c7bf6'],
    table: 'sys_element_mapping',
    data: {
        field: 'skill_output',
        id: '0fef419633570354606f1c282e5c7bf3',
        table: 'var__m_sys_hub_action_output_0fef419633570354606f1c282e5c7bf3',
        value: '{{step[5e2a5210-e4a1-4308-90d1-dc7faad820a5].skill_output}}',
    },
})
Record({
    $id: Now.ID['3fef899633570354606f1c282e5c7bf6'],
    table: 'sys_element_mapping',
    data: {
        field: '__action_status__',
        id: '0fef419633570354606f1c282e5c7bf3',
        table: 'var__m_sys_hub_action_output_0fef419633570354606f1c282e5c7bf3',
    },
})
Record({
    $id: Now.ID['dbef459633570354606f1c282e5c7b68'],
    table: 'sys_element_mapping',
    data: {
        field: 'application',
        id: '17efc19633570354606f1c282e5c7bf1',
        table: 'var__m_sys_flow_step_definition_input_106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['13ef459633570354606f1c282e5c7b69'],
    table: 'sys_element_mapping',
    data: {
        field: 'script',
        id: '17efc19633570354606f1c282e5c7bf1',
        table: 'var__m_sys_flow_step_definition_input_106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['9fef459633570354606f1c282e5c7bf3'],
    table: 'sys_element_mapping',
    data: {
        field: 'skill_id',
        id: '17efc19633570354606f1c282e5c7bf1',
        table: 'var__m_sys_hub_step_ext_input_17efc19633570354606f1c282e5c7bf1',
        value: '{{action.skill_config_id.sys_id}}',
    },
})
Record({
    $id: Now.ID['57ef459633570354606f1c282e5c7bf4'],
    table: 'sys_element_mapping',
    data: {
        field: 'skill_inputs',
        id: '17efc19633570354606f1c282e5c7bf1',
        table: 'var__m_sys_hub_step_ext_input_17efc19633570354606f1c282e5c7bf1',
        value: '{{action.skill_inputs}}',
    },
})
Record({
    $id: Now.ID['e7ef859633570354606f1c282e5c7b5b'],
    table: 'sys_element_mapping',
    data: {
        field: 'payload',
        id: '6fef459633570354606f1c282e5c7bf8',
        table: 'var__m_sys_flow_step_definition_input_7db1be8aff10221013f0ffffffffff2c',
        value: '{{step[b98305ec-e0ae-4099-ae16-a7c8008cb3e8].payload}}',
    },
})
Record({
    $id: Now.ID['a3ef859633570354606f1c282e5c7b5b'],
    table: 'sys_element_mapping',
    data: {
        field: 'skill_config',
        id: '6fef459633570354606f1c282e5c7bf8',
        table: 'var__m_sys_flow_step_definition_input_7db1be8aff10221013f0ffffffffff2c',
        value: '{{action.skill_config_id}}',
    },
})
Record({
    $id: Now.ID['e7ef099633570354606f1c282e5c7bee'],
    table: 'sys_element_mapping',
    data: {
        field: 'application',
        id: '6fef859633570354606f1c282e5c7b5c',
        table: 'var__m_sys_flow_step_definition_input_106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['6fef099633570354606f1c282e5c7bf0'],
    table: 'sys_element_mapping',
    data: {
        field: 'error',
        id: '6fef859633570354606f1c282e5c7b5c',
        table: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].error}}',
    },
})
Record({
    $id: Now.ID['27ef099633570354606f1c282e5c7bf1'],
    table: 'sys_element_mapping',
    data: {
        field: 'provider',
        id: '6fef859633570354606f1c282e5c7b5c',
        table: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].provider}}',
    },
})
Record({
    $id: Now.ID['a3ef099633570354606f1c282e5c7bf2'],
    table: 'sys_element_mapping',
    data: {
        field: 'response',
        id: '6fef859633570354606f1c282e5c7b5c',
        table: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].response}}',
    },
})
Record({
    $id: Now.ID['ebef099633570354606f1c282e5c7bf1'],
    table: 'sys_element_mapping',
    data: {
        field: 'results',
        id: '6fef859633570354606f1c282e5c7b5c',
        table: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].result}}',
    },
})
Record({
    $id: Now.ID['2fef099633570354606f1c282e5c7bee'],
    table: 'sys_element_mapping',
    data: {
        field: 'script',
        id: '6fef859633570354606f1c282e5c7b5c',
        table: 'var__m_sys_flow_step_definition_input_106afb6647032200b4fad7527c9a71e7',
    },
})
Record({
    $id: Now.ID['6bef099633570354606f1c282e5c7bf2'],
    table: 'sys_element_mapping',
    data: {
        field: 'status',
        id: '6fef859633570354606f1c282e5c7b5c',
        table: 'var__m_sys_hub_step_ext_input_6fef859633570354606f1c282e5c7b5c',
        value: '{{step[90c73768-edef-4666-81dc-c8192df176a4].status}}',
    },
})
