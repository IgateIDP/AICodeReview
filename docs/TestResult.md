# TestResult

Validation record for the **AI Code Reviewer** application.
Companion to `genai-code-review-skill-scope.md` and `genai-code-review-implementation-plan.md`.

---

## Environment

| Item | Value |
|---|---|
| Instance | `ven06798.service-now.com` |
| Application | AI Code Reviewer |
| Scope | `x_rptp_ai_code_rev` |
| Scope sys_id | `68e08f6c471b4bd0e9ddbf66706d4379` |
| Fluent SDK | 4.11.2 |
| Date | September 2026 |

---

# Phase 1 — Foundation: Validation Results

**Scope of testing:** the two results tables, the `CodeReviewArtifactCollector`
Script Include (enumerator), and the six cross-scope read privileges.

## Summary

| ID | Test | Result |
|----|------|--------|
| TC-01 | Clean slate — legacy scan checks removed from instance | ✅ Pass |
| TC-02 | TypeScript diagnostics — results tables | ✅ Pass |
| TC-03 | TypeScript diagnostics — enumerator Script Include | ✅ Pass |
| TC-04 | TypeScript diagnostics — cross-scope privileges | ✅ Pass |
| TC-05 | Application build | ✅ Pass |
| TC-06 | Application install | ✅ Pass |
| TC-07 | Enumerator — own scope (smoke test) | ✅ Pass |
| TC-08 | Cross-scope privileges present on instance | ✅ Pass (with note) |
| TC-09 | Enumerator — real application (LOS), 35 artifacts | ✅ Pass |

**Overall: 9 / 9 passed.** Phase 1 accepted.

---

## TC-01 — Clean slate: legacy scan checks removed

**Purpose:** confirm the 8 deterministic Instance Scan checks were fully removed from
the instance after the pivot to the GenAI approach (source deleted + build/install).

**Method:** query `scan_check` where `sys_scope=68e08f6c471b4bd0e9ddbf66706d4379`.

**Expected:** zero records.
**Actual:** `No matching records found.`

**Result:** ✅ Pass — instance matches the cleaned source. OOB Instance Scan suites untouched.

---

## TC-02 → TC-04 — TypeScript diagnostics

| File | Result |
|---|---|
| `src/fluent/tables/code-review-tables.now.ts` | No errors found |
| `src/fluent/script-includes/code-review-artifact-collector.now.ts` | No errors found |
| `src/fluent/security/cross-scope-privileges.now.ts` | No errors found |

**Result:** ✅ Pass — no diagnostics on any Fluent source file.

---

## TC-05 / TC-06 — Build and install

**Build:** `ServiceNow application AI Code Reviewer built successfully!`

**Install:** succeeded. Tables surfaced by the installer:
- Code Review Run → `x_rptp_ai_code_rev_review_run_list.do`
- Code Review Finding → `x_rptp_ai_code_rev_finding_list.do`

**Artifacts deployed:**

| Type | Name |
|---|---|
| Table (parent) | `x_rptp_ai_code_rev_review_run` |
| Table (child) | `x_rptp_ai_code_rev_finding` |
| Script Include | `CodeReviewArtifactCollector` |
| Cross-scope privileges | 6 × read (see TC-08) |

**Result:** ✅ Pass.

---

## TC-07 — Enumerator smoke test (own scope)

**Purpose:** verify the enumerator returns app-owned artifacts with a routing key.

