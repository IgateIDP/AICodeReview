# GenAI Code Review — Step-by-Step Implementation Plan

> Companion to `genai-code-review-skill-scope.md`. That doc defines **what** we're
> building and **why**; this doc defines the **order of work**. Status: **PLAN ONLY —
> nothing built yet.**

## Architecture recap (target)

```
App sys_id
   │
   ▼
[Enumerator]  sys_metadata where sys_scope = app  → list of {type, sys_id}
   │
   ▼
[Router]      deterministic switch on sys_class_name
   ├── scripts        → Script Reviewer Skill
   ├── sys_ui_page    → UI Page Reviewer Skill
   ├── sys_ws_operation → Scripted REST Reviewer Skill
   ├── flows/actions  → Flow / Action Reviewer Skill
   └── table dict     → Table Design Reviewer Skill
   │
   ▼
[Aggregator]  persist assessments in a results table, tagged by application
```

- Reviewer **Skills** = the AI engines (one artifact per invocation).
- **Orchestrator** (Flow *recommended*, or AI Agent) = enumerate → route → loop → store.

---

## Phase 0 — Decisions & Prerequisites  *(gate — must clear before Phase 1)*

**Decisions required from the product owner:**
1. **Home app** — separate new app (**requires a new conversation**) or build inside `x_rptp_ai_code_rev`.
2. **v1 artifact scope** — recommended: start with the easy wins (**Scripts, Scripted REST, UI Pages**); add Flows/Actions and Tables in v2.
3. **LLM provider/model** — chosen from the instance's approved provider list (queried at build time).
4. **Security** — (a) who can invoke each skill (all authenticated vs specific roles); (b) execution role.
5. **Deployment surface** — UI Action, ServiceNow Otto Panel, Flow Action, or test-only.
6. **Orchestrator type** — Flow/Subflow (deterministic, recommended) or AI Agent (agentic).

**Prerequisite checks:**
- [ ] `is_product_available` (`primeSKU`) confirms Otto for App Engine / AI Platform Prime.
- [ ] Fluent SDK ≥ 4.6.0 (instance on 4.11.2 ✅).

**Deliverable:** decisions recorded in the scope doc; licensing confirmed.

---

## Phase 1 — Foundation

**Goal:** the data and lookup plumbing the reviewers/orchestrator depend on.

1. **Results storage table** (e.g., `x_...review_finding`): application (ref/scope), artifact type, source table, source record, severity, issue summary, remediation, raw assessment, run/batch id, created timestamp. Enables per-application rollups (mirrors `scan_finding` grouping by package).
2. **Enumerator** — a Script tool / subflow that queries `sys_metadata` where `sys_scope = <app sys_id>`, returns `{sys_class_name, sys_id, name}`, filtered to supported types.
3. Seed a small set of **real test records** for development.

**Deliverable:** results table installed; enumerator returns an app's artifact list.

---

## Phase 2 — First Reviewer Skill (Script Reviewer)  *(prove the pattern)*

**Goal:** one working end-to-end reviewer for the simplest artifact family.

1. Follow the GenAI Skill workflow (licensing gate → provider → table field questions → security → deployment).
2. **Inputs:** artifact `sys_id` + `source_table` as **strings** (so a tool can query them).
3. **Script tool** `gatherScript` — reads the record, returns `{name, table, script, when/type}`.
4. **Prompt** (Role / Context / Instructions / Output) encoding the rubric: hardcoding, query efficiency, logging, `eval`, error handling, scope-safe APIs; return severity-ranked issues + remediation.
5. `testValues` from a real business-rule/script-include record.
6. Build → install → test in Skill Builder → **publish & activate**.

**Deliverable:** Script Reviewer Skill returns a structured review for one script record.

---

## Phase 3 — Remaining Reviewer Skills

Repeat the Phase 2 pattern per type (each: gather tool + tailored prompt/rubric):

