# Codex Project Pack - NCPOR Polar Portal

This folder is the working product specification for the NCPOR Problem Statement 26063 project.

## Read order
1. `AGENTS.md`
2. `PRODUCT_SPEC.md`
3. `ARCHITECTURE.md`
4. `DESIGN_SYSTEM.md`
5. `UX_SPEC.md`
6. `ANIMATION_SPEC.md`
7. `DATA_MODEL.md`
8. `PLAN.md`
9. `CODEX_EXECUTION_PROMPTS.md`

## Operating rule
Do not attempt to implement the full product in one uncontrolled change.

Use `PLAN.md` as the milestone queue. For every milestone:
1. read relevant specifications;
2. inspect the current repository;
3. make a plan;
4. implement a coherent slice;
5. test it;
6. fix failures;
7. update `PLAN.md`.

## User expectation
The user wants Codex to perform most of the implementation work. Minimize requests for manual file editing. Automate setup, seeding, verification, migration, testing, and repetitive tasks wherever practical.

## Important implementation interpretation
This is a functional software project. A polished screenshot is not sufficient. Interactions, data, search, filtering, document viewing, admin workflows, media handling, and content generation need real implementations or explicit development fallbacks.


## Backend invariant
This project is a local-development website connected to a cloud Supabase backend. Supabase is the source of truth for database/auth/storage in the implemented system.
