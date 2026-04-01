# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A quiz web application built with React + Vite (JavaScript, no TypeScript). All quiz data (questions, answers, scores, settings) is persisted via local JSON files — no backend database. No hardcoded constants anywhere in the source: all values (labels, limits, timing, scoring rules) are loaded from config/data JSON files.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint
npm run test       # Run all tests (Vitest)
npm run test -- --reporter=verbose  # Run tests with details
npm run test <path>  # Run a single test file
```

## Architecture

### Data Layer

All persistent state lives in JSON files under `src/data/`:
- `questions.json` — quiz question bank
- `config.json` — app-wide settings (time limits, score weights, categories, etc.)
- `scores.json` — saved quiz results/history

The app reads and writes these files through a dedicated data service (`src/services/dataService.js`). No component should import JSON files directly — always go through the service layer.

### No Hardcoded Constants

- UI labels, numeric limits, scoring rules, and any tuneable values must come from `config.json` or the relevant data file
- The `config.json` is the single source of truth for things like: number of questions per quiz, time per question, passing score threshold, available categories

### Project Structure

```
src/
  components/    # React UI components
  pages/         # Top-level route views (if using React Router)
  services/      # Data access layer (read/write JSON)
  hooks/         # Custom React hooks
  data/          # JSON files (questions, config, scores)
  utils/         # Pure helper functions
```

### Testing

Tests use Vitest + React Testing Library. Test files are colocated with source (`*.test.js`) or in `src/__tests__/`. Mock the data service when testing components; test the data service directly against fixture JSON.

### Verification After Script Changes

After completing any script-related request (new feature, bug fix, refactor), always run the following verification sequence before considering the task done:

```bash
npm run build   # Ensure the project compiles without errors
npm run test    # Ensure all tests pass
```

If either step fails, fix the issue before finishing.
