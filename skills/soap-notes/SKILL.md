---
name: soap-notes
description: Structures clinical encounter information into a SOAP note (Subjective, Objective, Assessment, Plan) for a clinician to review and sign. Use when a health professional wants help organizing visit notes, dictation or a transcript into SOAP format.
---

# SOAP notes

Organizes a clinician's own encounter information into the **SOAP** format: Subjective, Objective, Assessment, Plan. SOAP is a widely used structured way to document patient information; it works as a checklist and a cognitive aid and supports communication between healthcare professionals. See `references/sources.md`.

This skill is a **documentation aid for licensed health professionals.** The clinician stays responsible for the content. It does not diagnose or prescribe.

## When to use
- A clinician pastes dictation, rough notes or a transcript and asks for a SOAP note.
- A student practicing documentation with fictional cases.
- Not for generating a diagnosis or treatment decision from symptoms.

## Before you start: privacy
- Prefer **de-identified** input (no names, IDs, exact dates of birth, addresses). Follow your organization's rules and the privacy law that applies where you practice.
- Never invent patient details. If something is missing, mark it `[not provided]`.

## Workflow

1. **Sort the input** into the four sections without adding anything new:
   - **S, Subjective:** what the patient reports: chief complaint, history of present illness, relevant history, medications and allergies as stated, symptoms in the patient's words.
   - **O, Objective:** what the clinician observes or measures: vital signs, exam findings, test and imaging results.
   - **A, Assessment:** the **clinician's** evaluation: working diagnosis or differential, problem list, changes since the last visit. Use only what the clinician stated; if absent write `[clinician to complete]`.
   - **P, Plan:** what will be done: tests, treatment, medication changes, education, referrals, follow-up. Use only what the clinician stated; if absent write `[clinician to complete]`.
2. **Keep facts in the right place.** Patient-reported symptoms go under S; measurable findings under O. Move misplaced items and say so.
3. **Be concise and specific.** Use clear clinical language, standard abbreviations only if the user uses them, and include units and dates where given.
4. **Flag gaps and inconsistencies** (for example a plan with no stated assessment, a medication without a dose, conflicting values) as questions for the clinician. Do not fill them in.
5. **Return the draft** and remind the user to review, correct and sign.

## Output format

```
## SOAP note (DRAFT for clinician review)
**S:** …
**O:** …
**A:** …
**P:** …

**Gaps / questions for the clinician:**
- …
```

## Limits and disclaimer
This skill structures information that the clinician provides. It is **not medical advice**, does not diagnose, and must not be used to make or replace clinical decisions. Output can contain errors; the licensed clinician must verify every statement against the patient record and is responsible for the final note. Do not enter identifiable patient data unless your organization's policy and applicable law allow it. In an emergency, follow local emergency procedures, not this skill.
