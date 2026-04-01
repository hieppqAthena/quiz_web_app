import React, { useEffect, useRef, useState } from 'react'
import { playSound } from '../services/audioService'

export default function Timer({ duration, onExpire, running }) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const intervalRef = useRef(null)

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          onExpire()
          return 0
        }
        if (prev <= 6) {
          // tick sound for last 5 seconds (when prev is 6→5→4→3→2→1)
          playSound('tick')
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [running, onExpire])

  const pct = duration > 0 ? (timeLeft / duration) * 100 : 0
  const barColor = pct > 50 ? '#22c55e' : pct > 25 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: '#94a3b8',
          marginBottom: '4px',
        }}
      >
        <span>Time</span>
        <span style={{ fontWeight: 700, color: pct <= 25 ? '#ef4444' : '#f1f5f9' }}>
          {timeLeft}s
        </span>
      </div>
      <div
        style={{
          height: '8px',
          background: '#1e293b',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: barColor,
            borderRadius: '4px',
            transition: 'width 1s linear, background 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}
