import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useThemeStore } from '../store/useThemeStore'

export default function Layout() {
  // Initialize theme on mount
  useThemeStore()

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
