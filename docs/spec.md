# Technical Specification

Generated from: `docs/requirement.md`

---

## 1. Overview

A browser-only quiz game built with React + Vite (JavaScript). One question is shown at a time with a countdown timer. Points accumulate with optional streak multipliers. Results are saved to a leaderboard persisted in `src/data/scores.json`. All tuneable values live in `src/data/config.json`.

---

## 2. Scope

**In scope**
- Core quiz flow (questions, answers, scoring, timer)
- Streak bonus multiplier
- Leaderboard (top 10, saved to `scores.json`)
- Difficulty levels affecting timer duration
- Progress bar
- Correct/wrong answer animations (color flash, shake)
- 10+ questions across at least 2 categories
- Web Audio API sound effects

**Out of scope**
- Multiplayer
- Custom theming
- Confetti (deferred — can be added later)
- Backend or remote persistence

---

## 3. Data Model

### `src/data/config.json`
```json
{
  "difficulties": {
    "easy":   { "label": "Easy",   "timePerQuestion": 20 },
    "medium": { "label": "Medium", "timePerQuestion": 15 },
    "hard":   { "label": "Hard",   "timePerQuestion": 10 }
  },
  "defaultDifficulty": "medium",
  "questionsPerGame": 10,
  "leaderboardSize": 10,
  "streakBonus": {
    "tier1": { "minStreak": 3, "multiplier": 2 },
    "tier2": { "minStreak": 5, "multiplier": 3 }
  },
  "pointsPerQuestion": 100,
  "categories": ["Claude Code", "Game Design", "General Knowledge"]
}
```

### `src/data/questions.json`
```json
[
  {
    "id": "q1",
    "category": "General Knowledge",
    "difficulty": "easy",
    "prompt": "Question text here?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0
  }
]
```
Minimum 10 questions, spread across all 3 categories and all 3 difficulty levels.

### `src/data/scores.json`
```json
[
  {
    "id": "uuid-string",
    "playerName": "hieppq",
    "score": 850,
    "accuracy": 0.8,
    "timeTaken": 112,
    "difficulty": "medium",
    "category": "All",
    "date": "2026-04-01T00:00:00.000Z"
  }
]
```
Capped at `config.leaderboardSize` entries, sorted by score descending.

---

## 4. Component Design

| Component | Location | Props | Responsibility |
|---|---|---|---|
| `App` | `src/App.js` | — | Route between screens via `gameState` |
| `StartScreen` | `src/components/StartScreen.js` | `onStart(difficulty, category)` | Difficulty + category picker, shows leaderboard entry point |
| `QuizScreen` | `src/components/QuizScreen.js` | `questions, difficulty, onFinish(result)` | Orchestrates question flow, timer, score, streak |
| `QuestionCard` | `src/components/QuestionCard.js` | `question, onAnswer(index), disabled` | Renders prompt + 4 answer buttons, applies correct/wrong animation class |
| `Timer` | `src/components/Timer.js` | `duration, onExpire, running` | Countdown bar + number, fires `onExpire` at zero |
| `ProgressBar` | `src/components/ProgressBar.js` | `current, total` | Visual `current / total` indicator |
| `StreakBadge` | `src/components/StreakBadge.js` | `streak, multiplier` | Shows current streak and active multiplier |
| `ResultsScreen` | `src/components/ResultsScreen.js` | `result, onRestart, onLeaderboard` | Final score, accuracy %, total time, replay CTA |
| `Leaderboard` | `src/components/Leaderboard.js` | `scores, onClose` | Top-10 table sorted by score |

**`gameState`** (managed in `App`): `"start" | "quiz" | "results" | "leaderboard"`

---

## 5. Service Layer

### `src/services/dataService.js`

```js
// Returns full config object
getConfig() → config

// Returns all questions, optionally filtered
getQuestions({ category, difficulty }) → Question[]

// Returns leaderboard array (sorted, capped)
getScores() → Score[]

// Adds entry, re-sorts, trims to leaderboardSize, persists
saveScore(entry) → Score[]
```

**Note:** Since this runs in the browser without a server, JSON files are imported as ES modules at build time. `getConfig` and `getQuestions` read from the imported JSON. `getScores` / `saveScore` use `localStorage` (key: `"quiz_scores"`) as the runtime store, seeded from `scores.json` on first load.

### `src/services/audioService.js`

```js
// Plays a generated tone via Web Audio API
playSound(type)  // type: "correct" | "wrong" | "tick" | "gameOver"
```

All tones are synthesized (no audio files). Frequency and duration per type are defined in `config.json` under an `"audio"` key.

Add to `config.json`:
```json
"audio": {
  "correct":  { "frequency": 880, "duration": 0.15 },
  "wrong":    { "frequency": 220, "duration": 0.3  },
  "tick":     { "frequency": 440, "duration": 0.05 },
  "gameOver": { "frequency": 330, "duration": 0.6  }
}
```

---

## 6. Scoring Logic

Managed inside `QuizScreen`:

```
basePoints     = config.pointsPerQuestion
multiplier     = streak >= tier2.minStreak ? tier2.multiplier
               : streak >= tier1.minStreak ? tier1.multiplier
               : 1
questionScore  = answered correctly ? basePoints * multiplier : 0
streak         = correct ? streak + 1 : 0
```

Time bonus is **not** included (keep it simple per spec).

---

## 7. Animation Contract

`QuestionCard` applies CSS classes to answer buttons post-answer:
- `.answer-correct` — green flash (CSS keyframe)
- `.answer-wrong` — red flash + horizontal shake (CSS keyframe)

Classes are removed when the next question loads. No JS animation library needed.

---

## 8. Config Changes Summary

All new keys added to `config.json` in this spec:
- `difficulties` (object)
- `defaultDifficulty` (string)
- `questionsPerGame` (number)
- `leaderboardSize` (number)
- `streakBonus.tier1` / `streakBonus.tier2`
- `pointsPerQuestion` (number)
- `categories` (array)
- `audio` (object)

---

## 9. Acceptance Criteria

1. One question is displayed at a time with exactly 4 answer buttons.
2. Clicking an answer advances to the next question after showing correct/wrong feedback.
3. Timer counts down from the difficulty-configured duration; reaching zero auto-skips the question (no points awarded).
4. Score updates after each question using the streak multiplier formula in §6.
5. StreakBadge shows the correct multiplier (1x / 2x / 3x) at all times during a quiz.
6. ProgressBar reflects `currentQuestion / totalQuestions` accurately.
7. ResultsScreen shows final score, accuracy % (correct / total), and total elapsed time.
8. Score is saved to localStorage after each game; leaderboard never exceeds `config.leaderboardSize` entries.
9. Leaderboard is accessible from StartScreen and ResultsScreen.
10. Correct/wrong answer button animations play on every answer and do not carry over to the next question.
11. Web Audio sounds play for correct answer, wrong answer, and timer tick (last 5 seconds); no audio file assets are used.
12. At least 10 questions exist across all 3 categories and all 3 difficulty levels.
13. `npm run build` completes with no errors.
14. `npm run test` passes with coverage of scoring logic and dataService.
