import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '8cd93c4c164e43718402ec511d0e543a'
                    }
                    'bp-br-no-condition': {
                        table: 'scan_table_check'
                        id: '84362a34558d4146bacf5278cc97ebd3'
                        deleted: true
                    }
                    'bp-console-usage': {
                        table: 'scan_column_type_check'
                        id: '7a999be71ed04f42b1ee9647fff71243'
                        deleted: true
                    }
                    'bp-dom-manipulation': {
                        table: 'scan_column_type_check'
                        id: '6fc612dde5fb4789a9e1b8ef2a470731'
                        deleted: true
                    }
                    'bp-eval-usage': {
                        table: 'scan_linter_check'
                        id: 'fd0a96529fc34a00ad33f3f1446a0bd9'
                        deleted: true
                    }
                    'bp-getrowcount-usage': {
                        table: 'scan_column_type_check'
                        id: '77046766aa3d40db8e64b63f3db83c74'
                        deleted: true
                    }
                    'bp-gs-log-usage': {
                        table: 'scan_column_type_check'
                        id: 'e801035f05634708ae05bc49c930e0a7'
                        deleted: true
                    }
                    'bp-hardcoded-credentials': {
                        table: 'scan_column_type_check'
                        id: '3a173c548c8b40d0a070fc5c16980808'
                        deleted: true
                    }
                    'bp-hardcoded-sysid': {
                        table: 'scan_column_type_check'
                        id: 'cc741d5814c043e4b03357033130dfd6'
                        deleted: true
                    }
                    code_review_artifact_collector: {
                        table: 'sys_script_include'
                        id: '378a3a274cb1438dbe11f755ecdabc20'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'fb678ec4463b4908b5fd22e9cf2d5b91'
                    }
                    'src_server_script-includes_code-review-artifact-collector_js': {
                        table: 'sys_module'
                        id: 'c26baa27852444c59b14934c70b99486'
                    }
                }
                composite: [
                    {
                        table: 'sys_choice_set'
                        id: '00aa593cb14a4a64b11749ff6deb13bb'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '06a5258104e743e6b4e54666ff5a2e4b'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '070c3a7c95e3492785d795367acbc2a4'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'recommendation'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '09d0e8959a844dd2ab9ca6f613c8a3bb'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'source_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0c00fe326560426cb7b14e0e418b2097'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'severity'
                            value: 'moderate'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0c713400cc104068b6ebd6114c61aa9f'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '0e5933bf7d4b40b9b080a1a51a0f41a3'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0fcadeb237fe4a81914a240760b6565f'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '12e316a1513b4bd58166980ae27fe815'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'category'
                            value: 'performance'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '137a4a0ec67c42b28fe924ef9f9dc8c5'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '15a17da1f0b04f0aae42bbd15015914c'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'review_run'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '18daf293d2914bccada904d172e01914'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'summary'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c0130a9bb0240e9b06f5fa47c6026a2'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'line_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1e1fcd18ee0c4216822aa705949b2620'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'finding_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ee1301987d54cb7ad683f965d5f0c0e'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '269f2c2f93b54c319318fbb2ec5864d7'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'application'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2f4142335d06467a9f4183a9800eaf22'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3565ed01c20a482987a6ae6b08d85ed7'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'artifact_count'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '36ebb45123cb4a42b4de6de4e4bede9d'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'category'
                            value: 'best_practice'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '416669748a674ba09ed8e1e9b5169f2d'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'line_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '43207572eb824a6f91974eaf0dc93841'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'source_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '44231aa04e084c859cdcd0f3f9567164'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'source_table'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '484352c8f77247049640996f5e106411'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'status'
                            value: 'error'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4a618255af154bafa7b7e43a9c27a188'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'category'
                            value: 'security'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '50b9653d6ee947ac9eaa277a4ab31e4a'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'status'
                            value: 'requested'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5462ae8769d243f1b5b19b05f9dc85d4'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e13a38982534d11a0e439a7d3394dda'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'raw_response'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5e705a0994204f85873fe7a30c875aab'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'category'
                            value: 'hardcoding'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '60498c8ff9a74c359f5a137db98ed85f'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '646bb84595ff453bab7226a19bf9ae15'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '693406b082f4481d8284a172584f5e7e'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '70989acc6a614822aaf75b20c63c62bb'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '70c36e5e384044948aee7a149ee42183'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'application'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7151e29d65fe4dc98042b5837d99c1c2'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_type'
                            value: 'flow'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '71f2835ef70d4d509e150c31f9d9670c'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'application'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7277a8c53a3847b3b9201cfbb8483832'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'summary'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '728b436193a448bc8941bbb5f937489b'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'severity'
                            value: 'critical'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '73cec89c31424381a2788665d719f268'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7a3a5bea8ce643e6a8c3e9601eaf869c'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'severity'
                            value: 'high'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '80224b49874f4170a68f023c80f5b9c8'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'status'
                            value: 'complete'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '838424b8332d4698bdf0298351b6d0bb'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'finding_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8496113abe7c49c1b090cf67e82b4ae2'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'started'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '858e5810e7ed4d258a6de7c7d292f925'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'finished'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '896c597942c345648985124114e1fefd'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'issue'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '954cd2d1c0f14ad3a8422ae1524f537b'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '962180cfe24943af9980acd5f491efb4'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_type'
                            value: 'script'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9b46cbe377d84db1819c5724bdfb4cd4'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'recommendation'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9cf3a6b0999545c786f9babac5d5be4c'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'started'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9e68414f995c4e90a5bbda6f625f71a9'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'review_run'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a081046dc3f04501bcdca428a6931877'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_type'
                            value: 'ui_page'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a34dff226cc748afb79ce9a068f7eb3b'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'issue'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a41b1e923be34f49ad8bfe34c1d08aa3'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'artifact_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a5ee6bc597184973b50b7b3de0ba684b'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a90c8b14c28d43ff8ab24737c8202795'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'severity'
                            value: 'low'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b371e34875f74b70943006cadcc78c55'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5a75101ff8d4c5b997c7b0a040ade17'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'b97e119ec0724d839f5422a576c393ce'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bd4055686e8d413097d37acce24c1793'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_type'
                            value: 'table'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c2795fde31cc482ab26aab7746c91a64'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'artifact_type'
                            value: 'scripted_rest'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c466d466c1cf420da7372880669cbd42'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'raw_response'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c5646470fda648a789e0e0863996616a'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'finished'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cadcce6e432241e8bb98676eeaae00db'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'category'
                            value: 'maintainability'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd2ef722a25b34ebeab03aae6a3cebcb4'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dc2b35d8d4714625bd52998454f7ee70'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'de12e382c68943cb9008744c2edce48d'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e058212fb3614d6394afbfbfaa519a81'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e420889ce2e34a67ae0e3e657506f1ae'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f00c2ef08325441abef49611014ba06c'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'application'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f4fd6eaa11c849f49fbeb8f93ddf9c65'
                        key: {
                            name: 'x_rptp_ai_code_rev_review_run'
                            element: 'status'
                            value: 'running'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fb1b91a448d34840a024350954d2f782'
                        key: {
                            name: 'x_rptp_ai_code_rev_finding'
                            element: 'source_table'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
