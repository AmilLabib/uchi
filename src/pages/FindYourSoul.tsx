import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { Sparkles, ShoppingBag, ExternalLink, Music, ArrowRight, X, RotateCcw } from 'lucide-react'
import { uchiCatalog } from '../data/uchiCatalog'
import type { UchiCatalogItem } from '../types'
import { categoryLabels } from '../types'

type Step = 'start' | 'activity' | 'occasion' | 'mood' | 'result'

const activities = [
  { value: 'kerja', label: 'Kerja / Meeting', emoji: '💼' },
  { value: 'kuliah', label: 'Kuliah / Sekolah', emoji: '📚' },
  { value: 'olahraga', label: 'Olahraga', emoji: '🏃' },
  { value: 'hangout', label: 'Hangout / Nongkrong', emoji: '🍻' },
  { value: 'date', label: 'Date / Kencan', emoji: '💕' },
  { value: 'traveling', label: 'Traveling / Liburan', emoji: '✈️' },
  { value: 'formal', label: 'Acara Formal', emoji: '👔' },
  { value: 'sehari-hari', label: 'Sehari-hari', emoji: '☀️' },
]

const occasions = [
  { value: 'pagi', label: 'Pagi hari', emoji: '🌅' },
  { value: 'siang', label: 'Siang hari', emoji: '☀️' },
  { value: 'sore', label: 'Sore hari', emoji: '🌇' },
  { value: 'malam', label: 'Malam hari', emoji: '🌙' },
]

const moods = [
  { value: 'energetic', label: 'Semangat & Energik', emoji: '⚡' },
  { value: 'peaceful', label: 'Tenang & Damai', emoji: '🌿' },
  { value: 'romantic', label: 'Romantis', emoji: '💕' },
  { value: 'confident', label: 'Percaya Diri', emoji: '✨' },
  { value: 'adventurous', label: 'Petualangan', emoji: '🌍' },
  { value: 'nostalgic', label: 'Nostalgia', emoji: '🌅' },
]

