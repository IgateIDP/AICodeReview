# GenAI Code Review — Implementation Plan & Resume State

> **READ THIS FIRST.** This document is the single source of truth for project state.
> It is written to be self-sufficient: assume no memory of prior conversations.
> Companions: `genai-code-review-skill-scope.md` (what & why), `TestResult.md` (48 test cases,
> all findings and evidence).
>
> **Last updated:** end of Phase 7 (finding lifecycle & waivers — built, installed, smoke-tested).

---

# 1. RESUME HERE — Current State at a Glance

| Phase | Scope | Status |
|---|---|---|
| 1 — Foundation | Results tables, artifact enumerator, cross-scope privileges | ✅ **Complete** |
| 2 — Script Reviewer | `Script Code Reviewer` GenAI Skill + gatherer | ✅ **Complete, live** |
| 3a — Scripted REST | Folded into Script Code Reviewer | ✅ **Complete, live** |
| 3b — Widget Reviewer + UI Pages | New widget skill; UI Pages folded in | ✅ **Complete, live** |
| 3c — Pre-scan + size tiers | Closed Finding E (truncation false negatives) | ✅ **Complete, live** |
| **4 — Orchestrator Flow** | App sys_id → enumerate → route → review → persist | ✅ **Complete** (sync path; validated on AssetFlow + Novel Jewels) |
| 5 — Async + surfacing | Queue + scheduled-job worker (✅); app menu (✅); reports removed — sync-hostile, use UI (Finding G); findings-driven mode (open) | ✅ **Core complete** — async queue + Code Review Worker live; validated on AssetFlow |
| 6 — Reporting | Per-application views | Not started |
| 7 — Finding lifecycle & waivers | Waiver table + reviewer-gated accept/ignore (High/Critical); suppress on re-run | ✅ **Complete, live** (approach B — see §8; smoke-tested on the instance) |

**Both skills are published, activated (including AI Admin Hub), and confirmed working end to end.**
Source and instance are in sync as of the last metadata sync.

---

# 2. Environment & Key Identifiers

| Item | Value |
|---|---|
| Instance | `ven06798.service-now.com` |
| App | AI Code Reviewer |
| Scope | `x_rptp_ai_code_rev` |
| Scope sys_id | `68e08f6c471b4bd0e9ddbf66706d4379` |
| Fluent SDK | 4.11.2 |

## Installed components

| Component | Type |
|---|---|
| `x_rptp_ai_code_rev_review_run` | Table — one row per review execution |
| `x_rptp_ai_code_rev_finding` | Table — one row per issue |
| `CodeReviewArtifactCollector` | Script Include — enumerates app artifacts + routing key |
| `CodeReviewScriptGatherer` | Script Include — script/REST/UI-Page code + context |
| `CodeReviewWidgetGatherer` | Script Include — widget's 6 surfaces, per-surface caps |
| `CodeReviewPreScanner` | Script Include — full-text marker scan + size tiers |
| 7 read + 1 execute | Cross-scope privileges |

## Skill identifiers (needed for Phase 4)

**Script Code Reviewer** — handles `sys_script`, `sys_script_include`, `sys_script_client`,
`sys_ui_action`, `sys_ws_operation`, `sys_ui_page`
- capability: `b12d93172c9a43d49721189a636d1bb5`
- skill config: `3dcf71594ef848398143dcbb6a4e12a6`
- capability definition: `807eef541ac54cc782a482d2d67d0cb7`
- **live prompt: v4** (v1–v3 archived)
- inputs: `sourceTable` (string), `artifactSysId` (string)

**Service Portal Widget Reviewer** — handles `sp_widget`
- capability: `0aff547e60f141b387a11d3f0262cb4d`
- skill config: `c57deff0686f4a9cb889f239c3005282`
- **live prompt: v1**
- input: `widgetSysId` (string)

