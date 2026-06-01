import { useEffect, useRef } from 'react'

function PrivacyVisual() {
  return (
    <div className="flex justify-center py-4">
      <div className="relative w-24 h-28">
        <svg viewBox="0 0 96 112" className="w-full h-full">
          <path d="M48 4 L88 20 L88 60 C88 84 68 104 48 108 C28 104 8 84 8 60 L8 20 Z" fill="rgba(45,222,122,0.08)" stroke="#2DDE7A" strokeWidth="1.5"/>
          <rect x="30" y="44" width="36" height="24" rx="3" fill="rgba(229,83,75,0.1)" stroke="rgba(229,83,75,0.4)" strokeWidth="1"/>
          <circle cx="48" cy="56" r="7" fill="rgba(229,83,75,0.1)" stroke="rgba(229,83,75,0.4)" strokeWidth="1"/>
          <line x1="28" y1="42" x2="68" y2="82" stroke="#E5534B" strokeWidth="2" strokeLinecap="round"/>
          <path d="M36 70 L42 76 L60 58" stroke="#2DDE7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: '#2DDE7A', boxShadow: '0 0 12px rgba(45,222,122,0.5)' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5 L4 7 L8 3" stroke="#0A0C0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function HeatmapVisual() {
  return (
    <div className="w-full h-24 relative rounded-[3px] overflow-hidden bg-[#0F1210]">
      <svg viewBox="0 0 200 80" className="w-full h-full">
        <defs>
          <radialGradient id="heat1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5534B" stopOpacity="0.9"/>
            <stop offset="60%" stopColor="#F5A623" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0"/>
          </radialGradient>
          <filter id="blur1"><feGaussianBlur stdDeviation="5"/></filter>
        </defs>
        <rect x="10" y="8" width="180" height="64" rx="2" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <circle cx="100" cy="12" r="4" fill="rgba(245,166,35,0.3)" stroke="#F5A623" strokeWidth="1"/>
        <circle cx="18" cy="64" r="4" fill="rgba(45,222,122,0.3)" stroke="#2DDE7A" strokeWidth="1"/>
        <circle cx="182" cy="64" r="4" fill="rgba(45,222,122,0.3)" stroke="#2DDE7A" strokeWidth="1"/>
        <circle cx="110" cy="42" r="22" fill="url(#heat1)" filter="url(#blur1)">
          <animate attributeName="cx" values="110;118;105;110" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="42;38;46;42" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="r" values="20;26;20" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="110" cy="42" r="4" fill="#E5534B">
          <animate attributeName="cx" values="110;118;105;110" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="42;38;46;42" dur="5s" repeatCount="indefinite"/>
        </circle>
        <rect x="88" y="25" width="44" height="12" rx="1" fill="rgba(229,83,75,0.2)" stroke="rgba(229,83,75,0.4)" strokeWidth="0.5"/>
        <text x="110" y="34" textAnchor="middle" fill="#E5534B" fontSize="6" fontFamily="JetBrains Mono" fontWeight="700">INTRUSION</text>
      </svg>
    </div>
  )
}

function FallVisual() {
  return (
    <div className="flex items-center gap-4 p-3 rounded-[3px] bg-[#0F1210] border border-[rgba(229,83,75,0.15)]">
      <div className="w-10 h-10 rounded-[2px] flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(229,83,75,0.15)', border: '1px solid rgba(229,83,75,0.3)' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3 L10 11" stroke="#E5534B" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 15 L10 11 L14 15" stroke="#E5534B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="10" cy="17" r="1.5" fill="#E5534B"/>
        </svg>
      </div>
      <div>
        <div className="font-mono text-[10px] font-bold text-[#E5534B] uppercase tracking-widest">FALL DETECTED</div>
        <div className="font-mono text-[9px] text-ice-muted">14:03:22 · Zone CENTER · Siren Active</div>
        <div className="font-mono text-[9px] text-ice-muted">Breathing: NOT DETECTED</div>
      </div>
    </div>
  )
}

function BreathingVisual() {
  return (
    <div className="p-3 rounded-[3px] bg-[#0F1210] border border-[rgba(45,222,122,0.1)]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#2DDE7A]" style={{ animation: 'pulse-green 2s ease-in-out infinite' }}/>
        <span className="font-mono text-[9px] text-[#2DDE7A] uppercase tracking-widest">Breathing Detected · 0.24 Hz</span>
      </div>
      <div className="flex items-center gap-[1px] h-8">
        {Array.from({ length: 60 }, (_, i) => (
          <div key={i} className="flex-1 rounded-sm waveform-bar"
            style={{
              background: '#2DDE7A', opacity: 0.5,
              height: `${30 + Math.sin(i * 0.5) * 25}%`,
              animation: `waveform ${2 + Math.sin(i) * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.06}s`,
            }}/>
        ))}
      </div>
    </div>
  )
}

function PrivacyDataVisual() {
  return (
    <div className="space-y-2">
      {[
        { label: 'Video footage',    value: 'NONE',  color: '#E5534B' },
        { label: 'Audio recording',  value: 'NONE',  color: '#E5534B' },
        { label: 'Raw CSI data sent',value: 'NONE',  color: '#E5534B' },
        { label: 'Event metadata',   value: 'LOCAL', color: '#F5A623' },
      ].map(item => (
        <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.04)]">
          <span className="font-mono text-[10px] text-ice-muted">{item.label}</span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: item.color }}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

function AlertVisual() {
  const alerts = [
    { type: 'WALKING',   time: '22:14:08', zone: 'NW',     priority: 'HIGH',     color: '#F5A623' },
    { type: 'FALL',      time: '22:03:22', zone: 'CENTER', priority: 'CRITICAL', color: '#E5534B' },
    { type: 'BREATHING', time: '21:58:01', zone: 'SE',     priority: 'VITAL',    color: '#2DDE7A' },
  ]
  return (
    <div className="space-y-2">
      {alerts.map(a => (
        <div key={a.type} className="flex items-center gap-3 p-2.5 rounded-[2px]"
          style={{ background: `${a.color}0A`, border: `1px solid ${a.color}20` }}>
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }}/>
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[10px] font-bold" style={{ color: a.color }}>{a.type}</span>
            <span className="font-mono text-[9px] text-ice-muted ml-2">{a.time} · Zone {a.zone}</span>
          </div>
          <span className="font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[1px]"
            style={{ background: `${a.color}20`, color: a.color }}>{a.priority}</span>
        </div>
      ))}
    </div>
  )
}

