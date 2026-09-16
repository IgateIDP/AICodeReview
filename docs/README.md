# AI Code Reviewer

An application that reviews ServiceNow application code against ServiceNow coding best
practices — with a focus on eliminating hardcoding and enforcing recommended patterns —
using ServiceNow GenAI Skills. Point it at an application and it reviews every supported
artifact (scripts, Scripted REST, UI Pages, Service Portal widgets) and records
severity-ranked findings with remediation guidance.

Scope: `x_rptp_ai_code_rev` · Instance: `ven06798` · Fluent SDK 4.11.2.

## How it works

```
Application (review_run record, status = requested)
   │
   ▼
Code Review Worker (scheduled job, every ~1 min / Execute Now)
   │  → CodeReviewOrchestrator.processNextBatch()
   ▼
[Enumerate]  CodeReviewArtifactCollector → app artifacts + reviewer routing key
[Enqueue]    one x_rptp_ai_code_rev_queue row per artifact (pending)
[Process]    batch of 5:  Review One Artifact subflow → Execute Skill → LLM
                 script family → Script Code Reviewer
                 sp_widget     → Service Portal Widget Reviewer
[Persist]    CodeReviewFindingWriter parses JSON → x_rptp_ai_code_rev_finding rows
[Finalize]   when queue drains → review_run = complete + severity/type summary
```

- **Two reviewer GenAI Skills**, each with a gather tool + tailored rubric.
- **A "dumb" subflow** does the one thing Fluent can't express (the `Execute Skill` call);
  **a "smart" Script Include** does everything else (enumerate, parse, persist) — so the
  orchestration is versioned in source and testable via `run_script`.
- **Async by design**: a queue + paced worker keeps each transaction small, so whole-app
  reviews (e.g. LOS ≈ 112 artifacts) run in resilient batches instead of one over-limit run.
- **One artifact per LLM call** — context limits, precise attribution, failure isolation.

See `docs/genai-code-review-orchestrator-design.md` for the full design.

## Review Focus
- **No hardcoding:** sys_ids, URLs, credentials/tokens, instance names, user/group names, magic numbers.
- **Best practices:** efficient queries (GlideAggregate vs getRowCount), GlideRecordSecure,
  scope-safe APIs, proper logging (`gs.info/warn/error`), no `eval`, error handling, ACLs,
  input validation, no direct DOM access; for widgets: AngularJS/`$http`, template XSS, CSS scoping.

## Prerequisites
- **ServiceNow Otto for App Engine / AI Platform Prime** (required for GenAI Skills).
- **Fluent SDK ≥ 4.6.0** (instance is on 4.11.2).

## Repository Structure
```
.
├── now.config.json
├── package.json
├── docs/
│   ├── README.md                                 # this file
│   ├── genai-code-review-skill-scope.md          # scope: what & why
│   ├── genai-code-review-implementation-plan.md  # phased plan + resume state
│   ├── genai-code-review-orchestrator-design.md  # orchestrator + async design
│   └── TestResult.md                             # validation records + findings
└── src/
    ├── fluent/
    │   ├── now-assist-skills/
    │   │   ├── script-reviewer.now.ts
    │   │   └── widget-reviewer.now.ts
    │   ├── scheduled/
    │   │   └── code-review-worker.now.ts
    │   ├── script-includes/
    │   │   ├── code-review-artifact-collector.now.ts
    │   │   ├── code-review-finding-writer.now.ts
    │   │   ├── code-review-orchestrator.now.ts
    │   │   ├── code-review-pre-scanner.now.ts
    │   │   ├── code-review-script-gatherer.now.ts
    │   │   └── code-review-widget-gatherer.now.ts
    │   ├── security/
    │   │   └── cross-scope-privileges.now.ts
    │   ├── tables/
    │   │   └── code-review-tables.now.ts
    │   └── ui/
    │       └── navigation.now.ts
    └── server/
        ├── scheduled/
        │   └── code-review-worker.js
        └── script-includes/
            ├── code-review-artifact-collector.js
            ├── code-review-finding-writer.js
            ├── code-review-orchestrator.js
            ├── code-review-pre-scanner.js
            ├── code-review-script-gatherer.js
            └── code-review-widget-gatherer.js
```

> **Not in source:** the `Review One Artifact` subflow and the `Copy of Execute an AI skill`
> action are built in Flow Designer and synced. Reports/dashboards are built in the ServiceNow
> UI — `sys_report` records round-trip badly through Fluent sync (see TestResult Finding G).

## Components Delivered

