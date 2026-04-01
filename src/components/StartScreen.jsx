import React, { useState } from 'react'
import { getConfig } from '../services/dataService'

export default function StartScreen({ onStart, onLeaderboard }) {
  const config = getConfig()
  const [difficulty, setDifficulty] = useState(config.defaultDifficulty)
  const [category, setCategory] = useState('All')

  const difficultyEntries = Object.entries(config.difficulties)

  return (
    <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Quiz Game
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Test your knowledge across multiple categories
      </p>

      <div
        style={{
          background: '#1e293b',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #334155',
          marginBottom: '1rem',
        }}
      >
        <label
          style={{ display: 'block', textAlign: 'left', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}
        >
          Difficulty
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {difficultyEntries.map(([key, val]) => (
            <button
              key={key}
              onClick={() => setDifficulty(key)}
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: difficulty === key ? '#6366f1' : '#334155',
                background: difficulty === key ? '#312e81' : 'transparent',
                color: difficulty === key ? '#fff' : '#94a3b8',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {val.label}
            </button>
          ))}
        </div>

        <label
          style={{ display: 'block', textAlign: 'left', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}
        >
          Category
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {['All', ...config.categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: category === cat ? '#6366f1' : '#334155',
                background: category === cat ? '#312e81' : 'transparent',
                color: category === cat ? '#fff' : '#94a3b8',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
                textAlign: 'left',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(difficulty, category)}
        style={{
          width: '100%',
          padding: '0.9rem',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1.05rem',
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: '0.75rem',
        }}
      >
        Start Quiz
      </button>

      <button
        onClick={onLeaderboard}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: 'transparent',
          color: '#6366f1',
          border: '2px solid #6366f1',
          borderRadius: '10px',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        🏆 Leaderboard
      </button>
    </div>
  )
}
