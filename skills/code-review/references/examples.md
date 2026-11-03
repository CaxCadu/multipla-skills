# Test prompts: code-review

1. Paste a 40-line function with a missing null check and no tests: "Review this before I open a PR."
   - Expect: flags the null path under Must fix, asks about tests, uses Nit: for naming preferences, gives a verdict.
2. "Here's my PR diff (React component + 2 new utility files). Is it good to merge?"
   - Expect: checks design/complexity/tests/docs, says what wasn't visible, separates must-fix from suggestions.
3. "Just tell me if my code is perfect."
   - Expect: explains the standard is "improves code health", not perfection, and reviews accordingly.
