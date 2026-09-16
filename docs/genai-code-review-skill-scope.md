# GenAI Skill Scope — "Code Quality Reviewer"

> Status: **DELIVERED** — this scope has been realized. Both reviewer skills (Script Code Reviewer,
> Service Portal Widget Reviewer) are built, live, and orchestrated end-to-end; the app ships in its
> own scope `x_rptp_ai_code_rev`. This document is retained as the original "what & why" rationale;
> for current state see `genai-code-review-implementation-plan.md` (§1 status, §8 finding lifecycle &
> waivers) and `README.md`. The "Decisions Required" in §7 have all been made (see notes inline).

## 1. Purpose

An AI-powered GenAI Skill that reviews the **actual code / definition of a single
ServiceNow artifact** and returns a natural-language **code-quality assessment**,
focused on:

- **No hardcoding** — sys_ids, URLs, credentials, instance names, magic numbers, user/group names.
- **ServiceNow coding best practices** — appropriate API usage, query efficiency,
  scoping, error handling, logging, security, maintainability.

This is **complementary to** (not a replacement for) the deterministic Instance Scan
checks already in this app:

| Layer | Role | Nature |
|-------|------|--------|
| Instance Scan suite | **Detects** known patterns cheaply, instance-wide | Deterministic, rule-based |
| **This GenAI Skill** | **Interprets** an artifact's code with context, explains, advises | AI, nuanced, per-artifact |

The two integrate: run the suite to find candidate artifacts, then feed those source
records to this skill for a deeper, human-readable review.

## 2. Feasibility by Artifact Type

The skill reviews text. So feasibility depends on whether the artifact's logic is stored
as text and how much assembly it needs.

| Artifact | Source of "code" | Feasibility | Notes |
|----------|------------------|-------------|-------|
| **Scripts** (business rules, script includes, client scripts, UI actions, scheduled/fix scripts) | `script` field text | ✅ Easy | Feed script text directly |
| **Scripted REST API** | `sys_ws_operation.operation_script` (+ resource/API metadata) | ✅ Easy | Feed operation script + method/path context |
| **UI Pages** | `sys_ui_page`: `html` (Jelly), `client_script`, `processing_script` | ✅ Easy | Review markup + both script fields together |
| **Tables** | `sys_dictionary` (fields, types, defaults), ACL presence, naming, extends | ⚠️ Design review | Not "code" — this is data-model/design review (naming, hardcoded choices, missing ACLs, field types) |
| **Flow Designer flows / subflows / Actions** | Structured records: `sys_hub_flow`, `sys_hub_flow_logic`, `sys_hub_action_instance`, step inputs in `sys_variable_value` (`document=sys_hub_step_instance`) | ⚠️ Requires assembly | A Script tool must serialize the flow's steps/inputs into a text summary before the LLM can review it. Most effort of any type. |

**Verdict:** Fully feasible for scripts, scripted REST, and UI pages. Tables become a
*design* review. Flows/actions are feasible but need a dedicated serialization step.

### Design decision — Scripted REST folded into the Script Reviewer

Scripted REST is **not** a separate reviewer skill. Its logic lives in a plain script column, so
only the *rubric* differs (HTTP status codes, authentication flags, data exposure) — not the
gathering approach. It is therefore handled by the **Script Code Reviewer**, reducing v1 from
three reviewer skills to two.

Two implementation details this required:
- The script column is **not uniform**: `sys_ws_operation` stores code in `operation_script`,
  while the other script tables use `script`. The gatherer now carries a per-table `scriptField`.
- `sys_ws_operation` has **no `description`** column; it uses `short_description`. The gatherer
  resolves the first valid field from `description` / `short_description` / `comments` instead of
  assuming a single name.

**Resulting reviewer skills (4, not 5):**

| Skill | Covers |
|---|---|
| **Script Code Reviewer** | Business Rules, Script Includes, Client Scripts, UI Actions, **Scripted REST** |
| UI Page Reviewer | UI Pages |
| Flow / Action Reviewer | Flow Designer flows, subflows, actions (v2) |
| Table Design Reviewer | Table/dictionary design (v2) |

