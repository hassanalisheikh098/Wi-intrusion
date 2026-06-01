import { useState, type FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppLogo from '../components/ui/AppLogo'

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/dashboard/home" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(false)
    setLoading(true)

    // Simulate network delay
    await new Promise(r => setTimeout(r, 1200))

    const success = login(email, password)
    setLoading(false)

    if (success) {
      navigate('/dashboard/home', { replace: true })
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0C0B] bg-grid-pattern flex flex-col">
      {/* Status bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.04)] bg-[rgba(245,166,35,0.04)]">
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

      {/* Centered card */}
      <div className="flex-1 flex items-center justify-center px-4 pt-12">
        <div className="w-full max-w-[420px]">
          <div className="feature-card corner-tl corner-br relative overflow-hidden p-8 md:p-10">
            {/* Amber top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #F5A623, transparent)' }} />

            {/* Logo + Title */}
            <div className="flex flex-col items-center mb-8">
              <AppLogo size={40} />
              <div className="font-mono text-[13px] font-bold text-amber tracking-wider uppercase mt-3">
                WiIntrusion
              </div>
              <div className="mono-label mt-2">Dashboard Access</div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ice-muted block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@wiintrusion.io"
                  className="input-terminal"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ice-muted block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="input-terminal pr-10"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ice-muted hover:text-amber transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 2L14 14M6.5 6.5C6.18 6.82 6 7.27 6 7.75C6 8.85 6.9 9.75 8 9.75C8.48 9.75 8.93 9.57 9.25 9.25M13.36 10.11C14.4 9.14 15 8 15 8C15 8 12.5 3 8 3C7.35 3 6.74 3.1 6.18 3.28M3.5 4.75C2.2 5.83 1 8 1 8C1 8 3.5 13 8 13C9.32 13 10.5 12.58 11.5 11.95" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
                {loading ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="32" strokeDashoffset="8" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="3" y="5" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4.5 5V3.5C4.5 2.12 5.62 1 7 1H5C6.38 1 7.5 2.12 7.5 3.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                )}
                {loading ? 'Authenticating...' : 'Authenticate'}
              </button>
            </form>

            {/* Error */}
            {error && (
              <div className="mt-5 bg-[rgba(229,83,75,0.08)] border border-[rgba(229,83,75,0.3)] rounded-[2px] p-3 flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] text-[#E5534B]">
                  INVALID CREDENTIALS — ACCESS DENIED
                </span>
                <button onClick={() => setError(false)} className="text-[#E5534B] hover:text-[#ff7a73] transition-colors flex-shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Footer text */}
          <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest text-center mt-6">
            UOL FYP 2026 · Dept. CS&amp;IT · Secure Access Only
          </div>
        </div>
      </div>
    </div>
  )
}
