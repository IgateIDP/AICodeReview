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
   ├── sys_script / sys_script_include / …  → Script Reviewer Skill
   ├── sys_ui_page                           → UI Page Reviewer Skill
   ├── sys_ws_operation                      → Scripted REST Reviewer Skill
   ├── sys_hub_flow / action instances       → Flow / Action Reviewer Skill
   └── (table dictionary)                    → Table Design Reviewer Skill
   │
   ▼
[Aggregator]   persist each assessment, tagged by application
```

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
├── README.md                              # this file
├── now.config.json
├── package.json
├── docs/
│   └── genai-code-review-skill-scope.md   # detailed scope of the GenAI reviewer skill(s)
└── src/
    └── server/
```

## Status
- Scope defined (see `docs/genai-code-review-skill-scope.md`).
- Deterministic scan-check sources removed.
- GenAI reviewer skills + orchestrator: **not yet built** — pending design decisions
  (home app, v1 artifact scope, provider/model, security, deployment surface, orchestrator type).
