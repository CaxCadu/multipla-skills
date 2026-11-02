# Research process

Every skill must be grounded in real research of its area. This is what separates Multipla Skills from generic prompt collections.

## Steps

1. **Scope.** Define the user, the task and the outcome the skill supports. Write it in 3–5 lines.
2. **Gather sources.** Prefer, in order: official standards and legislation, peer-reviewed or institutional guidance, recognised professional bodies, established practitioner references. Blog posts are supporting evidence only.
3. **Extract.** Turn findings into workflows, checklists and decision rules. Note disagreements between sources.
4. **Write.** Draft `SKILL.md` and `references/`. Keep claims traceable.
5. **Cite.** Record each source in `references/sources.md` and in `skill.json#sources` (title, URL, access date).
6. **Review.** At least one reviewer checks accuracy. For `risk: "high"` skills, a domain practitioner reviews when possible and the reviewer's role (not name, if they prefer) is noted.
7. **Test.** Run the skill on 3+ realistic prompts and keep the examples in `references/examples.md`.
8. **Publish.** Set `status` to `reviewed` after review.

## Quality bar

- No unsourced factual claims in the skill body.
- Jurisdiction stated whenever law, tax or regulation is involved.
- Dated: `last_researched` is always set.
- Refresh cadence: `high` risk every 6 months, others every 12 months. Stale skills are flagged in the registry.

## Regulated areas (law, health, finance)

- Include a **Limits and disclaimer** section.
- The skill supports a professional or an informed user; it must not present output as a diagnosis, legal opinion or personalised investment advice.
- Encourage consulting a qualified professional when stakes are high.
- Never include personal data from real cases in examples.

## Using AI in research

AI-assisted deep research is welcome for gathering and drafting, but every cited source must be opened and checked by a human before merge. Do not cite sources you haven't verified exist.

## Licensing

Don't copy copyrighted text into skills. Summarise and link. Respect each source's license.
