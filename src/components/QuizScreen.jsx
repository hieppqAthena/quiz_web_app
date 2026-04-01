import React, { useState, useCallback, useRef } from 'react'
import { getConfig, getQuestions } from '../services/dataService'
import { playSound } from '../services/audioService'
import QuestionCard from './QuestionCard'
import Timer from './Timer'
import ProgressBar from './ProgressBar'
import StreakBadge from './StreakBadge'

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function computeMultiplier(streak, streakBonus) {
  if (streak >= streakBonus.tier2.minStreak) return streakBonus.tier2.multiplier
  if (streak >= streakBonus.tier1.minStreak) return streakBonus.tier1.multiplier
  return 1
}

export default function QuizScreen({ difficulty, category, onFinish }) {
  const config = getConfig()
  const allQuestions = getQuestions({ category })

  const [questions] = useState(() => {
    const filtered = allQuestions.filter((q) => q.difficulty === difficulty)
    const fallback = allQuestions
    const pool = filtered.length >= config.questionsPerGame ? filtered : fallback
    return shuffleArray(pool).slice(0, config.questionsPerGame)
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [timerRunning, setTimerRunning] = useState(true)
  const startTimeRef = useRef(Date.now())

  const currentQuestion = questions[currentIndex]
  const multiplier = computeMultiplier(streak, config.streakBonus)

  const advance = useCallback(() => {
    const nextIndex = currentIndex + 1
    if (nextIndex >= questions.length) {
      const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000)
      playSound('gameOver')
      onFinish({
        score,
        accuracy: correctCount / questions.length,
        timeTaken,
        difficulty,
        category: category || 'All',
        totalQuestions: questions.length,
        correctCount,
      })
    } else {
      setCurrentIndex(nextIndex)
      setAnswered(false)
      setTimerRunning(true)
    }
  }, [currentIndex, questions.length, score, correctCount, difficulty, category, onFinish])

  function handleAnswer(selectedIndex) {
    if (answered) return
    setAnswered(true)
    setTimerRunning(false)

    const isCorrect = selectedIndex === currentQuestion.correctIndex
    if (isCorrect) {
      playSound('correct')
      const earned = config.pointsPerQuestion * multiplier
      setScore((s) => s + earned)
      setStreak((s) => s + 1)
      setCorrectCount((c) => c + 1)
    } else {
      playSound('wrong')
      setStreak(0)
    }

    setTimeout(advance, 1200)
  }

  function handleExpire() {
    if (answered) return
    setAnswered(true)
    setTimerRunning(false)
    setStreak(0)
    setTimeout(advance, 800)
  }

  const timePerQuestion = config.difficulties[difficulty]?.timePerQuestion ?? 15

  return (
    <div style={{ width: '100%', maxWidth: '620px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <ProgressBar current={currentIndex + 1} total={questions.length} />
        <Timer
          key={currentIndex}
          duration={timePerQuestion}
          onExpire={handleExpire}
          running={timerRunning}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Score: <strong style={{ color: '#f1f5f9' }}>{score}</strong>
          </span>
          <StreakBadge streak={streak} multiplier={multiplier} />
        </div>
      </div>

      <div
        style={{
          background: '#1e293b',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #334155',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
          {currentQuestion.category} · {currentQuestion.difficulty}
        </div>
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          disabled={answered}
        />
      </div>
    </div>
  )
}
