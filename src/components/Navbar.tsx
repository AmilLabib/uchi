import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Droplets } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/collection', label: 'Koleksi' },
  { path: '/moments', label: 'Momen' },
  { path: '/journal', label: 'Journal' },
  { path: '/timeline', label: 'Timeline' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-xl shadow-lg shadow-charcoal/5 border-b border-gold/15'
          : 'bg-cream/60 backdrop-blur-md border-b border-gold-light/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-22">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-warm-brown flex items-center justify-center shadow-md shadow-gold/20 group-hover:shadow-lg group-hover:shadow-gold/30 group-hover:scale-105 transition-all duration-300">
              <Droplets className="w-[1.125rem] h-[1.125rem] text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-semibold text-deep-brown tracking-wide leading-tight">
                My Uchi
              </span>
              <span className="text-[10px] text-muted/60 tracking-widest uppercase hidden sm:block">
                Parfume Experience
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-gold-light/20 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300
                  ${location.pathname === link.path
                    ? 'text-white bg-gradient-to-r from-gold to-warm-brown shadow-md shadow-gold/25'
                    : 'text-muted hover:text-deep-brown hover:bg-white/80'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 border border-gold-light/20 hover:bg-white/80 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`transition-all duration-300 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}>
              <Menu className="w-5 h-5 text-deep-brown absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </span>
            <span className={`transition-all duration-300 ${isOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`}>
              <X className="w-5 h-5 text-deep-brown absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6 pt-3 bg-cream/98 backdrop-blur-xl border-t border-gold-light/10">
          <div className="space-y-1.5 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-5 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200
                  ${location.pathname === link.path
                    ? 'text-white bg-gradient-to-r from-gold to-warm-brown shadow-md'
                    : 'text-muted hover:text-deep-brown hover:bg-white/60'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
