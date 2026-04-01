import { describe, it, expect } from 'vitest'
import config from './data/config.json'

// Pure scoring logic extracted for testing (mirrors QuizScreen implementation)
function computeMultiplier(streak, streakBonus) {
  if (streak >= streakBonus.tier2.minStreak) return streakBonus.tier2.multiplier
  if (streak >= streakBonus.tier1.minStreak) return streakBonus.tier1.multiplier
  return 1
}

function computeScore(correct, streak, pointsPerQuestion, streakBonus) {
  const multiplier = computeMultiplier(streak, streakBonus)
  return correct ? pointsPerQuestion * multiplier : 0
}

function nextStreak(correct, currentStreak) {
  return correct ? currentStreak + 1 : 0
}

const { streakBonus, pointsPerQuestion } = config

describe('computeMultiplier', () => {
  it('returns 1 for streak 0', () => {
    expect(computeMultiplier(0, streakBonus)).toBe(1)
  })
  it('returns 1 for streak 1', () => {
    expect(computeMultiplier(1, streakBonus)).toBe(1)
  })
  it('returns 1 for streak 2', () => {
    expect(computeMultiplier(2, streakBonus)).toBe(1)
  })
  it('returns 2 for streak 3 (tier1 threshold)', () => {
    expect(computeMultiplier(3, streakBonus)).toBe(2)
  })
  it('returns 2 for streak 4', () => {
    expect(computeMultiplier(4, streakBonus)).toBe(2)
  })
  it('returns 3 for streak 5 (tier2 threshold)', () => {
    expect(computeMultiplier(5, streakBonus)).toBe(3)
  })
  it('returns 3 for streak 10', () => {
    expect(computeMultiplier(10, streakBonus)).toBe(3)
  })
})

describe('computeScore', () => {
  it('awards 0 points for wrong answer regardless of streak', () => {
    expect(computeScore(false, 5, pointsPerQuestion, streakBonus)).toBe(0)
  })
  it('awards base points for correct answer with no streak', () => {
    expect(computeScore(true, 0, pointsPerQuestion, streakBonus)).toBe(pointsPerQuestion)
  })
  it('awards 2× for correct answer at streak 3', () => {
    expect(computeScore(true, 3, pointsPerQuestion, streakBonus)).toBe(pointsPerQuestion * 2)
  })
  it('awards 3× for correct answer at streak 5', () => {
    expect(computeScore(true, 5, pointsPerQuestion, streakBonus)).toBe(pointsPerQuestion * 3)
  })
})

describe('nextStreak', () => {
  it('increments streak on correct answer', () => {
    expect(nextStreak(true, 4)).toBe(5)
  })
  it('resets streak to 0 on wrong answer', () => {
    expect(nextStreak(false, 4)).toBe(0)
  })
  it('starts streak from 0', () => {
    expect(nextStreak(true, 0)).toBe(1)
  })
})
