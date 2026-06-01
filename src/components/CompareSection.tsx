import { useEffect, useRef } from 'react'

const rows = [
  { feature: 'Privacy (No Camera)',           wi: true,  cctv: false, pir: true  },
  { feature: 'Privacy (No Microphone)',       wi: true,  cctv: false, pir: true  },
  { feature: 'Works in Darkness',             wi: true,  cctv: false, pir: true  },
  { feature: 'Human vs. Object Distinction',  wi: true,  cctv: true,  pir: false },
  { feature: 'Exact Location (Heatmap)',      wi: true,  cctv: true,  pir: false },
  { feature: 'Fall Detection',                wi: true,  cctv: false, pir: false },
  { feature: 'Breathing / Vital Monitoring',  wi: true,  cctv: false, pir: false },
  { feature: 'Edge Processing (Local AI)',    wi: true,  cctv: false, pir: false },
  { feature: 'Low Hardware Cost',             wi: true,  cctv: false, pir: true  },
  { feature: 'No False Alarms (Calibrated)',  wi: true,  cctv: true,  pir: false },
]

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Yes">
      <circle cx="9" cy="9" r="8" fill="rgba(45,222,122,0.12)" stroke="#2DDE7A" strokeWidth="1"/>
      <path d="M5.5 9 L7.5 11 L12.5 6.5" stroke="#2DDE7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function Cross() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="No">
      <circle cx="9" cy="9" r="8" fill="rgba(229,83,75,0.08)" stroke="rgba(229,83,75,0.3)" strokeWidth="1"/>
      <path d="M6 6 L12 12 M12 6 L6 12" stroke="rgba(229,83,75,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function CompareSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.remove('reveal-hidden') })
    }, { threshold: 0.08 })
    ref.current?.querySelectorAll('.reveal-on-scroll').forEach(el => { el.classList.add('reveal-hidden'); observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="compare" ref={ref} className="py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"/>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.2)] to-transparent"/>
      <div className="section-container relative z-10">
        <div className="mb-16 reveal-on-scroll">
          <div className="mono-label mb-4">Comparison</div>
          <h2 className="section-title text-ice max-w-2xl">
            Not your average <span className="italic" style={{ color: '#F5A623' }}>motion sensor.</span>
          </h2>
          <p className="font-body text-[rgba(232,237,240,0.5)] text-lg mt-4 max-w-xl">
            WiIntrusion does what cameras can't — and protects what cameras won't.
          </p>
        </div>

        <div className="reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
          <div className="overflow-x-auto thin-scroll">
            <div className="min-w-[600px]">
              {/* Header row */}
              <div className="grid grid-cols-4 gap-0">
                <div className="p-4"/>
                <div className="relative bg-[#141816] border border-[rgba(245,166,35,0.3)] rounded-t-[3px] p-4 text-center">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[1px] bg-amber text-[#0A0C0B]">Our System</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-amber uppercase tracking-widest mt-2">WiIntrusion</div>
                  <div className="font-mono text-[9px] text-ice-muted mt-0.5">WiFi CSI</div>
                </div>
                <div className="p-4 text-center border-b border-[rgba(255,255,255,0.06)]">
                  <div className="font-mono text-[11px] font-bold text-ice-muted uppercase tracking-widest">CCTV Camera</div>
                  <div className="font-mono text-[9px] text-ice-muted mt-0.5 opacity-60">Traditional</div>
                </div>
                <div className="p-4 text-center border-b border-[rgba(255,255,255,0.06)]">
                  <div className="font-mono text-[11px] font-bold text-ice-muted uppercase tracking-widest">PIR Sensor</div>
                  <div className="font-mono text-[9px] text-ice-muted mt-0.5 opacity-60">Infrared</div>
                </div>
              </div>

              {/* Data rows */}
              {rows.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-4 gap-0 ${i % 2 === 0 ? 'bg-[rgba(255,255,255,0.015)]' : ''}`}>
                  <div className="p-3.5 flex items-center">
                    <span className="font-body text-[13px] text-[rgba(232,237,240,0.65)]">{row.feature}</span>
                  </div>
                  <div className="p-3.5 flex justify-center items-center border-x border-[rgba(245,166,35,0.15)]"
                    style={{ background: i % 2 === 0 ? 'rgba(245,166,35,0.03)' : 'rgba(245,166,35,0.02)' }}>
                    {row.wi ? <Check/> : <Cross/>}
                  </div>
                  <div className="p-3.5 flex justify-center items-center border-r border-[rgba(255,255,255,0.04)]">
                    {row.cctv ? <Check/> : <Cross/>}
                  </div>
                  <div className="p-3.5 flex justify-center items-center">
                    {row.pir ? <Check/> : <Cross/>}
                  </div>
                </div>
              ))}

              {/* Footer row */}
              <div className="grid grid-cols-4 gap-0">
                <div className="p-4"/>
                <div className="bg-[#141816] border border-[rgba(245,166,35,0.3)] border-t-0 rounded-b-[3px] p-4 text-center">
                  <div className="font-mono text-[10px] font-bold text-amber">{rows.filter(r => r.wi).length}/{rows.length} Features</div>
                </div>
                <div className="p-4 text-center border-t border-[rgba(255,255,255,0.04)]">
                  <div className="font-mono text-[10px] text-ice-muted">{rows.filter(r => r.cctv).length}/{rows.length} Features</div>
                </div>
                <div className="p-4 text-center border-t border-[rgba(255,255,255,0.04)]">
                  <div className="font-mono text-[10px] text-ice-muted">{rows.filter(r => r.pir).length}/{rows.length} Features</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="mt-12 grid md:grid-cols-3 gap-4 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
          {[
            { icon: '🔒', title: 'Privacy Guaranteed',   desc: 'No camera, no mic. CSI data cannot reconstruct any image or audio.' },
            { icon: '⚡', title: 'ESP32 Powered',        desc: 'Sub-$10 hardware per node. Affordable for homes and small businesses.' },
            { icon: '🧠', title: 'Edge AI Processing',   desc: 'All intelligence runs locally. No cloud dependency, no subscription lock-in.' },
          ].map(item => (
            <div key={item.title} className="feature-card p-6">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h4 className="font-display text-[17px] font-bold text-ice mb-2">{item.title}</h4>
              <p className="font-body text-[13px] text-[rgba(232,237,240,0.5)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
