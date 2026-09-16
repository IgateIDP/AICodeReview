import { Role } from '@servicenow/sdk/core'

/**
 * Phase 7 — finding lifecycle governance.
 *
 * `reviewer` (tech lead / approver) is the only added role. It gates the
 * "Accept / Waive" UI Action for HIGH and CRITICAL findings: those may only be
 * waived by a reviewer, while low/moderate findings are self-serve for anyone who
 * can see the finding. Enforcement is lightweight — the UI Action's condition
 * checks `gs.hasRole('x_rptp_ai_code_rev.reviewer')` (admin implicitly satisfies
 * this). No dedicated ACL layer is added.
 */
export const reviewerRole = Role({
    name: 'x_rptp_ai_code_rev.reviewer',
    description:
        'Code Review reviewer / tech lead. Required to accept (waive) high or critical AI code-review findings.',
})
