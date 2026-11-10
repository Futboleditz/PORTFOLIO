import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const history = [
  {
    period: '2024 — Present',
    role: 'Independent Web & App Tester · Digital Creator',
    company: 'Freelance & Independent Projects',
    description: 'Providing comprehensive end-to-end usability audits, functional QA checks, and edge-case testing for modern web platforms and mobile apps. Specializing in finding friction before customers do.',
    tags: ['Cross-Device QA', 'Usability Audits', 'Bug Reporting', 'AI-Assisted Dev'],
  },
  {
    period: '2024',
    role: 'Creator & Lead Builder',
    company: 'AuctionVerse (Sports Auction Platform)',
    description: 'Conceived and built a real-time private sports league bidding engine. Handled product flow planning, rapid iteration with AI development workflows, stress-testing live bidding states, and squad trade mechanics.',
    tags: ['React', 'WebSockets', 'Real-time Bidding', 'State Architecture'],
  },
  {
    period: '2023 — 2024',
    role: 'UI/UX Tester & Web Project Builder',
    company: 'Digital Utilities & Web Apps',
    description: 'Built and tested Smart Day Planner and custom conversion-first website concepts. Focused on frictionless form validation, responsive layout testing, and snappy performance scores.',
    tags: ['Interface Audits', 'Conversion UX', 'Mobile Testing', 'Performance QA'],
  },
]

const skillCards = [
  {
    title: 'Usability & Manual QA',
    desc: 'Uncovering broken navigation states, confusing user flows, and awkward edge cases on real devices.',
  },
  {
    title: 'Cross-Device & Browser Checks',
    desc: 'Ensuring consistent visual and interactive behavior across Safari, Chrome, iOS, and Android.',
  },
  {
    title: 'Clear Actionable Bug Reports',
    desc: 'Detailed reproduction steps, console error traces, screen recordings, and fix suggestions.',
  },
  {
    title: 'AI-Powered Development',
    desc: 'Utilizing modern AI tooling to build, prototype, and ship full-stack web concepts at high velocity.',
  },
]

export default function Timeline() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        opacity: 0,
        y: 35,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-list',
          start: 'top 80%',
        },
      })
      gsap.from('.skill-box', {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="timeline"
      ref={containerRef}
      style={{
        padding: '7rem 2rem 8rem',
        maxWidth: '82rem',
        margin: '0 auto',
        position: 'relative',
        borderTop: '1px solid var(--line)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
            Experience &amp; Expertise / 02
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
        </div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--fg)', maxWidth: '36rem' }}>
          Let's look at the journey.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        {/* Timeline list */}
        <div className="timeline-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
          {/* Vertical subtle indicator line */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              bottom: '1rem',
              left: '7px',
              width: '1px',
              background: 'var(--line)',
              zIndex: 0,
            }}
          />

          {history.map((item, index) => (
            <div
              key={index}
              className="timeline-item"
              style={{
                position: 'relative',
                paddingLeft: '2.4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {/* Bullet node */}
              <div
                style={{
                  position: 'absolute',
                  left: '2px',
                  top: '0.4rem',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: index === 0 ? 'var(--accent)' : 'var(--surface)',
                  border: '2px solid var(--bg)',
                  boxShadow: `0 0 0 1px ${index === 0 ? 'var(--accent)' : 'var(--line)'}`,
                  zIndex: 1,
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.04em' }}>
                  {item.period}
                </span>
                <span style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>•</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 500 }}>
                  {item.company}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--fg)', margin: 0, letterSpacing: '-0.01em' }}>
                {item.role}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: '0.2rem 0 0.5rem' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 999,
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      color: 'var(--muted)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills & Capability Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
              Testing &amp; Craft Capabilities
            </span>
          </div>

          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {skillCards.map((s, idx) => (
              <div
                key={idx}
                className="skill-box"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '1.2rem',
                  padding: '1.5rem 1.8rem',
                  transition: 'background 0.25s, border-color 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.background = 'var(--surface2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)'
                  e.currentTarget.style.background = 'var(--surface)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg)', margin: 0 }}>
                    {s.title}
                  </h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
