Read the technical specification document at `docs/spec.md` (or a path given as an argument: $ARGUMENTS) and implement everything described in it.

## Process

### Step 1 — Analysis (subagent)
Before writing any code, launch a **Plan subagent** with this prompt:

> "Analyse the spec at `docs/spec.md` and the existing codebase. Identify: (1) all files that need to be created or modified, (2) implementation order and dependencies between components/services, (3) any ambiguities or risks in the spec. Return a structured implementation plan."

Wait for the subagent report, then review it before proceeding.

### Step 2 — Implementation
Using the subagent's plan as a guide, implement in this order:
1. Data model changes (JSON files under `src/data/`)
2. Config additions (`src/data/config.json`)
3. Service layer (`src/services/`)
4. React components (`src/components/` or `src/pages/`)

### Step 3 — Verification
After all code is written, run:
```
npm run build
npm run test
```
Fix any build or test failures before finishing.

## Rules
- Follow every acceptance criterion in the spec — check them off as you go
- No hardcoded constants; read all tuneable values from config or data JSON
- Do not add features, abstractions, or error handling beyond what the spec describes
- If the spec is ambiguous on a detail, choose the simpler interpretation and note it in a comment

## Bug Fixes
When fixing bugs, first launch an **Explore subagent** to:
- Locate the relevant files and understand the current behavior
- Identify the root cause and all affected code paths
- Report findings before any code is changed

Then implement the fix based on the subagent's findings.

When done, report which acceptance criteria passed and flag any that could not be fully verified automatically.
