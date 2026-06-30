import { Droplets, Heart, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-gold" />
              <span className="font-serif text-xl font-medium text-gold-light">My Uchi Experience</span>
            </div>
            <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
              Setiap tetes wangi menyimpan cerita. Abadikan perjalanan aromamu bersama Uchi Parfume.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-gold-light">Jelajahi</h4>
            <div className="flex flex-col gap-2">
              <Link to="/collection" className="text-sm text-cream/60 hover:text-gold transition-colors">
                Koleksi Parfum
              </Link>
              <Link to="/moments" className="text-sm text-cream/60 hover:text-gold transition-colors">
                Momen Berharga
              </Link>
              <Link to="/journal" className="text-sm text-cream/60 hover:text-gold transition-colors">
                Scent Journal
              </Link>
              <Link to="/timeline" className="text-sm text-cream/60 hover:text-gold transition-colors">
                Fragrance Timeline
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-gold-light">Uchi Parfume</h4>
            <a
              href="https://uchiparfume.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream/60 hover:text-gold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              uchiparfume.com
            </a>
            <p className="text-xs text-cream/40">
              Parfum refill berkualitas sejak 2005 — Bandung, Indonesia
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            © 2024 My Uchi Experience. Terinspirasi oleh Uchi Parfume.
          </p>
          <p className="text-xs text-cream/40 flex items-center gap-1">
            Dibuat dengan <Heart className="w-3 h-3 text-rose" /> untuk pecinta wangi
          </p>
        </div>
      </div>
    </footer>
  )
}
