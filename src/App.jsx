import React, { useState } from 'react'
import { getConfig, getScores, saveScore } from './services/dataService'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'
import Leaderboard from './components/Leaderboard'

export default function App() {
  const config = getConfig()
  const [gameState, setGameState] = useState('start')
  const [difficulty, setDifficulty] = useState(config.defaultDifficulty)
  const [category, setCategory] = useState('All')
  const [result, setResult] = useState(null)
  const [scores, setScores] = useState(() => getScores())

  function handleStart(selectedDifficulty, selectedCategory) {
    setDifficulty(selectedDifficulty)
    setCategory(selectedCategory)
    setGameState('quiz')
  }

  function handleFinish(gameResult) {
    const entry = {
      id: crypto.randomUUID(),
      playerName: 'Player',
      score: gameResult.score,
      accuracy: gameResult.accuracy,
      timeTaken: gameResult.timeTaken,
      difficulty: gameResult.difficulty,
      category: gameResult.category,
      date: new Date().toISOString(),
    }
    const updated = saveScore(entry)
    setScores(updated)
    setResult(gameResult)
    setGameState('results')
  }

  function handleRestart() {
    setResult(null)
    setGameState('start')
  }

  function handleShowLeaderboard() {
    setScores(getScores())
    setGameState('leaderboard')
  }

  function handleCloseLeaderboard() {
    setGameState(result ? 'results' : 'start')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      {gameState === 'start' && (
        <StartScreen onStart={handleStart} onLeaderboard={handleShowLeaderboard} />
      )}

      {gameState === 'quiz' && (
        <QuizScreen difficulty={difficulty} category={category} onFinish={handleFinish} />
      )}

      {gameState === 'results' && result && (
        <ResultsScreen
          result={result}
          onRestart={handleRestart}
          onLeaderboard={handleShowLeaderboard}
        />
      )}

      {gameState === 'leaderboard' && (
        <Leaderboard scores={scores} onClose={handleCloseLeaderboard} />
      )}
    </div>
  )
}
