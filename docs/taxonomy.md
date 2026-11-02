# Taxonomy: areas and profiles

An **area** is a field of knowledge or work. A **profile** is a type of person (answers from the quiz). A profile maps to one or more areas; an area owns skills. The machine-readable version lives in [`registry/profiles.json`](../registry/profiles.json).

Skills marked 🇧🇷 are Brazil-specific (local law, institutions, exams).

## Areas and candidate skills

### Law (`law`)
- Contract review and clause checklist
- Legal research and case-law summarizing
- Petition/brief drafting structure
- Client intake and deadline tracking
- 🇧🇷 LGPD compliance check
- 🇧🇷 CLT labor-law reference

### Health (`health`)
- Clinical note structuring (SOAP)
- Evidence lookup and critical appraisal of studies
- Patient-friendly explanation writing
- Differential-thinking prompts (educational, not diagnostic)
- 🇧🇷 SUS and public-health protocols reference

### Education and students (`education`)
- Study planning and spaced repetition
- Essay and thesis structuring
- Reading and summarizing papers
- Exam prep (quiz generation, flashcards)
- 🇧🇷 ENEM / vestibular prep

### Software (`software`)
- Code review checklist
- Debugging methodology
- Architecture decision records
- Test strategy
- Git and PR hygiene

### Marketing and content (`marketing`)
- Positioning and messaging
- SEO content briefs
- Social content calendar
- Campaign analysis
- Copy editing in the brand voice

### Finance (`finance`)
- Personal budgeting and debt plan
- Financial statement reading
- Investment concepts explainer (educational, not advice)
- 🇧🇷 IRPF (income tax) organizer

### Small business (`business`)
- Business plan and lean canvas
- Pricing and unit economics
- Customer support playbooks
- Hiring and onboarding
- 🇧🇷 MEI / Simples Nacional basics

### Design (`design`)
- Design critique
- UX research synthesis
- Accessibility checklist
- Brand-guideline building

### Creators (`creators`)
- Video script structuring
- Content repurposing
- Audience growth analysis
- Sponsorship pitch writing

### General productivity (`general`)
- Meeting notes to action items
- Email triage and drafting
- Decision frameworks
- Weekly review

`general` skills are offered to every profile.

## Profiles (initial)

| Profile id | Typical areas |
|---|---|
| `student` | education, general |
| `lawyer` | law, general, business |
| `health-professional` | health, general |
| `developer` | software, general |
| `marketer` | marketing, creators, general |
| `finance-professional` | finance, business, general |
| `business-owner` | business, finance, marketing, general |
| `designer` | design, creators, general |
| `creator` | creators, marketing, general |
| `curious` (fallback) | general |

A person can have several profiles (e.g. a student who is also a developer). Matching is described in [skill-matching.md](skill-matching.md).

## Adding an area or profile

Open an issue first. Then add it here and in `registry/profiles.json`, and create at least one skill so the area isn't empty.
