import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '01',
    title: 'AuctionVerse',
    category: 'Sports Auction & League Platform',
    role: 'Product Planning · AI-Assisted Dev · Flow Testing',
    desc: 'Private sports leagues where the auction is the game. Friends join private leagues, bid live for players in real-time, build squads within budget constraints, and compete in points-based standings.',
    highlights: ['Live real-time bidding room', 'Budget & squad rule engine', 'Points calculation & leaderboard'],
    tags: ['React', 'WebSockets', 'AI-Dev', 'Usability Testing'],
    status: 'Live Platform',
    link: 'https://auctionverse.vercel.app',
    shape: 'torus',
  },
  {
    id: '02',
    title: 'Smart Day Planner',
    category: 'Interactive Utility & Experience Generator',
    role: 'Interface Design · Filtering Logic · End-to-End Testing',
    desc: 'A smart day-plan generator built around real group dynamics. Filters by location, budget per person, available time window, and mood to deliver ready-to-go, frictionless itineraries.',
    highlights: ['Multi-variable filtering engine', 'Dynamic itinerary timeline', 'Mobile-first responsive flow'],
    tags: ['Product Design', 'State Machine', 'QA Testing', 'UX Flow'],
    status: 'Demo Available',
    link: '#',
    shape: 'icosa',
  },
  {
    id: '03',
    title: 'Modern Business Experience',
    category: 'Local Service & High-Conversion Showcase',
    role: 'Design Concept · Conversion Architecture · Speed Optimization',
    desc: 'High-clarity digital presence designed to turn curious visitors into paying customers. Eliminates fluff with immediate value propositions, transparent pricing models, and instant direct enquiry actions.',
    highlights: ['Sub-1s First Contentful Paint', 'Direct WhatsApp & Booking triggers', 'Zero friction service selector'],
    tags: ['Web Design', 'Conversion UX', 'Mobile First'],
    status: 'Concept Showcase',
    link: null,
    shape: 'octa',
  },
]

function ProjectMesh({ shape }) {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.22
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={1.2}>
        {shape === 'torus' && <torusKnotGeometry args={[0.7, 0.22, 100, 16]} />}
        {shape === 'icosa' && <icosahedronGeometry args={[1, 1]} />}
        {shape === 'octa' && <octahedronGeometry args={[1]} />}
        <MeshDistortMaterial
          color="#9E8E8E"
          distort={0.15}
          speed={1.5}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
    </Float>
  )
}

export default function Work() {
  const [activeTab, setActiveTab] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-header', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      })
      gsap.from('.work-card', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.work-cards-grid', start: 'top 80%' },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={containerRef}
      style={{
        padding: '7rem 2rem 8rem',
        maxWidth: '82rem',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Top Hairline Header */}
      <div className="work-header" style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
            Selected Work / 01 — 03
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--fg)', maxWidth: '38rem' }}>
            Built with purpose. Tested for real users.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '20rem', lineHeight: 1.6 }}>
            Every product goes through rigorous edge-case testing, flow refinements, and performance tuning before launch.
          </p>
        </div>
      </div>

      {/* Cards List */}
      <div className="work-cards-grid" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="work-card"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '1.5rem',
              padding: 'clamp(1.8rem, 3.5vw, 3rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.3s, transform 0.3s var(--e-spring)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--line)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Info Side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.05em' }}>
                  {proj.id}
                </span>
                <span style={{ height: '4px', width: '4px', borderRadius: '50%', background: 'var(--muted)' }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {proj.category}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '0.72rem', background: 'var(--pill)', border: '1px solid var(--pill-b)', padding: '0.2rem 0.65rem', borderRadius: 999, color: 'var(--fg)', fontWeight: 500 }}>
                  {proj.status}
                </span>
              </div>

              <h3 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.4rem)', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', margin: 0 }}>
                {proj.title}
              </h3>

              <p style={{ fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                {proj.desc}
              </p>

              {/* Bullet highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.2rem' }}>
                {proj.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--fg)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
                    {h}
                  </div>
                ))}
              </div>

              {/* Tags and CTA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '0.6rem', paddingTop: '1.2rem', borderTop: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '0.5rem',
                        background: 'var(--surface2)',
                        color: 'var(--muted)',
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {proj.link ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--fg)',
                      transition: 'gap 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.gap = '0.7rem')}
                    onMouseLeave={(e) => (e.currentTarget.style.gap = '0.4rem')}
                  >
                    View Project <span style={{ fontSize: '0.9rem' }}>↗</span>
                  </a>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Exploratory Concept
                  </span>
                )}
              </div>
            </div>

            {/* 3D Visualizer Canvas Side */}
            <div
              style={{
                height: '280px',
                width: '100%',
                borderRadius: '1rem',
                background: 'var(--surface2)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--line)',
              }}
            >
              <Canvas camera={{ position: [0, 0, 3.2], fov: 48 }} dpr={[1, 2]}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[3, 3, 4]} intensity={1.8} color="#E8E4E0" />
                <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#6B5C5C" />
                <Suspense fallback={null}>
                  <ProjectMesh shape={proj.shape} />
                </Suspense>
                <EffectComposer>
                  <Bloom intensity={0.2} luminanceThreshold={0.8} />
                </EffectComposer>
              </Canvas>
              <div style={{ position: 'absolute', bottom: '0.75rem', right: '1rem', fontSize: '0.65rem', color: 'var(--subtle)', letterSpacing: '0.1em', textTransform: 'uppercase', pointerEvents: 'none' }}>
                Interactive Model
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
