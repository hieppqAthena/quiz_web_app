Read the technical specification document at `docs/spec.md` (or a path given as an argument: $ARGUMENTS) and implement everything described in it.

## Process
1. Read the spec document fully before writing any code
2. Implement in this order:
   - Data model changes (JSON files under `src/data/`)
   - Config additions (`src/data/config.json`)
   - Service layer (`src/services/`)
   - React components (`src/components/` or `src/pages/`)
3. After all code is written, run the verification sequence:
   ```
   npm run build
   npm run test
   ```
4. Fix any build or test failures before finishing

## Rules
- Follow every acceptance criterion in the spec — check them off as you go
- No hardcoded constants; read all tuneable values from config or data JSON
- Do not add features, abstractions, or error handling beyond what the spec describes
- If the spec is ambiguous on a detail, choose the simpler interpretation and note it in a comment

When done, report which acceptance criteria passed and flag any that could not be fully verified automatically.
