import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getConfig, getQuestions, getScores, saveScore } from './dataService'

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => {
      store[key] = value
    }),
    removeItem: vi.fn((key) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

beforeEach(() => {
  localStorageMock.clear()
  vi.clearAllMocks()
})

describe('getConfig', () => {
  it('returns config with required keys', () => {
    const config = getConfig()
    expect(config).toHaveProperty('difficulties')
    expect(config).toHaveProperty('questionsPerGame')
    expect(config).toHaveProperty('leaderboardSize')
    expect(config).toHaveProperty('streakBonus')
    expect(config).toHaveProperty('pointsPerQuestion')
    expect(config).toHaveProperty('categories')
    expect(config).toHaveProperty('audio')
  })

  it('has all 3 difficulty levels', () => {
    const { difficulties } = getConfig()
    expect(difficulties).toHaveProperty('easy')
    expect(difficulties).toHaveProperty('medium')
    expect(difficulties).toHaveProperty('hard')
  })
})

describe('getQuestions', () => {
  it('returns all questions with no filter', () => {
    const questions = getQuestions()
    expect(questions.length).toBeGreaterThanOrEqual(10)
  })

  it('filters by category', () => {
    const questions = getQuestions({ category: 'General Knowledge' })
    expect(questions.every((q) => q.category === 'General Knowledge')).toBe(true)
    expect(questions.length).toBeGreaterThan(0)
  })

  it('filters by difficulty', () => {
    const questions = getQuestions({ difficulty: 'hard' })
    expect(questions.every((q) => q.difficulty === 'hard')).toBe(true)
    expect(questions.length).toBeGreaterThan(0)
  })

  it('filters by both category and difficulty', () => {
    const questions = getQuestions({ category: 'Claude Code', difficulty: 'easy' })
    expect(questions.every((q) => q.category === 'Claude Code' && q.difficulty === 'easy')).toBe(
      true
    )
  })

  it('returns all categories when category is "All"', () => {
    const all = getQuestions()
    const allCategory = getQuestions({ category: 'All' })
    expect(allCategory.length).toBe(all.length)
  })

  it('covers all 3 categories and all 3 difficulty levels', () => {
    const all = getQuestions()
    const categories = [...new Set(all.map((q) => q.category))]
    const difficulties = [...new Set(all.map((q) => q.difficulty))]
    expect(categories).toContain('Claude Code')
    expect(categories).toContain('Game Design')
    expect(categories).toContain('General Knowledge')
    expect(difficulties).toContain('easy')
    expect(difficulties).toContain('medium')
    expect(difficulties).toContain('hard')
  })
})

describe('getScores', () => {
  it('returns empty array when localStorage is empty (seeded from scores.json)', () => {
    const scores = getScores()
    expect(Array.isArray(scores)).toBe(true)
  })

  it('returns stored scores from localStorage on subsequent calls', () => {
    const mockScores = [{ id: '1', playerName: 'Alice', score: 500 }]
    localStorageMock.setItem('quiz_scores', JSON.stringify(mockScores))
    const scores = getScores()
    expect(scores).toEqual(mockScores)
  })
})

describe('saveScore', () => {
  it('adds a score and returns sorted array', () => {
    const entry1 = { id: '1', playerName: 'Alice', score: 300, date: new Date().toISOString() }
    const entry2 = { id: '2', playerName: 'Bob', score: 500, date: new Date().toISOString() }
    saveScore(entry1)
    const result = saveScore(entry2)
    expect(result[0].score).toBe(500)
    expect(result[1].score).toBe(300)
  })

  it('trims to leaderboardSize', () => {
    const { leaderboardSize } = getConfig()
    for (let i = 0; i < leaderboardSize + 5; i++) {
      saveScore({ id: String(i), playerName: 'Player', score: i * 100, date: new Date().toISOString() })
    }
    const scores = getScores()
    expect(scores.length).toBeLessThanOrEqual(leaderboardSize)
  })

  it('persists to localStorage', () => {
    const entry = { id: '1', playerName: 'Alice', score: 400, date: new Date().toISOString() }
    saveScore(entry)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('quiz_scores', expect.any(String))
  })
})
