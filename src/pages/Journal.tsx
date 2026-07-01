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
    <div className="min-h-screen pt-28 md:pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="page-header text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Notes</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary font-medium mt-4">
            Scent <span className="italic text-gradient">Journal</span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-md mx-auto text-sm md:text-base">
            Catatan harian wangimu. Rekam setiap detail — dari mood, cuaca, hingga ketahanan parfum.
          </p>
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Tulis Jurnal
          </button>
        </div>

        {/* Entries */}
        <div ref={listRef} className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-28">
              <div className="w-20 h-20 mx-auto border border-accent/20 flex items-center justify-center mb-6">
                <BookOpen className="w-9 h-9 text-accent/40" />
              </div>
              <p className="text-text-secondary font-serif text-xl">Jurnal wangimu masih kosong</p>
              <p className="text-sm text-text-muted mt-2 mb-8">Mulai tulis pengalaman aromamu hari ini</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-colors"
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
    <div className="journal-entry group relative p-6 md:p-8 bg-surface-card border border-border hover:border-accent/20 hover-glow transition-all duration-500">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Date & Weather */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-medium text-text-muted bg-surface-elevated px-3 py-1.5 border border-border-light">
              {new Date(entry.date).toLocaleDateString('id-ID', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            {weatherItem && (
              <span className="flex items-center gap-1 text-xs text-text-muted bg-surface-elevated px-2.5 py-1.5 border border-border-light">
                {weatherItem.emoji} {weatherItem.label}
              </span>
            )}
            {entry.mood && (
              <span className="text-xs text-accent bg-accent/10 px-2.5 py-1.5 border border-accent/20 font-medium">
                {entry.mood}
              </span>
            )}
          </div>

          {/* Occasion */}
          <h3 className="font-serif text-lg text-text-primary leading-tight group-hover:text-accent transition-colors duration-300">
            {entry.occasion}
          </h3>

          {/* Notes */}
          {entry.notes && (
            <p className="text-sm text-text-secondary mt-3 leading-relaxed">{entry.notes}</p>
          )}

          {/* Metrics */}
          <div className="mt-5 flex items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Longevity</span>
              <div className="flex gap-[3px]">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 transition-colors ${
                      i < entry.longevity ? 'bg-accent' : 'bg-surface-elevated border border-border-light'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-accent font-semibold">{entry.longevity}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Sillage</span>
              <div className="flex gap-[3px]">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 transition-colors ${
                      i < entry.sillage ? 'bg-accent-dark' : 'bg-surface-elevated border border-border-light'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-accent-dark font-semibold">{entry.sillage}</span>
            </div>
          </div>

          {/* Perfume tag */}
          {perfumeName && (
            <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 border border-accent/20 text-[11px] text-accent font-medium tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {perfumeName}
            </div>
          )}
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(entry.id)}
          className="opacity-0 group-hover:opacity-100 p-2 border border-border hover:border-rose/40 text-text-muted hover:text-rose transition-all duration-200 flex-shrink-0"
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-card border border-border shadow-2xl p-6 sm:p-8 animate-fade-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 hover:bg-surface-elevated transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="mb-8">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Write</span>
          <h2 className="font-serif text-2xl text-text-primary mt-2">Jurnal Hari Ini</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Tanggal</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Parfum</label>
              <select
                value={form.perfumeId}
                onChange={(e) => setForm({ ...form, perfumeId: e.target.value })}
                className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all duration-200"
              >
                <option value="">— Pilih —</option>
                {perfumes.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Occasion *</label>
            <input
              type="text"
              required
              value={form.occasion}
              onChange={(e) => setForm({ ...form, occasion: e.target.value })}
              placeholder="e.g. Meeting kantor, Date night, Hangout"
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all duration-200"
            />
          </div>

          {/* Weather */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Cuaca</label>
            <div className="flex gap-2 flex-wrap">
              {weatherOptions.map((w) => (
                <button
                  key={w.value}
                  type="button"
                  onClick={() => setForm({ ...form, weather: w.value })}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium transition-all duration-200 ${
                    form.weather === w.value
                      ? 'border-2 border-accent bg-accent/10 text-accent'
                      : 'bg-surface-elevated border border-border text-text-secondary hover:border-accent/30'
                  }`}
                >
                  {w.emoji} {w.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Mood</label>
            <input
              type="text"
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
              placeholder="e.g. Percaya diri, Rileks, Romantis"
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all duration-200"
            />
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-text-muted mb-3 tracking-wider uppercase">
                <span>Longevity</span>
                <span className="text-accent font-semibold text-sm">{form.longevity}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={form.longevity}
                onChange={(e) => setForm({ ...form, longevity: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-text-muted mb-3 tracking-wider uppercase">
                <span>Sillage</span>
                <span className="text-accent font-semibold text-sm">{form.sillage}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={form.sillage}
                onChange={(e) => setForm({ ...form, sillage: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Catatan</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              placeholder="Bagaimana performa parfumnya hari ini?"
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-all duration-300 mt-2"
          >
            Simpan Jurnal
          </button>
        </form>
      </div>
    </div>
  )
}
