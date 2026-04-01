import { getConfig } from './dataService'

let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

export function playSound(type) {
  try {
    const config = getConfig()
    const soundConfig = config.audio[type]
    if (!soundConfig) return

    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = soundConfig.frequency
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + soundConfig.duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + soundConfig.duration)
  } catch {
    // Audio not available (e.g., in test environment) — silently ignore
  }
}