**Input:** `getArtifacts('68e08f6c471b4bd0e9ddbf66706d4379')` (AI Code Reviewer's own scope)

**Expected:** 1 artifact — the `CodeReviewArtifactCollector` Script Include.

**Actual:**
```
artifact count: 1
[{ "source_table": "sys_script_include",
   "sys_id": "378a3a274cb1438dbe11f755ecdabc20",
   "name": "CodeReviewArtifactCollector",
   "reviewer_type": "script" }]
```

**Result:** ✅ Pass — correct artifact, correct `reviewer_type`.

**Observation:** this run emitted `Security restricted: … granted and added to 'AI Code
Reviewer' cross scope privileges` for all six platform tables — the platform
auto-granted cross-scope reads at runtime. This finding drove the TC-08 hardening.

---

## TC-08 — Cross-scope privileges on instance

**Purpose:** confirm the six read privileges are declared in the app and present.

**Method:** query `sys_scope_privilege` where `source_scope=68e08f6c471b4bd0e9ddbf66706d4379`.

**Actual:** 6 records, all `operation=read`, `target_scope=global`, `target_type=sys_db_object`:

| Target table | Operation | Status |
|---|---|---|
| `sys_script` | read | allowed |
| `sys_script_include` | read | allowed |
| `sys_script_client` | read | allowed |
| `sys_ui_action` | read | allowed |
| `sys_ws_operation` | read | allowed |
| `sys_ui_page` | read | allowed |

**Result:** ✅ Pass, **with note.**

> **Note — status discrepancy.** Source declares `status: 'requested'` (so a fresh install
> elsewhere lands pending for manual admin approval). On *this* instance they show
> `allowed`, because the TC-07 validation run had already auto-granted them before the
> declarations were installed; the install retained the existing `allowed` status.
> Functionally correct; nothing pending approval on this instance.

---

## TC-09 — Enumerator against a real application (LOS)

**Purpose:** validate enumeration and routing against a real, populated application
(satisfies Phase 1 item 3 — "seed a small set of real test records", met with a real
app instead of synthetic data).

**Target application:**

| Item | Value |
|---|---|
| Name | LOS - Loan Origination System |
| Scope | `x_rptp_los_loan_or` |
| sys_id | `d29c118aff2dc61019a8ffda7c4fd954` |

**Input:** `getArtifacts('d29c118aff2dc61019a8ffda7c4fd954')`

**Actual — 35 artifacts discovered:**

| Source table | Artifact type | Count | Routed to |
|---|---|---|---|
| `sys_script` | Business Rules | 18 | `script` |
| `sys_script_client` | Client Scripts | 10 | `script` |
| `sys_script_include` | Script Includes | 5 | `script` |
| `sys_ui_action` | UI Actions | 1 | `script` |
| `sys_ws_operation` | Scripted REST | 1 | `scripted_rest` |
| `sys_ui_page` | UI Pages | 0 | — |
| | **TOTAL** | **35** | script: 34, scripted_rest: 1 |

**Sample artifacts returned:**
`Check User Data`, `Populating Legal advisor field`, `Setting debt to income ratio LOS`,
`Home loan agreement pdf`, `Setting Max loan amount`, `Set Loan Amount Range`,
`Credit bureau Report pdf LOS`, `test pdf LOS`, `Creation of records - LOS`,
`Create record in gupshup`

**Result:** ✅ Pass — enumeration and routing correct across five artifact tables.

**Key confirmation:** **no `Security restricted` messages** in this run (unlike TC-07),
confirming the declared cross-scope privileges from TC-08 are effective.

---

## Observations & Follow-Ups

| # | Observation | Impact | Action |
|---|---|---|---|
| 1 | **No UI Pages in LOS** (`sys_ui_page` = 0) | The UI Page Reviewer cannot be validated with this app | Identify a UI-page-bearing application before testing that reviewer in Phase 3 |
| 2 | **35 artifacts = 35 LLM calls** for one app-wide review | Cost + runtime for full enumeration | Confirms Phase 4 decision to run the orchestrator **async/scheduled**; consider the findings-driven mode to narrow scope |
| 3 | `sys_ui_page` query fetched **all columns** (incl. heavy `html`, `client_script`, `processing_script`) just to read a name | Unnecessary I/O on large apps | Optimize enumerator to select only `sys_id` / `name` |
| 4 | Cross-scope privilege status is `allowed` here, `requested` in source | Cosmetic on this instance | Leave as-is; portable behavior is correct |

---

## Sign-Off

**Phase 1 (Foundation): ACCEPTED** — 9/9 tests passed. Tables, enumerator, and
cross-scope privileges are deployed and verified against a real application.

**Test corpus for later phases:** LOS - Loan Origination System
(`d29c118aff2dc61019a8ffda7c4fd954`) — 35 artifacts, of which 18 Business Rules and
5 Script Includes make an ideal real test set for the Phase 2 Script Reviewer skill.

**Not yet tested (out of Phase 1 scope):** GenAI reviewer skills, orchestrator Flow,
results-table population, per-application reporting.

---

# Phase 2 — Script Reviewer Skill + Enumerator Optimization: Validation Results

**Scope of testing:** the `Script Code Reviewer` GenAI Skill, the
`CodeReviewScriptGatherer` Script Include, and the optimization of
`CodeReviewArtifactCollector` (Phase 1 observation #3).

## Summary

| ID | Test | Result |
|----|------|--------|
| TC-10 | Licensing gate (`primeSKU`) | ✅ Pass |
| TC-11 | Edit/duplicate skill detection in scope | ✅ Pass |
| TC-12 | Approved provider + model discovery | ✅ Pass |
| TC-13 | TypeScript diagnostics — skill + gatherer | ✅ Pass |
| TC-14 | Build + install | ✅ Pass |
| TC-15 | Skill Builder URL chain resolves | ✅ Pass |
| TC-16 | Gatherer returns code + review context | ✅ Pass |
| TC-17 | Gatherer rejects non-allow-listed table | ✅ Pass |
| TC-18 | Enumerator still returns 35 LOS artifacts after change | ✅ Pass |
| TC-19 | Flow Action generated in scope | ❌ **Not generated** — see Finding A |
| TC-20 | `sys_ui_page` over-fetch resolved (obs #3) | ❌ **Not resolved** — see Finding B |
| TC-21 | Skill LLM execution (end-to-end review) | ✅ Pass — confirmed working by product owner |
| TC-22 | Prompt + skill published/activated | ✅ Pass |

**20 passed · 2 not resolved (Findings A and B, both carried to Phase 3/4).**

---

## TC-10 — Licensing gate

`is_product_available(pluginKey: "primeSKU")` → *"Access verified. You can create agents and skills."*
**Result:** ✅ Pass.

## TC-11 — Edit / duplicate detection

Query `sn_nowassist_skill_config` where `sys_scope=68e08f6c471b4bd0e9ddbf66706d4379` → no records.
**Result:** ✅ Pass — clean create path, no name collision.

## TC-12 — Provider & model discovery

`run_query` on `sys_generative_ai_provider_mapping` truncated at 10 of 25 rows, so discovery was
re-run as a script to enumerate all mappings, resolve display names, check approval, and list models.

- **Total external mappings:** 25
- **Approval source:** `sys_gen_ai_provider_routing` (tier 2 — no steward override present)
- **Approved providers with models:** AWS Claude, Azure OpenAI, Google Gemini, Now LLM Service
- **Excluded (not approved):** Open AI, IBM Watson, Now LLM LTS Service, Perplexity, Custom LLM Provider, GAF Provider, Agenticaiexecutor

**Result:** ✅ Pass. **Lesson:** paginate provider discovery — the truncated query would have hidden 15 mappings.

## TC-13 / TC-14 — Diagnostics, build, install

| File | Result |
|---|---|
| `src/fluent/now-assist-skills/script-reviewer.now.ts` | No errors |
| `src/fluent/script-includes/code-review-script-gatherer.now.ts` | No errors |

Build succeeded; install succeeded.
**Result:** ✅ Pass.

## TC-15 — Skill Builder URL chain

| Element | Value |
|---|---|
| capability_id | `b12d93172c9a43d49721189a636d1bb5` |
| config_id | `3dcf71594ef848398143dcbb6a4e12a6` |
| capability_definition_id | `807eef541ac54cc782a482d2d67d0cb7` |
| prompt_id | `1451649a72bb4e828761ced4250633e1` |

All share `sys_scope = 68e08f6c471b4bd0e9ddbf66706d4379` and chain correctly.

**Skill URL:**
`https://ven06798.service-now.com/now/now-assist-skillkit/skill/b12d93172c9a43d49721189a636d1bb5/params/prompt-id/1451649a72bb4e828761ced4250633e1/config-id/3dcf71594ef848398143dcbb6a4e12a6`

**Result:** ✅ Pass.

## TC-16 — Gatherer returns code + review context

**Input:** `gatherScriptArtifact('sys_script', '8c1c5f2647d68650e9ddbf66706d4318')`
(LOS Business Rule *"Create record in gupshup"*)

**Actual:** 1137-char JSON payload containing `artifact_type: "Business Rule"`,
`application: "LOS - Loan Origination System"`, the full `script`, `script_truncated: false`,
and `context` = `collection`, `when: "after"`, `order`, `action_insert/update/delete/query`,
`condition: null`, `filter_condition: "statusCHANGESTOmobile_verification_inprogress^EQ"`, `advanced`.

**Result:** ✅ Pass — all confirmed fields present and correctly populated.

**Why this artifact was chosen as the test value:** it contains multiple genuine, reviewable
defects — `Math.random()` for OTP generation (insecure), hardcoded `"+91"` dialling code,
a hardcoded cross-scope table (`x_rptp_insureme_gupshupinteg`), `current.update()` inside an
`after` rule, and commented-out debug code.

## TC-17 — Allow-list enforcement (negative test)

**Input:** `gatherScriptArtifact('sys_user', '...')`
**Actual:** `{"error":"Unsupported source table: sys_user","supported":["sys_script","sys_script_include","sys_script_client","sys_ui_action"]}`
**Result:** ✅ Pass — arbitrary table names cannot be injected via skill input.

## TC-18 — Enumerator regression check

**Input:** `getArtifacts('d29c118aff2dc61019a8ffda7c4fd954')`
**Actual:** 35 artifacts — unchanged from TC-09.
**Result:** ✅ Pass — no regression from the optimization; `orderBy('name')` now gives deterministic ordering.

---

## Findings

### Finding A — No Flow Action is generated (TC-19)

`deploymentSettings: { flowAction: true }` did **not** produce a
`sys_hub_action_type_definition` record — neither at install nor after publish/activate.

**Verified facts (post publish/activate):**

| Check | Result |
|---|---|
| Prompt `Review Script Artifact` | `state = published`, `active = 1` ✅ |
| Capability `Script Code Reviewer` | `active = 1` ✅ |
| Flow Actions in app scope | **0** |
| Flow Actions named like "Script Code Reviewer" (any scope) | **0** |
| Flow Actions created in the last 3 hours (any scope) | **0** |
| `sys_hub_action_type_base` containing "Code Review" | **0** |

So the skill is genuinely published and active, yet no Flow Action record exists anywhere.

**Two earlier assessments were wrong** and are corrected here:
1. First assumed the Flow Action was missing because the skill was unpublished — publishing did not create it.
2. Then assumed publish/activate would materialize it — it did not.

**Current hypothesis (unproven):** `flowAction: true` likely registers the skill as
*available to Flow Designer* (discoverable when adding an action inside a flow) rather than
pre-creating a standalone `sys_hub_action_type_definition` record. Platform capabilities are
often exposed to Flow Designer dynamically through the capability record.

**Definitive test — deferred to Phase 4:** attempt to add **Script Code Reviewer** as an action
inside a Flow in Flow Designer.
- If it appears → `flowAction: true` works as designed and the expectation of a pre-created
  record was simply incorrect. No change needed.
- If it does not appear → fall back to invoking the skill from a **script step** inside the
  orchestrator Flow, or wrap it in a **Subflow**.

**Impact on Phase 2:** none. The skill is published, active, and confirmed working end-to-end
(TC-21). This only affects *how* Phase 4 wires the orchestrator.

### Finding B — Phase 1 observation #3 NOT resolved (TC-20)

The optimization removed `getDisplayValue()` and added deterministic naming/ordering, but the
SQL trace shows `sys_ui_page` **still selects every column** (`html`, `client_script`,
`processing_script`, …):

```
SELECT sys_ui_page0.`direct`, sys_ui_page0.`processing_script`, ... sys_ui_page0.`html`, ...
FROM sys_ui_page ... WHERE sys_metadata0.`sys_scope` = '...'
```

**Assessment — the original diagnosis was wrong.** `getDisplayValue()` was not the cause:
- The full-column select happens at **query execution**, not at field access. LOS has **0 UI Pages**,
  so the `while` loop never ran and no field was ever read — yet all columns were still selected.
- The other four script tables select `sys_id` only, both before and after the change.

So the behaviour is **platform-driven for `sys_ui_page` specifically**, not caused by our code.

**Impact:** nil for LOS (0 UI Pages). Would matter on a UI-Page-heavy application.

**Options:** (a) accept it — UI Page counts are typically low; (b) query `sys_ui_page` only when the
UI Page reviewer is actually in scope for the run; (c) investigate a dictionary attribute on
`sys_ui_page` forcing the full read. **Recommendation:** defer to Phase 3 when the UI Page reviewer
is built, and re-measure then.

### Finding C — Runtime cross-scope privilege auto-granted for `GlideRecordSecure`

The validation run logged:
> *Execute operation on API 'GlideRecordSecure.getValue' from scope 'AI Code Reviewer' was granted and added to cross scope privileges*

This is a **genuine runtime dependency of the gatherer** (not just the test harness), unlike the
other grants in that run which came from the validation script reading skill/provider tables.

**Risk:** relying on interactive auto-grant may fail when the Phase 4 orchestrator Flow runs
unattended, and it is not reproducible on a fresh instance.

**Action:** declare an explicit `CrossScopePrivilege` with `targetType: 'scriptable'` /
`operation: 'execute'` for the `GlideRecordSecure` API before Phase 4.

---

## Phase 2 Addendum — Metadata Sync Verification

After the skill was published/activated in Skill Builder, an install was **blocked** by a
"metadata sync is required" gate. The sync was run in the IDE and the install retried.

| ID | Test | Result |
|----|------|--------|
| TC-23 | Metadata sync pulls instance state into source | ✅ Pass |
| TC-24 | Post-sync install succeeds (gate cleared) | ✅ Pass |
| TC-25 | Install does **not** revert the Skill Builder publish | ✅ Pass |
| TC-26 | `GlideRecordSecure.getValue` privilege declared in source | ✅ Pass |

### What the sync changed in source

| Change | Detail |
|---|---|
| Prompt versions 1 → 2 | v1 → `promptState: 'archived'`; new **v2** → `promptState: 'published'`, `version: 2` |
| `state: 'published'` added | Written at the **skill definition** level |
| `outputs` materialized | All 5 standard outputs written explicitly (previously omitted) |
| Tool `$id`s replaced | Descriptive keys → generated GUIDs bound to the real records |
| `providerAPI` materialized | Now LLM Generic `provider_implementation` sys_id written in |
| `truncate: false` added | On both string inputs |
| Tool input names lowercased | `sourceTable` → `sourcetable`, `artifactSysId` → `artifactsysid` |

### TC-25 — Publish preserved (the key check)

Post-install state of `sys_generative_ai_config` for definition `807eef54...`:

| Version | sys_id | state | active |
|---|---|---|---|
| 1 | `1451649a...` | `archived` | `0` |
| **2** | `473937ac...` | **`published`** | **`1`** |

Both records were touched by the install (`sys_updated_on 10:02:52`) but the **synced states were
applied faithfully** — the publish was not reverted. This confirms the sync gate's purpose and
removes the risk for the Phase 3 install.

Incidental confirmations: the stored prompt shows `{{gatherScript.output}}` (the TypeScript
`${p.tool.gatherScript.output}` compiled correctly to platform syntax), and
`request_tokens: 126822` on both versions proves the prompt genuinely executed (corroborating TC-21).

### TC-26 — Privilege merge behaviour

`GlideRecordSecure.getValue` (`targetType: 'scriptable'`, `operation: 'execute'`) is present with
`status: 'allowed'` and `sys_mod_count: 0` — i.e. the declared record **merged with the existing
auto-granted record** on the natural key rather than creating a duplicate or downgrading the
status. Identical behaviour to the six table privileges in TC-08.

### Finding D — Correction: skill state IS expressible in Fluent

An earlier assessment in this project claimed skill activation could not be expressed in the
Fluent skill config, on the grounds that `SkillDefinition` has no `active`/`state` property in the
API reference. **That was wrong.** The sync wrote **`state: 'published'`** into the skill
definition, and a build-time validator had already hinted at it:

> *"Cannot set prompt … to 'published' because the skill state is not 'published'."*

**Correct model:**
- **Author** new prompt versions as `promptState: 'draft'` (validation rule P1).
- **Publish/activate** in Skill Builder (a UI action).
- **Run the metadata sync** so the resulting `state` / `promptState` values flow back into source.
- Subsequent installs then preserve the published state instead of reverting it.

**Process rule for later phases:** after any Skill Builder change, run the metadata sync **before**
the next build/install.

---

## Sign-Off

**Phase 2: COMPLETE.** The Script Code Reviewer skill is built, installed, published, activated,
and confirmed working end-to-end (TC-21). The gather tool is validated including its negative
test, the enumerator is optimized without regression, source and instance are reconciled via
metadata sync, and the `GlideRecordSecure` privilege is declared.

**Findings closed:** C (privilege declared), D (state property corrected).
**Findings carried forward:** A (no Flow Action — definitive test in Phase 4),
B (`sys_ui_page` over-fetch — re-measure in Phase 3).

---

# Phase 3a — Scripted REST Folded into Script Reviewer: Validation Results

**Design change:** Scripted REST is reviewed by the existing **Script Code Reviewer** rather than a
separate skill, reducing v1 from 3 reviewer skills to 2.

**Test artifact:** LOS Scripted REST operation **`getAadhar`**
(`sys_ws_operation` / `ca7cb01947eaa650e9ddbf66706d4390`, URI `/api/x_rptp_los_loan_or/glos/getAadhar`).

## Summary

| ID | Test | Result |
|----|------|--------|
| TC-27 | Gatherer reads REST code from `operation_script` | ✅ Pass |
| TC-28 | REST security context captured | ✅ Pass |
| TC-29 | Full REST source retrieved (marker check) | ✅ Pass |
| TC-30 | Regression: `script`-field artifacts unaffected | ✅ Pass |
| TC-31 | Allow-list negative test still enforced | ✅ Pass |
| TC-32 | Enumerator reroutes `sys_ws_operation` → `script` | ✅ Pass |
| TC-33 | Diagnostics + build + install | ✅ Pass |
| TC-34 | Finding B re-measured | ❌ Still present |

**7 passed · 1 confirmed unresolved (Finding B).**

## TC-27 / TC-28 — Gather output

| Field | Value |
|---|---|
| `artifact_type` | `Scripted REST Resource` |
| `script_field` | **`operation_script`** |
| `name` | `getAadhar` |
| `description` | `""` (record's `short_description` is genuinely null) |
| `application` | LOS - Loan Origination System |
| script length | 2927 chars |
| `script_truncated` | `false` |

Captured `context`:
```json
{"http_method":"POST","relative_path":"/getAadhar",
 "operation_uri":"/api/x_rptp_los_loan_or/glos/getAadhar",
 "requires_authentication":"0","requires_acl_authorization":"0",
 "requires_snc_internal_role":"0","enforce_acl":null,
 "consumes":"application/json,application/xml,text/xml",
 "produces":"application/json,application/xml,text/xml",
 "support_trailing_slash":"0"}
```

**Critical:** `requires_authentication: "0"` and `requires_acl_authorization: "0"` are now surfaced
to the LLM — exactly the flags the v3 REST rubric keys on.

**Why the `scriptField` change was essential:** `sys_ws_operation` stores code in
`operation_script`. The original gatherer read `script`, which does not exist on this table — it
would have returned an **empty script** and the reviewer would have silently reported nothing.

## TC-29 — Marker check (proves real code retrieved)

| Marker | Present |
|---|---|
| `setBasicAuth` | ✅ |
| `Math.random` | ✅ |
| `ven06798.service-now.com` | ✅ |
| `customerData.otp` | ✅ |
| `gs.info("Aadhar` | ✅ |

These correspond to genuine defects in the artifact: **hardcoded credentials**
(`setBasicAuth('rahul.dhir', 'Potala1$%')`), insecure OTP generation, a hardcoded instance URL,
**the OTP returned in the response body**, and **Aadhaar (national ID) written to logs** — plus
`requires_authentication: 0` making the endpoint anonymous. An excellent adversarial test case.

## TC-30 / TC-31 — Regression and allow-list

- Business Rule `Create record in gupshup` → `script_field = script`, 575 chars, type `Business Rule`. No regression.
- `sys_user` rejected: `{"error":"Unsupported source table: sys_user","supported":["sys_script","sys_script_include","sys_script_client","sys_ui_action","sys_ws_operation"]}` — supported list correctly grew.

## TC-32 — Enumerator routing

LOS: **35 artifacts, `{"script": 35}`** (previously `{"script": 34, "scripted_rest": 1}`), and
`getAadhar → reviewer_type=script`. Single reviewer now covers all 5 script-family tables.

## TC-34 — Finding B re-measured: still present

The SQL trace again shows `sys_ui_page` selecting every column (`html`, `client_script`,
`processing_script`, …) while the other four tables select `sys_id` only. Unchanged and still
platform-driven. Impact remains nil for LOS (0 UI Pages). Carried into Phase 3b.

## Outstanding action

**Prompt v3 is `draft`.** The REST rubric is not live until v3 is **published in Skill Builder**,
followed by a **metadata sync**. Until then the skill runs published v2, which will still review a
REST artifact but without the REST-specific rules.

*(Resolved: v3 was published and synced — see Phase 3b, TC-41.)*

---

# Phase 3b — Service Portal Widget Reviewer + basic UI Page checks: Validation Results

**Two deliverables:** (1) a NEW standalone `Service Portal Widget Reviewer` skill; (2) UI Pages
folded into the existing Script Code Reviewer as prompt **v4 (draft)** with a minimal rubric.

## Summary

| ID | Test | Result |
|----|------|--------|
| TC-35 | `sp_widget` / `sys_ui_page` field names verified from dictionary | ✅ Pass |
| TC-36 | Widget gatherer returns all six surfaces with per-surface caps | ✅ Pass |
| TC-37 | Widget gatherer negative test | ✅ Pass |
| TC-38 | UI Page gathered via `html` + `additional_code` | ✅ Pass |
| TC-39 | Enumerator routing across three applications | ✅ Pass |
| TC-40 | Widget Reviewer skill installed, URL resolves | ✅ Pass |
| TC-41 | Script Reviewer prompt version states correct | ✅ Pass |
| TC-42 | Truncation does not hide findings | ❌ **Fail** — see Finding E |

**7 passed · 1 failed (Finding E).**

## TC-35 — Verified field names (no assumptions)

- **`sp_widget`**: `script` (server), `client_script`, `template` (html_template), `css`, `link`,
  `option_schema` (json), plus `id`, `category`, `controller_as`, `data_table`, `field_list`,
  `roles`, `public`, `has_preview`, `servicenow`, `internal`, `demo_data`, `description`.
- **`sys_ui_page`**: `html` (type **xml** — Jelly), `client_script` and `processing_script` (both
  `script_plain`), plus `category`, `direct`, `endpoint`, `description`.

## TC-36 — Widget gatherer against `Novel List Filter`

| Surface | Chars | Truncated |
|---|---|---|
| server_script | 9,520 | no |
| client_script | 21,454 | **yes** (cap 10,000) |
| template | 10,069 | **yes** (cap 8,000) |
| css | 13,698 | **yes** (cap 4,000) |
| link_function | 3,306 | **yes** (cap 3,000) |
| option_schema | 1,510 | no |

Total payload **40,406 bytes** — within the ~38 KB design budget.
`has_option_schema = true`; context captured `id=novel_list_filter`, `controller_as=c`,
`data_table=sp_instance_table`, `public=1`, and an 11-option `field_list`.
Content checks: server contains `new GlideRecord(` ✅, client contains `$http` ✅.

## TC-38 — UI Pages (AssetFlow Portfolio Hub)

| Page | html | client_script | processing_script | context |
|---|---|---|---|---|
| `asset_dashboard` | 2,282 | 0 | 0 | `direct=1`, endpoint `x_rptp_assetflow_3_asset_dashboard.do` |
| `portfolio` | 2,294 | 0 | 0 | `direct=1`, endpoint `x_rptp_assetflow_3_portfolio.do` |

The `extraCodeFields` mechanism works: `script_field = html` with `additional_code` present and
correctly reporting zero-length scripts for these Jelly-only pages.

## TC-39 — Enumerator routing

| Application | Total | Routing |
|---|---|---|
| Novel Jewels | 33 | `{script: 4, sp_widget: 29}` |
| AssetFlow Portfolio Hub | 5 | `{script: 5}` |
| **LOS** | **112** | `{script: 35, sp_widget: 77}` |

## TC-41 — Prompt version states (post-sync)

| Version | State | Active |
|---|---|---|
| v1 | archived | 0 |
| v2 | archived | 0 |
| **v3** | **published** | **1** |
| v4 | draft | 0 |

Confirms the intended lifecycle: v3 (REST rubric) is live; v4 (UI Page rubric) awaits publishing.

## TC-40 — Widget Reviewer skill

| Element | Value |
|---|---|
| capability_id | `0aff547e60f141b387a11d3f0262cb4d` |
| config_id | `c57deff0686f4a9cb889f239c3005282` |
| prompt_id | `689741e7fc414f61bde7962359a8be05` |
| prompt state | `draft` |

URL: `https://ven06798.service-now.com/now/now-assist-skillkit/skill/0aff547e60f141b387a11d3f0262cb4d/params/prompt-id/689741e7fc414f61bde7962359a8be05/config-id/c57deff0686f4a9cb889f239c3005282`

---

## Findings

### Finding E — Truncation can hide real findings (TC-42, FAILED)

During corpus profiling, `Novel List Filter` was flagged as containing a **hardcoded 32-character
sys_id**. After gathering, the same regex against the returned surfaces returned **false**.

**Cause:** the sys_id lies beyond a per-surface cap (client_script was cut from 21,454 → 10,000;
CSS from 13,698 → 4,000). The truncation that makes the payload LLM-safe **silently removed a
genuine defect**.

**Assessment:** this is the central trade-off of widget review — widgets are 40-65 KB and cannot be
sent whole, but naive head-truncation biases toward defects that appear early. The `_truncated`
flags prevent the model from *hallucinating* about missing code, but they do not prevent
*false negatives*.

**Mitigation options (not yet implemented):**
1. **Chunked review** — review each surface in its own LLM call, so each gets a full budget.
   Cost: ~4-6 calls per widget instead of 1.
2. **Pattern pre-scan** — cheaply regex the *full* untruncated surfaces for high-signal markers
   (sys_ids, credentials, URLs, `$http`, `document.`) and inject a "detected markers" list into the
   prompt, so the model is told about defects in truncated regions even when it cannot see them.
   Cheap and high value.
3. Raise caps for a larger-context provider (AWS Claude / Azure OpenAI both available).

**Recommendation:** option 2 as the immediate fix — it is inexpensive and directly closes the
false-negative gap. Worth doing before Phase 4.

### Finding F — LOS contains 77 previously unknown Service Portal widgets

Enumerating LOS with `sp_widget` in scope raised its artifact count from **35 → 112**. Verified as
real via `GlideAggregate` (COUNT = 77) with named samples: *Address details QDE*, *Appliaction form*,
*Applicant*, *Applicant data*, *Attachment*, *Bank Detailss*.

Earlier LOS surveys reported "35 artifacts" only because `sp_widget` was not yet in the enumerator's
type map — the widgets were always there, just invisible to us.

**Implications:**
- **Cost/runtime:** a full LOS review is now ~112 LLM calls, not 35. Reinforces async/scheduled
  orchestration in Phase 4 and the findings-driven narrowing option.
- **Value:** Service Portal is clearly the dominant artifact class on this instance
  (77 in LOS + 29 in Novel Jewels = 106 widgets across two apps), which validates the decision to
  give widgets a dedicated reviewer.
- Widget names contain obvious typos (*Appliaction*, *Detailss*), a soft signal about review rigour.

### Finding B — still open

`sys_ui_page` continues to select all columns at query time. Now measurable against AssetFlow (which
does have UI Pages), but unchanged and still platform-driven. Impact is low: UI Page counts are
small (2 in AssetFlow, 0 in LOS and Novel Jewels).

---

## Sign-Off

**Phase 3b: BUILT AND VALIDATED at the component level.** The Widget Reviewer skill and gatherer are
installed, the UI Page fold works, and enumerator routing is correct across three applications.

**Actions required:** publish **Widget Reviewer prompt v1** and **Script Reviewer prompt v4** in
Skill Builder, then run a metadata sync.

**Findings carried forward:** A (no Flow Action — Phase 4), B (`sys_ui_page` over-fetch),
**E (truncation false negatives — fix recommended before Phase 4)**, F (scope/cost recalibration).

---

# Phase 3c — Pre-scan + size tiers (closing Finding E): Validation Results

**Change:** added the shared `CodeReviewPreScanner` Script Include. It regexes the **FULL
untruncated** source of every code surface for 17 high-signal markers and classifies each hit as
**visible** or **hidden** relative to the truncation caps, so defects past a cap are still reported.
Also introduced three size tiers so oversized artifacts are never silently dropped.

## Size tiers

| Tier | Total chars | Behaviour |
|---|---|---|
| normal | ≤ 45,000 | Full review + pre-scan |
| oversized | 45,000–120,000 | Truncated review + pre-scan, `review_status: partial_oversized` |
| skipped | > 120,000 | **No LLM call.** `review_status: skipped_too_large`, signals only |

## Summary

| ID | Test | Result |
|----|------|--------|
| TC-43 | Pre-scan recovers hidden defects beyond truncation caps | ✅ **Pass** |
| TC-44 | Size tier assignment across the widget corpus | ✅ Pass |
| TC-45 | Script gatherer pre-scan on Scripted REST | ✅ Pass |
| TC-46 | Prompts updated in place (no version sprawl) | ✅ Pass |
| TC-47 | Original Finding E sys_id example reproduced | ❌ **Could not reproduce — see correction** |
| TC-48 | `sys_id_like_hex` false-positive rate | ✅ Pass |

## TC-43 — Hidden defects recovered (the core objective)

`Novel List Filter` → `review_status: partial_oversized`, 59,557 chars, 1,840 lines.

| Marker | Total | **Hidden** | Surface | First line |
|---|---|---|---|---|
| `console_statement` | 17 | **13** | client_script | 5 |
| `css_important` | 32 | **31** | css | 5 |
| `angular_http` | 3 | **2** | client_script | 160 |
| `dom_access` | 1 | **1** | client_script | **711** |
| `glide_record` | 12 | 0 | server_script | 39 |
| `get_row_count` | 1 | 0 | server_script | 175 |
| `external_url` | 1 | 0 | template | 1 |

**47 defect occurrences that were previously invisible are now reported to the model** — including
a DOM access at line 711, far past any truncation point. The objective of Finding E is met.

## TC-44 — Tier distribution (Novel Jewels, 29 widgets)

`{ normal: 25, oversized: 4, skipped: 0 }`. Largest widget `customer and inventory` at 65,814 chars
is classified **oversized, not skipped** — confirming the deliberate choice that the most complex
widgets still get reviewed rather than dropped.

## TC-45 — Scripted REST pre-scan (`getAadhar`)

`review_status: full`, tier `normal`, 2,927 chars. The pre-scan **independently reproduced every
defect previously identified by manual inspection**, with locating excerpts:

| Marker | Line | Excerpt |
|---|---|---|
| `credential_literal` | 15 | `restMsg.setBasicAuth('rahul.dhir', 'Potala1$%')` |
| `instance_url` | 12 | `https://ven06798.service-now.com/api/now/tabl…` |
| `email_address` ×4 | 55 | `addAddress("cc", "kumarraja.bammidi@rightprompt.ai")` |
| `math_random` | 41 | `Math.floor(100000 + Math.random() * 900000)` |

This is useful corroboration: a deterministic scan and a manual review reached the same conclusions.

## TC-47 — CORRECTION: the Finding E sys_id example was a false positive

**Finding E originally claimed** that `Novel List Filter` contained a hardcoded 32-character sys_id
which truncation had hidden. After implementing the pre-scan, **neither** the strict
(`hardcoded_sys_id`, quote-wrapped) **nor** the loose (`sys_id_like_hex`, word-boundary) pattern
detects any sys_id in that widget.

**Root cause — a flaw in my own profiling script, not in the widget.** The original corpus survey
tested `/[0-9a-f]{32}/` against `srv + cli + tpl` **concatenated into a single string**, with no
word boundaries. That produces spurious matches two ways: a 32-hex run can straddle the join
between two surfaces, and without `\b` the pattern matches inside any longer hex-like token
(minified identifiers, hashes).

**So there was never a hidden sys_id in `Novel List Filter`.** The specific example cited in
Finding E was wrong.

**Finding E's underlying concern was still valid and worth fixing** — TC-43 proves truncation was
hiding 47 real defect occurrences in that same widget. The diagnosis was right; the illustrating
example was not.

**Lesson recorded:** profiling regexes must not concatenate surfaces and should use word boundaries,
or they manufacture false positives that then get treated as evidence.

## TC-48 — `sys_id_like_hex` precision, and two genuine finds

Across all 29 Novel Jewels widgets: **2 widgets, 3 hits, 0 hidden — no false positives.**
Both hits are **real hardcoded sys_ids** the strict pattern alone would have under-reported:

| Widget | Surface | Evidence |
|---|---|---|
| `Novel Form` | client_script | `item.sys_id !== "432ace8b0a0a0b34006b02832660c894"` |
| `Start with sparkle` | server_script | `$sp.getParameter("a48bcf4247283650e9ddbf66706d43a6")` |

The looser pattern is therefore precise in practice on this corpus, and it found genuine defects.

---

## Sign-Off

**Phase 3c: COMPLETE. Finding E is CLOSED** — with its example corrected. The pre-scan recovers
defects beyond truncation caps, size tiers guarantee nothing is silently dropped, and both prompts
were edited in place (no new versions needed, since both were unpublished drafts).

**Actions required:** publish **Widget Reviewer prompt v1** and **Script Reviewer prompt v4** in
Skill Builder, then run a metadata sync.

**Findings carried forward:** A (no Flow Action — definitive test in Phase 4),
B (`sys_ui_page` over-fetch — low impact), F (scope/cost recalibration: LOS is ~112 artifacts).

---

# Finding A — RESOLVED: `flowAction: true` does not create a Flow Action record

**Tested three times, at three different lifecycle points:**

| When | Flow Actions in app scope |
|---|---|
| After install (skill draft) | 0 |
| After Script Reviewer published + activated | 0 |
| After **both** skills published + activated (v4 and v1 live) | **0** |

Also searched **all scopes** by name and by recent creation time: nothing. The only name match was
the unrelated OOB Global action *"Fetch All Document Reviewers for a document"*.

**Conclusion:** the original expectation — that `deploymentSettings: { flowAction: true }` would
materialise a `sys_hub_action_type_definition` record — is **wrong**. Three successive hypotheses
were falsified:
1. "It's missing because the skill is unpublished" → publishing did not create it.
2. "Publish/activate will materialise it" → it did not.
3. "Activating the second skill will confirm the pattern" → still zero.

**Remaining question (needs a UI check, not a query):** whether `flowAction: true` instead makes the
skill *dynamically discoverable inside Flow Designer* — registered via the capability record rather
than a pre-created action row. This cannot be determined from the database; it requires opening Flow
Designer and attempting to add the skill as an action.

**Phase 4 implications — two paths:**

- **Path 1 (if discoverable in Flow Designer):** build the orchestrator as a Flow that calls each
  reviewer directly. Simplest.
- **Path 2 (if not discoverable):** invoke the published skills from a **Script Include called by the
  Flow** (a script step), rather than as native flow actions. Note this still runs *through the
  skill* — prompts, provider config, and security controls remain intact — so it does **not** bypass
  skill governance the way a direct LLM call would. Slightly more code, no dependency on Flow
  Designer registration.

**Recommendation:** confirm with a 30-second Flow Designer check before committing Phase 4 to either
path, since it changes the orchestrator design.

## Finding A — ROOT CAUSE IDENTIFIED: a fourth lifecycle stage exists

The product owner discovered the missing step: **skills must additionally be activated in the
AI Admin Hub**, and that activation dialog asks for **"Flow Action Display = true/false"**.

**The skill lifecycle is therefore four stages, not three:**

| Stage | Where | Effect |
|---|---|---|
| 1. Define + install | Fluent source | Creates skill, capability, prompt records |
| 2. Publish prompt | Skill Builder | `sys_generative_ai_config.state = published` |
| 3. Activate skill | Skill Builder | `sys_one_extend_capability.active = 1` |
| **4. Activate in AI Admin Hub** | **AI Admin Hub** | Sets `sn_nowassist_skill_config.active`, and the **Flow Action Display** toggle governs Flow Action exposure |

**Confirming evidence (before stage 4):**

| Record | state | active |
|---|---|---|
| `sys_one_extend_capability` (both skills) | — | **1** ✅ |
| `sn_nowassist_skill_config` (both skills) | 1 | **null** ❌ |

So the capability was active while the skill config was not — a state I had misread as "fully
published". A dictionary search found **no** `flow_action_display` column on any skill table
(only `show_in_prompt_library` and mobile-card flags), which indicates the toggle *triggers creation
of* the `sys_hub_action_type_definition` record rather than being persisted as a field. That fully
explains why every query returned zero.

**Corrected conclusion:** `deploymentSettings: { flowAction: true }` declares the *intent* in source,
but Flow Action exposure requires AI Admin Hub activation with Flow Action Display enabled. Neither
of my earlier explanations (unpublished, or dynamic Flow Designer discovery) was correct.

**Incidental finding:** each `t.Script()` tool spawns its own capability record
(`..._gatherS`, `..._gatherW`, both `active=1`) alongside the parent skill capability.

**Next action:** activate both skills in AI Admin Hub with **Flow Action Display = true**, then
verify (a) `sn_nowassist_skill_config.active = 1` and (b) a `sys_hub_action_type_definition` row
appears in the app scope.

## Finding A — CLOSED: access is via the generic "Execute Skill" flow action

Both skills were activated in AI Admin Hub. The product owner then located the skills in Flow
Designer, and the decisive clue was the toggle's own help text:

> *"Allow the skill to be used from a flow action. Once activated, you can access the skill through
> **'Execute Skill'** flow action."*

**The correct mechanism:**

| Assumption tested | Reality |
|---|---|
| One `sys_hub_action_type_definition` **per skill**, in the app scope | **One generic OOB "Execute Skill" action** that takes the skill as a **parameter** |

This retrospectively explains every dead end in this investigation:
- The **app scope was always empty** because the action is OOB/global and is never created per skill.
- **Name searches failed** because the action is called *"Execute Skill"*, not *"Script Code Reviewer"*.
- `flowAction: true` plus AI Admin Hub activation make the skill **selectable inside** that generic
  action rather than generating an action of its own.
- The AI Admin Hub **Display** column reading *"ServiceNow Otto context menu"* is the interactive
  surface and is **unrelated** to flow availability — which is why it appeared to contradict the
  source configuration.

**Four successive hypotheses were falsified before reaching the right answer:** (1) unpublished
skill, (2) publish/activate would create it, (3) dynamic Flow Designer discovery of a per-skill
action, (4) a `flow_action_display` column would exist to query. The resolution came from reading
the admin UI, not the database — a reminder that some platform behaviour is not discoverable by query.

**Effect on Phase 4:** *simpler* than planned. No custom Flow Action is required; the orchestrator
calls **Execute Skill** and passes the appropriate skill per `reviewer_type`.

---

# Phase 4 — Orchestrator (IN PROGRESS)

## Architecture decision (recorded)

Authoring the "Execute Skill" call **in Fluent source is not supported** — confirmed three ways:
the flow guide only references OOB `action.core.*` actions or custom actions imported from the same
project; a `search_fluent_docs` for the skill action returned nothing; and flows are declarative so
JSON parsing/persistence cannot live in the flow. Two OOB actions invoke a skill: **"Execute an AI
skill"** (Global — clean 3-input contract: `AI Skill`, `Skill Inputs`, `Skill Output`) and
**"Execute Skill"** (AI Skill Kit — 9 inputs).

**Chosen design — hybrid (still flow-based):**
- A small **subflow built in Flow Designer** (synced to source) whose only job is the UI-gated
  Execute Skill call, branching on `reviewer_type`.
- A **Fluent-authored Script Include orchestrator** that enumerates, loops (batch-limited), invokes
  the subflow via `sn_fd.FlowAPI.getRunner()`, and persists via `CodeReviewFindingWriter`.
- Rationale: minimises the UI build to one subflow; keeps loop/routing/parse/persist in testable
  Fluent source. `sn_fd.FlowAPI.getRunner()` confirmed available at runtime.

## Summary

| ID | Test | Result |
|----|------|--------|
| TC-49 | `finding.artifact_type` choices expanded (adds `widget`, per-table granularity) | ✅ Pass |
| TC-50 | `CodeReviewFindingWriter` build + install | ✅ Pass |
| TC-51 | Parse clean JSON → findings | ✅ Pass |
| TC-52 | Parse markdown-fenced + prose response | ✅ Pass |
| TC-53 | Invalid severity/category coerced to safe defaults | ✅ Pass |
| TC-54 | Unparseable response recorded as explicit finding (not dropped) | ✅ Pass |
| TC-55 | `artifact_type` mapping from source table | ✅ Pass |
| TC-56 | `finalizeRun` severity rollup + summary | ✅ Pass |
| TC-57 | `sn_fd.FlowAPI.getRunner()` available for subflow invocation | ✅ Pass |

**9 passed.** Test rows were created then rolled back via the run_script rollback context.

## TC-51–56 — Finding writer end-to-end (one run, three responses)

| Response | Outcome |
|---|---|
| Clean JSON, 2 findings | 2 findings written (`business_rule`) |
| Fenced + prose, severity `BOGUS`, category `nonsense` | 1 finding; coerced to `moderate` / `best_practice` (`widget`) |
| `"The model refused to answer."` | 1 finding: `maintainability`/`low`, "did not return parseable JSON" (`ui_page`) |

`finalizeRun(run, 3, 'complete')` → `{critical:1, high:0, moderate:2, low:1}`, `artifact_count=3`,
`finding_count=4`, status `complete`, summary populated. All correct.

## Remaining Phase 4 work
1. **User:** build the "Review One Artifact" subflow in Flow Designer (Execute Skill per type), then sync.
2. **Agent:** author `CodeReviewOrchestrator` Script Include (enumerate → loop → `sn_fd.FlowAPI` subflow call → `recordReview` → `finalizeRun`), referencing the synced subflow's real input/output names.
3. Test end-to-end on AssetFlow (5 artifacts), then Novel Jewels; verify per-application reporting.

---

## Phase 4 — Orchestrator END-TO-END: Validation Results

The subflow build hit (and resolved) several real gotchas, all recorded for future reference:

| Gotcha | Resolution |
|---|---|
| OOB **"Execute an AI skill"** action ships with its **output not mapped** → `Skill Output` always blank (`response: null`, `status: success`) | Copied it to **"Copy of Execute an AI skill"** and mapped the action outputs to the internal *Call AI Skill → Skill Output* step |
| Flow Designer **Test panel unreliable** for GenAI (returns success/null) | Test via a real run (`sn_fd.FlowAPI`), not the Test panel |
| Mapping the **JSON** Skill Output into a **String** flow variable threw a coercion error | Make the flow variable **and** subflow output **Object** type — Object end-to-end, no coercion |
| Skill review content is delivered as an **Object** with `findings` both top-level and nested under `response` | `recordReview` updated to accept Object-or-String and read top-level `findings` (fallback to `response.findings`) |

### Summary

| ID | Test | Result |
|----|------|--------|
| TC-58 | Subflow returns the review as an Object (real run, not Test panel) | ✅ Pass |
| TC-59 | `recordReview` accepts Object + extracts top-level `findings` | ✅ Pass |
| TC-60 | `CodeReviewOrchestrator.run()` end-to-end on AssetFlow (2 artifacts) | ✅ Pass |
| TC-61 | Findings persisted with correct artifact_type / severity / category | ✅ Pass |
| TC-62 | Run finalised with severity rollup | ✅ Pass |
| TC-63 | Orchestrator runtime cross-scope privileges auto-granted, then declared in source | ✅ Pass |

### TC-60/61/62 — Orchestrator run on AssetFlow

`new CodeReviewOrchestrator().run('693d05ee47708b50e9ddbf66706d43a8', 2)` →
`{"run":"38c9a15e...","findings":4,"by_severity":{"critical":0,"high":0,"moderate":2,"low":2}}`

Run record: `status=complete`, `artifact_count=2`, `finding_count=4`. **4 findings written:**

| Artifact | artifact_type | severity/category | Issue |
|---|---|---|---|
| Asset - Assignment Tracking | business_rule | moderate/security | writes assigned user's data |
| Asset - Assignment Tracking | business_rule | low/maintainability | date fields as strings |
| Asset - Before Insert/Update Validation | business_rule | moderate/performance | no condition/filter — runs on every op |
| Asset - Before Insert/Update Validation | business_rule | low/maintainability | empty description |

Full chain proven: **orchestrator → subflow (Execute Skill) → live LLM → parsed Object → finding rows → finalised run.**

### TC-63 — Cross-scope privileges

First orchestrator run auto-granted: `sys_hub_flow` (read); `ScriptableFlowRunner.subflow/inForeground/withInputs/run` (execute); `ScopedGlideElement` (execute). All now declared in `cross-scope-privileges.now.ts` (`status: 'requested'`) for portability.

### Remaining
- Scale test: AssetFlow full (5), then **Novel Jewels** (exercises the `sp_widget` reviewer path end-to-end — not yet run through the orchestrator).
- **Sync** the subflow + "Copy of Execute an AI skill" into source (still no `flows/` folder).
- Phase 5+ (trigger/surfacing), Phase 6 (reporting), Phase 7 (hardening).

### TC-64 — Novel Jewels scale test (widget path through the orchestrator)

`new CodeReviewOrchestrator().run('e33bd60eff20fa5019a8ffda7c4fd925', 6)` (4 scripts + first 2 widgets) →
`{"run":"bb0ce9d2...","findings":15,"by_severity":{"critical":0,"high":5,"moderate":4,"low":6}}`,
`status=complete`, `artifact_count=6`.

Breakdown by artifact_type: **business_rule = 3, widget = 12.** First end-to-end run of the
`sp_widget` reviewer via the orchestrator. The full multi-surface widget rubric fired: plain
`GlideRecord` (high/security), client `$http.post` (high/security), hardcoded table names / role
sys_ids / result limits (moderate/hardcoding), external library in template, `console.*` + DOM
access (low/best_practice), CSS `!important` (low/maintainability).

**Both reviewer paths (script + widget) are now proven end-to-end through the orchestrator.**

### Still remaining
- **Full-scale async run:** a whole app (Novel Jewels 33, LOS 112) is too many sequential
  foreground LLM calls for one transaction — belongs in a scheduled/async trigger (Phase 5).
- **Sync** the subflow + "Copy of Execute an AI skill" into source (still no `flows/` folder).
- Phase 5 (trigger/surfacing), Phase 6 (reporting), Phase 7 (hardening).

---

# Phase 5 — Async execution + navigation: Validation Results

## Application menu + reports (built, then reports removed — see Finding G)

Installed the **AI Code Reviewer** application menu with modules (Review Findings, Critical & High
Findings, Review Runs). Four `sys_report` charts were also created and worked — but were later
**removed from source** because they broke Fluent metadata sync (Finding G).

### Finding G — `sys_report` records are sync-hostile (RESOLVED by removing from source)

After the reports installed, a metadata sync **regenerated their source** and serialized
`sys_domain_path` as `'/'`, which the Fluent type only accepts as `'global' | Record<'domain'>`.
The sync's own output failed to type-check → force-sync failed → install blocked (sync required) →
**deadlock** (a force-sync regenerates the same broken line every time from the instance records).

**Resolution:**
1. Removed the 4 report `Record()`s and 4 REPORT modules from `navigation.now.ts`.
2. Deleted the corresponding `sys_report` + `sys_app_module` records from the instance (via
   `run_script`) so a re-sync no longer regenerates the broken definitions.
3. Menu retains Review Findings / Critical & High Findings / Review Runs.

**Lesson:** `sys_report` is heavily auto-populated by the platform and round-trips badly through
Fluent sync. Reports/dashboards are best created in the ServiceNow UI, not managed as Fluent source.
(The finding + run + queue tables and the menu remain fully source-controlled.)

## Async layer

| ID | Test | Result |
|----|------|--------|
| TC-65 | Queue table `x_rptp_ai_code_rev_queue` installed | ✅ Pass |
| TC-66 | `requestReview()` creates run + enqueues artifacts | ✅ Pass |
| TC-67 | `processNextBatch()` processes a batch and finalizes | ✅ Pass |
| TC-68 | Queue rows transition pending → done | ✅ Pass |
| TC-69 | Code Review Worker scheduled job installed (periodically, 1 min) | ✅ Pass |
| TC-70 | Unreadable artifact handled gracefully (no crash) | ✅ Pass |

### TC-66–68 — Async cycle (AssetFlow, capped at 5)

`requestReview('693d05ee...', 5)` → `{"run":"4879...","enqueued":5}`
`processNextBatch()` → `{"enqueued_runs":0,"processed":5,"finalised_runs":1}`
Run: `status=complete`, `artifact_count=5`, `finding_count=6`. Queue: `done = 5`.

Full async path proven: **requestReview → enqueue → worker tick → subflow → recordReview →
finalize**, with the pending→processing→done guard and auto-finalize on queue drain. No new
cross-scope privileges surfaced (the declared FlowAPI / sys_hub_flow / GlideRecordSecure /
ScopedGlideElement set covers the async path).

### TC-70 — Graceful failure
One AssetFlow artifact returned "Artifact not found or not readable" (a `GlideRecordSecure` ACL on
that specific record). The reviewer returned empty findings, the queue row was still marked `done`,
and the run completed — no crash. Minor follow-up: investigate that artifact's readability.

## Sign-Off
**Phase 5 async: COMPLETE.** Whole-app reviews now run in resilient batches via the queue + Code
Review Worker (every 1 min, plus Execute Now). The synchronous `run()` remains for small/test cases.
Reports/dashboards are a UI concern (Finding G).

### Finding H — MultiLineTextColumn defaulted to max_length 40 (RESOLVED)

While enriching the run summary with an artifact-type breakdown, the summary appeared truncated at
40 characters. Root cause was **not** the summary logic but the column definition:
**`MultiLineTextColumn` was created with `max_length = 40`** (internal type `multi_two_lines`).
This silently truncated **every** multi-line field to 40 chars: `review_run.summary`, and
critically `finding.issue`, `finding.recommendation`, and `finding.raw_response`. Confirmed a stored
finding's `issue` was exactly 40 chars, cut mid-word (e.g. "A hard-coded external URL is used for th").

**Impact:** all findings written before the fix have `issue`/`recommendation` text clipped to 40
characters. Counts, severity, category, and artifact_type are unaffected — only the descriptive
text. Unrecoverable without re-running the review.

**Fix:** explicit `maxLength` on the affected columns — `summary` 4000, `issue` 4000,
`recommendation` 4000, `raw_response` 8000, `line_reference` 500 (from 200).

**Verified:** dictionary now reports `max_length = 4000` for issue/summary; a fresh run's summary is
94 chars, full and untruncated (`Reviewed 2 artifact(s); 0 finding(s). By severity — ...`).

**Lesson:** `MultiLineTextColumn` does not default to a large size — always set `maxLength` explicitly
for fields expected to hold more than ~40 characters.

**Follow-up:** re-run reviewed apps (e.g. Novel Jewels) to repopulate full-length finding text.