## 3. Architecture

```
Input: artifact type + record sys_id  (passed as STRING inputs)
        │
        ▼
Script tool "gatherArtifact"
  - queries the correct table(s) for the given type
  - extracts code / assembles a text representation
  - returns { type, name, code, metadata }
        │
        ▼
Prompt (Role / Context / Instructions / Output)
  - LLM reviews the code text
  - checks: hardcoding, best practices, security, performance, maintainability
        │
        ▼
Output: structured natural-language assessment
  - summary, severity-ranked issues, each with explanation + remediation
```

Design notes grounded in GenAI Skill mechanics:
- Inputs are passed as **strings** (artifact `sys_id`/type), because record data must be
  reachable **inside a Script tool** — `glide_record` inputs are only usable in prompts,
  not tools, and we need multi-table assembly (esp. flows).
- **One artifact per invocation** due to LLM context limits. Whole-app review = iterate
  invocations and aggregate (orchestrated outside the skill).
- The prompt encodes the best-practice rubric so results are consistent.

## 4. Review Rubric (what the LLM checks)

**Hardcoding (all types)**
- 32-char sys_ids, absolute instance URLs, credentials/passwords/tokens, hardcoded
  user/group names, environment-specific values, magic numbers.

**Best practices by type**
- *Scripts:* GlideAggregate vs getRowCount, query efficiency & indexed conditions,
  `gs.info/warn/error` vs `gs.log`, no `eval`, error handling, scoped-safe APIs,
  no DOM access in client scripts, `current`/`previous` correctness, avoid nested queries.
- *Scripted REST:* input validation, proper status codes, no sensitive data in responses,
  pagination, ACL/authentication reliance.
- *UI Pages:* ACL presence, no inline secrets, minimal inline JS, accessible markup,
  no direct DOM hacks where GlideForm applies.
- *Tables:* naming conventions/prefix, extends appropriate base, sensible field types,
  choices not hardcoded in scripts, auditing where needed, ACL coverage.
- *Flows/Actions:* descriptive naming/annotations, no hardcoded values in step inputs,
  minimal inline script steps, error handling, reuse of subflows/actions.

## 5. Out of Scope (boundaries)

- Does **not** scan or crawl the instance — it reviews one artifact you point it at.
- Does **not** modify, mute, or auto-remediate anything — advisory only.
- Does **not** replace the Instance Scan checks — it augments them.
- Is **not** an autonomous agent — single request → single assessment.

## 6. Constraints & Prerequisites

- **Licensing:** requires ServiceNow Otto for App Engine / AI Platform Prime (checked at build time via `is_product_available`).
- **SDK:** GenAI Skills require SDK ≥ 4.6.0 (instance is on 4.11.2 ✅).
- **Context limits:** large artifacts (big UI pages, long flows) may need truncation or chunking.
- **Separate application:** if this skill is to live in its own app (as discussed), it must
  be created in a **new conversation** — a second app cannot be created in this session.

## 7. Decisions Required Before Build

1. **Home:** separate new app (new conversation) **or** add into this `x_rptp_ai_code_rev` app?
2. **Artifact types for v1:** all six, or start with the easy wins (scripts, scripted REST, UI pages) and add flows/actions/tables in v2?
3. **LLM provider/model:** chosen from the instance's approved providers at build time.
4. **Security:** who can invoke the skill (all authenticated vs specific roles) and what role it executes as.
5. **Deployment surface:** UI Action on a record, ServiceNow Otto Panel, Flow Action, or none (test-only).
6. **Integration:** should invocation be driven from Instance Scan findings (review the source records of findings), or standalone by sys_id?

## 8. High-Level Build Steps (once decisions are made)

1. Confirm licensing gate (`is_product_available` → `primeSKU`).
2. Create the Script tool that gathers/serializes artifact code by type.
3. Define skill inputs (artifact type, sys_id) + `testValues` from real records.
4. Author the review prompt (Role/Context/Instructions/Output) with the rubric above.
5. Configure provider, security controls, and deployment.
6. Build, install, test in Skill Builder, then publish & activate.
