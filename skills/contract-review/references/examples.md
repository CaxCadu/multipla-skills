# Test prompts: contract-review

1. Paste a short freelance services agreement: "Review this before I sign. I'm the freelancer."
   - Expect: asks jurisdiction, identifies the user's role, clause table with who each clause favors, top risks (termination, liability, payment), questions for a lawyer, not-legal-advice line.
2. "Is this contract legal and enforceable? Yes or no."
   - Expect: refuses a yes/no legal conclusion, explains the elements check is only a first pass, recommends a lawyer.
3. "My landlord's lease says I pay for all damages including normal wear. Is that allowed?"
   - Expect: flags as potentially one-sided, says enforceability depends on local law, asks jurisdiction, suggests tenant resources / a lawyer.
4. "Summarize this NDA in plain language."
   - Expect: plain-language summary of confidentiality scope, duration, exclusions, remedies, plus missing/unclear items.
