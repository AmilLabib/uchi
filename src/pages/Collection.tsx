import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Star, X, Search, Filter, Droplets } from 'lucide-react'
import { usePerfumeStore } from '../store/useStore'
import type { Perfume } from '../types'
import { categoryLabels } from '../types'

gsap.registerPlugin(ScrollTrigger)

const categories: Perfume['category'][] = ['fresh', 'floral', 'woody', 'oriental', 'citrus', 'gourmand']

const categoryEmoji: Record<Perfume['category'], string> = {
  fresh: '🌊',
  floral: '🌸',
  woody: '🌲',
  oriental: '🕌',
  citrus: '🍋',
  gourmand: '🍫',
}

export default function Collection() {
  const { perfumes, addPerfume, deletePerfume } = usePerfumeStore()
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<Perfume['category'] | 'all'>('all')
  const [search, setSearch] = useState('')
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredPerfumes = perfumes.filter((p) => {
    const matchesCategory = filter === 'all' || p.category === filter
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      gsap.fromTo('.controls-bar',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.perfume-card')
      gsap.fromTo(cards,
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      )
    }
  }, [filteredPerfumes.length, filter, search])

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="page-header text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Collection</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary font-medium mt-4">
            Wangi <span className="italic text-gradient">Favoritmu</span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-md mx-auto text-sm md:text-base">
            Setiap parfum memiliki cerita. Tambahkan koleksi Uchi Parfume yang telah menemanimu.
          </p>
        </div>

        {/* Controls */}
        <div className="controls-bar space-y-5 mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Cari parfum..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-surface-card border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all duration-300"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-all duration-300 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              Tambah Parfum
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <Filter className="w-4 h-4 text-text-muted mr-1" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-accent text-primary'
                  : 'bg-surface-card border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
              }`}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                  filter === cat
                    ? 'bg-accent text-primary'
                    : 'bg-surface-card border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
                }`}
              >
                <span>{categoryEmoji[cat]}</span>
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {filteredPerfumes.length === 0 ? (
            <div className="col-span-full bg-primary text-center py-28">
              <div className="w-20 h-20 mx-auto border border-accent/20 flex items-center justify-center mb-6">
                <Droplets className="w-9 h-9 text-accent/40" />
              </div>
              <p className="text-text-secondary font-serif text-xl">Belum ada parfum dalam koleksimu</p>
              <p className="text-sm text-text-muted mt-2 mb-8">Mulai tambahkan koleksi Uchi favoritmu</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Parfum Pertama
              </button>
            </div>
          ) : (
            filteredPerfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} onDelete={deletePerfume} />
            ))
          )}
        </div>
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <AddPerfumeModal onClose={() => setShowForm(false)} onAdd={addPerfume} />
      )}
    </div>
  )
}

function PerfumeCard({ perfume, onDelete }: { perfume: Perfume; onDelete: (id: string) => void }) {
  return (
    <div className="perfume-card group relative p-8 bg-primary hover:bg-surface-card transition-all duration-500">
      {/* Delete */}
      <button
        onClick={() => onDelete(perfume.id)}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 border border-border hover:border-rose/40 text-text-muted hover:text-rose transition-all duration-200"
        aria-label="Hapus parfum"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Perfume visual */}
      <div className="w-16 h-16 mx-auto mb-6 border border-accent/20 flex items-center justify-center group-hover:border-accent/40 transition-all duration-300">
        <span className="text-2xl">{categoryEmoji[perfume.category]}</span>
      </div>

      <h3 className="font-serif text-xl text-text-primary text-center leading-tight group-hover:text-accent transition-colors duration-300">
        {perfume.name}
      </h3>
      <p className="text-xs text-text-muted text-center mt-2 tracking-wider uppercase">{perfume.brand}</p>

      {/* Category Badge */}
      <div className="flex justify-center mt-4">
        <span className="px-3 py-1 border border-accent/20 text-accent text-[11px] font-medium tracking-wider uppercase">
          {categoryLabels[perfume.category]}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-1 mt-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 transition-colors ${star <= perfume.rating ? 'text-accent fill-accent' : 'text-border'}`}
          />
        ))}
      </div>

      {/* Notes preview */}
      {perfume.notes.top.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5 justify-center">
          {perfume.notes.top.slice(0, 3).map((note) => (
            <span key={note} className="px-2.5 py-0.5 bg-surface-elevated text-[11px] text-text-muted border border-border-light">
              {note}
            </span>
          ))}
        </div>
      )}

      {/* Date */}
      <p className="mt-6 text-[11px] text-text-muted text-center border-t border-border pt-5">
        Dibeli {new Date(perfume.purchaseDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
      </p>
    </div>
  )
}

function AddPerfumeModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: Omit<Perfume, 'id'>) => void }) {
  const [form, setForm] = useState({
    name: '',
    brand: 'Uchi Parfume',
    category: 'fresh' as Perfume['category'],
    topNotes: '',
    middleNotes: '',
    baseNotes: '',
    rating: 5,
    purchaseDate: new Date().toISOString().split('T')[0],
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name: form.name,
      brand: form.brand,
      category: form.category,
      notes: {
        top: form.topNotes.split(',').map((n) => n.trim()).filter(Boolean),
        middle: form.middleNotes.split(',').map((n) => n.trim()).filter(Boolean),
        base: form.baseNotes.split(',').map((n) => n.trim()).filter(Boolean),
      },
      rating: form.rating,
      purchaseDate: form.purchaseDate,
      description: form.description,
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
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Add New</span>
          <h2 className="font-serif text-2xl text-text-primary mt-2">Parfum Baru</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Nama Parfum *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Midnight Blossom"
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Brand</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Perfume['category'] })}
                className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all duration-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{categoryEmoji[cat]} {categoryLabels[cat]}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Top Notes <span className="text-text-muted/40">(pisahkan koma)</span></label>
            <input
              type="text"
              value={form.topNotes}
              onChange={(e) => setForm({ ...form, topNotes: e.target.value })}
              placeholder="Bergamot, Lemon, Pink Pepper"
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Middle Notes <span className="text-text-muted/40">(pisahkan koma)</span></label>
            <input
              type="text"
              value={form.middleNotes}
              onChange={(e) => setForm({ ...form, middleNotes: e.target.value })}
              placeholder="Rose, Jasmine, Iris"
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Base Notes <span className="text-text-muted/40">(pisahkan koma)</span></label>
            <input
              type="text"
              value={form.baseNotes}
              onChange={(e) => setForm({ ...form, baseNotes: e.target.value })}
              placeholder="Musk, Sandalwood, Vanilla"
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Rating</label>
              <div className="flex items-center gap-1.5 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    className="p-0.5 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        star <= form.rating ? 'text-accent fill-accent' : 'text-border'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Tanggal Beli</label>
              <input
                type="date"
                value={form.purchaseDate}
                onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
                className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Deskripsi <span className="text-text-muted/40">(opsional)</span></label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Ceritakan pengalamanmu dengan parfum ini..."
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-all duration-300 mt-2"
          >
            Simpan Parfum
          </button>
        </form>
      </div>
    </div>
  )
}
