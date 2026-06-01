import { useState, useEffect, useRef } from 'react'
import { useSystem } from '../../context/SystemContext'
import { useAlerts } from '../../hooks/useAlerts'

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: '#E5534B',
  HIGH: '#F5A623',
  MODERATE: 'rgba(232,237,240,0.4)',
}

type SeverityFilter = 'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE'

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  })
}

export default function AlertHistoryPage() {
  const { markAlertRead, markAllRead } = useSystem()
  const [filter, setFilter] = useState<SeverityFilter>('ALL')
  const [page, setPage] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { alerts, totalCount, unreadCount, totalPages } = useAlerts({
    severityFilter: filter,
    page,
    perPage: 10,
  })

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
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

  // Reset page when filter changes
  useEffect(() => { setPage(1) }, [filter])

  const filters: SeverityFilter[] = ['ALL', 'CRITICAL', 'HIGH', 'MODERATE']

  return (
    <div ref={sectionRef} className="pb-20">
      <div className="section-container py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 reveal-on-scroll">
          <div className="mono-label">Alert History</div>
          <span className="font-mono text-[10px] font-bold text-amber bg-[rgba(245,166,35,0.1)] border border-[rgba(245,166,35,0.2)] px-2 py-0.5 rounded-[2px]">
            {totalCount}
          </span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3 reveal-on-scroll" style={{ transitionDelay: '80ms' }}>
          <span className="font-mono text-[11px] text-amber uppercase tracking-widest">
            {unreadCount} unread
          </span>
          <div className="flex items-center gap-3">
            <button onClick={markAllRead} className="btn-ghost py-1.5 px-3 text-[9px]">
              Mark All Read
            </button>
            {/* Filter dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn-ghost py-1.5 px-3 text-[9px] flex items-center gap-2"
              >
                {filter === 'ALL' ? 'All Severity' : filter}
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 z-20 bg-[#141816] border border-[rgba(255,255,255,0.1)] rounded-[3px] overflow-hidden min-w-[140px]">
                  {filters.map(f => (
                    <button
                      key={f}
                      onClick={() => { setFilter(f); setDropdownOpen(false) }}
                      className={`block w-full text-left font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 transition-colors ${
                        filter === f ? 'text-amber bg-[rgba(245,166,35,0.05)]' : 'text-[rgba(232,237,240,0.5)] hover:text-amber hover:bg-[rgba(245,166,35,0.05)]'
                      }`}
                    >
                      {f === 'ALL' ? 'All Severity' : f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        {alerts.length === 0 ? (
          <div className="feature-card p-16 flex flex-col items-center justify-center reveal-on-scroll" style={{ transitionDelay: '160ms' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-4">
              <path d="M20 4L36 16V32C36 34 34 36 32 36H8C6 36 4 34 4 32V16L20 4Z" stroke="rgba(232,237,240,0.2)" strokeWidth="1.5" fill="rgba(232,237,240,0.03)"/>
              <path d="M15 20L18 23L25 16" stroke="rgba(232,237,240,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-mono text-[11px] text-ice-muted uppercase tracking-widest">No alerts match the selected filter</span>
          </div>
        ) : (
          <div className="reveal-on-scroll" style={{ transitionDelay: '160ms' }}>
            <div className="bg-[#141816] border border-[rgba(255,255,255,0.06)] rounded-[3px] overflow-hidden">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[rgba(245,166,35,0.04)] border-b border-[rgba(255,255,255,0.06)]">
                      {['#', 'Timestamp', 'Type', 'Zone', 'Severity', 'Confidence', 'Status'].map(h => (
                        <th key={h} className="font-mono text-[9px] font-bold uppercase tracking-widest text-ice-muted px-5 py-3 text-left">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map((a, idx) => {
                      const sevColor = SEVERITY_COLORS[a.severity]
                      const confColor = a.confidence >= 90 ? '#2DDE7A' : a.confidence >= 75 ? '#F5A623' : 'rgba(232,237,240,0.4)'
                      const rowNum = (page - 1) * 10 + idx + 1

                      return (
                        <tr
                          key={a.id}
                          className={`border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(245,166,35,0.02)] transition-colors ${
                            !a.isRead ? 'border-l-2 border-l-[#F5A623]' : ''
                          }`}
                        >
                          <td className="font-mono text-[11px] text-ice-muted px-5 py-4">{rowNum}</td>
                          <td className="font-mono text-[11px] text-ice px-5 py-4 whitespace-nowrap">{formatTimestamp(a.timestamp)}</td>
                          <td className="font-mono text-[11px] text-ice px-5 py-4">
                            <div className="flex items-center gap-2">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 2V6M4 4L6 6L8 4M3 9H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                              </svg>
                              Movement Detected
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[2px] bg-[rgba(245,166,35,0.1)] text-amber border border-[rgba(245,166,35,0.2)]">
                              {a.zone}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[2px]" style={{
                              background: `${sevColor}15`,
                              color: sevColor,
                              border: `1px solid ${sevColor}30`,
                            }}>
                              {a.severity}
                            </span>
                          </td>
                          <td className="font-mono text-[11px] px-5 py-4" style={{ color: confColor }}>
                            {a.confidence}%
                          </td>
                          <td className="px-5 py-4">
                            {a.isRead ? (
                              <span className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">READ</span>
                            ) : (
                              <button
                                onClick={() => markAlertRead(a.id)}
                                className="flex items-center gap-2 font-mono text-[9px] text-amber uppercase tracking-widest hover:text-[#ffb93a] transition-colors"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-amber" style={{ animation: 'pulse-amber 1.5s ease-in-out infinite' }} />
                                UNREAD
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile card view */}
              <div className="md:hidden divide-y divide-[rgba(255,255,255,0.04)]">
                {alerts.map((a, idx) => {
                  const sevColor = SEVERITY_COLORS[a.severity]
                  const rowNum = (page - 1) * 10 + idx + 1

                  return (
                    <div
                      key={a.id}
                      className={`p-4 ${!a.isRead ? 'border-l-2 border-l-[#F5A623]' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] text-ice-muted">#{rowNum}</span>
                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[2px]" style={{
                          background: `${sevColor}15`, color: sevColor, border: `1px solid ${sevColor}30`,
                        }}>
                          {a.severity}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-ice mb-1">Movement Detected</div>
                      <div className="font-mono text-[9px] text-ice-muted mb-2">
                        {formatTimestamp(a.timestamp)} · Zone {a.zone} · {a.confidence}%
                      </div>
                      {!a.isRead && (
                        <button
                          onClick={() => markAlertRead(a.id)}
                          className="flex items-center gap-2 font-mono text-[9px] text-amber uppercase tracking-widest"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber" style={{ animation: 'pulse-amber 1.5s ease-in-out infinite' }} />
                          Mark as Read
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="btn-ghost py-1.5 px-3 text-[9px] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Prev
              </button>
              <span className="font-mono text-[10px] text-ice-muted">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="btn-ghost py-1.5 px-3 text-[9px] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
