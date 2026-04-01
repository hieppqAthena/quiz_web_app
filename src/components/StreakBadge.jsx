import React from 'react'

export default function StreakBadge({ streak, multiplier }) {
  if (streak === 0) return null
  const color = multiplier >= 3 ? '#f59e0b' : multiplier >= 2 ? '#22c55e' : '#6366f1'
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: color,
        color: '#fff',
        borderRadius: '999px',
        padding: '0.25rem 0.75rem',
        fontWeight: 700,
        fontSize: '0.85rem',
      }}
    >
      🔥 {streak} streak · {multiplier}×
    </div>
  )
}
