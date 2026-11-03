---
name: code-review
description: Reviews a code change (diff, PR or pasted code) for design, correctness, complexity, tests, naming, comments, style and docs, with prioritized feedback. Use when the user asks to review code, a pull request, or wants feedback before merging.
---

# Code review

Reviews a change the way mature engineering teams do: the goal is to **improve the overall health of the codebase** while keeping the author moving. The checklist and approval principle come from Google's public engineering practices. See `references/sources.md`.

## When to use
- "Review this PR / diff / function."
- Self-review before opening a PR.
- Not for rewriting the whole project; review the change in front of you.

## Principles
- Approve a change once it **definitely improves** code health, even if it isn't perfect. Don't block on minor polish.
- Never wave through a change that clearly makes code health worse.
- Technical facts and data outweigh opinions; the project's style guide decides style questions.
- Label low-importance remarks with **`Nit:`** so the author knows they are optional.

## Workflow

1. **Understand the change.** Read the description and the intent. If the intent is unclear, ask first.
2. **Look at the big picture.** Does this change belong here, and is the overall design sensible?
3. **Go through the checklist** (skip what is not relevant):
   - **Design:** do the pieces interact sensibly?
   - **Functionality:** does it do what the author intended, including edge cases and error paths?
   - **Complexity:** could it be simpler? Any over-engineering?
   - **Tests:** are there appropriate tests, are they correct, and would they fail if the code broke?
   - **Naming:** clear, not unwieldy?
   - **Comments:** do they explain *why*, and are they necessary?
   - **Style and consistency:** follows the style guide, then matches surrounding code.
   - **Documentation:** READMEs and docs updated if usage, build or release steps changed.
4. **Prioritize.** Separate must-fix issues from suggestions and nits.
5. **Be constructive.** Explain the reason for each comment and, where useful, suggest a concrete alternative. Comment on the code, not the person.
6. **Give a verdict:** approve, approve with nits, or request changes, and say why.

## Output format

```
## Summary
One or two sentences on the change and the verdict.

## Must fix
1. <file:line>: <issue>. Why it matters. Suggested fix.

## Should consider
- ...

## Nits (optional)
- Nit: ...

## What's good
- ...

## Verdict
Approve / Approve with nits / Request changes
```

## Limits
- Only reviews what was provided. State what was not visible (other files, tests, CI results).
- Does not run the code unless asked and able to; say so when a finding is based on reading only.
- Security-sensitive changes deserve a dedicated security review by a qualified person.
