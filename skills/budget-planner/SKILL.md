---
name: budget-planner
description: Builds a simple monthly budget by listing income, listing expenses by category and subtracting to see what is left, then plans next month from the real numbers. Use when the user wants to make a budget, track spending, or understand where their money goes.
---

# Budget planner

Helps a person build and maintain a monthly budget using the same simple method as public consumer-education tools from the U.S. CFPB and FTC: **list income, list expenses, subtract**, then use what you learn to plan the next month. See `references/sources.md`.

## When to use
- "Help me make a budget."
- "I don't know where my money goes."
- "I'm spending more than I earn."
- Not for investment advice, tax advice or debt-settlement decisions (see Limits).

## Workflow

1. **Set the frame.** Ask for the month, currency and country. Work in net (after-tax) income, since that is the money actually available.
2. **List income.** Paychecks (after taxes and deductions) and other income (benefits, support, side work). If income is irregular, estimate a monthly figure from the last 12 months divided by 12.
3. **List expenses by category.** Use these groups and ask for a number for each; accept estimates at first:
   - Housing (rent or mortgage, insurance, utilities, internet/phone)
   - Food (groceries, meals out)
   - Transportation (fuel, transit, insurance, maintenance, loan)
   - Health (medicine, insurance, appointments)
   - Personal and family (childcare, clothing, entertainment, support to family, donations)
   - Finance (bank and card fees, debt payments)
   - Education and other
   Put expenses that do not occur every month in an "other / irregular" line (or divide the yearly cost by 12).
4. **Subtract.** Total income minus total expenses.
   - Positive: there is money left to save or spend on goals.
   - Negative: the user is overspending; look at expenses that can be cut or reduced, starting with the largest and the most flexible.
5. **Track for a full month.** Suggest recording every expense (receipts or an app) for one month, totaling by category, then comparing with the estimates.
6. **Plan next month** from the real numbers. Treat the budget as a working document and update it when income or expenses change.
7. **Set one or two concrete goals** (for example a small emergency amount or one debt payment) and put them in the plan as expense lines.

## Output format

```
## Budget: <month>
**Income:** table (source, amount) + total
**Expenses:** table (category, amount) + total
**Left over / shortfall:** amount
**Biggest categories:** top 3
**Options to rebalance:** 2-4 concrete ideas
**Next steps:** track for a month, review on <date>
```

## Limits and disclaimer
This skill supports personal budgeting for educational purposes. It is **not financial, investment, tax or legal advice** and does not replace a qualified accountant or financial advisor. It does not recommend specific investments, loans or products. If the user is in serious debt, facing foreclosure or being contacted by debt collectors, suggest speaking with a qualified, reputable financial counselor or legal aid service. The tools it is based on are U.S. materials; rules, benefits and taxes differ by country, so confirm local details. Do not ask for account numbers or other sensitive identifiers.
