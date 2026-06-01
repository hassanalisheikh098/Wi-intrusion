import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSystem } from '../../context/SystemContext'
import AppLogo from '../../components/ui/AppLogo'

const navLinks = [
  { label: 'Dashboard', to: '/dashboard/home' },
  { label: 'Alert History', to: '/dashboard/history' },
  { label: 'System Control', to: '/dashboard/control' },
]

export default function DashboardLayout() {
  const { logout } = useAuth()
  const { status } = useSystem()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#0A0C0B] text-[#E8EDF0]">
      {/* Dashboard NavBar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0C0B]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]' : 'bg-[#0A0C0B]'
      }`}>
        {/* Status bar */}
        <div className="border-b border-[rgba(255,255,255,0.04)] bg-[rgba(245,166,35,0.04)]">
          <div className="section-container">
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-3">
                <div className="status-dot" />
                <span className="font-mono text-[10px] text-[rgba(232,237,240,0.4)] tracking-widest uppercase">
                  System Active — Dashboard v1.0
                </span>
              </div>
              <span className="font-mono text-[10px] text-[rgba(245,166,35,0.6)] tracking-widest uppercase hidden md:block">
                CSI · ESP32 · WiFi-SENSING
              </span>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <AppLogo size={36} onClick={() => navigate('/dashboard/home')} />
              <div>
                <div className="font-mono text-[13px] font-bold text-amber tracking-wider uppercase">WiIntrusion</div>
                <div className="font-mono text-[9px] text-[rgba(232,237,240,0.35)] tracking-widest uppercase">Dashboard · Phase I</div>
              </div>
            </div>

            {/* Center: nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `font-mono text-[11px] font-medium tracking-widest uppercase transition-colors duration-200 ${
                      isActive ? 'text-amber' : 'text-[rgba(232,237,240,0.55)] hover:text-[#F5A623]'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>

            {/* Right: status + logout */}
            <div className="hidden md:flex items-center gap-4">
              {/* Status badge */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] border font-mono text-[10px] font-bold uppercase tracking-widest ${
                status === 'ARMED'
                  ? 'bg-[rgba(245,166,35,0.08)] border-[rgba(245,166,35,0.3)] text-amber'
                  : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-ice-muted'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  status === 'ARMED' ? 'bg-amber' : 'bg-[rgba(232,237,240,0.3)]'
                }`} style={status === 'ARMED' ? { animation: 'pulse-amber 1.5s ease-in-out infinite' } : {}} />
                {status}
              </div>

              <button onClick={handleLogout} className="btn-ghost py-2 px-4 text-[10px]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5V9.5C1.5 10.05 1.95 10.5 2.5 10.5H4.5M8 8.5L10.5 6L8 3.5M4.5 6H10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Logout
              </button>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
              <span className={`block w-5 h-0.5 bg-[#E8EDF0] transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#E8EDF0] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#E8EDF0] transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#0F1210] border-b border-[rgba(255,255,255,0.06)]`}>
          <div className="section-container py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `font-mono text-[12px] font-medium tracking-widest uppercase transition-colors py-2 border-b border-[rgba(255,255,255,0.04)] ${
                    isActive ? 'text-amber' : 'text-[rgba(232,237,240,0.6)] hover:text-amber'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            <div className="flex items-center justify-between pt-2">
              <div className={`flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest ${
                status === 'ARMED' ? 'text-amber' : 'text-ice-muted'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'ARMED' ? 'bg-amber' : 'bg-[rgba(232,237,240,0.3)]'}`}
                  style={status === 'ARMED' ? { animation: 'pulse-amber 1.5s ease-in-out infinite' } : {}} />
                {status}
              </div>
              <button onClick={handleLogout} className="btn-ghost py-2 px-4 text-[10px]">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="pt-[104px]">
        <Outlet />
      </main>
    </div>
  )
}