**Both skills:** provider `Now LLM Service` / model `llm_generic_large_v2`, temp 0.2, maxTokens 4000,
`userAccess` roles `['admin']`, `roleMap: ['admin']`, `deploymentSettings: { flowAction: true }`.
Provider is switchable post-deployment in Skill Builder → "Choose default provider".

## Reviewer routing (from `CodeReviewArtifactCollector.getTypeMap()`)

| Table | routing key | Reviewer |
|---|---|---|
| `sys_script`, `sys_script_include`, `sys_script_client`, `sys_ui_action`, `sys_ws_operation`, `sys_ui_page` | `script` | Script Code Reviewer |
| `sp_widget` | `sp_widget` | Service Portal Widget Reviewer |

## Reviewer JSON output contract (both skills, identical)

```json
{
  "artifact": "name",
  "artifact_type": "Business Rule",
  "overall_assessment": "1-2 sentences",
  "findings": [
    { "severity": "critical|high|moderate|low",
      "category": "hardcoding|security|performance|maintainability|best_practice",
      "issue": "...", "recommendation": "...", "line_reference": "..." }
  ]
}
```
Maps 1:1 to `x_rptp_ai_code_rev_finding` columns — deliberate, so Phase 4 persistence is trivial.

---

# 3. Test Corpus (verified, real applications)

| Application | sys_id | Artifacts | Use for |
|---|---|---|---|
| **AssetFlow Portfolio Hub** | `693d05ee47708b50e9ddbf66706d43a8` | 5 (incl. 2 UI Pages) | **Best first smoke test — smallest** |
| **Novel Jewels** | `e33bd60eff20fa5019a8ffda7c4fd925` | 33 (4 script + 29 widgets) | Widget reviewer |
| **LOS – Loan Origination** | `d29c118aff2dc61019a8ffda7c4fd954` | **112** (35 script + 77 widgets) | Full-scale / cost test |

## Known-good individual test artifacts

| Artifact | Table | sys_id | Why useful |
|---|---|---|---|
| `Create record in gupshup` | `sys_script` | `8c1c5f2647d68650e9ddbf66706d4318` | `Math.random()` OTP, hardcoded `+91`, cross-scope table, `current.update()` in after rule |
| `getAadhar` | `sys_ws_operation` | `ca7cb01947eaa650e9ddbf66706d4390` | **Best adversarial case** — hardcoded creds `setBasicAuth('rahul.dhir','Potala1$%')`, `requires_authentication=0`, OTP returned in response, Aadhaar PII logged |
| `Novel List Filter` | `sp_widget` | `fd02a39eff20be5019a8ffda7c4fd961` | Oversized (59,557 chars) — exercises truncation + pre-scan hidden markers |
| `Novel Form` | `sp_widget` | `465fb50147f0b610e9ddbf66706d434e` | Genuine hardcoded sys_id |
| `Start with sparkle` | `sp_widget` | `ae29438e47e43650e9ddbf66706d43ca` | Hardcoded sys_id in `$sp.getParameter()` |

---

# 4. PLATFORM LEARNINGS — read before touching skills

These cost significant time to discover. Do not re-learn them.

### 4.1 GenAI Skill lifecycle has FOUR stages
1. **Define + install** (Fluent source) — creates skill, capability, prompt records
2. **Publish prompt** (Skill Builder) — `sys_generative_ai_config.state = published`
3. **Activate skill** (Skill Builder) — `sys_one_extend_capability.active = 1`
4. **Activate in AI Admin Hub** — sets `sn_nowassist_skill_config.active`; dialog asks
   **"Flow Action Display = true/false"**

Stages 1–3 alone leave `sn_nowassist_skill_config.active = null`. Do not mistake an active
*capability* for an activated *skill*.

### 4.2 Flow access is via the generic "Execute Skill" action
`deploymentSettings: { flowAction: true }` does **NOT** create a per-skill
`sys_hub_action_type_definition`. Instead, once activated with Flow Action Display enabled, the skill
becomes selectable inside the **OOB generic "Execute Skill" flow action**. Searching for a Flow
Action named after the skill will always return zero — this wasted three rounds of investigation.