export default function FindYourSoul() {
  const [step, setStep] = useState<Step>('start')
  const [selectedActivity, setSelectedActivity] = useState('')
  const [selectedOccasion, setSelectedOccasion] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [recommendations, setRecommendations] = useState<UchiCatalogItem[]>([])
  const [showGallery, setShowGallery] = useState(false)
  const [selectedCatalogItem, setSelectedCatalogItem] = useState<UchiCatalogItem | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.fromTo('.step-content',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
  }, [step])

  const getRecommendations = () => {
    // Rule-based recommendation engine
    const scored = uchiCatalog.map((item) => {
      let score = 0

      // Activity match
      if (selectedActivity) {
        const activityMap: Record<string, string[]> = {
          'kerja': ['kerja', 'meeting', 'sehari-hari'],
          'kuliah': ['kuliah', 'sehari-hari'],
          'olahraga': ['olahraga', 'sehari-hari'],
          'hangout': ['hangout', 'nongkrong', 'cafe'],
          'date': ['date night', 'kencan', 'dinner'],
          'traveling': ['traveling', 'liburan', 'beach'],
          'formal': ['formal', 'acara formal', 'acara penting', 'wisuda'],
          'sehari-hari': ['sehari-hari', 'kuliah', 'kerja'],
        }
        const matchActivities = activityMap[selectedActivity] || [selectedActivity]
        if (item.occasion.some((o) => matchActivities.some((a) => o.includes(a)))) {
          score += 3
        }
      }

      // Mood match
      if (selectedMood && item.mood.includes(selectedMood)) {
        score += 3
      }

      // Time of day preference
      if (selectedOccasion) {
        if (selectedOccasion === 'pagi' || selectedOccasion === 'siang') {
          if (['fresh', 'citrus'].includes(item.category)) score += 2
        }
        if (selectedOccasion === 'sore') {
          if (['woody', 'floral'].includes(item.category)) score += 2
        }
        if (selectedOccasion === 'malam') {
          if (['oriental', 'gourmand', 'woody'].includes(item.category)) score += 2
        }
      }

      return { item, score }
    })

    const sorted = scored.sort((a, b) => b.score - a.score)
    return sorted.slice(0, 3).map((s) => s.item)
  }

  const handleGetResults = () => {
    const results = getRecommendations()
    setRecommendations(results)
    setStep('result')
  }

  const reset = () => {
    setStep('start')
    setSelectedActivity('')
    setSelectedOccasion('')
    setSelectedMood('')
    setRecommendations([])
  }

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="page-header text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">AI Recommendation</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary font-medium mt-4">
            Find Your <span className="italic text-gradient">Soul</span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg mx-auto text-sm md:text-base">
            Temukan parfum UCHI yang paling cocok dengan kepribadian dan aktivitasmu melalui rekomendasi cerdas.
          </p>
        </div>

        {/* Toggle: AI / Gallery */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setShowGallery(false)}
            className={`px-5 py-2.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              !showGallery ? 'bg-accent text-primary' : 'bg-surface-card border border-border text-text-secondary hover:border-accent/30'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Rekomendasi AI
            </span>
          </button>
          <button
            onClick={() => setShowGallery(true)}
            className={`px-5 py-2.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              showGallery ? 'bg-accent text-primary' : 'bg-surface-card border border-border text-text-secondary hover:border-accent/30'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              Galeri Parfum
            </span>
          </button>
        </div>

        {!showGallery ? (
          /* AI Recommendation Flow */
          <div className="step-content">
            {step === 'start' && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto border border-accent/30 flex items-center justify-center mb-6 animate-glow">
                  <Sparkles className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-serif text-2xl text-text-primary mb-3">Temukan Aroma Jiwamu</h3>
                <p className="text-sm text-text-secondary max-w-sm mx-auto mb-8">
                  Jawab beberapa pertanyaan sederhana, dan kami akan merekomendasikan parfum UCHI yang paling cocok untukmu.
                </p>
                <button
                  onClick={() => setStep('activity')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-all"
                >
                  Mulai
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'activity' && (
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <span className="text-xs text-accent tracking-[0.3em] uppercase">Langkah 1/3</span>
                  <h3 className="font-serif text-2xl text-text-primary mt-3">Apa aktivitasmu?</h3>
                  <p className="text-sm text-text-muted mt-2">Pilih aktivitas utama saat memakai parfum</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {activities.map((a) => (
                    <button
                      key={a.value}
                      onClick={() => { setSelectedActivity(a.value); setStep('occasion') }}
                      className={`p-4 text-left bg-surface-card border border-border hover:border-accent/40 transition-all duration-300 group ${
                        selectedActivity === a.value ? 'border-accent bg-accent/5' : ''
                      }`}
                    >
                      <span className="text-2xl block mb-2">{a.emoji}</span>
                      <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'occasion' && (
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <span className="text-xs text-accent tracking-[0.3em] uppercase">Langkah 2/3</span>
                  <h3 className="font-serif text-2xl text-text-primary mt-3">Kapan mau dipake?</h3>
                  <p className="text-sm text-text-muted mt-2">Waktu penggunaan mempengaruhi rekomendasi</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {occasions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => { setSelectedOccasion(o.value); setStep('mood') }}
                      className={`p-5 text-center bg-surface-card border border-border hover:border-accent/40 transition-all duration-300 group ${
                        selectedOccasion === o.value ? 'border-accent bg-accent/5' : ''
                      }`}
                    >
                      <span className="text-3xl block mb-2">{o.emoji}</span>
                      <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{o.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'mood' && (
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <span className="text-xs text-accent tracking-[0.3em] uppercase">Langkah 3/3</span>
                  <h3 className="font-serif text-2xl text-text-primary mt-3">Mood kamu hari ini?</h3>
                  <p className="text-sm text-text-muted mt-2">Aroma yang tepat mencerminkan perasaanmu</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {moods.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => { setSelectedMood(m.value); handleGetResults() }}
                      className={`p-4 text-center bg-surface-card border border-border hover:border-accent/40 transition-all duration-300 group ${
                        selectedMood === m.value ? 'border-accent bg-accent/5' : ''
                      }`}
                    >
                      <span className="text-2xl block mb-2">{m.emoji}</span>
                      <span className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'result' && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <h3 className="font-serif text-2xl text-text-primary">Rekomendasi Untukmu ✨</h3>
                  <p className="text-sm text-text-muted mt-2">
                    Berdasarkan {activities.find((a) => a.value === selectedActivity)?.label}, {occasions.find((o) => o.value === selectedOccasion)?.label}, mood {moods.find((m) => m.value === selectedMood)?.label}
                  </p>
                </div>

                <div className="space-y-4">
                  {recommendations.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedCatalogItem(item)}
                      className="group flex items-start gap-5 p-5 bg-surface-card border border-border hover:border-accent/30 cursor-pointer transition-all duration-300 hover-glow"
                    >
                      <div className="flex-shrink-0 w-20 h-20 overflow-hidden border border-accent/20 group-hover:border-accent/50 transition-all">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 font-medium">#{idx + 1} Match</span>
                          <span className="text-xs text-text-muted">{categoryLabels[item.category]}</span>
                        </div>
                        <h4 className="font-serif text-lg text-text-primary mt-1 group-hover:text-accent transition-colors">{item.name}</h4>
                        <p className="text-xs text-text-secondary mt-1 line-clamp-2">{item.story}</p>
                        <p className="text-sm font-semibold text-accent mt-2">{item.price}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent mt-5 transition-colors" />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-secondary text-sm font-medium hover:border-accent/30 hover:text-accent transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Coba Lagi
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Gallery View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uchiCatalog.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedCatalogItem(item)}
                className="group bg-surface-card border border-border hover:border-accent/30 cursor-pointer transition-all duration-500 hover-glow overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    {item.aromaImages.map((img, i) => (
                      <span key={i} className="text-lg drop-shadow-lg">{img}</span>
                    ))}
                  </div>
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-[10px] text-white font-medium tracking-wider uppercase">
                    {item.gender}
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors">{item.name}</h4>
                  <p className="text-xs text-text-muted mt-1 tracking-wider uppercase">{categoryLabels[item.category]}</p>
                  <p className="text-xs text-text-secondary mt-2 line-clamp-2">{item.story}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-semibold text-accent">{item.price}</span>
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3" />
                      Pesan
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Catalog Item Detail Modal */}
      {selectedCatalogItem && (
        <CatalogDetailModal
          item={selectedCatalogItem}
          onClose={() => setSelectedCatalogItem(null)}
        />
      )}
    </div>
  )
}

function CatalogDetailModal({ item, onClose }: { item: UchiCatalogItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-card border border-border shadow-2xl animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-surface-elevated transition-colors z-10" aria-label="Tutup">
          <X className="w-5 h-5 text-text-muted" />
        </button>

        {/* Header Visual */}
        <div className="relative overflow-hidden">
          <div className="aspect-[16/9] overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              {item.aromaImages.map((img, i) => (
                <span key={i} className="text-3xl drop-shadow-lg">{img}</span>
              ))}
            </div>
            <h2 className="font-serif text-2xl text-gradient">{item.name}</h2>
            <p className="text-xs text-text-muted tracking-wider uppercase mt-2">{categoryLabels[item.category]} • {item.gender}</p>
            <p className="text-lg font-semibold text-accent mt-3">{item.price}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Story */}
          <div>
            <h4 className="text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Cerita</h4>
            <p className="text-sm text-text-secondary leading-relaxed italic">"{item.story}"</p>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-xs font-medium text-text-muted mb-3 tracking-wider uppercase">Piramida Aroma</h4>
            <div className="space-y-2">
              <div className="p-3 bg-surface-elevated border border-border-light">
                <span className="text-[10px] text-accent tracking-widest uppercase font-medium">Top Notes</span>
                <p className="text-sm text-text-primary mt-1">{item.notes.top.join(' • ')}</p>
              </div>
              <div className="p-3 bg-surface-elevated border border-border-light">
                <span className="text-[10px] text-accent tracking-widest uppercase font-medium">Middle Notes</span>
                <p className="text-sm text-text-primary mt-1">{item.notes.middle.join(' • ')}</p>
              </div>
              <div className="p-3 bg-surface-elevated border border-border-light">
                <span className="text-[10px] text-accent tracking-widest uppercase font-medium">Base Notes</span>
                <p className="text-sm text-text-primary mt-1">{item.notes.base.join(' • ')}</p>
              </div>
            </div>
          </div>

          {/* Mood & Occasion */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Mood</h4>
              <div className="flex flex-wrap gap-1.5">
                {item.mood.map((m) => (
                  <span key={m} className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-[11px] text-accent font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Occasion</h4>
              <div className="flex flex-wrap gap-1.5">
                {item.occasion.map((o) => (
                  <span key={o} className="px-2.5 py-1 bg-surface-elevated border border-border-light text-[11px] text-text-secondary">
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Spotify */}
          {item.spotifyUrl && (
            <div>
              <h4 className="text-xs font-medium text-text-muted mb-2 tracking-wider uppercase flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-green-400" />
                Vibe Song
              </h4>
              <iframe
                src={`https://open.spotify.com/embed/track/${item.spotifyUrl.split('/track/')[1]?.split('?')[0]}?theme=0`}
                width="100%"
                height="80"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-0 rounded"
                title={`Spotify - ${item.name}`}
              />
            </div>
          )}

          {/* Shop Links */}
          <div>
            <h4 className="text-xs font-medium text-text-muted mb-3 tracking-wider uppercase">Pesan Sekarang</h4>
            <div className="grid grid-cols-3 gap-2">
              {item.shopLinks.shopee && (
                <a
                  href={item.shopLinks.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-3 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-medium hover:bg-orange-500/20 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Shopee
                </a>
              )}
              {item.shopLinks.tokopedia && (
                <a
                  href={item.shopLinks.tokopedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Tokped
                </a>
              )}
              {item.shopLinks.tiktok && (
                <a
                  href={item.shopLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-3 bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-medium hover:bg-pink-500/20 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  TikTok
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
