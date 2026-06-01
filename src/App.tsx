import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { SystemProvider } from './context/SystemContext'

// Landing page components
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import HowItWorksSection from './components/HowItWorksSection'
import FeaturesSection from './components/FeaturesSection'
import CompareSection from './components/CompareSection'
import TeamSection from './components/TeamSection'
import WaitlistSection from './components/WaitlistSection'
import Footer from './components/Footer'

// Dashboard pages
import LoginPage from './pages/LoginPage'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import AlertHistoryPage from './pages/dashboard/AlertHistoryPage'
import SystemControlPage from './pages/dashboard/SystemControlPage'
import type { ReactNode } from 'react'

function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0A0C0B] text-[#E8EDF0]">
      <NavBar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CompareSection />
      <TeamSection />
      <WaitlistSection />
      <Footer />
    </main>
  )
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0C0B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-spin">
            <circle cx="12" cy="12" r="10" stroke="rgba(245,166,35,0.3)" strokeWidth="2"/>
            <path d="M12 2C6.48 2 2 6.48 2 12" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="font-mono text-[10px] text-ice-muted uppercase tracking-widest">Verifying session...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SystemProvider>
          <Routes>
            {/* Landing page — all existing sections intact */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />

            {/* Dashboard — protected */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<DashboardHome />} />
              <Route path="history" element={<AlertHistoryPage />} />
              <Route path="control" element={<SystemControlPage />} />
            </Route>
          </Routes>
        </SystemProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
