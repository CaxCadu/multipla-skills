# Skill matching

The matcher turns a profile (see [profile-quiz.md](profile-quiz.md)) into a ranked list of skills. It is deterministic and explainable: every recommendation carries a `reason`.

## Inputs

- The user's profile.
- The skill registry (all `skills/*/skill.json`).
- `registry/profiles.json` (profile → areas/tags).

## Scoring

For each skill with `status` of `reviewed` or `stable` (drafts only if the user opts in):

```
score = 3 * profile_match      # skill.profiles ∩ user.profiles
      + 2 * area_match         # skill.areas ∩ areas of user's profiles
      + 1 * tag_match          # skill.tags ∩ (goals + interests + tools)
      + 2 * region_match       # skill.region == user.country
      + 1 * level_match        # user.level ∈ skill.level
```

Each term counts the number of overlaps, capped at 2 to avoid long tag lists dominating.

Filters (hard rules):
- `language` must match the user's language, or the skill is marked as translatable.
- A skill with a `region` different from the user's country is excluded.
- Skills already installed are listed as "installed", not recommended again.

## Bundles

`registry/profiles.json` can define a **starter bundle** per profile: a small curated set (3–5 skills) shown first. Bundle skills get a fixed boost, so a new user always sees a sensible default set before the scored extras.

## Output

```json
[
  { "id": "contract-review", "name": "Contract review", "score": 9,
    "reason": "Matches your profile (lawyer) and area (law)." }
]
```

Return at most `limit` items (default 8): the bundle first, then the highest scores.

## Conflicts and duplicates

- Skills can declare `conflicts_with` (planned) when they give overlapping, contradictory guidance; the matcher keeps the higher score.
- Near-duplicate skills in the same area should be merged in review, not both shipped.

## Explanations

The assistant should present picks in plain language ("Because you're a law student who wants to learn faster…"), not scores.

## Testing

Matcher tests use fixed profiles and a fixture registry, and assert the exact ranked output.
