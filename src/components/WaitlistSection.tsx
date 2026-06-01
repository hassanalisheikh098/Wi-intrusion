import { useState, useRef, useEffect } from 'react'

type UserType = 'homeowner' | 'business' | 'developer' | 'researcher'

export default function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [type, setType] = useState<UserType>('homeowner')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.remove('reveal-hidden') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal-on-scroll').forEach(el => { el.classList.add('reveal-hidden'); observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  const userTypes: { value: UserType; label: string }[] = [
    { value: 'homeowner',  label: 'Homeowner' },
    { value: 'business',   label: 'Business' },
    { value: 'developer',  label: 'Developer' },
    { value: 'researcher', label: 'Researcher' },
  ]

  return (
    <section id="waitlist" ref={ref} className="py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"/>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,0.07) 0%, transparent 70%)' }}/>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.3)] to-transparent"/>

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 reveal-on-scroll">
            <div className="mono-label mb-4">Early Access</div>
            <h2 className="section-title text-ice mb-4">
              Be first to <span className="italic" style={{ color: '#F5A623' }}>deploy.</span>
            </h2>
            <p className="font-body text-[rgba(232,237,240,0.55)] text-lg">
              WiIntrusion is in active development. Join the waitlist for early hardware access, prototype testing, and launch pricing.
            </p>
          </div>

          {/* Form card */}
          <div className="relative rounded-[3px] p-8 md:p-10 reveal-on-scroll corner-tl corner-br"
            style={{ background: '#141816', border: '1px solid rgba(245,166,35,0.2)', transitionDelay: '100ms' }}>
            <div className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, #F5A623, transparent)' }}/>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ice-muted block mb-3">I am a...</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {userTypes.map(ut => (
                      <button key={ut.value} type="button" onClick={() => setType(ut.value)}
                        className={`py-2.5 px-3 rounded-[2px] font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${
                          type === ut.value
                            ? 'bg-amber text-[#0A0C0B] border border-amber'
                            : 'bg-transparent text-ice-muted border border-[rgba(255,255,255,0.1)] hover:border-[rgba(245,166,35,0.4)] hover:text-amber'
                        }`}>
                        {ut.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="waitlist-email" className="font-mono text-[10px] font-bold uppercase tracking-widest text-ice-muted block mb-2">
                    Email Address
                  </label>
                  <div className="flex gap-3">
                    <input id="waitlist-email" type="email" value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com" className="input-terminal flex-1" required/>
                    <button type="submit" disabled={loading}
                      className="btn-primary px-6 flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" strokeDasharray="20" strokeDashoffset="10"/>
                          </svg>
                          Sending
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Request Access
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                <p className="font-mono text-[9px] text-ice-muted text-center tracking-wide">
                  No spam. No cameras. No microphones. We practice what we preach.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: 'rgba(45,222,122,0.12)', border: '1px solid rgba(45,222,122,0.4)', boxShadow: '0 0 32px rgba(45,222,122,0.2)' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 14 L11 19 L22 8" stroke="#2DDE7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#2DDE7A' }}>
                  ACCESS REQUESTED
                </div>
                <h3 className="font-display text-2xl font-bold text-ice mb-3">You're on the list.</h3>
                <p className="font-body text-[rgba(232,237,240,0.55)] max-w-sm mx-auto">
                  We'll reach out to <span className="text-amber font-mono text-sm">{email}</span> when the prototype is ready for testing.
                </p>
                <div className="mt-6 font-mono text-[9px] text-ice-muted uppercase tracking-widest">
                  User type: {type} · Registered: {new Date().toLocaleDateString('en-PK')}
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
            {[
              { value: '3',   label: 'ESP32 Nodes',  sub: 'per room' },
              { value: '60s', label: 'Setup Time',   sub: 'to calibrate' },
              { value: '0',   label: 'Cameras Used', sub: 'ever' },
            ].map(s => (
              <div key={s.label} className="text-center p-4 rounded-[3px] bg-[#141816] border border-[rgba(255,255,255,0.05)]">
                <div className="font-display text-3xl font-bold text-amber">{s.value}</div>
                <div className="font-mono text-[9px] font-bold text-ice uppercase tracking-widest mt-1">{s.label}</div>
                <div className="font-mono text-[9px] text-ice-muted">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
