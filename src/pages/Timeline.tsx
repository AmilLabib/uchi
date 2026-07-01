import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag, Camera, BookOpen, Clock } from 'lucide-react'
import { useTimelineStore, usePerfumeStore } from '../store/useStore'
import type { TimelineEvent } from '../types'

gsap.registerPlugin(ScrollTrigger)

const typeConfig: Record<TimelineEvent['type'], { icon: typeof ShoppingBag; color: string; borderColor: string; label: string }> = {
  purchase: { icon: ShoppingBag, color: 'text-accent', borderColor: 'border-accent/30', label: 'Pembelian' },
  moment: { icon: Camera, color: 'text-rose', borderColor: 'border-rose/30', label: 'Momen' },
  journal: { icon: BookOpen, color: 'text-sage', borderColor: 'border-sage/30', label: 'Jurnal' },
}

export default function Timeline() {
  const { timeline } = useTimelineStore()
  const { perfumes } = usePerfumeStore()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )

      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll('.timeline-item')
        items.forEach((item, i) => {
          gsap.fromTo(item,
            { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        const line = containerRef.current.querySelector('.timeline-line')
        if (line) {
          gsap.fromTo(line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1,
              },
            }
          )
        }
      }
    })

    return () => ctx.revert()
  }, [timeline.length])

  // Group by month
  const grouped = timeline.reduce<Record<string, TimelineEvent[]>>((acc, event) => {
    const date = new Date(event.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (!acc[key]) acc[key] = []
    acc[key].push(event)
    return acc
  }, {})

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="page-header text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Journey</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary font-medium mt-4">
            Fragrance <span className="italic text-gradient">Timeline</span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-md mx-auto text-sm md:text-base">
            Perjalanan wangimu dalam satu garis waktu. Setiap titik adalah cerita.
          </p>
        </div>

        {timeline.length === 0 ? (
          <div className="text-center py-28">
            <div className="w-20 h-20 mx-auto border border-accent/20 flex items-center justify-center mb-6">
              <Clock className="w-9 h-9 text-accent/40" />
            </div>
            <p className="text-text-secondary font-serif text-xl">Timeline masih kosong</p>
            <p className="text-sm text-text-muted mt-2">
              Tambahkan parfum, momen, atau jurnal untuk memulai timeline
            </p>
          </div>
        ) : (
          <div ref={containerRef} className="relative">
            {/* Center line */}
            <div className="timeline-line absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent origin-top md:-translate-x-px" />

            {Object.entries(grouped).map(([monthKey, events]) => {
              const date = new Date(monthKey + '-01')
              const monthLabel = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

              return (
                <div key={monthKey} className="mb-16">
                  {/* Month label */}
                  <div className="relative flex items-center mb-8">
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 -translate-x-1.5 md:-translate-x-1.5 bg-accent z-10" />
                    <div className="ml-14 md:ml-0 md:text-center md:w-full">
                      <span className="inline-block px-5 py-2 bg-surface-card border border-accent/20 text-xs font-medium text-accent tracking-[0.2em] uppercase">
                        {monthLabel}
                      </span>
                    </div>
                  </div>

                  {/* Events */}
                  <div className="space-y-5">
                    {events.map((event, idx) => {
                      const config = typeConfig[event.type]
                      const Icon = config.icon
                      const perfumeName = event.perfumeId
                        ? perfumes.find((p) => p.id === event.perfumeId)?.name
                        : undefined

                      return (
                        <div
                          key={event.id}
                          className={`timeline-item relative ml-14 md:ml-0 ${
                            idx % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'
                          }`}
                        >
                          {/* Dot on line */}
                          <div className="absolute left-[-2rem] md:left-1/2 top-6 w-2 h-2 -translate-x-1 md:-translate-x-1 border border-accent/50 bg-primary z-10" />

                          {/* Content card */}
                          <div className="p-6 bg-surface-card border border-border hover:border-accent/20 hover-glow transition-all duration-500 group">
                            <div className="flex items-start gap-4">
                              <div className={`p-2.5 border ${config.borderColor} flex-shrink-0`}>
                                <Icon className={`w-4 h-4 ${config.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-[11px] text-text-muted font-medium uppercase tracking-wider">{config.label}</span>
                                  <span className="text-[11px] text-text-muted/40">•</span>
                                  <span className="text-[11px] text-text-muted/60">
                                    {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                  </span>
                                </div>
                                <h4 className="font-serif text-base text-text-primary leading-tight group-hover:text-accent transition-colors duration-300">
                                  {event.title}
                                </h4>
                                <p className="text-xs text-text-secondary mt-2 leading-relaxed line-clamp-2">
                                  {event.description}
                                </p>
                                {perfumeName && (
                                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-accent/15 text-[11px] text-accent font-medium tracking-wider">
                                    <span className="w-1 h-1 bg-accent" />
                                    {perfumeName}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
