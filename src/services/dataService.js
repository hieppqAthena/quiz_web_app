import config from '../data/config.json'
import questionsData from '../data/questions.json'
import seedScores from '../data/scores.json'

const SCORES_KEY = 'quiz_scores'

export function getConfig() {
  return config
}

export function getQuestions({ category, difficulty } = {}) {
  let questions = questionsData
  if (category && category !== 'All') {
    questions = questions.filter((q) => q.category === category)
  }
  if (difficulty) {
    questions = questions.filter((q) => q.difficulty === difficulty)
  }
  return questions
}

export function getScores() {
  const stored = localStorage.getItem(SCORES_KEY)
  if (stored === null) {
    // Seed from scores.json on first load
    localStorage.setItem(SCORES_KEY, JSON.stringify(seedScores))
    return seedScores
  }
  return JSON.parse(stored)
}

export function saveScore(entry) {
  const scores = getScores()
  scores.push(entry)
  scores.sort((a, b) => b.score - a.score)
  const trimmed = scores.slice(0, config.leaderboardSize)
  localStorage.setItem(SCORES_KEY, JSON.stringify(trimmed))
  return trimmed
}
