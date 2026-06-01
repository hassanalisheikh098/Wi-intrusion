import { useState, useEffect, useRef, useCallback } from 'react'
import { useSystem } from '../../context/SystemContext'

const NODE_STATUS_COLORS: Record<string, string> = {
  ONLINE: '#2DDE7A',
  UNSTABLE: '#F5A623',
  OFFLINE: '#E5534B',
}

function formatLogTime(iso: string): string {
  return new Date(iso).toTimeString().slice(0, 8)
}

const LOG_TYPE_COLORS: Record<string, string> = {
  ARM: '#F5A623',
  DISARM: '#F5A623',
  ALERT: '#E5534B',
  NODE: '#2DDE7A',
  INFO: 'rgba(232,237,240,0.5)',
}

export default function SystemControlPage() {
  const { status, nodes, logs, arm, disarm } = useSystem()
  const [countdown, setCountdown] = useState<number | null>(null)
  const [pingStates, setPingStates] = useState<Record<string, 'idle' | 'pinging' | 'done'>>({})
  const [pingResults, setPingResults] = useState<Record<string, string>>({})
  const logEndRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll log to bottom on new entries
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs.length])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.remove('reveal-hidden') })
    }, { threshold: 0.1 })
    sectionRef.current?.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('reveal-hidden')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const hasOfflineNode = nodes.some(n => n.status === 'OFFLINE')

  const handleArm = useCallback(() => {
    setCountdown(3)
    let count = 3
    const interval = setInterval(() => {
      count--
      if (count <= 0) {
        clearInterval(interval)
        setCountdown(null)
        arm()
      } else {
        setCountdown(count)
      }
    }, 1000)
  }, [arm])

  const handlePing = useCallback((nodeId: string) => {
    setPingStates(prev => ({ ...prev, [nodeId]: 'pinging' }))
    setTimeout(() => {
      const ms = Math.floor(Math.random() * 20) + 5
      setPingStates(prev => ({ ...prev, [nodeId]: 'done' }))
      setPingResults(prev => ({ ...prev, [nodeId]: `Responded: ${ms}ms` }))
      setTimeout(() => {
        setPingStates(prev => ({ ...prev, [nodeId]: 'idle' }))
      }, 3000)
    }, 1500)
  }, [])

  return (
    <div ref={sectionRef} className="pb-20">
      <div className="section-container py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 reveal-on-scroll">
          <div className="mono-label">System Control</div>
        </div>

        {/* Section A — Main Arm/Disarm Control */}
        <div className="feature-card relative overflow-hidden p-8 corner-tl corner-br mb-8 reveal-on-scroll" style={{ transitionDelay: '80ms' }}>
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #F5A623, transparent)' }} />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left — status info */}
            <div>
              <div className="mono-label mb-4">Current Status</div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: status === 'ARMED' ? '#F5A623' : 'rgba(232,237,240,0.3)',
                    animation: status === 'ARMED' ? 'pulse-amber 1.5s ease-in-out infinite' : 'none',
                  }}
                />
                <span className={`font-display text-5xl font-bold ${status === 'ARMED' ? 'text-amber' : 'text-ice-muted'}`}>
                  {status}
                </span>
              </div>
              <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest mb-4">
                Last change · {formatLogTime(new Date().toISOString())}
              </div>
              <p className="font-body text-[14px] text-ice-muted leading-relaxed">
                {status === 'ARMED'
                  ? 'The system is actively monitoring for movement via WiFi CSI analysis. Alerts will be generated when movement is detected in the coverage zone.'
                  : 'The system is currently disarmed. No alerts will be generated. Arm the system to begin intrusion monitoring.'
                }
              </p>
            </div>

            {/* Right — action */}
            <div className="flex flex-col items-center md:items-end gap-4">
              {status === 'DISARMED' ? (
                <>
                  {countdown !== null ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="font-display text-4xl font-bold text-amber" style={{ animation: 'pulse-amber 1s ease-in-out infinite' }}>
                        Arming in {countdown}...
                      </div>
                      <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">Stand by</div>
                    </div>
                  ) : (
                    <button onClick={handleArm} className="btn-primary py-4 px-8 text-[13px]">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 2L15 5V10C15 13.5 12.5 16 9 17C5.5 16 3 13.5 3 10V5L9 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M7 9L8.5 10.5L11 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      ARM SYSTEM
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={disarm}
                  className="inline-flex items-center gap-2 font-mono text-[13px] font-bold uppercase tracking-widest py-4 px-8 rounded-[2px] cursor-pointer transition-all duration-200 hover:brightness-110"
                  style={{
                    background: 'rgba(229,83,75,0.15)',
                    border: '1px solid rgba(229,83,75,0.4)',
                    color: '#E5534B',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="5" y="8" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 8V5.5C7 4.12 8.12 3 9.5 3H8.5C9.88 3 11 4.12 11 5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  DISARM SYSTEM
                </button>
              )}

              {/* Offline node warning */}
              {hasOfflineNode && status === 'DISARMED' && (
                <div className="bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.3)] rounded-[2px] p-4 max-w-sm">
                  <div className="font-mono text-[11px] text-amber leading-relaxed">
                    ⚠ NODE NOT RESPONDING — Check device connection before arming
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section separator */}
        <div className="relative h-px mb-8">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.3)] to-transparent" />
        </div>

        {/* Section B — Node Management Cards */}
        <div className="mb-8 reveal-on-scroll" style={{ transitionDelay: '160ms' }}>
          <h2 className="font-display text-[20px] font-bold text-ice mb-5">Node Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nodes.map(n => {
              const statusColor = NODE_STATUS_COLORS[n.status]
              const rssiPercent = Math.min(100, Math.max(0, ((n.rssi + 80) / 50) * 100))
              const pingState = pingStates[n.id] || 'idle'

              return (
                <div key={n.id} className="feature-card p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${statusColor}, transparent)` }} />

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-bold text-amber uppercase tracking-widest">{n.id}</span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[2px]" style={{
                      background: `${statusColor}15`,
                      color: statusColor,
                      border: `1px solid ${statusColor}30`,
                    }}>
                      {n.status}
                    </span>
                  </div>

                  <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest mb-4">{n.role}</div>

                  {/* RSSI meter */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">RSSI</span>
                      <span className="font-mono text-[11px] font-bold text-amber">{n.rssi} dBm</span>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.05)] rounded-[2px] h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-[2px] transition-all duration-500"
                        style={{
                          width: `${rssiPercent}%`,
                          background: rssiPercent > 60 ? '#2DDE7A' : '#F5A623',
                        }}
                      />
                    </div>
                  </div>

                  {/* Last seen */}
                  <div className="font-mono text-[9px] text-ice-muted mb-4">
                    Last seen: {new Date(n.lastSeen).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                  </div>

                  {/* Ping button */}
                  <button
                    onClick={() => handlePing(n.id)}
                    disabled={pingState !== 'idle'}
                    className="btn-ghost py-1.5 px-3 text-[9px] w-full justify-center"
                  >
                    {pingState === 'pinging' ? (
                      <>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="animate-spin">
                          <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" strokeDasharray="20" strokeDashoffset="5" strokeLinecap="round"/>
                        </svg>
                        Pinging...
                      </>
                    ) : pingState === 'done' ? (
                      <span className="text-[#2DDE7A]">{pingResults[n.id]}</span>
                    ) : (
                      'Ping'
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section separator */}
        <div className="relative h-px mb-8">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.3)] to-transparent" />
        </div>

        {/* Section C — System Log */}
        <div className="reveal-on-scroll" style={{ transitionDelay: '240ms' }}>
          <div className="bg-[#141816] border border-[rgba(255,255,255,0.06)] rounded-[3px] overflow-hidden">
            {/* Header */}
            <div className="bg-[rgba(245,166,35,0.04)] border-b border-[rgba(255,255,255,0.06)] px-4 py-2.5 flex items-center gap-3">
              <div className="status-dot" />
              <span className="font-mono text-[10px] font-bold text-ice uppercase tracking-widest">System Log</span>
            </div>

            {/* Body */}
            <div className="bg-[#0A0C0B] font-mono text-[11px] p-4 h-48 overflow-y-auto thin-scroll">
              {logs.map((entry, i) => (
                <div key={i} className="mb-1 leading-relaxed">
                  <span style={{ color: 'rgba(245,166,35,0.6)' }}>
                    [{formatLogTime(entry.timestamp)}]
                  </span>{' '}
                  <span style={{ color: LOG_TYPE_COLORS[entry.type] }}>
                    {entry.type}
                  </span>
                  <span className="text-[rgba(232,237,240,0.5)]">
                    {' — '}{entry.message}
                  </span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