1. **UI Page Reviewer** — gather `html` (Jelly) + `client_script` + `processing_script`; check ACL presence, inline secrets, DOM usage, accessibility.
2. **Scripted REST Reviewer** — gather `sys_ws_operation.operation_script` + method/path; check input validation, status codes, data exposure.
3. **Flow / Action Reviewer** *(v2 — most effort)* — Script tool serializes `sys_hub_flow` / `sys_hub_flow_logic` / step inputs (`sys_variable_value` where `document=sys_hub_step_instance`) into text; check hardcoded step inputs, inline scripts, naming/annotations, error handling.
4. **Table Design Reviewer** *(v2)* — gather `sys_dictionary` + ACL coverage; check naming/prefix, base extension, field types, hardcoded choices.

**Deliverable:** one reviewer skill per in-scope artifact type, all published.

---

## Phase 4 — Orchestrator

**Goal:** turn "app sys_id" into a full, looped review.

**Recommended: Flow / Subflow**
1. Input: application sys_id.
2. Call **Enumerator** → artifact list.
3. **Deterministic route** on `sys_class_name` → invoke the matching reviewer skill per artifact.
4. Write each assessment to the **results table**, tagged by application + batch id.
5. Run **async/scheduled** for large apps (cost + time).

**Alternative: AI Agent** — same tools (reviewer skills + enumerator) with the agent reasoning over the loop, if an agentic UX is preferred.

**Deliverable:** one call/trigger reviews an entire application and stores results.

---

## Phase 5 — Trigger & Surfacing

1. **Entry point** — UI Action on the application record ("Run AI Code Review") and/or on-demand form.
2. **Optional findings-driven mode** — seed the loop from Instance Scan `scan_finding` source records (for the app) instead of full enumeration, to focus and cut cost.

**Deliverable:** users can launch a review for an application from the UI.

---

## Phase 6 — Aggregation & Reporting

1. **Per-application list/view** over the results table (group by application, severity, artifact type).
2. Optional dashboard/report mirroring the Instance Scan per-package rollup.

**Deliverable:** readable per-application review results.

---

## Phase 7 — Test & Harden

1. Validate each reviewer against known-good and known-bad artifacts.
2. Noise control (skip OOB/baseline records; allow suppression).
3. Cost/throughput controls (batch size, async scheduling, artifact-size truncation/chunking).
4. Security review of invoke/execution roles.

**Deliverable:** reliable, cost-aware, production-ready reviewer.

---

## Suggested sequencing

| Milestone | Phases | Outcome |
|-----------|--------|---------|
| **M1 – Walking skeleton** | 0 → 1 → 2 | One skill reviews one script end-to-end |
| **M2 – v1 coverage** | 3 (scripts, REST, UI pages) | Easy-win artifact types covered |
| **M3 – App-wide** | 4 → 5 → 6 | "Review this application" works + results surfaced |
| **M4 – v2 + hardening** | 3 (flows, tables) → 7 | Full coverage, production-ready |

## Phase 0 Decisions — CONFIRMED

| # | Decision | Value |
|---|---|---|
| 1 | Home app | Build in `x_rptp_ai_code_rev` (this app) |
| 2 | v1 artifact scope | Scripts (Business Rules, Script Includes, Client Scripts, UI Actions), Scripted REST, UI Pages |
| 3 | LLM provider | ServiceNow default (Now LLM Service) — reconfirmed against the approved list at skill-build time (Phase 2) |
| 4 | Security | `admin` role for both invoke and execution |
| 5 | Deployment surface | Reviewer skills exposed as **Flow Actions**; invoked by the orchestrator Flow (no UI Action / Panel) |
| 6 | Orchestrator | Deterministic **Flow** (route by `sys_class_name`) |

**Licensing:** `is_product_available(primeSKU)` confirmed — GenAI Skills/Agents available.

## Phase 1 build (this phase)

> Table names are capped at 30 chars including the `x_rptp_ai_code_rev_` prefix (19 chars),
> so names are kept short.

- **`x_rptp_ai_code_rev_review_run`** — parent run record (one per application review execution).
- **`x_rptp_ai_code_rev_finding`** — child finding record (one per issue), references the run + application for per-app rollups.
- **`CodeReviewArtifactCollector`** Script Include — enumerates supported artifacts owned by an app scope and returns each with a reviewer routing key (`script` / `scripted_rest` / `ui_page`).
