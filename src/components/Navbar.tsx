import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/scent-of-the-soul', label: 'Scent of The Soul' },
  { path: '/find-your-soul', label: 'Find Your Soul' },
  { path: '/collection', label: 'Collection' },
  { path: '/moments', label: 'Moments' },
  { path: '/journal', label: 'Journal' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/uchiMate', label: 'UchiMate' },
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

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary/95 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-serif text-2xl md:text-3xl font-medium text-gradient tracking-wide">
              UCHI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300
                  ${location.pathname === link.path
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="https://uchiparfume.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-accent/40 text-accent text-xs font-medium tracking-widest uppercase rounded-none hover:bg-accent hover:text-primary transition-all duration-300"
            >
              Shop Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-text-primary"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-8 pt-4 bg-primary/98 backdrop-blur-xl border-t border-border">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3.5 text-sm font-medium tracking-wider uppercase transition-all duration-200
                  ${location.pathname === link.path
                    ? 'text-accent border-l-2 border-accent pl-4'
                    : 'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <a
              href="https://uchiparfume.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 border border-accent/40 text-accent text-xs font-medium tracking-widest uppercase hover:bg-accent hover:text-primary transition-all duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