The AI Admin Hub "Display" column may read *"ServiceNow Otto context menu"*; that is the interactive
surface and is unrelated to flow availability.

### 4.3 Metadata sync is mandatory after any UI-side change
After publishing a prompt, activating a skill, or AI Admin Hub activation, **run the IDE metadata
sync before the next build/install** — otherwise the install can revert the published state. The
install tool will hard-block with "metadata sync is required" when out of step.

### 4.4 `promptState` must stay `'draft'` in source
Fluent validation rule **P1**. Never set `'published'` in source — the build fails. Publishing is a
Skill Builder action; the sync writes the resulting `state` (and a skill-level `state: 'published'`)
back into source.

### 4.5 Edit unpublished draft prompt versions in place
If the target version is still `draft`, modify it directly rather than adding a new version. Avoids
version sprawl and extra publish/sync cycles. Only add a new version when the current one is
already published.

### 4.6 Script field names are NOT uniform
| Table | Code column |
|---|---|
| `sys_script`, `sys_script_include`, `sys_script_client`, `sys_ui_action` | `script` |
| `sys_ws_operation` | **`operation_script`** |
| `sys_ui_page` | **`html`** + `client_script` + `processing_script` |
| `sp_widget` | `script`, `client_script`, `template`, `css`, `link`, `option_schema` |

Assuming `script` on `sys_ws_operation` produced a **silent empty result** — the worst failure mode
for a reviewer. Always verify column names from the dictionary first.

### 4.7 Tooling gotchas
- **`run_query` truncates** results with no pagination. For complete enumeration (e.g. provider
  mappings: 10 shown of 25) use `run_script`.
- **`GlideAggregate.groupBy('sys_scope')`** on a metadata table returns **zero rows silently**
  (`sys_scope` is inherited from `sys_metadata`). Use a plain GlideRecord loop and tally.
- **`fs_grep`'s `path` must be a directory**, not a file, or it silently finds nothing.
- **Never concatenate code surfaces in a profiling regex**, and always use word boundaries — doing
  so manufactured a false-positive "hidden sys_id" that was treated as evidence (see Finding E).

### 4.8 Widget size reality
Widgets reach 40–65 KB across six surfaces. Per-surface caps (server 10K, client 10K, template 8K,
CSS 4K, link 3K, options 3K ≈ 38 KB) plus `CodeReviewPreScanner` handle this. Size tiers:
`normal ≤45K` · `oversized 45–120K` (partial review) · `skipped >120K` (no LLM call, signals only).
Nothing is ever silently dropped — a skip becomes a visible finding.

---

# 5. Open Findings

| ID | Summary | Status |
|---|---|---|
| **A** | Flow Action mechanism | ✅ **CLOSED** — generic "Execute Skill" action (§4.2) |
| **B** | `sys_ui_page` selects all columns at query time; platform-driven, not our code | 🔸 Open, low impact (UI Page counts are small) |
| **C** | `GlideRecordSecure` cross-scope privilege | ✅ Closed — declared in source |
| **D** | Skill `state` IS expressible in Fluent | ✅ Closed — corrected |
| **E** | Truncation caused false negatives | ✅ **CLOSED** — pre-scanner recovers hidden markers; its original sys_id example was a false positive of our own profiling script |
| **F** | LOS is 112 artifacts, not 35 (77 widgets were invisible until `sp_widget` was added to the type map) | 🔸 Open — cost/runtime recalibration for Phase 4 |

---

# 6. PHASE 4 — Orchestrator Flow (NEXT)

**Goal:** one call with an application sys_id produces a complete, persisted, per-application review.

## Target design

