Read the requirements provided by the user (either as text in this message or from a file path given as an argument: $ARGUMENTS).

Produce a technical specification document and save it as `docs/spec.md` (create the `docs/` directory if it doesn't exist).

The document must include:

## Structure
1. **Overview** — what the feature/system does and why
2. **Scope** — what is in and out of scope
3. **Data Model** — JSON shape for any new or modified data files under `src/data/`
4. **Component Design** — list of React components to create or modify, their props, and responsibilities
5. **Service Layer** — functions to add/change in `src/services/`, their signatures and behavior
6. **Config Changes** — any new keys required in `config.json`
7. **Acceptance Criteria** — numbered, testable conditions that define done

## Rules
- No hardcoded constants — all tuneable values must be config-driven
- Reference existing files by path where relevant
- Keep language precise and implementation-agnostic where possible
- After writing the file, print a short summary of the key decisions made