const features = [
  { title: 'Zero Cameras. Zero Compromise.', description: "WiIntrusion is built on a privacy-first principle. No lenses, no microphones, no image processing. WiFi CSI analysis cannot reconstruct visual scenes.", tag: 'Privacy Core', tagColor: '#2DDE7A', visual: <PrivacyVisual/>, span: '1' },
  { title: 'Real-Time Heatmap', description: 'See exactly where movement is happening on a 2D floor plan. The glowing blob updates in real-time as the person moves through the room.', tag: 'Live View', tagColor: '#F5A623', visual: <HeatmapVisual/>, span: '2' },
  { title: 'Fall Detection', description: 'Rapid signal change followed by stillness triggers a CRITICAL alert with siren. Designed for elderly care and lone worker safety.', tag: 'Safety Alert', tagColor: '#E5534B', visual: <FallVisual/>, span: '1' },
  { title: 'Breathing Monitoring', description: 'FFT analysis detects the 0.2–0.3 Hz frequency of human respiration when stationary. Confirms life signs without any wearable device.', tag: 'Vital Signs', tagColor: '#2DDE7A', visual: <BreathingVisual/>, span: '1' },
  { title: 'Data Never Leaves Your Home', description: 'Edge processing on the Master Anchor means only event metadata is sent to the app. Your space stays private.', tag: 'Edge Processing', tagColor: '#F5A623', visual: <PrivacyDataVisual/>, span: '1' },
  { title: 'Smart Alert Classification', description: 'AI classifies movement type: Walking, Standing, Fall, or Breathing — each with a different priority level and response protocol.', tag: 'AI Engine', tagColor: '#E5534B', visual: <AlertVisual/>, span: '1' },
]

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.remove('reveal-hidden') })
    }, { threshold: 0.08 })
    ref.current?.querySelectorAll('.reveal-on-scroll').forEach(el => { el.classList.add('reveal-hidden'); observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={ref} className="py-24 lg:py-36 bg-[#0F1210] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent"/>
      <div className="absolute inset-0 bg-grid-pattern opacity-15"/>
      <div className="section-container relative z-10">
        <div className="mb-16 reveal-on-scroll">
          <div className="mono-label mb-4">Core Features</div>
          <h2 className="section-title text-ice max-w-2xl">
            Security that respects <span className="italic" style={{ color: '#F5A623' }}>your space.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {features.map((f, i) => (
            <div key={f.title} className={`reveal-on-scroll ${f.span === '2' ? 'md:col-span-2' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="feature-card relative overflow-hidden h-full">
                <div className="p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[2px] mb-4"
                      style={{ background: `${f.tagColor}15`, color: f.tagColor, border: `1px solid ${f.tagColor}30` }}>
                      {f.tag}
                    </div>
                    <h3 className="font-display text-[20px] font-bold text-ice leading-tight mb-2">{f.title}</h3>
                    <p className="font-body text-[13px] text-[rgba(232,237,240,0.5)] leading-relaxed">{f.description}</p>
                  </div>
                  <div className="mt-6">{f.visual}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
