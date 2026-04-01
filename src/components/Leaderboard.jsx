import React from 'react'

export default function Leaderboard({ scores, onClose }) {
  return (
    <div style={{ width: '100%', maxWidth: '560px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f1f5f9' }}>
          🏆 Leaderboard
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: '1px solid #334155',
            color: '#94a3b8',
            borderRadius: '8px',
            padding: '0.4rem 0.8rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          Close
        </button>
      </div>

      {scores.length === 0 ? (
        <div
          style={{
            background: '#1e293b',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            color: '#64748b',
            border: '1px solid #334155',
          }}
        >
          No scores yet. Play a game to get on the board!
        </div>
      ) : (
        <div
          style={{
            background: '#1e293b',
            borderRadius: '12px',
            border: '1px solid #334155',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                <th style={thStyle}>#</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Player</th>
                <th style={thStyle}>Score</th>
                <th style={thStyle}>Accuracy</th>
                <th style={thStyle}>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry, i) => (
                <tr
                  key={entry.id}
                  style={{
                    borderBottom: i < scores.length - 1 ? '1px solid #1e293b' : 'none',
                    background: i === 0 ? '#1c1f3a' : 'transparent',
                  }}
                >
                  <td style={{ ...tdStyle, color: i < 3 ? medalColor(i) : '#64748b', fontWeight: 700 }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'left', color: '#f1f5f9', fontWeight: 600 }}>
                    {entry.playerName}
                  </td>
                  <td style={{ ...tdStyle, color: '#6366f1', fontWeight: 700 }}>
                    {entry.score}
                  </td>
                  <td style={{ ...tdStyle, color: '#22c55e' }}>
                    {Math.round(entry.accuracy * 100)}%
                  </td>
                  <td style={{ ...tdStyle, color: '#94a3b8', textTransform: 'capitalize' }}>
                    {entry.difficulty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const thStyle = {
  padding: '0.75rem 1rem',
  fontSize: '0.75rem',
  color: '#64748b',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  textAlign: 'center',
}

const tdStyle = {
  padding: '0.75rem 1rem',
  fontSize: '0.9rem',
  textAlign: 'center',
}

function medalColor(i) {
  return ['#f59e0b', '#94a3b8', '#b45309'][i] ?? '#64748b'
}
