import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projectTypes = [
  'Website or Web App Testing',
  'UX / Flow Usability Review',
  'Frontend or Website Build',
  'Other / Consultation',
]

const budgetRanges = [
  'Under $500',
  '$500 – $1,500',
  '$1,500+',
  'Flexible / Open',
]

export default function Contact() {
  const containerRef = useRef(null)
  const [selectedType, setSelectedType] = useState(projectTypes[0])
  const [selectedBudget, setSelectedBudget] = useState(budgetRanges[0])
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-anim', {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Prepare mailto or submission state
    const subject = encodeURIComponent(`Project Inquiry: ${selectedType} - ${form.name}`)
    const body = encodeURIComponent(
      `Hi Arghya,\n\nName: ${form.name}\nEmail: ${form.email}\nProject Type: ${selectedType}\nBudget Range: ${selectedBudget}\n\nProject Details:\n${form.message}\n`
    )
    window.location.href = `mailto:arghyaghoshwork@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={containerRef}
      style={{
        padding: '7rem 2rem 5rem',
        maxWidth: '82rem',
        margin: '0 auto',
        position: 'relative',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
            Get in touch / 03
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--fg)', maxWidth: '38rem' }}>
            Need something tested or built? Let's make it happen.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '20rem', lineHeight: 1.6 }}>
            I reply within 24 hours. Working remotely with clients worldwide.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Form Container */}
        <div
          className="contact-anim"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '1.5rem',
            padding: 'clamp(1.8rem, 3vw, 2.8rem)',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>
                Opening your email client...
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                Your email client is ready with the pre-filled message. If it didn't open, contact me directly at{' '}
                <a href="mailto:arghyaghoshwork@gmail.com" style={{ textDecoration: 'underline', color: 'var(--fg)' }}>
                  arghyaghoshwork@gmail.com
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              {/* Project Type Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
                  What do you need?
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {projectTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setSelectedType(type)}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.4rem 0.85rem',
                        borderRadius: 999,
                        border: '1px solid',
                        borderColor: selectedType === type ? 'var(--fg)' : 'var(--line)',
                        background: selectedType === type ? 'var(--btn-bg)' : 'transparent',
                        color: selectedType === type ? 'var(--btn-fg)' : 'var(--muted)',
                        fontWeight: selectedType === type ? 600 : 500,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
                  Budget / Scope expectation
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {budgetRanges.map((range) => (
                    <button
                      type="button"
                      key={range}
                      onClick={() => setSelectedBudget(range)}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.4rem 0.85rem',
                        borderRadius: 999,
                        border: '1px solid',
                        borderColor: selectedBudget === range ? 'var(--fg)' : 'var(--line)',
                        background: selectedBudget === range ? 'var(--btn-bg)' : 'transparent',
                        color: selectedBudget === range ? 'var(--btn-fg)' : 'var(--muted)',
                        fontWeight: selectedBudget === range ? 600 : 500,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface2)',
                      border: '1px solid var(--line)',
                      borderRadius: '0.8rem',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                      color: 'var(--fg)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface2)',
                      border: '1px solid var(--line)',
                      borderRadius: '0.8rem',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                      color: 'var(--fg)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    About the project or test scope
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me a bit about your app, goals, or what needs a quality pass..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--surface2)',
                      border: '1px solid var(--line)',
                      borderRadius: '0.8rem',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                      color: 'var(--fg)',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                style={{
                  background: 'var(--btn-bg)',
                  color: 'var(--btn-fg)',
                  padding: '0.9rem 1.8rem',
                  borderRadius: 999,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.2s, transform 0.2s',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.88'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Send Inquiry <span>→</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info & Direct Channels */}
        <div className="contact-anim" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem', fontWeight: 600 }}>
              Direct Channels
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a
                href="https://github.com/arghya-ghosh"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  color: 'var(--fg)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--surface2)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surface)'
                  e.currentTarget.style.borderColor = 'var(--line)'
                }}
              >
                <span>GitHub Profile</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>↗</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  color: 'var(--fg)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--surface2)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surface)'
                  e.currentTarget.style.borderColor = 'var(--line)'
                }}
              >
                <span>Instagram</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>↗</span>
              </a>
            </div>
          </div>

          {/* Quick FAQ / Clarity block */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '1.2rem',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}
          >
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>
              Commitment &amp; Pricing
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Scope, deliverables, and timeline are aligned upfront before any testing or development starts. No surprise invoices or ambiguous milestones.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: '6rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--muted)',
        }}
      >
        <div>© {new Date().getFullYear()} Arghya Ghosh — All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </section>
  )
}
