import AppLogo from './ui/AppLogo'

export default function Footer() {
  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Compare', href: '#compare' },
    { label: 'Team', href: '#team' },
  ]
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#0F1210]">
      <div className="section-container">
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <AppLogo size={36} />
            <div>
              <div className="font-mono text-[11px] font-bold text-amber uppercase tracking-widest">WiIntrusion</div>
              <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">Privacy · Detection · IoT</div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="font-mono text-[10px] font-medium text-ice-muted uppercase tracking-widest hover:text-amber transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-[2px] border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:border-amber hover:text-amber text-ice-muted transition-colors"
              aria-label="GitHub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="py-4 border-t border-[rgba(255,255,255,0.04)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">© 2026 WiIntrusion · University of Lahore · FYP Project</p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">Privacy Policy</span>
            <span className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">Terms</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2DDE7A]" style={{ animation: 'pulse-green 2s ease-in-out infinite' }} />
              <span className="font-mono text-[9px] text-[#2DDE7A] uppercase tracking-widest">All Systems Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
