import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, X, MapPin, Calendar, Image, Heart } from 'lucide-react'
import { useMomentStore, usePerfumeStore } from '../store/useStore'
import type { Moment } from '../types'
import { moodLabels, moodColors } from '../types'

gsap.registerPlugin(ScrollTrigger)

const moods: Moment['mood'][] = ['romantic', 'adventurous', 'peaceful', 'energetic', 'nostalgic', 'confident']

const moodEmoji: Record<Moment['mood'], string> = {
  romantic: '💕',
  adventurous: '🌍',
  peaceful: '🌿',
  energetic: '⚡',
  nostalgic: '🌅',
  confident: '✨',
}

export default function Moments() {
  const { moments, addMoment, deleteMoment } = useMomentStore()
  const { perfumes } = usePerfumeStore()
  const [showForm, setShowForm] = useState(false)
  const [selectedMood, setSelectedMood] = useState<Moment['mood'] | 'all'>('all')
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredMoments = moments.filter(
    (m) => selectedMood === 'all' || m.mood === selectedMood
  )

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
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.moment-card')
      gsap.fromTo(cards,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
      )
    }
  }, [filteredMoments.length, selectedMood])

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="page-header text-center mb-10 md:mb-14">
          <span className="text-xs font-medium text-rose tracking-widest uppercase">Galeri</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-deep-brown font-light mt-3">
            Momen <span className="italic text-rose">Berharga</span>
          </h1>
          <p className="mt-4 text-muted max-w-md mx-auto text-sm md:text-base">
            Abadikan kenangan-kenangan indah yang telah kamu lalui bersama wangi favoritmu.
          </p>
        </div>

        {/* Mood Filter & Add */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => setSelectedMood('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                selectedMood === 'all'
                  ? 'bg-charcoal text-cream shadow-md'
                  : 'bg-white/60 text-muted hover:bg-white hover:shadow-sm border border-gold-light/20'
              }`}
            >
              Semua
            </button>
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  selectedMood === mood
                    ? 'bg-charcoal text-cream shadow-md'
                    : 'bg-white/60 text-muted hover:bg-white hover:shadow-sm border border-gold-light/20'
                }`}
              >
                <span>{moodEmoji[mood]}</span>
                {moodLabels[mood]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-rose text-white rounded-full text-sm font-medium hover:bg-rose/80 transition-all duration-300 hover:shadow-lg hover:shadow-rose/20 hover:scale-[1.02] flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Momen
          </button>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filteredMoments.length === 0 ? (
            <div className="col-span-full text-center py-24 break-inside-avoid">
              <div className="w-20 h-20 mx-auto rounded-full bg-rose/10 flex items-center justify-center mb-5">
                <Heart className="w-9 h-9 text-rose/50" />
              </div>
              <p className="text-muted font-serif text-xl">Belum ada momen yang diabadikan</p>
              <p className="text-sm text-muted/60 mt-2 mb-6">Mulai abadikan momen-momen indahmu</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose text-white rounded-full text-sm font-medium hover:bg-rose/80 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Abadikan Momen Pertama
              </button>
            </div>
          ) : (
            filteredMoments.map((moment) => (
              <MomentCard
                key={moment.id}
                moment={moment}
                perfumeName={perfumes.find((p) => p.id === moment.perfumeId)?.name}
                onDelete={deleteMoment}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <AddMomentModal
          onClose={() => setShowForm(false)}
          onAdd={addMoment}
          perfumes={perfumes}
        />
      )}
    </div>
  )
}

function MomentCard({
  moment,
  perfumeName,
  onDelete,
}: {
  moment: Moment
  perfumeName?: string
  onDelete: (id: string) => void
}) {
  return (
    <div className="moment-card break-inside-avoid group relative rounded-2xl bg-white/80 backdrop-blur-sm border border-gold-light/20 overflow-hidden hover:border-rose/20 hover:shadow-xl hover:shadow-rose/5 transition-all duration-500">
      {/* Images */}
      {moment.images.length > 0 && (
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
          <img
            src={moment.images[0]}
            alt={moment.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {moment.images.length > 1 && (
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-charcoal/70 backdrop-blur-sm rounded-full text-[11px] text-cream font-medium">
              +{moment.images.length - 1} foto
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        {/* Mood Badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-medium text-white flex items-center gap-1.5"
            style={{ backgroundColor: moodColors[moment.mood] }}
          >
            {moodEmoji[moment.mood]} {moodLabels[moment.mood]}
          </span>
          <button
            onClick={() => onDelete(moment.id)}
            className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-rose/10 text-rose transition-all duration-200"
            aria-label="Hapus momen"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <h3 className="font-serif text-lg text-deep-brown leading-tight">{moment.title}</h3>
        <p className="text-sm text-muted mt-2 leading-relaxed line-clamp-3">{moment.description}</p>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-muted/60">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(moment.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          {moment.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {moment.location}
            </span>
          )}
        </div>

        {/* Perfume tag */}
        {perfumeName && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-gold/8 border border-gold/15 rounded-full text-[11px] text-gold font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {perfumeName}
          </div>
        )}
      </div>
    </div>
  )
}

function AddMomentModal({
  onClose,
  onAdd,
  perfumes,
}: {
  onClose: () => void
  onAdd: (m: Omit<Moment, 'id'>) => void
  perfumes: { id: string; name: string }[]
}) {
  const [form, setForm] = useState({
    perfumeId: perfumes[0]?.id || '',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    mood: 'peaceful' as Moment['mood'],
    imageUrl: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      perfumeId: form.perfumeId,
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      mood: form.mood,
      images: form.imageUrl ? [form.imageUrl] : [],
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-cream rounded-3xl shadow-2xl p-6 sm:p-8 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-charcoal/5 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5 text-muted" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-medium text-rose tracking-widest uppercase">Abadikan</span>
          <h2 className="font-serif text-2xl text-deep-brown mt-1">Momen Baru</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-muted mb-2">Judul Momen *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Dinner pertama bersama dia"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">Parfum yang Dipakai</label>
            <select
              value={form.perfumeId}
              onChange={(e) => setForm({ ...form, perfumeId: e.target.value })}
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
            >
              <option value="">— Pilih parfum —</option>
              {perfumes.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">Ceritakan Momennya *</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Apa yang terjadi? Bagaimana perasaanmu?"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-2">Tanggal</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-2">Lokasi</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Bandung"
                className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-xs font-medium text-muted mb-2">Mood</label>
            <div className="grid grid-cols-3 gap-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setForm({ ...form, mood })}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 justify-center ${
                    form.mood === mood
                      ? 'ring-2 ring-rose bg-rose/10 text-deep-brown scale-[1.02]'
                      : 'bg-white/60 text-muted hover:bg-white border border-gold-light/20'
                  }`}
                >
                  <span>{moodEmoji[mood]}</span>
                  {moodLabels[mood]}
                </button>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-medium text-muted mb-2">
              <span className="flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5" />
                URL Foto (opsional)
              </span>
            </label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://example.com/foto.jpg"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-rose text-cream rounded-xl text-sm font-medium hover:bg-rose/80 transition-all duration-300 hover:shadow-lg mt-2"
          >
            Simpan Momen
          </button>
        </form>
      </div>
    </div>
  )
}
