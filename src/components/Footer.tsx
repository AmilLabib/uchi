import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-border">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1 space-y-5">
            <h3 className="font-serif text-3xl font-medium text-gradient">UCHI</h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Setiap tetes wangi menyimpan cerita. Abadikan perjalanan aromamu bersama Uchi Parfume.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="text-xs font-medium tracking-widest uppercase text-accent">Navigate</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Home
              </Link>
              <Link to="/scent-of-the-soul" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Scent of The Soul
              </Link>
              <Link to="/find-your-soul" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Find Your Soul
              </Link>
              <Link to="/collection" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Collection
              </Link>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-5">
            <h4 className="text-xs font-medium tracking-widest uppercase text-accent">Experience</h4>
            <div className="flex flex-col gap-3">
              <Link to="/moments" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Moments
              </Link>
              <Link to="/journal" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Journal
              </Link>
              <Link to="/timeline" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Timeline
              </Link>
              <Link to="/uchiMate" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                UchiMate
              </Link>
              <a
                href="https://uchiparfume.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Official Store
              </a>
            </div>
          </div>

          {/* Newsletter style */}
          <div className="space-y-5">
            <h4 className="text-xs font-medium tracking-widest uppercase text-accent">About</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Parfum refill berkualitas sejak 2005 — Bandung, Indonesia.
            </p>
            <div className="flex gap-4">
              <a
                href="https://uchiparfume.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © 2024 My Uchi Experience. Terinspirasi oleh Uchi Parfume.
          </p>
          <p className="text-xs text-text-muted">
            Crafted with passion for fragrance lovers
          </p>
        </div>
      </div>
    </footer>
  )
}
