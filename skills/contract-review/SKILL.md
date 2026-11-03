---
name: contract-review
description: Reviews a contract clause by clause, checks the basic elements, flags risky or missing terms and lists questions for a lawyer. Use when the user shares a contract or asks to review, summarize or prepare to negotiate one.
---

# Contract review

Gives a structured first-pass review of a contract so the user (or their lawyer) knows what it says, where the risk sits and what to ask or negotiate. It is a **support tool for lawyers and informed users, not a legal opinion.** See `references/sources.md`.

## When to use
- The user pastes or uploads a contract, or asks "what should I look for in this contract?".
- Preparing questions for a lawyer or a negotiation.
- Not for deciding whether to sign, and not a substitute for a licensed lawyer.

## Workflow

1. **Ask the essentials first.** Who are you in this deal? Which jurisdiction and governing law apply (country, state)? What is the deal and the biggest worry? Do not assume the jurisdiction.
2. **Identify the parties and the deal.** Names, roles, what each side gives and gets, term and price.
3. **Check the basic elements** (general common-law framing; varies by jurisdiction):
   - mutual assent (offer and acceptance),
   - consideration (something of value exchanged),
   - capacity of the parties,
   - lawful purpose,
   - whether the law requires a written form for this type of contract.
4. **Go clause by clause** and note, for each: what it says in plain language, who it favors, and the risk level (low / medium / high):
   - scope of work or obligations and deliverables,
   - payment, price changes, late fees,
   - term, renewal and **termination** (who can exit, when, at what cost),
   - **indemnification** (who covers whose losses, for what events),
   - **limitation of liability** (caps, exclusions, whether mutual),
   - warranties and disclaimers,
   - intellectual property and confidentiality,
   - **governing law and dispute resolution** (where and how disputes are decided),
   - assignment, notices, amendments, entire-agreement and similar boilerplate.
5. **Look for imbalance.** One-sided terms, very short deadlines, automatic renewals, and terms that look oppressive or unfair given the parties' bargaining power. Courts in some places may refuse to enforce terms found unconscionable; whether that applies is a legal question for a lawyer.
6. **List what is missing or unclear:** undefined terms, blank fields, inconsistent clauses, missing exhibits.
7. **Prepare next steps:** questions for the lawyer, proposed redlines in plain language, and items to clarify with the other side.

## Output format

```
## Contract review: <title> (jurisdiction assumed: <X, confirm>)
**Summary:** parties, deal, term, price
**Basic elements check:** table (element, present?, note)
**Clause table:** clause | plain-language meaning | favors | risk
**Top risks:** numbered, most serious first, with why
**Missing / unclear:** bullets
**Suggested questions & negotiation points:** bullets
**Limits:** one line reminding this is not legal advice
```

## Limits and disclaimer
This skill provides general information and a review checklist. It is **not legal advice**, does not create a lawyer-client relationship, and can miss or misread terms. Contract law differs by country and state; the framework above is general and U.S.-oriented in its sources, so always confirm the governing law. Have a licensed lawyer review any contract with significant financial, personal or business consequences before it is signed. Do not paste confidential material you are not allowed to share, and remove personal data when possible.
