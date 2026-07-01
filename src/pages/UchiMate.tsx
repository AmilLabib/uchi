import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { User, Mail, Phone, Sun, Moon, ShoppingBag, Plus, X, Trash2, Save, Check } from 'lucide-react'
import { useProfileStore } from '../store/useProfileStore'
import { useThemeStore } from '../store/useThemeStore'
import type { PurchaseRecord } from '../types'

const platforms: { value: PurchaseRecord['platform']; label: string; emoji: string }[] = [
  { value: 'shopee', label: 'Shopee', emoji: '🛒' },
  { value: 'tokopedia', label: 'Tokopedia', emoji: '🟢' },
  { value: 'tiktok', label: 'TikTok Shop', emoji: '🎵' },
  { value: 'offline', label: 'Offline Store', emoji: '🏪' },
]

export default function UchiMate() {
  const { profile, updateProfile, addPurchase, deletePurchase } = useProfileStore()
  const { theme, toggleTheme } = useThemeStore()
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  })

  useEffect(() => {
    setForm({ name: profile.name, email: profile.email, phone: profile.phone })
  }, [profile.name, profile.email, profile.phone])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      gsap.fromTo('.settings-section',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  const handleSaveProfile = () => {
    updateProfile({
      name: form.name,
      email: form.email,
      phone: form.phone,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="page-header text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Settings</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary font-medium mt-4">
            Uchi<span className="italic text-gradient">Mate</span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-md mx-auto text-sm md:text-base">
            Personalisasi pengalaman UCHI-mu. Atur profil, tema, dan riwayat pembelian.
          </p>
        </div>

        {/* Profile Section */}
        <div className="settings-section space-y-6">
          <div className="p-6 md:p-8 bg-surface-card border border-border">
            <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-6">Profil</h3>

            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 border-2 border-accent/30 rounded-full flex items-center justify-center bg-surface-elevated flex-shrink-0">
                {profile.name ? (
                  <span className="text-xl font-serif font-medium text-accent">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-7 h-7 text-text-muted" />
                )}
              </div>
              <div>
                <p className="text-lg font-serif text-text-primary">{profile.name || 'Nama belum diisi'}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  Member sejak {new Date(profile.joinDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Nama</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama lengkapmu"
                  className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">
                  <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">
                  <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> WhatsApp</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="mt-6 flex items-center gap-2 px-6 py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-all"
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Tersimpan!' : 'Simpan Profil'}
            </button>
          </div>

          {/* Theme Section */}
          <div className="settings-section p-6 md:p-8 bg-surface-card border border-border">
            <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-6">Tampilan</h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Tema Aplikasi</p>
                <p className="text-xs text-text-muted mt-1">
                  Saat ini: {theme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-16 h-9 rounded-full bg-surface-elevated border border-border transition-all duration-300 hover:border-accent/30"
                aria-label="Toggle theme"
              >
                <div
                  className={`absolute top-1 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    theme === 'dark'
                      ? 'left-1 bg-primary-lighter border border-border'
                      : 'left-[1.75rem] bg-accent'
                  }`}
                >
                  {theme === 'dark' ? (
                    <Moon className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Purchase History */}
          <div className="settings-section p-6 md:p-8 bg-surface-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Riwayat Pembelian</h3>
              <button
                onClick={() => setShowPurchaseForm(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-accent text-primary text-xs font-semibold tracking-wider uppercase hover:bg-accent-light transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah
              </button>
            </div>

            {profile.purchaseHistory.length === 0 ? (
              <div className="text-center py-10 border border-border-light bg-surface-elevated">
                <ShoppingBag className="w-8 h-8 text-text-muted/30 mx-auto mb-2" />
                <p className="text-xs text-text-muted">Belum ada riwayat pembelian</p>
              </div>
            ) : (
              <div className="space-y-2">
                {profile.purchaseHistory.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between p-4 bg-surface-elevated border border-border-light group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {platforms.find((p) => p.value === purchase.platform)?.emoji || '📦'}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{purchase.perfumeName}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-text-muted">
                            {new Date(purchase.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="text-[11px] text-text-muted">•</span>
                          <span className="text-[11px] text-accent font-medium">{purchase.price}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePurchase(purchase.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 border border-border hover:border-rose/40 text-text-muted hover:text-rose transition-all"
                      aria-label="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Purchase Modal */}
      {showPurchaseForm && (
        <AddPurchaseModal
          onClose={() => setShowPurchaseForm(false)}
          onAdd={addPurchase}
        />
      )}
    </div>
  )
}

function AddPurchaseModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (p: Omit<PurchaseRecord, 'id'>) => void
}) {
  const [form, setForm] = useState({
    perfumeName: '',
    date: new Date().toISOString().split('T')[0],
    price: '',
    platform: 'shopee' as PurchaseRecord['platform'],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      perfumeName: form.perfumeName,
      date: form.date,
      price: form.price,
      platform: form.platform,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-surface-card border border-border shadow-2xl p-6 animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-surface-elevated transition-colors" aria-label="Tutup">
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Add</span>
          <h3 className="font-serif text-xl text-text-primary mt-2">Pembelian Baru</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Nama Parfum *</label>
            <input
              type="text"
              required
              value={form.perfumeName}
              onChange={(e) => setForm({ ...form, perfumeName: e.target.value })}
              placeholder="e.g. Midnight Blossom"
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Tanggal</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Harga</label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Rp 89.000"
                className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Platform</label>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setForm({ ...form, platform: p.value })}
                  className={`p-3 text-xs font-medium flex items-center gap-2 justify-center transition-all ${
                    form.platform === p.value
                      ? 'border-2 border-accent bg-accent/10 text-accent'
                      : 'bg-surface-elevated border border-border text-text-secondary hover:border-accent/30'
                  }`}
                >
                  <span>{p.emoji}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-all mt-2"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  )
}