```
Flow input: application (sys_scope reference)
   │
   ├─1─ Create x_rptp_ai_code_rev_review_run  (status=running, started=now)
   │
   ├─2─ Script step → CodeReviewArtifactCollector.getArtifacts(appSysId)
   │       returns [{ source_table, sys_id, name, reviewer_type }]
   │
   ├─3─ FOR EACH artifact (respecting a batch limit):
   │       reviewer_type == 'script'     → Execute Skill → Script Code Reviewer
   │                                        inputs: sourceTable, artifactSysId
   │       reviewer_type == 'sp_widget'  → Execute Skill → SP Widget Reviewer
   │                                        input: widgetSysId
   │       → parse JSON response → insert x_rptp_ai_code_rev_finding rows
   │
   └─4─ Update run record (status=complete, finished, artifact_count, finding_count, summary)
```

## Steps

1. **Locate the OOB "Execute Skill" flow action** and document its exact input/output contract
   (how the skill is selected, how inputs are passed, response shape). Needed before authoring.
2. **Read Fluent flow docs** — `wfa-flow-guide`, plus trigger / logic / actions topics.
3. **Create `CodeReviewFindingWriter` Script Include** — parse reviewer JSON, validate `severity`
   and `category` against the table's choice values, insert findings, update run totals. Keep parsing
   out of the Flow so it is unit-testable. Must tolerate malformed/non-JSON LLM output gracefully.
4. **Author the orchestrator Flow** in Fluent per the design above, including a **batch limit input**
   (default e.g. 25) and **async/scheduled execution** — a full LOS run is ~112 LLM calls.
5. **Test incrementally:** AssetFlow (5 artifacts) → Novel Jewels (33) → LOS (112) only once stable.
6. **Verify per-application reporting** by grouping findings, then update all three docs.

## Design decisions already made
- Routing is **deterministic** (switch on `reviewer_type`), not AI-driven — the mapping is known, so
  paying an LLM to decide it would be slower, costlier and less reliable.
- **One artifact per skill invocation** — context limits, precise attribution, failure isolation.
- Findings JSON deliberately mirrors the finding table, so persistence needs no transformation.

## Open questions for Phase 4
- **Trigger:** on-demand only, or also scheduled? (Phase 5 covers surfacing.)
- **Findings-driven mode:** optionally seed the loop from Instance Scan `scan_finding` source records
  instead of full enumeration, to cut ~112 calls down to only flagged artifacts.
- **Re-run behaviour:** supersede prior findings for the same app, or keep full history per run?

---

# 7. Immediate next actions (tomorrow)

1. Confirm nothing changed on the instance overnight; run a metadata sync if any Skill Builder or
   AI Admin Hub change was made since the last sync.
2. Start **Phase 4 step 1** — inspect the OOB "Execute Skill" flow action contract.
3. Proceed through Phase 4 steps 2–6.

**Nothing is currently broken or half-finished.** All source is built, installed, and in sync; both
skills are live and verified. Phase 4 is a clean start.

---

# 8. PHASE 7 — Finding Lifecycle & Waivers (BUILT & INSTALLED)

**Goal:** let a developer or reviewer **accept / ignore** a finding so it is **suppressed on the next
run** instead of re-appearing forever. Turns the tool from a repeating nag into an adoptable workflow.

## Decisions locked with product owner
1. **Reviewer-gated for High & Critical only.** `low`/`moderate` waivers are developer self-serve;
   `high`/`critical` require a reviewer/tech-lead role.
2. **Superseded each run.** Findings remain disposable (regenerated every run). The *waiver* is the
   durable object; a matching finding is suppressed on re-run and never re-surfaces as open.
3. **Approach B** — a dedicated waiver table (source of truth), with a display-layer `status` on the
   finding. Not a mutable flag on transient finding rows alone.

## Design

Because findings are superseded each run, only the **waiver** needs a cross-run identity — a
**fingerprint**: `hash(source_id | category | normalized(issue))`, where normalization lowercases,
collapses whitespace, and strips volatile tokens (digits / line numbers) so LLM wording drift and
line-number shifts don't break the match. Anchoring on `source_id + category` keeps it from being so
loose that it suppresses genuinely new issues in the same category.

