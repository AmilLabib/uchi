import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Plus, X, BookOpen, Sun, Cloud, CloudRain, Snowflake, Wind } from 'lucide-react'
import { useJournalStore, usePerfumeStore } from '../store/useStore'
import type { JournalEntry } from '../types'

const weatherOptions = [
  { value: 'sunny', label: 'Cerah', icon: Sun, emoji: '☀️' },
  { value: 'cloudy', label: 'Berawan', icon: Cloud, emoji: '☁️' },
  { value: 'rainy', label: 'Hujan', icon: CloudRain, emoji: '🌧️' },
  { value: 'cold', label: 'Dingin', icon: Snowflake, emoji: '❄️' },
  { value: 'windy', label: 'Berangin', icon: Wind, emoji: '💨' },
]

export default function Journal() {
  const { entries, addEntry, deleteEntry } = useJournalStore()
  const { perfumes } = usePerfumeStore()
  const [showForm, setShowForm] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

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
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.journal-entry')
      gsap.fromTo(items,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      )
    }
  }, [entries.length])

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="page-header text-center mb-10 md:mb-14">
          <span className="text-xs font-medium text-sage tracking-widest uppercase">Catatan</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-deep-brown font-light mt-3">
            Scent <span className="italic text-sage">Journal</span>
          </h1>
          <p className="mt-4 text-muted max-w-md mx-auto text-sm md:text-base">
            Catatan harian wangimu. Rekam setiap detail — dari mood, cuaca, hingga ketahanan parfum.
          </p>
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage/80 transition-all duration-300 hover:shadow-lg hover:shadow-sage/20 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            Tulis Jurnal
          </button>
        </div>

        {/* Entries */}
        <div ref={listRef} className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 mx-auto rounded-full bg-sage/10 flex items-center justify-center mb-5">
                <BookOpen className="w-9 h-9 text-sage/50" />
              </div>
              <p className="text-muted font-serif text-xl">Jurnal wangimu masih kosong</p>
              <p className="text-sm text-muted/60 mt-2 mb-6">Mulai tulis pengalaman aromamu hari ini</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage/80 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tulis Jurnal Pertama
              </button>
            </div>
          ) : (
            entries.map((entry) => (
              <JournalCard
                key={entry.id}
                entry={entry}
                perfumeName={perfumes.find((p) => p.id === entry.perfumeId)?.name}
                onDelete={deleteEntry}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <AddJournalModal
          onClose={() => setShowForm(false)}
          onAdd={addEntry}
          perfumes={perfumes}
        />
      )}
    </div>
  )
}

function JournalCard({
  entry,
  perfumeName,
  onDelete,
}: {
  entry: JournalEntry
  perfumeName?: string
  onDelete: (id: string) => void
}) {
  const weatherItem = weatherOptions.find((w) => w.value === entry.weather)

  return (
    <div className="journal-entry group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gold-light/20 hover:border-sage/20 hover:shadow-lg hover:shadow-sage/5 transition-all duration-500">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Date & Weather */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-xs font-medium text-muted bg-cream-dark/60 px-3 py-1.5 rounded-full">
              {new Date(entry.date).toLocaleDateString('id-ID', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            {weatherItem && (
              <span className="flex items-center gap-1 text-xs text-muted bg-white/60 px-2.5 py-1.5 rounded-full border border-gold-light/15">
                {weatherItem.emoji} {weatherItem.label}
              </span>
            )}
            {entry.mood && (
              <span className="text-xs text-rose bg-rose/8 px-2.5 py-1.5 rounded-full font-medium">
                {entry.mood}
              </span>
            )}
          </div>

          {/* Occasion */}
          <h3 className="font-serif text-lg text-deep-brown leading-tight">{entry.occasion}</h3>

          {/* Notes */}
          {entry.notes && (
            <p className="text-sm text-muted mt-2 leading-relaxed">{entry.notes}</p>
          )}

          {/* Metrics */}
          <div className="mt-4 flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-muted font-medium uppercase tracking-wider">Longevity</span>
              <div className="flex gap-[3px]">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-sm transition-colors ${
                      i < entry.longevity ? 'bg-gold' : 'bg-gold-light/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-gold font-semibold">{entry.longevity}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-muted font-medium uppercase tracking-wider">Sillage</span>
              <div className="flex gap-[3px]">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-sm transition-colors ${
                      i < entry.sillage ? 'bg-sage' : 'bg-sage/15'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-sage font-semibold">{entry.sillage}</span>
            </div>
          </div>

          {/* Perfume tag */}
          {perfumeName && (
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-gold/8 border border-gold/15 rounded-full text-[11px] text-gold font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {perfumeName}
            </div>
          )}
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(entry.id)}
          className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-rose/10 text-rose transition-all duration-200 flex-shrink-0"
          aria-label="Hapus jurnal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function AddJournalModal({
  onClose,
  onAdd,
  perfumes,
}: {
  onClose: () => void
  onAdd: (e: Omit<JournalEntry, 'id'>) => void
  perfumes: { id: string; name: string }[]
}) {
  const [form, setForm] = useState({
    perfumeId: perfumes[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    occasion: '',
    weather: 'sunny',
    mood: '',
    longevity: 7,
    sillage: 6,
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      perfumeId: form.perfumeId,
      date: form.date,
      occasion: form.occasion,
      weather: form.weather,
      mood: form.mood,
      longevity: form.longevity,
      sillage: form.sillage,
      notes: form.notes,
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
          <span className="text-xs font-medium text-sage tracking-widest uppercase">Catatan</span>
          <h2 className="font-serif text-2xl text-deep-brown mt-1">Jurnal Hari Ini</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-xs font-medium text-muted mb-2">Parfum</label>
              <select
                value={form.perfumeId}
                onChange={(e) => setForm({ ...form, perfumeId: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
              >
                <option value="">— Pilih —</option>
                {perfumes.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">Occasion *</label>
            <input
              type="text"
              required
              value={form.occasion}
              onChange={(e) => setForm({ ...form, occasion: e.target.value })}
              placeholder="e.g. Meeting kantor, Date night, Hangout"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Weather */}
          <div>
            <label className="block text-xs font-medium text-muted mb-2">Cuaca</label>
            <div className="flex gap-2 flex-wrap">
              {weatherOptions.map((w) => (
                <button
                  key={w.value}
                  type="button"
                  onClick={() => setForm({ ...form, weather: w.value })}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    form.weather === w.value
                      ? 'ring-2 ring-sage bg-sage/10 text-deep-brown scale-[1.02]'
                      : 'bg-white/60 text-muted hover:bg-white border border-gold-light/20'
                  }`}
                >
                  {w.emoji} {w.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">Mood</label>
            <input
              type="text"
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
              placeholder="e.g. Percaya diri, Rileks, Romantis"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-muted mb-3">
                <span>Longevity</span>
                <span className="text-gold font-semibold text-sm">{form.longevity}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={form.longevity}
                onChange={(e) => setForm({ ...form, longevity: parseInt(e.target.value) })}
                className="w-full accent-gold h-2 rounded-full"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-muted mb-3">
                <span>Sillage</span>
                <span className="text-sage font-semibold text-sm">{form.sillage}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={form.sillage}
                onChange={(e) => setForm({ ...form, sillage: parseInt(e.target.value) })}
                className="w-full accent-sage h-2 rounded-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">Catatan</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              placeholder="Bagaimana performa parfumnya hari ini?"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-sage text-cream rounded-xl text-sm font-medium hover:bg-sage/80 transition-all duration-300 hover:shadow-lg mt-2"
          >
            Simpan Jurnal
          </button>
        </form>
      </div>
    </div>
  )
}
