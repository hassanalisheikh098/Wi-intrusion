import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01', title: 'Deploy the Triangle', subtitle: 'Hardware Setup', color: '#F5A623',
    description: "Place the Master Anchor (M-Node) and two Satellite Anchors (S-Nodes) in three corners of your room at waist height. The triangular geometry creates overlapping WiFi coverage zones for full spatial awareness.",
    detail: 'Recommended: 3–4 ft height · 2.4 GHz network · 6×6m max coverage',
    tags: ['ESP32','2.4GHz','LoS Setup'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <polygon points="24,6 6,40 42,40" stroke="#F5A623" strokeWidth="1.5" strokeDasharray="4 2" fill="rgba(245,166,35,0.05)"/>
        <circle cx="24" cy="6" r="4" fill="#141816" stroke="#F5A623" strokeWidth="1.5"/>
        <circle cx="24" cy="6" r="1.5" fill="#F5A623"/>
        <circle cx="6" cy="40" r="4" fill="#141816" stroke="#2DDE7A" strokeWidth="1.5"/>
        <circle cx="6" cy="40" r="1.5" fill="#2DDE7A"/>
        <circle cx="42" cy="40" r="4" fill="#141816" stroke="#2DDE7A" strokeWidth="1.5"/>
        <circle cx="42" cy="40" r="1.5" fill="#2DDE7A"/>
        <circle cx="24" cy="26" r="5" fill="rgba(229,83,75,0.3)" stroke="#E5534B" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    number: '02', title: '60-Second Calibration', subtitle: 'Baseline Learning', color: '#2DDE7A',
    description: "The system samples the room's WiFi signal environment while empty. This baseline allows the AI to identify any deviation caused by human presence — eliminating false alarms from fans, HVAC, or furniture.",
    detail: 'Dynamic Background Updating recalibrates automatically over time',
    tags: ['FFT Analysis','Baseline','Auto-Calibrate'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="18" stroke="rgba(45,222,122,0.2)" strokeWidth="1"/>
        <circle cx="24" cy="24" r="12" stroke="rgba(45,222,122,0.35)" strokeWidth="1"/>
        <circle cx="24" cy="24" r="6" stroke="#2DDE7A" strokeWidth="1.5"/>
        <circle cx="24" cy="24" r="2" fill="#2DDE7A"/>
        <path d="M24 6 L24 10" stroke="#2DDE7A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24 38 L24 42" stroke="#2DDE7A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 24 L10 24" stroke="#2DDE7A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M38 24 L42 24" stroke="#2DDE7A" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="24" y="28" textAnchor="middle" fill="#2DDE7A" fontSize="7" fontFamily="JetBrains Mono" fontWeight="700">60s</text>
      </svg>
    ),
  },
  {
    number: '03', title: 'Live Detection & Alerts', subtitle: 'AI-Powered Monitoring', color: '#E5534B',
    description: "The Master Anchor's edge processor continuously analyzes Channel State Information (CSI) data. Deviations trigger classification: Walking, Standing, Fall Detected, or Breathing — and push alerts to your phone.",
    detail: 'All processing is local. Zero raw data leaves your network.',
    tags: ['CSI Analysis','Edge AI','Push Alerts'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="8" y="12" width="32" height="24" rx="2" stroke="#E5534B" strokeWidth="1.5" fill="rgba(229,83,75,0.05)"/>
        <rect x="12" y="16" width="14" height="16" rx="1" fill="rgba(229,83,75,0.1)" stroke="rgba(229,83,75,0.3)" strokeWidth="0.5"/>
        <circle cx="19" cy="24" r="4" fill="rgba(229,83,75,0.4)" stroke="#E5534B" strokeWidth="1"/>
        <circle cx="19" cy="24" r="1.5" fill="#E5534B"/>
        <path d="M30 18 L36 18" stroke="rgba(229,83,75,0.5)" strokeWidth="1" strokeLinecap="round"/>
        <path d="M30 22 L34 22" stroke="rgba(229,83,75,0.5)" strokeWidth="1" strokeLinecap="round"/>
        <path d="M30 26 L36 26" stroke="rgba(229,83,75,0.5)" strokeWidth="1" strokeLinecap="round"/>
        <path d="M30 30 L32 30" stroke="rgba(229,83,75,0.5)" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="36" cy="14" r="4" fill="#E5534B"/>
        <text x="36" y="17" textAnchor="middle" fill="white" fontSize="6" fontFamily="JetBrains Mono" fontWeight="700">!</text>
      </svg>
    ),
  },
]

