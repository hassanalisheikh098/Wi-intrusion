import { useEffect, useState } from 'react'

function TriangulationViz() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 360" className="w-full h-full max-w-[480px]"
        aria-label="WiFi triangulation visualization showing ESP32 nodes forming a detection triangle">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="heatGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5534B" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#F5A623" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="heatGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="400" height="360" fill="url(#grid)"/>
        <polygon points="200,40 60,290 340,290" fill="rgba(245,166,35,0.04)" stroke="rgba(245,166,35,0.15)" strokeWidth="1" strokeDasharray="4 4"/>
        <line x1="200" y1="40" x2="60" y2="290" stroke="rgba(245,166,35,0.3)" strokeWidth="1" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="200" y1="40" x2="340" y2="290" stroke="rgba(245,166,35,0.3)" strokeWidth="1" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2.4s" repeatCount="indefinite"/>
        </line>
        <line x1="60" y1="290" x2="340" y2="290" stroke="rgba(245,166,35,0.3)" strokeWidth="1" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="10" to="-10" dur="1.8s" repeatCount="indefinite"/>
        </line>
        <circle cx="200" cy="185" r="28" fill="url(#heatGrad)" filter="url(#heatGlow)">
          <animate attributeName="r" values="24;36;24" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="cx" values="200;210;195;200" dur="6s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="185;175;190;185" dur="6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="185" r="8" fill="#E5534B" opacity="0.9" filter="url(#glow)">
          <animate attributeName="cx" values="200;210;195;200" dur="6s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="185;175;190;185" dur="6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="40" r="14" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="14;40" dur="2.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="40" r="14" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="14;40" dur="2.5s" begin="0.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0" dur="2.5s" begin="0.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="60" cy="290" r="14" fill="none" stroke="#2DDE7A" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="14;40" dur="3s" begin="0.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0" dur="3s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="340" cy="290" r="14" fill="none" stroke="#2DDE7A" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="14;40" dur="2.8s" begin="1.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0" dur="2.8s" begin="1.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="40" r="14" fill="#141816" stroke="#F5A623" strokeWidth="1.5" filter="url(#glow)"/>
        <circle cx="200" cy="40" r="5" fill="#F5A623"/>
        <text x="200" y="25" textAnchor="middle" fill="#F5A623" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" letterSpacing="1">M-NODE</text>
        <circle cx="60" cy="290" r="14" fill="#141816" stroke="#2DDE7A" strokeWidth="1.5" filter="url(#glow)"/>
        <circle cx="60" cy="290" r="5" fill="#2DDE7A"/>
        <text x="60" y="315" textAnchor="middle" fill="#2DDE7A" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" letterSpacing="1">S-NODE A</text>
        <circle cx="340" cy="290" r="14" fill="#141816" stroke="#2DDE7A" strokeWidth="1.5" filter="url(#glow)"/>
        <circle cx="340" cy="290" r="5" fill="#2DDE7A"/>
        <text x="340" y="315" textAnchor="middle" fill="#2DDE7A" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" letterSpacing="1">S-NODE B</text>
        <rect x="160" y="145" width="80" height="22" rx="2" fill="rgba(229,83,75,0.15)" stroke="rgba(229,83,75,0.4)" strokeWidth="1"/>
        <text x="200" y="160" textAnchor="middle" fill="#E5534B" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" letterSpacing="1">INTRUSION</text>
        <g transform="translate(120,330)">
          {[0,8,16,24,32,40,48,56,64,72,80,88,96,104,112,120,128,136,144,152].map((x,i) => (
            <rect key={i} x={x} y={8} width="4" height="8" rx="1" fill="#F5A623" opacity="0.5">
              <animate attributeName="height" values={[[8,14,6],[12,18,8],[6,16,10],[14,8,16],[10,20,6],[16,10,14],[8,12,18],[14,6,12],[10,16,8],[6,14,10],[18,8,14],[12,16,6],[8,10,16],[16,12,8],[10,18,12],[14,8,16],[6,14,10],[12,8,16],[16,10,8],[8,16,12]][i].join(';')} dur={['0.8s','1.1s','0.9s','1.3s','0.7s','1.0s','0.8s','1.2s','0.9s','1.1s','0.7s','1.3s','0.8s','1.0s','0.9s','1.2s','0.7s','1.1s','0.8s','1.0s'][i]} repeatCount="indefinite"/>
            </rect>
          ))}
        </g>
        <text x="200" y="358" textAnchor="middle" fill="rgba(245,166,35,0.4)" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1">CSI SIGNAL PROFILE</text>
      </svg>
    </div>
  )
}

type ThreatLevel = 'SECURE' | 'MONITORING' | 'INTRUSION'
const threatConfig = {
  SECURE:    { color: '#2DDE7A', bg: 'rgba(45,222,122,0.12)',  label: 'SECURE' },
  MONITORING:{ color: '#F5A623', bg: 'rgba(245,166,35,0.12)', label: 'MONITORING' },
  INTRUSION: { color: '#E5534B', bg: 'rgba(229,83,75,0.12)',  label: 'INTRUSION DETECTED' },
}

