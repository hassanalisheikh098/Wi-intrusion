import { useEffect, useRef, useState, useMemo } from 'react'
import { useSystem } from '../../context/SystemContext'

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 5) return 'just now'
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: '#E5534B',
  HIGH: '#F5A623',
  MODERATE: 'rgba(232,237,240,0.4)',
}

const NODE_STATUS_COLORS: Record<string, string> = {
  ONLINE: '#2DDE7A',
  UNSTABLE: '#F5A623',
  OFFLINE: '#E5534B',
}

export default function DashboardHome() {
  const { status, nodes, alerts, markAlertRead } = useSystem()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [, setTick] = useState(0)

  // Tick every 2s to update relative times
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(id)
  }, [])

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

  const onlineCount = nodes.filter(n => n.status === 'ONLINE').length
  const todayAlerts = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return alerts.filter(a => new Date(a.timestamp) >= today)
  }, [alerts])
  const unreadCount = alerts.filter(a => !a.isRead).length
  const recentAlerts = alerts.slice(0, 5)

  // Waveform anomaly simulation
  const [anomalyStart, setAnomalyStart] = useState(-1)
  useEffect(() => {
    if (status !== 'ARMED') {
      setAnomalyStart(-1)
      return
    }
    const flash = () => {
      const delay = 5000 + Math.random() * 3000
      const timer = setTimeout(() => {
        const start = Math.floor(Math.random() * 50) + 10
        setAnomalyStart(start)
        setTimeout(() => setAnomalyStart(-1), 2500)
        flash()
      }, delay)
      return timer
    }
    const timer = flash()
    return () => clearTimeout(timer)
  }, [status])

  const anomalyLen = 15

  return (
    <div ref={sectionRef} className="pb-20">
      <div className="section-container py-8">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8 reveal-on-scroll">
          <div className="mono-label">Live Monitoring</div>
          <div className="status-dot" />
        </div>

        {/* Section A — Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 reveal-on-scroll">
          {/* Card 1 — System Status */}
          <div className="feature-card relative overflow-hidden p-6">
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #F5A623, transparent)' }} />
            <div className="mono-label mb-4">System Status</div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: status === 'ARMED' ? '#F5A623' : 'rgba(232,237,240,0.3)',
                  animation: status === 'ARMED' ? 'pulse-amber 1.5s ease-in-out infinite' : 'none',
                }}
              />
              <span className={`font-display text-3xl font-bold ${status === 'ARMED' ? 'text-amber' : 'text-ice-muted'}`}>
                {status === 'ARMED' ? 'ARMED — ACTIVE' : 'DISARMED'}
              </span>
            </div>
            <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">
              Last updated · {relativeTime(new Date().toISOString())}
            </div>
          </div>

          {/* Card 2 — Alerts Today */}
          <div className="feature-card relative overflow-hidden p-6">
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #F5A623, transparent)' }} />
            <div className="mono-label mb-4">Alerts Today</div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display text-4xl font-bold text-amber">{todayAlerts.length}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-amber">
                <path d="M7 11V3M3 7L7 3L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">
              {unreadCount} unread
            </div>
          </div>

          {/* Card 3 — Node Network */}
          <div className="feature-card relative overflow-hidden p-6">
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #F5A623, transparent)' }} />
            <div className="mono-label mb-4">Node Network</div>
            <div className={`font-display text-3xl font-bold mb-3 ${onlineCount === 3 ? 'text-[#2DDE7A]' : 'text-amber'}`}>
              {onlineCount}/3 ONLINE
            </div>
            <div className="flex items-center gap-4">
              {nodes.map(n => (
                <div key={n.id} className="flex flex-col items-center gap-1">
                  <div
                    className="w-[10px] h-[10px] rounded-full"
                    style={{
                      background: NODE_STATUS_COLORS[n.status],
                      animation: n.status === 'ONLINE' ? 'pulse-green 1.5s ease-in-out infinite' : 'none',
                    }}
                  />
                  <span className="font-mono text-[8px] text-ice-muted uppercase tracking-widest">{n.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section separator */}
        <div className="relative h-px mb-8">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.3)] to-transparent" />
        </div>

        {/* Section B — Node Status Panel */}
        <div className="mb-8 reveal-on-scroll" style={{ transitionDelay: '120ms' }}>
          <h2 className="font-display text-[20px] font-bold text-ice mb-5">Node Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nodes.map(n => (
              <div key={n.id} className="feature-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ice">{n.id}</span>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[2px]" style={{
                    background: `${NODE_STATUS_COLORS[n.status]}15`,
                    color: NODE_STATUS_COLORS[n.status],
                    border: `1px solid ${NODE_STATUS_COLORS[n.status]}30`,
                  }}>
                    {n.status}
                  </span>
                </div>
                <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest mb-3">{n.role}</div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-[2px] items-end h-5 flex-1">
                    {Array.from({ length: 7 }, (_, i) => {
                      const h = 30 + Math.sin(i * 0.8 + Math.abs(n.rssi) * 0.1) * 40
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-sm waveform-bar"
                          style={{
                            height: `${h}%`,
                            background: '#F5A623',
                            opacity: 0.3 + i / 7 * 0.6,
                            animation: `waveform ${0.8 + i * 0.12}s ease-in-out infinite`,
                            animationDelay: `${i * 0.08}s`,
                          }}
                        />
                      )
                    })}
                  </div>
                  <span className="font-mono text-[11px] font-bold text-amber">{n.rssi} dBm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: NODE_STATUS_COLORS[n.status],
                      animation: n.status === 'ONLINE' ? 'pulse-green 1.5s ease-in-out infinite' : 'none',
                    }}
                  />
                  <span className="font-mono text-[9px] text-ice-muted">{relativeTime(n.lastSeen)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section separator */}
        <div className="relative h-px mb-8">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.3)] to-transparent" />
        </div>

        {/* Section C — Recent Alerts Panel */}
        <div className="mb-8 reveal-on-scroll" style={{ transitionDelay: '240ms' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="mono-label">Recent Alerts</div>
            <span className="font-mono text-[10px] font-bold text-amber bg-[rgba(245,166,35,0.1)] border border-[rgba(245,166,35,0.2)] px-2 py-0.5 rounded-[2px]">
              {alerts.length}
            </span>
          </div>

          {recentAlerts.length === 0 ? (
            <div className="feature-card p-12 flex flex-col items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-4">
                <path d="M20 4L36 16V32C36 34 34 36 32 36H8C6 36 4 34 4 32V16L20 4Z" stroke="rgba(232,237,240,0.2)" strokeWidth="1.5" fill="rgba(232,237,240,0.03)"/>
                <path d="M15 20L18 23L25 16" stroke="rgba(232,237,240,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-mono text-[11px] text-ice-muted uppercase tracking-widest">No intrusion events detected</span>
            </div>
          ) : (
            <div className="space-y-2">
              {recentAlerts.map(a => {
                const col = SEVERITY_COLORS[a.severity]
                return (
                  <div
                    key={a.id}
                    onClick={() => markAlertRead(a.id)}
                    className="flex items-center gap-4 p-4 rounded-[2px] cursor-pointer transition-all duration-300 hover:brightness-110"
                    style={{
                      background: `${col}0A`,
                      border: `1px solid ${col}20`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: col }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[11px] font-bold" style={{ color: col }}>
                          Movement Detected
                        </span>
                        <span className="font-mono text-[9px] text-ice-muted">
                          Zone {a.zone} · {relativeTime(a.timestamp)} · Conf: {a.confidence}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[1px]"
                        style={{ background: `${col}20`, color: col }}>
                        {a.severity}
                      </span>
                      {!a.isRead && (
                        <div className="w-2 h-2 rounded-full bg-amber" style={{ animation: 'pulse-amber 1.5s ease-in-out infinite' }} />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Section separator */}
        <div className="relative h-px mb-8">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.3)] to-transparent" />
        </div>

        {/* Section D — Simulated Signal Feed */}
        <div className="reveal-on-scroll" style={{ transitionDelay: '360ms' }}>
          <div className="bg-[#141816] border border-[rgba(255,255,255,0.06)] rounded-[3px] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="status-dot" />
                <span className="font-mono text-[10px] text-[rgba(232,237,240,0.4)] uppercase tracking-widest">Live CSI Data Stream</span>
              </div>
              <span className="font-mono text-[10px] text-amber uppercase tracking-widest">PROCESSING</span>
            </div>
            <div className="flex items-center gap-[2px] h-10">
              {Array.from({ length: 80 }, (_, i) => {
                const isAnomaly = anomalyStart >= 0 && i >= anomalyStart && i < anomalyStart + anomalyLen
                const baseH = 20 + Math.sin(i * 0.4) * 15
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-sm waveform-bar"
                    style={{
                      background: isAnomaly ? '#E5534B' : '#F5A623',
                      opacity: isAnomaly ? 0.8 : (status === 'DISARMED' ? 0.15 : 0.3),
                      animation: `waveform ${0.5 + (i % 7) * 0.15}s ease-in-out infinite`,
                      animationDelay: `${i * 0.03}s`,
                      height: `${baseH + (isAnomaly ? 20 : 0)}%`,
                    }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between mt-3">
              <span className="font-mono text-[9px] text-[rgba(232,237,240,0.3)] uppercase tracking-widest">Normal Background</span>
              {anomalyStart >= 0 && (
                <span className="font-mono text-[9px] text-[#E5534B] uppercase tracking-widest">▲ Movement Detected</span>
              )}
              <span className="font-mono text-[9px] text-[rgba(232,237,240,0.3)] uppercase tracking-widest">
                {status === 'DISARMED' ? 'Idle' : 'Monitoring'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
