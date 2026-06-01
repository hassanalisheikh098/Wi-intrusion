import { useEffect, useState } from 'react'
import AppLogo from './ui/AppLogo'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Compare', href: '#compare' },
    { label: 'Team', href: '#team' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#0A0C0B]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]' : 'bg-transparent'
    }`}>
      {/* Status bar */}
      <div className="border-b border-[rgba(255,255,255,0.04)] bg-[rgba(245,166,35,0.04)]">
        <div className="section-container">
          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-3">
              <div className="status-dot" />
              <span className="font-mono text-[10px] text-[rgba(232,237,240,0.4)] tracking-widest uppercase">
                System Active — UOL FYP 2026
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
          <div className="flex items-center gap-3">
            <AppLogo size={48} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            <div>
              <div className="font-mono text-[13px] font-bold text-amber tracking-wider uppercase">WiIntrusion</div>
              <div className="font-mono text-[9px] text-[rgba(232,237,240,0.35)] tracking-widest uppercase">Privacy · Detection · IoT</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className="font-mono text-[11px] font-medium text-[rgba(232,237,240,0.55)] tracking-widest uppercase hover:text-[#F5A623] transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#waitlist" className="btn-primary text-[12px] py-2.5 px-6">
              <span className="inline-block w-2 h-2 rounded-full bg-[#0A0C0B] animate-pulse-green" />
              Join Waitlist
            </a>
          </div>

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
        menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      } bg-[#0F1210] border-b border-[rgba(255,255,255,0.06)]`}>
        <div className="section-container py-4 flex flex-col gap-4">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="font-mono text-[12px] font-medium text-[rgba(232,237,240,0.6)] tracking-widest uppercase hover:text-amber transition-colors py-2 border-b border-[rgba(255,255,255,0.04)]">
              {l.label}
            </a>
          ))}
          <a href="#waitlist" onClick={() => setMenuOpen(false)} className="btn-primary mt-2 justify-center">
            Join Waitlist
          </a>
        </div>
      </div>
    </nav>
  )
}
