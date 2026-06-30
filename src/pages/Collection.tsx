import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Star, X, Droplets, Search, Filter } from 'lucide-react'
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
  const headerRef = useRef<HTMLDivElement>(null)
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
    <div className="min-h-screen pt-24 md:pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="page-header text-center mb-10 md:mb-14">
          <span className="text-xs font-medium text-gold tracking-widest uppercase">Koleksi</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-deep-brown font-light mt-3">
            Wangi <span className="italic text-gold">Favoritmu</span>
          </h1>
          <p className="mt-4 text-muted max-w-md mx-auto text-sm md:text-base">
            Setiap parfum memiliki cerita. Tambahkan koleksi Uchi Parfume yang telah menemanimu.
          </p>
        </div>

        {/* Controls */}
        <div className="controls-bar space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
              <input
                type="text"
                placeholder="Cari parfum..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gold-light/30 rounded-full text-sm text-deep-brown placeholder:text-muted/40 focus:outline-none focus:border-gold/50 focus:bg-white focus:shadow-md focus:shadow-gold/5 transition-all duration-300"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-charcoal text-cream rounded-full text-sm font-medium hover:bg-deep-brown transition-all duration-300 hover:shadow-lg hover:shadow-charcoal/20 hover:scale-[1.02] flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              Tambah Parfum
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <Filter className="w-4 h-4 text-muted/50 mr-1" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-charcoal text-cream shadow-md'
                  : 'bg-white/60 text-muted hover:bg-white hover:shadow-sm border border-gold-light/20'
              }`}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  filter === cat
                    ? 'bg-charcoal text-cream shadow-md'
                    : 'bg-white/60 text-muted hover:bg-white hover:shadow-sm border border-gold-light/20'
                }`}
              >
                <span>{categoryEmoji[cat]}</span>
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredPerfumes.length === 0 ? (
            <div className="col-span-full text-center py-24">
              <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-5">
                <Droplets className="w-9 h-9 text-gold/50" />
              </div>
              <p className="text-muted font-serif text-xl">Belum ada parfum dalam koleksimu</p>
              <p className="text-sm text-muted/60 mt-2 mb-6">Mulai tambahkan koleksi Uchi favoritmu</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-full text-sm font-medium hover:bg-warm-brown transition-colors"
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
    <div className="perfume-card group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gold-light/20 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/10 transition-all duration-500 hover:-translate-y-1">
      {/* Delete */}
      <button
        onClick={() => onDelete(perfume.id)}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 rounded-full bg-rose/10 text-rose hover:bg-rose/20 transition-all duration-200"
        aria-label="Hapus parfum"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Perfume visual */}
      <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-gold/15 to-rose/10 border border-gold-light/20 flex items-center justify-center shadow-inner">
        <span className="text-2xl">{categoryEmoji[perfume.category]}</span>
      </div>

      <h3 className="font-serif text-xl text-deep-brown text-center leading-tight">{perfume.name}</h3>
      <p className="text-xs text-muted text-center mt-1.5">{perfume.brand}</p>

      {/* Category Badge */}
      <div className="flex justify-center mt-3">
        <span className="px-3 py-1 bg-gold/8 border border-gold/15 text-gold text-[11px] font-medium rounded-full">
          {categoryLabels[perfume.category]}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-1 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 transition-colors ${star <= perfume.rating ? 'text-gold fill-gold' : 'text-gold-light/30'}`}
          />
        ))}
      </div>

      {/* Notes preview */}
      {perfume.notes.top.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
          {perfume.notes.top.slice(0, 3).map((note) => (
            <span key={note} className="px-2.5 py-0.5 bg-cream-dark/60 text-[11px] text-muted rounded-full">
              {note}
            </span>
          ))}
          {perfume.notes.top.length > 3 && (
            <span className="px-2 py-0.5 text-[11px] text-muted/50">
              +{perfume.notes.top.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Date */}
      <p className="mt-5 text-[11px] text-muted/50 text-center border-t border-gold-light/10 pt-4">
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
          <span className="text-xs font-medium text-gold tracking-widest uppercase">Tambah</span>
          <h2 className="font-serif text-2xl text-deep-brown mt-1">Parfum Baru</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-muted mb-2">Nama Parfum *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Midnight Blossom"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white focus:shadow-sm transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-2">Brand</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-2">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Perfume['category'] })}
                className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{categoryEmoji[cat]} {categoryLabels[cat]}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">Top Notes <span className="text-muted/40">(pisahkan koma)</span></label>
            <input
              type="text"
              value={form.topNotes}
              onChange={(e) => setForm({ ...form, topNotes: e.target.value })}
              placeholder="Bergamot, Lemon, Pink Pepper"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">Middle Notes <span className="text-muted/40">(pisahkan koma)</span></label>
            <input
              type="text"
              value={form.middleNotes}
              onChange={(e) => setForm({ ...form, middleNotes: e.target.value })}
              placeholder="Rose, Jasmine, Iris"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">Base Notes <span className="text-muted/40">(pisahkan koma)</span></label>
            <input
              type="text"
              value={form.baseNotes}
              onChange={(e) => setForm({ ...form, baseNotes: e.target.value })}
              placeholder="Musk, Sandalwood, Vanilla"
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-2">Rating</label>
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
                        star <= form.rating ? 'text-gold fill-gold' : 'text-gold-light/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-2">Tanggal Beli</label>
              <input
                type="date"
                value={form.purchaseDate}
                onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">Deskripsi <span className="text-muted/40">(opsional)</span></label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Ceritakan pengalamanmu dengan parfum ini..."
              className="w-full px-4 py-3.5 bg-white/70 border border-gold-light/30 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-charcoal text-cream rounded-xl text-sm font-medium hover:bg-deep-brown transition-all duration-300 hover:shadow-lg mt-2"
          >
            Simpan Parfum
          </button>
        </form>
      </div>
    </div>
  )
}
