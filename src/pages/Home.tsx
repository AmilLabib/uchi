import { Link } from 'react-router-dom'
import { ArrowRight, Droplets, Camera, BookOpen, Clock } from 'lucide-react'

const features = [
  {
    icon: Droplets,
    title: 'Scent of The Soul',
    subtitle: 'Your Fragrance Identity',
    description: 'Lihat jati dirimu melalui aroma. Koleksi parfum, soundtrack Spotify, galeri kenangan, dan share ke sosial media.',
    link: '/scent-of-the-soul',
    number: '01',
  },
  {
    icon: Camera,
    title: 'Find Your Soul',
    subtitle: 'AI Recommendation',
    description: 'Temukan parfum UCHI yang paling cocok dengan aktivitas, mood, dan kepribadianmu melalui rekomendasi cerdas.',
    link: '/find-your-soul',
    number: '02',
  },
  {
    icon: BookOpen,
    title: 'Collection & Journal',
    subtitle: 'Scent Diary',
    description: 'Catat koleksi parfummu, tulis jurnal harian, dan abadikan momen-momen berharga bersama wangimu.',
    link: '/collection',
    number: '03',
  },
  {
    icon: Clock,
    title: 'UchiMate',
    subtitle: 'Personalization',
    description: 'Personalisasi pengalaman UCHI-mu. Atur profil, riwayat pembelian, dan tema tampilan.',
    link: '/uchiMate',
    number: '04',
  },
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background effects */}
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        {/* Decorative lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />

        <div className="relative w-full max-w-6xl mx-auto text-center pt-24">
          {/* Subtitle */}
          <div className="animate-fade-up">
            <span className="inline-block text-xs font-medium tracking-[0.3em] uppercase text-accent mb-8">
              Uchi Personal Lab
            </span>
          </div>

          {/* Main heading */}
          <h1 className="animate-fade-up [animation-delay:0.2s] opacity-0 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-text-primary leading-[0.9] tracking-tight">
            Kenali{' '}
            <span className="italic text-gradient">Jiwamu</span>
            <br />
            <span className="text-text-secondary font-light">Lewat Aroma</span>
          </h1>

          {/* Description */}
          <p className="animate-fade-up [animation-delay:0.4s] opacity-0 mt-8 md:mt-12 text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Platform terintegrasi untuk mengenal jati dirimu melalui aroma.
            Temukan, abadikan, dan bagikan perjalanan wangimu bersama UCHI Parfume.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up [animation-delay:0.6s] opacity-0 mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              to="/find-your-soul"
              className="group flex items-center gap-3 px-8 py-4 bg-accent text-primary text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            >
              Temukan Aromamu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/scent-of-the-soul"
              className="flex items-center gap-3 px-8 py-4 border border-border text-text-secondary text-sm font-medium tracking-wider uppercase hover:border-accent/40 hover:text-accent transition-all duration-300"
            >
              Lihat Profilmu
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-[10px] text-text-muted tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-36 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Features</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text-primary font-medium mt-4">
              Semua yang Kamu <span className="italic text-gradient">Butuhkan</span>
            </h2>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="group relative p-10 md:p-12 bg-primary hover:bg-surface-card transition-all duration-500"
              >
                {/* Number */}
                <span className="absolute top-8 right-8 text-6xl font-serif font-bold text-accent/5 group-hover:text-accent/10 transition-colors duration-500">
                  {feature.number}
                </span>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 border border-accent/30 flex items-center justify-center mb-6 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>

                  {/* Subtitle */}
                  <span className="text-[11px] font-medium tracking-widest uppercase text-text-muted">
                    {feature.subtitle}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-2xl text-text-primary mt-2 mb-4 group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                    {feature.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-xs font-medium tracking-wider uppercase">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-28 md:py-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Background glow */}
        <div className="absolute inset-0 bg-hero-glow opacity-50" />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Decorative quote mark */}
          <div className="text-8xl font-serif text-accent/10 leading-none mb-8">"</div>

          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-primary font-light italic leading-[1.3]">
            Wangi adalah bahasa yang tak terucapkan — ia menyentuh kenangan dan menandai momen yang tak ingin kau lupakan.
          </blockquote>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-accent/40" />
            <p className="text-xs text-accent tracking-[0.3em] uppercase font-medium">
              Uchi Parfume
            </p>
            <div className="w-12 h-px bg-accent/40" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {[
              { number: '500+', label: 'Varian Aroma' },
              { number: '2005', label: 'Berdiri Sejak' },
              { number: '∞', label: 'Momen Berharga' },
              { number: '1', label: 'Ceritamu' },
            ].map((stat, i) => (
              <div key={i} className="bg-primary p-8 md:p-12 text-center">
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl text-gradient font-medium leading-none">
                  {stat.number}
                </p>
                <p className="mt-4 text-xs text-text-muted tracking-widest uppercase font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 md:py-40 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 bg-hero-glow opacity-30" />

        <div className="max-w-2xl mx-auto text-center relative">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-6 block">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-text-primary font-medium leading-tight">
            Siap Mengenal <span className="italic text-gradient">Jiwamu?</span>
          </h2>
          <p className="mt-6 text-text-secondary text-base md:text-lg max-w-md mx-auto">
            Setiap wangi memiliki cerita. Temukan aroma yang mencerminkan dirimu sekarang.
          </p>
          <Link
            to="/find-your-soul"
            className="group inline-flex items-center gap-3 mt-10 px-10 py-4.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light hover:shadow-xl hover:shadow-accent/20 transition-all duration-300"
          >
            Temukan Parfum Pertama
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  )
}
