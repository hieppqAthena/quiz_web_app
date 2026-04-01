import React, { useState, useEffect } from 'react'

export default function QuestionCard({ question, onAnswer, disabled }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [correctIndex, setCorrectIndex] = useState(null)

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null)
    setCorrectIndex(null)
  }, [question.id])

  function handleClick(index) {
    if (disabled || selectedIndex !== null) return
    setSelectedIndex(index)
    setCorrectIndex(question.correctIndex)
    onAnswer(index)
  }

  function getButtonClass(index) {
    if (selectedIndex === null) return ''
    if (index === correctIndex) return 'answer-correct'
    if (index === selectedIndex) return 'answer-wrong'
    return ''
  }

  return (
    <div>
      <p
        style={{
          fontSize: '1.15rem',
          fontWeight: 600,
          marginBottom: '1.25rem',
          lineHeight: 1.5,
          color: '#f1f5f9',
        }}
      >
        {question.prompt}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(index)}
            onClick={() => handleClick(index)}
            disabled={disabled || selectedIndex !== null}
            style={{
              padding: '0.75rem 1rem',
              background: '#1e293b',
              color: '#f1f5f9',
              border: '2px solid #334155',
              borderRadius: '8px',
              fontSize: '0.95rem',
              textAlign: 'left',
              cursor: disabled || selectedIndex !== null ? 'not-allowed' : 'pointer',
              transition: 'border-color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!disabled && selectedIndex === null) {
                e.currentTarget.style.borderColor = '#6366f1'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedIndex === null) {
                e.currentTarget.style.borderColor = '#334155'
              }
            }}
          >
            <span style={{ color: '#6366f1', marginRight: '0.5rem', fontWeight: 700 }}>
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