```
Run N:   finding surfaced → developer/reviewer clicks "Accept / Waive" (+ justification)
             → x_rptp_ai_code_rev_waiver row (state=active, fingerprint, severity, who/when)
Run N+1: CodeReviewFindingWriter.recordReview() computes each finding's fingerprint
             → active waiver match?  yes → write status=suppressed (audit kept, excluded from counts)
                                     no  → write status=open
         finalizeRun() severity summary counts open only, reports "(N suppressed)" separately
```

## Components to build

| Component | Type | Responsibility |
|---|---|---|
| `x_rptp_ai_code_rev_waiver` | Table | Durable decision: application, source_table, source_id, artifact_name, category, **severity**, **fingerprint**, **justification** (mandatory), state (`active`/`revoked`), `finding` (origin ref). who/when captured by built-in `sys_created_by`/`sys_created_on` |
| `x_rptp_ai_code_rev.reviewer` | Role | Gates high/critical waives; admin satisfies `hasRole` implicitly. Low/moderate are self-serve (no separate developer role needed) |
| "Accept / Waive" gating | UI Action condition (no ACL) | The finding UI Action's `condition` hides the button once suppressed and, for high/critical, requires the reviewer role — the lightweight gate agreed in lieu of an ACL layer |
| `status` + `waiver` columns on `x_rptp_ai_code_rev_finding` | Table change | `status`: `open`/`suppressed`; `waiver` reference for traceability |
| `CodeReviewFindingWriter` | Script Include change | On `recordReview()`: compute fingerprint, look up active waiver, set `status`; on `finalizeRun()`: count open only, report suppressed separately |
| "Accept / Waive" | UI Action on finding (client) | Visible when `status=open`; **prompts for a required justification**, then calls `CodeReviewWaiverAjax` (GlideAjax) → creates the waiver + **suppresses the finding immediately** → **returns to the finding list**. No intermediate form. Hidden for High/Critical unless caller holds `reviewer` |
| `CodeReviewWaiverAjax` | Script Include (client-callable) | `waive(sysparm_finding, sysparm_justification)`: validates, re-checks the High/Critical reviewer gate **server-side**, creates the active waiver, sets the finding `status=suppressed` + `waiver`, returns `{ok,waiver,error}` |
| Run-form related lists | `sys_ui_related_list` (+ entries) | Code Review Findings (`…finding.review_run`) and Code Review Queue (`…queue.review_run`) shown by default on the run form — results + live progress in one place. Implicit relationships (no `sys_relationship`) |
| Navigation / views | UI change | Default finding views filter `status=open`; "Critical & High" excludes suppressed; add **Waivers** module + "Suppressed findings" view |

## Build order
1. `x_rptp_ai_code_rev_waiver` table + the `reviewer` role.
2. Add `status` + `fingerprint` + `waiver` columns to the finding table.
3. "Accept / Waive" UI Action with the severity+role `condition` (no ACL layer).
4. `CodeReviewFindingWriter` — fingerprint helper + suppression in `recordReview()` + summary change.
5. "Accept / Waive" UI Action.
6. Navigation modules/views.
7. Test on AssetFlow: run → waive one finding → re-run → confirm it stays `suppressed`; verify a
   High/Critical waive is blocked without the reviewer role. Then update all three docs + TestResult.

## Known limitation (documented, tunable)
Fingerprint stability depends on LLM wording consistency — a materially rephrased issue can escape a
waiver and reappear. The normalization + `source_id + category` anchor mitigates this; tune against
the real corpus (Novel Jewels / LOS) during build.

## Deferred to a later pass
- **Waiver expiry / review date** ("accept for 90 days").
- **Code-change invalidation** — auto-revoke a waiver when the artifact's code hash changes materially
  (the pre-scanner already computes size/markers, so a hash is cheap to add).
- **Findings-driven mode** interplay — skip re-reviewing artifacts whose findings are all waived.
