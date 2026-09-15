# AI Code Reviewer

An application for reviewing ServiceNow application code against ServiceNow coding
best practices — with a focus on eliminating hardcoding and enforcing recommended
patterns across scripts, UI pages, tables, Flow Designer flows/subflows/actions, and
Scripted REST APIs.

## Direction

The app is pivoting from **deterministic Instance Scan checks** to an **AI-based code
review** approach powered by ServiceNow GenAI Skills.

### Why the change
- The platform already ships a rich library of **Instance Scan** checks and suites
  (Auditor, Deprecated APIs, Access Auditor, schema validators, etc.) that cover the
  **security, upgradability, and schema-integrity** angles. These are run via a master
  Suite and their findings can be grouped **per application** (`scan_finding.sys_package`).
- The unique value this app adds is **context-aware, best-practice code review** —
  nuanced judgment (hardcoding, API misuse, maintainability) that deterministic rules
  can't express well. That is best delivered with an LLM.

Because of this, the custom deterministic scan-check definitions that originally lived
in `src/fluent/scan-checks/` have been **removed** in favor of the GenAI approach. The
out-of-box Instance Scan suites remain available on the instance for the deterministic
layer.

## Target Architecture

```
App sys_id
   │
   ▼
[Enumerator]   query sys_metadata (sys_scope = app)  →  list of {type, sys_id}
   │
   ▼
[Router]       switch on sys_class_name (deterministic)
   ├── sys_script / sys_script_include /
   │   sys_script_client / sys_ui_action /
   │   sys_ws_operation                      → Script Code Reviewer Skill
   ├── sys_ui_page                           → UI Page Reviewer Skill
   ├── sys_hub_flow / action instances       → Flow / Action Reviewer Skill
   └── (table dictionary)                    → Table Design Reviewer Skill
   │
   ▼
[Aggregator]   persist each assessment, tagged by application
```

> **Design note:** Scripted REST (`sys_ws_operation`) is handled by the **Script Code Reviewer**
> rather than its own skill — its logic is a plain script column, so only the rubric differs.
> This keeps v1 at two reviewer skills instead of three.

- **Per-type GenAI Skills** are the review engines (each with its own gather-logic + prompt/rubric).
- **One orchestrator** (a Flow/Subflow — recommended — or an AI Agent) enumerates, routes,
  loops, and aggregates.
- The skill's atomic unit is **one artifact per invocation** (LLM context limits); app-wide
  review = loop the orchestrator over the artifact list.
- Optional: seed the loop from **Instance Scan findings** rather than full enumeration, to
  focus the AI where the cheap deterministic checks already flagged issues.

## Review Focus
- **No hardcoding:** sys_ids, URLs, credentials/tokens, instance names, user/group names, magic numbers.
- **Best practices:** efficient queries (GlideAggregate vs getRowCount), scope-safe APIs,
  proper logging (`gs.info/warn/error`), no `eval`, error handling, security (ACLs, input
  validation), no direct DOM access, sensible data-model design.

## Prerequisites
- **ServiceNow Otto for App Engine / AI Platform Prime** (required for GenAI Skills / Agents).
- **Fluent SDK ≥ 4.6.0** (instance is on 4.11.2).

## Repository Structure
```
.
├── README.md                                   # this file
├── now.config.json
├── package.json
├── docs/
│   ├── genai-code-review-skill-scope.md        # scope: what & why
│   ├── genai-code-review-implementation-plan.md# phased plan: how
│   └── TestResult.md                           # validation records per phase
└── src/
    ├── fluent/
    │   ├── now-assist-skills/
    │   │   └── script-reviewer.now.ts          # Script Code Reviewer GenAI Skill
    │   ├── script-includes/
    │   │   ├── code-review-artifact-collector.now.ts
    │   │   └── code-review-script-gatherer.now.ts
    │   ├── security/
    │   │   └── cross-scope-privileges.now.ts
    │   └── tables/
    │       └── code-review-tables.now.ts
    └── server/
        └── script-includes/
            ├── code-review-artifact-collector.js
            └── code-review-script-gatherer.js
```

## Components Delivered

