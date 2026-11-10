import { useEffect, useRef, useState } from 'react'

const pills = [
  { label: 'Website Testing',  bg: '#4A3F3F', t: '#E8E4E0' },
  { label: 'App Testing',      bg: '#6B5C5C', t: '#E8E4E0' },
  { label: 'AI-Assisted Dev',  bg: '#857878', t: '#E8E4E0' },
  { label: 'Product Design',   bg: '#B5A8A8', t: '#1A1818' },
  { label: 'Digital Creator',  bg: '#DED8D4', t: '#1A1818' },
]

export default function Loader() {
  const [phase, setPhase] = useState(0) // 0=in, 1=shown, 2=exit
  const [out, setOut] = useState(false)
  const [pillStates, setPillStates] = useState(pills.map(() => false))
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Stagger pills on
    pills.forEach((_, i) => {
      setTimeout(() => {
        setPillStates(s => s.map((v, j) => j <= i ? true : v))
      }, 300 + i * 220)
    })

    // Exit
    const exitT = 300 + pills.length * 220 + 600
    setTimeout(() => {
      setOut(true)
      setTimeout(() => {
        setDone(true)
        document.body.classList.add('ready')
      }, 950)
    }, exitT)
  }, [])

  if (done) return null

  return (
    <div className={`loader${out ? ' out' : ''}`} aria-hidden="true">
      <div style={{ width: 'min(78vw,22rem)', marginBottom: '0.5rem' }}>
        <p style={{ color: '#857878', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
          Arghya Ghosh / Portfolio
        </p>
      </div>
      {pills.map((p, i) => (
        <div
          key={p.label}
          className={`ld-pill${pillStates[i] ? ' on' : ''}${out ? ' exit' : ''}`}
          style={{
            background: p.bg,
            color: p.t,
            transitionDelay: out ? `${i * 45}ms` : '0ms',
          }}
        >
          {p.label}
        </div>
      ))}
    </div>
  )
}
