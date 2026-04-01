import React from 'react'

export default function ResultsScreen({ result, onRestart, onLeaderboard }) {
  const { score, accuracy, timeTaken, difficulty, category, totalQuestions, correctCount } = result
  const accuracyPct = Math.round(accuracy * 100)

  return (
    <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem', color: '#f1f5f9' }}>
        Game Over!
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Here's how you did</p>

      <div
        style={{
          background: '#1e293b',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #334155',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{ fontSize: '3rem', fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}
        >
          {score}
        </div>
        <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          points
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1rem',
            borderTop: '1px solid #334155',
            paddingTop: '1rem',
          }}
        >
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#22c55e' }}>
              {accuracyPct}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Accuracy</div>
            <div style={{ fontSize: '0.7rem', color: '#475569' }}>
              {correctCount}/{totalQuestions}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f59e0b' }}>
              {timeTaken}s
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total time</div>
          </div>
          <div>
            <div
              style={{ fontSize: '1.4rem', fontWeight: 700, color: '#a855f7', textTransform: 'capitalize' }}
            >
              {difficulty}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Difficulty</div>
            <div style={{ fontSize: '0.7rem', color: '#475569' }}>{category}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          onClick={onRestart}
          style={{
            padding: '0.9rem',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Play Again
        </button>
        <button
          onClick={onLeaderboard}
          style={{
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
    </div>
  )
}