export default function HeroSection() {
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>('SECURE')

  useEffect(() => {
    const states: ThreatLevel[] = ['SECURE','MONITORING','INTRUSION','MONITORING','SECURE']
    let i = 0
    const id = setInterval(() => { i = (i + 1) % states.length; setThreatLevel(states[i]) }, 3000)
    return () => clearInterval(id)
  }, [])

  const threat = threatConfig[threatLevel]

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-[72px]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="https://img.rocket.new/generatedImages/rocket_gen_img_12847d443-1772663315977.png"
          alt="Dark indoor corridor" className="absolute inset-0 w-full h-full object-cover opacity-20"/>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C0B] via-[#0A0C0B]/80 to-[#0A0C0B]"/>
        <div className="absolute inset-0 bg-grid-pattern opacity-40"/>
      </div>

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-[1px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(245,166,35,0.4),transparent)', animation: 'scan-line 6s linear infinite' }}/>

      {/* Content */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="section-container w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left */}
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="tech-badge"><span>ESP32</span></div>
                <div className="tech-badge"><span>WiFi CSI</span></div>
                <div className="tech-badge"><span>IoT Security</span></div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border text-[11px] font-mono font-bold uppercase tracking-widest"
                  style={{ background: threat.bg, borderColor: `${threat.color}50`, color: threat.color, transition: 'all 0.5s ease' }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: threat.color, animation: 'pulse-amber 1.5s ease-in-out infinite' }}/>
                  {threat.label}
                </div>
              </div>

              <div>
                <h1 className="hero-title text-[#E8EDF0] mb-4">
                  <span className="block">See Without</span>
                  <span className="block italic" style={{ color: '#F5A623' }}>Watching.</span>
                </h1>
                <p className="font-body text-lg text-[rgba(232,237,240,0.6)] max-w-xl leading-relaxed">
                  WiIntrusion detects intruders using WiFi signals — no cameras, no microphones, no privacy compromise. ESP32 nodes triangulate movement to the centimeter.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-[rgba(255,255,255,0.06)]">
                {[{v:'3',u:'Anchors',d:'Triangulation nodes'},{v:'6×6m',u:'Coverage',d:'Per anchor cluster'},{v:'0',u:'Cameras',d:'Zero privacy risk'}].map(s => (
                  <div key={s.u}>
                    <div className="font-display text-2xl font-bold text-amber">{s.v}</div>
                    <div className="font-mono text-[10px] font-bold text-ice uppercase tracking-widest">{s.u}</div>
                    <div className="font-body text-[11px] text-ice-muted mt-0.5">{s.d}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#waitlist" className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="3" fill="currentColor"/>
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
                  </svg>
                  Request Early Access
                </a>
                <a href="#how-it-works" className="btn-ghost">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L7 13M1 7L7 13L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  See How It Works
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-6 h-[1px] bg-[rgba(255,255,255,0.2)]"/>
                <span className="font-mono text-[10px] text-ice-muted tracking-widest uppercase">FYP · University of Lahore · Dept. CS&amp;IT · 2026</span>
              </div>
            </div>

            {/* Right – viz */}
            <div className="relative h-[480px] lg:h-[560px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <TriangulationViz/>
              </div>

              {/* Signal strength card */}
              <div className="absolute bg-[#141816]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-[3px] p-3 top-4 right-0 lg:right-[-20px] min-w-[160px]"
                style={{ animation: 'float-node 4s ease-in-out infinite', animationDelay: '0s' }}>
                <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest mb-1">Signal Strength</div>
                <div className="flex gap-1 items-end h-6">
                  {[60,80,45,90,70,55,88,72].map((h,i) => (
                    <div key={i} className="w-1.5 bg-amber rounded-sm waveform-bar"
                      style={{ height:`${h}%`, opacity: 0.4+i/8*0.6, animation:`waveform ${0.8+i*0.1}s ease-in-out infinite`, animationDelay:`${i*0.1}s` }}/>
                  ))}
                </div>
                <div className="font-mono text-[11px] font-bold text-amber mt-1">-42 dBm</div>
              </div>

              {/* Detection status card */}
              <div className="absolute bg-[#141816]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-[3px] p-3 bottom-20 left-0 lg:left-[-20px] min-w-[180px]"
                style={{ animation: 'float-node 4s ease-in-out infinite', animationDelay: '1.5s' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: threat.color, animation: 'pulse-amber 1.5s ease-in-out infinite' }}/>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: threat.color }}>{threat.label}</span>
                </div>
                <div className="font-mono text-[9px] text-ice-muted">Movement detected</div>
                <div className="font-mono text-[9px] text-ice-muted">Zone: CENTER · Conf: 94%</div>
              </div>

              {/* Uptime card */}
              <div className="absolute bg-[#141816]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-[3px] p-3 top-1/2 right-[-10px] lg:right-[-40px] min-w-[140px]"
                style={{ animation: 'float-node 4s ease-in-out infinite', animationDelay: '0.8s' }}>
                <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest mb-1">Uptime</div>
                <div className="font-mono text-[15px] font-bold" style={{ color: '#2DDE7A' }}>99.8%</div>
                <div className="font-mono text-[9px] text-ice-muted">3 nodes online</div>
                <div className="flex gap-1 mt-1">
                  {[1,2,3].map(n => (
                    <div key={n} className="w-2 h-2 rounded-full" style={{ background: '#2DDE7A', animation: `pulse-green ${1+n*0.3}s ease-in-out infinite` }}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-20 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(245,166,35,0.03)] py-3 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee-scroll 25s linear infinite' }}>
          {[0,1].map(di => (
            <div key={di} className="flex items-center gap-8 px-8">
              {['Channel State Information','ESP32 Microcontroller','WiFi Sensing','Privacy Preserving','Indoor Localization','Intrusion Detection','Real-Time Heatmap','Fall Detection','Zero Cameras','Edge Processing'].map((item,i) => (
                <span key={i} className="font-mono text-[10px] text-[rgba(245,166,35,0.5)] tracking-widest uppercase flex items-center gap-4">
                  {item}<span className="text-[rgba(245,166,35,0.2)]">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
