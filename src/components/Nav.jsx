import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Nav() {
  const ref = useRef(null)
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Respect system preference
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = (d) => { setDark(d); document.documentElement.dataset.mode = d ? 'dark' : 'light' }
    apply(mq.matches)
    mq.addEventListener('change', e => apply(e.matches))

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)

    gsap.fromTo(ref.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
    )
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.mode = next ? 'dark' : 'light'
  }

  const goto = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header ref={ref} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${scrolled ? '0.9rem' : '1.4rem'} 2rem`,
      transition: 'padding 0.4s, background 0.4s, border-color 0.4s',
      background: scrolled ? 'color-mix(in srgb, var(--bg) 85%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
    }}>
      {/* Wordmark */}
      <span style={{ fontSize:'0.75rem', letterSpacing:'0.18em', textTransform:'uppercase',
        color:'var(--muted)', fontWeight:500 }}>
        Arghya Ghosh
      </span>

      {/* Center nav */}
      <nav style={{ display:'flex', gap:'2rem', alignItems:'center' }}>
        {[['work','Work'],['timeline','Work history'],['contact','Contact']].map(([id,label])=>(
          <button key={id} onClick={()=>goto(id)} style={{
            fontSize:'0.78rem', color:'var(--muted)', letterSpacing:'0.04em',
            transition:'color 0.2s',
          }}
          onMouseEnter={e=>e.target.style.color='var(--fg)'}
          onMouseLeave={e=>e.target.style.color='var(--muted)'}>
            {label}
          </button>
        ))}
      </nav>

      {/* Right: dark toggle + hire */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
        <button onClick={toggleDark} aria-label="Toggle dark mode" style={{
          width:32, height:18, borderRadius:999, background:'var(--surface)',
          border:'1px solid var(--line)', position:'relative', display:'flex', alignItems:'center',
          transition:'background 0.3s',
        }}>
          <span style={{
            position:'absolute', left: dark ? 'calc(100% - 14px)' : '2px',
            width:12, height:12, borderRadius:'50%', background:'var(--fg)',
            transition:'left 0.3s var(--e-spring)',
          }} />
        </button>
        <button onClick={()=>goto('contact')} style={{
          fontSize:'0.72rem', letterSpacing:'0.1em', textTransform:'uppercase',
          border:'1px solid var(--line)', color:'var(--fg)',
          padding:'0.45rem 1rem', borderRadius:999,
          transition:'background 0.25s, color 0.25s',
        }}
        onMouseEnter={e=>{e.currentTarget.style.background='var(--btn-bg)';e.currentTarget.style.color='var(--btn-fg)'}}
        onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--fg)'}}>
          Let's talk
        </button>
      </div>
    </header>
  )
}