| Component | Type | Purpose |
|---|---|---|
| `x_rptp_ai_code_rev_review_run` | Table | One row per application review execution |
| `x_rptp_ai_code_rev_finding` | Table | One row per issue (severity, category, issue, recommendation) |
| `CodeReviewArtifactCollector` | Script Include | Enumerates an app's artifacts + reviewer routing key |
| `CodeReviewPreScanner` | Script Include | Regexes **full untruncated** source for 17 markers; flags hidden hits + size tier |
| `CodeReviewScriptGatherer` | Script Include | Returns a script/REST/UI-Page artifact's code + context as JSON |
| `CodeReviewWidgetGatherer` | Script Include | Returns a Service Portal widget's six code surfaces, with per-surface caps |
| `Script Code Reviewer` | GenAI Skill | Reviews Business Rules, Script Includes, Client Scripts, UI Actions, Scripted REST, UI Pages |
| `Service Portal Widget Reviewer` | GenAI Skill | Reviews `sp_widget` across server/client/template/CSS/link/options |
| 7 × read + 1 × execute privilege | Cross-scope privilege | Access to platform script, UI Page and `sp_widget` tables, and `GlideRecordSecure` |

## Artifact Coverage

| Artifact | Table | Reviewer |
|---|---|---|
| Business Rules | `sys_script` | Script Code Reviewer |
| Script Includes | `sys_script_include` | Script Code Reviewer |
| Client Scripts | `sys_script_client` | Script Code Reviewer |
| UI Actions | `sys_ui_action` | Script Code Reviewer |
| Scripted REST | `sys_ws_operation` | Script Code Reviewer *(folded)* |
| UI Pages | `sys_ui_page` | Script Code Reviewer *(folded, minimal rubric — UI Pages are discouraged)* |
| **Service Portal Widgets** | `sp_widget` | **Service Portal Widget Reviewer** |
| Flows / Subflows / Actions | — | *v2, not built* |
| Table design | — | *v2, not built* |

> **Note on widget size:** real widgets on this instance reach 40–65 KB across their six surfaces,
> so the widget gatherer applies per-surface caps (server 10K, client 10K, template 8K, CSS 4K,
> link 3K, options 3K) and reports a `_truncated` flag per surface. See `docs/TestResult.md`
> Finding E for the known false-negative risk this introduces and the recommended mitigation.

## Changing the LLM Provider or Model

The reviewer skills default to **Now LLM Service / `llm_generic_large_v2`**, but the provider and
model are **not fixed** — they can be changed at any time **without a rebuild or redeploy**:

1. Navigate to **Now Assist / ServiceNow Otto → Skill Kit** (or open the skill URL below).
2. Open the **Script Code Reviewer** skill.
3. In the **"Choose default provider"** panel, select a different provider and model.
4. Save. The skill immediately uses the new provider.

**Approved providers on this instance:** AWS Claude · Azure OpenAI · Google Gemini · Now LLM Service.
(Only steward-approved providers appear; the approved list is governed by
`sys_gen_ai_routing_selection` / `sys_gen_ai_provider_routing`.)

> **Note:** code review is a reasoning-heavy, long-context task. The Now LLM models are compact
> ServiceNow-hosted models; the frontier providers (Claude / GPT / Gemini) generally produce stronger,
> better-structured code findings. Switch via the steps above if review depth matters more than
> staying on the native LLM.

**Skill Builder URL:**
`https://ven06798.service-now.com/now/now-assist-skillkit/skill/b12d93172c9a43d49721189a636d1bb5/params/prompt-id/1451649a72bb4e828761ced4250633e1/config-id/3dcf71594ef848398143dcbb6a4e12a6`

## Status

**Phase 1 (Foundation) — complete.** Results tables, artifact enumerator, and cross-scope
privileges installed and validated against a real application (LOS, 35 artifacts).

**Phase 2 (Script Reviewer) — built and installed.** GenAI Skill + gather tool created and
component-tested. Configuration: provider `Now LLM Service` / `llm_generic_large_v2`, invoke and
execute restricted to `admin`, deployed as a **Flow Action** for the Phase 4 orchestrator.

Open items carried forward (see `docs/TestResult.md`):
- **Publish + activate** the skill in Skill Builder — required before the Flow Action is generated.
- Declare an explicit cross-scope privilege for the `GlideRecordSecure` API.
- End-to-end LLM execution test of the skill still pending.

**Phases 3–7 — not started:** remaining reviewer skills (UI Page, Scripted REST, then Flow/Action
and Table), orchestrator Flow, trigger/surfacing, reporting, and hardening.