const WAVEFORM_HEIGHTS = Array.from({ length: 80 }, (_, i) => {
  const base = 20 + Math.sin(i * 0.4) * 15
  const anomaly = i > 35 && i < 55 ? 20 : 0
  return Math.round((base + anomaly) * 10) / 10
})

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.remove('reveal-hidden') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal-on-scroll').forEach(el => { el.classList.add('reveal-hidden'); observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" ref={ref} className="py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"/>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.3)] to-transparent"/>
      <div className="section-container relative z-10">
        <div className="mb-20 reveal-on-scroll">
          <div className="mono-label mb-4">How It Works</div>
          <h2 className="section-title text-ice max-w-2xl">
            Three nodes. <span className="italic" style={{ color: '#F5A623' }}>Infinite</span> awareness.
          </h2>
          <p className="font-body text-[rgba(232,237,240,0.55)] text-lg mt-4 max-w-xl">
            WiIntrusion turns ordinary WiFi signals into a spatial sensing fabric. No special hardware beyond ESP32 microcontrollers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="feature-card reveal-on-scroll corner-tl corner-br"
              style={{ transitionDelay: `${index * 120}ms` }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: step.color, opacity: 0.6 }}/>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-5xl font-bold opacity-20 leading-none" style={{ color: step.color }}>{step.number}</span>
                  <div className="w-12 h-12">{step.icon}</div>
                </div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: step.color }}>{step.subtitle}</div>
                <h3 className="font-display text-[22px] font-bold text-ice leading-tight mb-3">{step.title}</h3>
                <p className="font-body text-[14px] text-[rgba(232,237,240,0.55)] leading-relaxed mb-6">{step.description}</p>
                <div className="rounded-[2px] p-3 mb-5" style={{ background: `${step.color}0D`, border: `1px solid ${step.color}25` }}>
                  <p className="font-mono text-[10px] text-[rgba(232,237,240,0.45)] leading-relaxed">{step.detail}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[2px]"
                      style={{ background: `${step.color}12`, color: step.color, border: `1px solid ${step.color}25` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 z-10 hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-[#141816] border border-[rgba(255,255,255,0.1)]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6 L10 6 M7 3 L10 6 L7 9" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CSI Stream */}
        <div className="mt-16 reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
          <div className="bg-[#141816] border border-[rgba(255,255,255,0.06)] rounded-[3px] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="status-dot"/>
                <span className="font-mono text-[10px] text-[rgba(232,237,240,0.4)] uppercase tracking-widest">Live CSI Data Stream</span>
              </div>
              <span className="font-mono text-[10px] text-amber uppercase tracking-widest">PROCESSING</span>
            </div>
            <div className="flex items-center gap-[2px] h-10">
              {Array.from({ length: 80 }, (_, i) => (
                <div key={i} className="flex-1 rounded-sm waveform-bar"
                  style={{
                    background: i > 35 && i < 55 ? '#E5534B' : '#F5A623',
                    opacity: i > 35 && i < 55 ? 0.8 : 0.3,
                    animation: `waveform ${0.5 + (i % 7) * 0.15}s ease-in-out infinite`,
                    animationDelay: `${i * 0.03}s`,
                    height: `${WAVEFORM_HEIGHTS[i]}%`,
                  }}/>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              <span className="font-mono text-[9px] text-[rgba(232,237,240,0.3)] uppercase tracking-widest">Normal Background</span>
              <span className="font-mono text-[9px] text-[#E5534B] uppercase tracking-widest">▲ Human Movement Detected</span>
              <span className="font-mono text-[9px] text-[rgba(232,237,240,0.3)] uppercase tracking-widest">Normal Background</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
