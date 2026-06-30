import { Link } from 'react-router-dom'
import { Droplets, Camera, BookOpen, Clock, Sparkles, ArrowRight, Heart } from 'lucide-react'

const features = [
  {
    icon: Droplets,
    title: 'Koleksi Parfum',
    description: 'Catat setiap parfum Uchi yang kamu miliki. Simpan detail aroma, rating, dan kenanganmu.',
    link: '/collection',
    gradient: 'from-gold/20 to-gold-light/10',
    iconColor: 'text-gold',
  },
  {
    icon: Camera,
    title: 'Momen Berharga',
    description: 'Abadikan momen-momen spesial yang kamu lalui bersama wangi favoritmu.',
    link: '/moments',
    gradient: 'from-rose/20 to-rose-light/10',
    iconColor: 'text-rose',
  },
  {
    icon: BookOpen,
    title: 'Scent Journal',
    description: 'Tulis perjalanan aromamu. Catat mood, cuaca, dan occasion setiap kali memakai parfum.',
    link: '/journal',
    gradient: 'from-sage/20 to-sage/5',
    iconColor: 'text-sage',
  },
  {
    icon: Clock,
    title: 'Fragrance Timeline',
    description: 'Lihat perjalanan wangimu dalam bentuk timeline yang indah dan personal.',
    link: '/timeline',
    gradient: 'from-warm-brown/20 to-warm-brown/5',
    iconColor: 'text-warm-brown',
  },
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-12">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-gold/15 to-transparent blur-3xl animate-pulse-soft" />
          <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose/10 to-transparent blur-3xl animate-pulse-soft [animation-delay:1s]" />
          <div className="absolute bottom-[20%] left-[30%] w-[250px] h-[250px] rounded-full bg-gradient-to-br from-sage/10 to-transparent blur-3xl animate-pulse-soft [animation-delay:2s]" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #8B6F4E 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-gold/20 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs font-medium text-warm-brown tracking-wider uppercase">
                Uchi Parfume Experience
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-deep-brown leading-[1.1]">
              Jejak{' '}
              <span className="italic text-gold relative">
                Wangi
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold/30" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C30 4 60 2 100 5C140 8 170 4 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-warm-brown/80 font-light mt-2">
              Ceritamu
            </p>

            <p className="mt-6 md:mt-8 text-base md:text-lg text-muted max-w-xl leading-relaxed mx-auto lg:mx-0">
              Setiap aroma menyimpan cerita. Abadikan perjalanan wangimu bersama Uchi Parfume —
              dari koleksi pertama hingga momen-momen yang tak terlupakan.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                to="/collection"
                className="group relative flex items-center gap-2 px-8 py-4 bg-charcoal text-cream rounded-full text-sm font-medium tracking-wide overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-charcoal/20 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Mulai Perjalanan
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-deep-brown to-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <a
                href="https://uchiparfume.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-sm border border-gold/30 text-warm-brown rounded-full text-sm font-medium tracking-wide hover:bg-white/80 hover:border-gold/50 transition-all duration-300"
              >
                Kunjungi Uchi Parfume
              </a>
            </div>
          </div>

          {/* Right: Visual illustration */}
          <div className="flex-shrink-0 relative w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] lg:w-[380px] lg:h-[440px] animate-fade-in [animation-delay:0.3s]">
            {/* Main perfume bottle shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Glow behind */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold/20 to-rose/10 rounded-[60px] blur-2xl scale-110" />
                {/* Bottle body */}
                <div className="relative w-[180px] h-[280px] sm:w-[200px] sm:h-[300px] lg:w-[240px] lg:h-[360px] bg-gradient-to-b from-white/80 via-cream to-gold-light/30 rounded-[40px] border border-gold/20 shadow-2xl backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden">
                  {/* Glass reflection */}
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/40 to-transparent rounded-l-[40px]" />
                  {/* Cap */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-10 bg-gradient-to-b from-gold to-warm-brown rounded-t-lg rounded-b-sm shadow-md" />
                  {/* Label area */}
                  <div className="relative z-10 text-center px-6">
                    <Droplets className="w-8 h-8 text-gold mx-auto mb-3" />
                    <p className="font-serif text-lg sm:text-xl text-deep-brown font-medium">Uchi</p>
                    <p className="font-serif text-xs text-warm-brown/60 italic mt-1">Parfume</p>
                    <div className="w-12 h-px bg-gold/40 mx-auto mt-3" />
                    <p className="text-[10px] text-muted/50 mt-2 tracking-widest uppercase">Est. 2005</p>
                  </div>
                  {/* Liquid */}
                  <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-gold/25 to-transparent rounded-b-[40px]" />
                </div>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute top-10 right-4 w-3 h-3 rounded-full bg-gold/40 animate-float" />
            <div className="absolute top-1/3 left-2 w-2 h-2 rounded-full bg-rose/40 animate-float [animation-delay:1s]" />
            <div className="absolute bottom-16 right-8 w-2.5 h-2.5 rounded-full bg-sage/40 animate-float [animation-delay:2s]" />
            <div className="absolute bottom-1/4 left-6 w-2 h-2 rounded-full bg-gold-light/60 animate-float [animation-delay:3s]" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] text-muted tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 relative">
        {/* Section divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-light/40 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs font-medium text-gold tracking-widest uppercase">Fitur</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-deep-brown font-light mt-3">
              Semua yang Kamu Butuhkan
            </h2>
            <p className="mt-4 text-muted max-w-md mx-auto text-sm md:text-base">
              Rekam, ceritakan, dan rayakan setiap perjalanan wangimu
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="group relative p-7 md:p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-gold-light/30 shadow-lg shadow-charcoal/[0.04] hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/15 hover:-translate-y-3"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-cream border border-gold-light/40 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/15 transition-all duration-300">
                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-serif text-xl text-deep-brown mb-3 group-hover:text-deep-brown font-medium">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Jelajahi <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 md:py-36 px-4 sm:px-6 bg-charcoal relative overflow-hidden">
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #C9A96E 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Heart className="w-7 h-7 text-gold" />
            </div>
          </div>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream/90 font-light italic leading-relaxed">
            "Wangi adalah bahasa yang tak terucapkan — ia menyentuh kenangan, membangkitkan perasaan, dan menandai momen yang tak ingin kau lupakan."
          </blockquote>
          <p className="mt-8 text-gold/60 text-sm tracking-widest uppercase">
            — Uchi Parfume
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-36 px-4 sm:px-6 relative bg-gradient-to-b from-cream-dark/40 to-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-medium text-gold tracking-widest uppercase">Dalam Angka</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-deep-brown font-light mt-3">
              Perjalanan Uchi
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '500+', label: 'Varian Aroma' },
              { number: '2005', label: 'Berdiri Sejak' },
              { number: '∞', label: 'Momen Berharga' },
              { number: '1', label: 'Ceritamu' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/60 border border-gold-light/20 shadow-sm">
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold font-light leading-none">
                  {stat.number}
                </p>
                <p className="mt-4 text-xs text-muted tracking-wider uppercase font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-36 px-4 sm:px-6 relative">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-light/40 to-transparent" />

        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-8">
            <Sparkles className="w-7 h-7 text-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-deep-brown font-light">
            Siap Memulai Perjalananmu?
          </h2>
          <p className="mt-5 text-muted text-base md:text-lg max-w-md mx-auto">
            Setiap wangi memiliki cerita. Mulai tulis ceritamu sekarang.
          </p>
          <Link
            to="/collection"
            className="group inline-flex items-center gap-2.5 mt-10 px-10 py-4.5 bg-gradient-to-r from-gold to-warm-brown text-white rounded-full text-sm font-semibold tracking-wide hover:shadow-2xl hover:shadow-gold/30 hover:scale-[1.03] transition-all duration-300"
          >
            Tambah Parfum Pertama
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  )
}