| Component | Type | Purpose |
|---|---|---|
| `x_rptp_ai_code_rev_review_run` | Table | One row per application review execution |
| `x_rptp_ai_code_rev_finding` | Table | One row per issue (severity, category, issue, recommendation) |
| `x_rptp_ai_code_rev_queue` | Table | One row per artifact awaiting/undergoing review (async worker) |
| `CodeReviewArtifactCollector` | Script Include | Enumerates an app's artifacts + reviewer routing key |
| `CodeReviewPreScanner` | Script Include | Regexes full untruncated source for markers; flags hidden hits + size tier |
| `CodeReviewScriptGatherer` | Script Include | Returns a script/REST/UI-Page artifact's code + context as JSON |
| `CodeReviewWidgetGatherer` | Script Include | Returns a Service Portal widget's six code surfaces, with per-surface caps |
| `CodeReviewFindingWriter` | Script Include | Parses reviewer JSON → finding rows; run lifecycle + severity/type rollup |
| `CodeReviewOrchestrator` | Script Include | `run()` (sync), `requestReview()` + `processNextBatch()` (async) |
| `Code Review Worker` | Scheduled Job | Every ~1 min (+ Execute Now): enqueue, process a batch, finalize |
| `Script Code Reviewer` | GenAI Skill | Business Rules, Script Includes, Client Scripts, UI Actions, Scripted REST, UI Pages |
| `Service Portal Widget Reviewer` | GenAI Skill | `sp_widget` across server/client/template/CSS/link/options |
| `Review One Artifact` | Subflow (UI) | Routes by type → `Execute Skill` → returns review JSON (no DB) |
| AI Code Reviewer menu | App menu | Review Findings, Critical & High Findings, Review Runs |
| 8 × read + 6 × execute | Cross-scope privileges | Platform metadata tables + FlowAPI/GlideRecordSecure/ScopedGlideElement |

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

## Running a review

- **On-demand:** insert a `x_rptp_ai_code_rev_review_run` record with an Application and
  `status = requested`; the Code Review Worker picks it up within a minute. Or run
  **Code Review Worker → Execute Now**.
- **Programmatic:** `new CodeReviewOrchestrator().requestReview('<app_sys_id>')` (async), or
  `.run('<app_sys_id>', <max>)` for a small synchronous run.
- **View results:** navigator → **AI Code Reviewer → Review Findings** (group by Application);
  each run's `summary` shows the by-type and by-severity breakdown.

## Changing the LLM Provider or Model

Reviewer skills default to **Now LLM Service / `llm_generic_large_v2`**, changeable at any time
**without a rebuild** in **ServiceNow Otto → Skill Kit → (skill) → "Choose default provider"**.
Approved providers here: AWS Claude · Azure OpenAI · Google Gemini · Now LLM Service. Frontier
models (Claude/GPT/Gemini) generally give stronger, better-structured findings for this
reasoning-heavy task.

## Committing to Git (browser Fluent IDE)

This is a plain local git repo (a `.git/` folder in the workspace) — **not** Studio source
control. Do **not** link it in Studio (that versions metadata XML, a different representation).
The browser Fluent IDE drives git through the **command palette** (`Ctrl+Shift+P`):

1. **`Git: Manage Credentials`** → opens the **IDE Git Credentials** table
   (`sn_glider_ide_git_credential`). Create/reuse a credential holding your GitHub auth.
   For HTTPS, GitHub requires a **Personal Access Token** (scope `repo`) as the password — not
   your account password.
2. **`Git: Stage All Changes`** — stages tracked *and* new/untracked files.
3. **`Git: Commit`** — enter a commit message.
4. **`Git: Push`** — enter the remote (`https://github.com/IgateIDP/AICodeReview.git`) the first time.

Notes:
- Sequence is always **stage → commit → push**. (`Git: Commit` may auto-stage if nothing is staged,
  but staging explicitly is the safe habit.)
- If push is rejected `non-fast-forward`, the remote has commits you don't — run **`Git: Pull`**
  first, then push. Avoid force-push unless you're sure local should win.
- Committing to GitHub is independent of `now-sdk install` (which deploys to the instance).

## Status

| Phase | Scope | Status |
|---|---|---|
| 1 — Foundation | Results tables, enumerator, cross-scope privileges | ✅ Complete |
| 2 — Script Reviewer | `Script Code Reviewer` skill + gatherer | ✅ Complete, live |
| 3 — Widget Reviewer + REST/UI-Page fold + pre-scan | 2nd skill; folds; size tiers | ✅ Complete, live |
| 4 — Orchestrator | Subflow + orchestrator; validated on AssetFlow + Novel Jewels | ✅ Complete |
| 5 — Async + navigation | Queue + Code Review Worker; app menu | ✅ Complete |
| 6 — Reporting | Dashboards (built in the ServiceNow UI) | ◻️ UI activity |
| 7 — Hardening | Noise/cost controls, `GlideRecordSecure` readability follow-up, findings-driven mode | ◻️ Optional / open |

**Known open items** (see `docs/TestResult.md`): findings written before the `maxLength` fix
(Finding H) have text clipped to 40 chars — re-run affected apps for full text; occasional
"artifact not found/not readable" rows from `GlideRecordSecure` ACLs are handled gracefully.
