import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useEffect, useRef, Suspense, useState } from 'react'
import { gsap } from 'gsap'

function GlassOrb() {
  const ref = useRef()
  useFrame(s => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.09
      ref.current.rotation.z = s.clock.elapsedTime * 0.04
    }
  })
  return (
    <Float speed={1.0} floatIntensity={0.4} rotationIntensity={0.2}>
      <mesh ref={ref} scale={1.6}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshTransmissionMaterial
          backside samples={6} thickness={0.4}
          roughness={0.03} chromaticAberration={0.04}
          iridescence={0.2} iridescenceIOR={1.2}
          color="#C4B0B0" transmission={0.97} transparent
        />
      </mesh>
    </Float>
  )
}

function ThinRing() {
  const ref = useRef()
  useFrame(s => { if (ref.current) { ref.current.rotation.x = s.clock.elapsedTime * 0.12; ref.current.rotation.z = s.clock.elapsedTime * 0.06 } })
  return (
    <mesh ref={ref} position={[2.2, 0.6, -0.8]} rotation={[0.5, 0, 0.3]}>
      <torusGeometry args={[0.8, 0.008, 2, 90]} />
      <meshStandardMaterial color="#B5A8A8" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const badgeRef = useRef(null)
  const ctaRef = useRef(null)
  const [time, setTime] = useState('')

  // Local time — Arghya's timezone (India IST)
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: true,
        timeZone: 'Asia/Kolkata'
      }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    // Wait for body.ready (loader done)
    const run = () => {
      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
      )
      gsap.fromTo(ctaRef.current?.children ?? [],
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
      )
    }
    if (document.body.classList.contains('ready')) { run() }
    else { document.body.addEventListener('ready', run, { once: true }) }
  }, [])

  const goto = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={heroRef} id="hero" style={{
      position: 'relative', minHeight: '100svh', display: 'flex',
      flexDirection: 'column', justifyContent: 'flex-end',
      padding: '0 2rem 5rem', overflow: 'hidden',
    }}>
      {/* 3D canvas — right half */}
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'55%', pointerEvents:'none' }}>
        <Canvas camera={{ position:[0,0,5.5], fov:52 }} dpr={[1,2]} gl={{ antialias:true, alpha:true }}>
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[3,4,4]} intensity={2} color="#E8E4E0" />
          <directionalLight position={[-3,-2,2]} intensity={0.4} color="#C4B0B0" />
          <Suspense fallback={null}>
            <Environment preset="dawn" />
            <GlassOrb />
            <ThinRing />
          </Suspense>
          <EffectComposer>
            <Bloom intensity={0.25} luminanceThreshold={0.85} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Bottom fade */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'40%',
        background:'linear-gradient(to top, var(--bg), transparent)', pointerEvents:'none' }} />

      {/* Content — left side */}
      <div style={{ position:'relative', zIndex:10, maxWidth:'50rem' }}>

        {/* Status badge */}
        <div ref={badgeRef} style={{ opacity:0, display:'inline-flex', alignItems:'center',
          gap:'0.5rem', background:'var(--pill)', border:'1px solid var(--pill-b)',
          borderRadius:999, padding:'0.3rem 0.8rem 0.3rem 0.5rem',
          fontSize:'0.72rem', color:'var(--muted)', marginBottom:'2rem', backdropFilter:'blur(8px)',
        }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#6BA87A', display:'block',
            boxShadow:'0 0 0 3px rgba(107,168,122,.2)', animation:'pulse 2s infinite' }} />
          Available for new work &nbsp;·&nbsp; {time} IST
        </div>

        {/* Headline — line reveal */}
        <div ref={textRef} style={{ marginBottom:'1.6rem' }}>
          {[
            { text: 'I build websites.', weight: 800, size: 'clamp(2.6rem,5.5vw,6rem)', color: 'var(--fg)' },
            { text: 'I test them so', weight: 400, size: 'clamp(2.6rem,5.5vw,6rem)', color: 'var(--muted)' },
            { text: 'they actually work.', weight: 800, size: 'clamp(2.6rem,5.5vw,6rem)', color: 'var(--fg)' },
          ].map((line, i) => (
            <div key={i} className="line" style={{ '--delay': `${200 + i*120}ms` }}>
              <span style={{
                display:'block', fontWeight: line.weight, fontSize: line.size,
                lineHeight: 1.0, letterSpacing:'-0.02em', color: line.color,
              }}>
                {line.text}
              </span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="line" style={{ '--delay':'560ms', marginBottom:'2.5rem' }}>
          <span style={{ color:'var(--muted)', fontSize:'0.9rem', letterSpacing:'0.01em', lineHeight:1.6 }}>
            Web &amp; App Tester · Digital Creator · Independent
          </span>
        </div>

        {/* CTA row */}
        <div ref={ctaRef} style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
          <button onClick={()=>goto('contact')} style={{
            background:'var(--btn-bg)', color:'var(--btn-fg)',
            padding:'0.75rem 1.6rem', borderRadius:999, fontSize:'0.8rem',
            fontWeight:600, letterSpacing:'0.04em',
            transition:'opacity 0.2s, transform 0.2s',
            border:'none', opacity:0,
          }}
          onMouseEnter={e=>{e.currentTarget.style.opacity='0.85';e.currentTarget.style.transform='scale(1.03)'}}
          onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='scale(1)'}}>
            Hire me
          </button>
          <button onClick={()=>goto('work')} style={{
            background:'transparent', color:'var(--fg)',
            padding:'0.75rem 1.6rem', borderRadius:999, fontSize:'0.8rem',
            fontWeight:500, letterSpacing:'0.04em',
            border:'1px solid var(--line)', opacity:0,
            transition:'background 0.25s, transform 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--surface)';e.currentTarget.style.transform='scale(1.03)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.transform='scale(1)'}}>
            See my work
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:'absolute', bottom:'2rem', right:'2rem',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem', zIndex:10 }}>
        <span style={{ fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase',
          color:'var(--subtle)', writingMode:'vertical-rl' }}>scroll</span>
        <div style={{ width:1, height:36, background:'linear-gradient(to bottom, var(--subtle), transparent)' }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(107,168,122,.2) }
          50%      { box-shadow: 0 0 0 5px rgba(107,168,122,.08) }
        }
      `}</style>
    </section>
  )
}
