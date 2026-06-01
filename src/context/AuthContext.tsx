import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface AuthContextValue {
  isAuthenticated: boolean
  userEmail: string
  isLoading: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const VALID_EMAIL = 'admin@wiintrusion.io'
const VALID_PASSWORD = 'WiIntrusion2026'
const STORAGE_KEY = 'wiintrusion_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored) as { email: string }
        setIsAuthenticated(true)
        setUserEmail(data.email)
      } catch {
        sessionStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string): boolean => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsAuthenticated(true)
      setUserEmail(email)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ email }))
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserEmail('')
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
