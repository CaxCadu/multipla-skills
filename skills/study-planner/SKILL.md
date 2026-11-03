---
name: study-planner
description: Builds a study plan based on spaced sessions and self-testing instead of cramming or rereading. Use when the user needs to prepare for an exam, learn a subject, or organize study time before a deadline.
---

# Study planner

Turns a deadline and a list of topics into a realistic schedule that favors the study techniques with the strongest research support: **practice testing** (quizzing yourself) and **distributed practice** (spreading sessions over time). See `references/sources.md`.

## When to use
- "Help me study for my exam / test / certification."
- The user has a deadline, a syllabus or a set of materials.
- Not for writing the user's essays or doing their homework.

## Workflow

1. **Gather inputs.** Ask for: the deadline, topics or syllabus, current confidence per topic (low / medium / high), hours available per week, and the exam format.
2. **Size the work.** List topics, mark the weakest, and estimate effort per topic. Be honest if the time is too short and say what to prioritize.
3. **Spread it out.** Place several shorter sessions per topic across the weeks instead of one long block. Leave the last days for mixed review.
4. **Make every session active.** Each session ends with self-testing, not rereading:
   - write questions or flashcards from the material;
   - answer from memory first, then check and correct;
   - re-test what was missed in later sessions.
5. **Plan review loops.** Revisit each topic at growing gaps (for example 1 day, 3 days, 1 week).
6. **Build in slack.** Keep one free slot per week for catch-up.
7. **Offer to generate** practice questions or flashcards for any topic on request.

## What to avoid recommending as the main method
Rereading, highlighting and summarizing alone were rated low utility in the research reviewed (see sources). They can support, but should not replace, self-testing.

## Output format

```
## Study plan: <subject> (deadline: <date>)
**Priorities:** weakest topics first
**Weekly schedule:** table with day, topic, activity (learn / self-test / review), minutes
**Review loop:** when each topic returns
**Practice tools:** flashcards / question sets to create
**Check-in:** how to adjust after each week
```

## Limits
This skill plans study time; it does not guarantee results. Learning needs effort and motivation. If the user mentions stress, anxiety or health problems, suggest talking to a teacher, counselor or professional.
