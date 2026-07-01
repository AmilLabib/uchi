import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { Music, Image, Share2, Heart, MessageCircle, QrCode, X, Download, Plus } from 'lucide-react'
import { usePerfumeStore, useMomentStore } from '../store/useStore'
import type { Perfume } from '../types'
import { categoryLabels } from '../types'

const categoryEmoji: Record<Perfume['category'], string> = {
  fresh: '🌊',
  floral: '🌸',
  woody: '🌲',
  oriental: '🕌',
  citrus: '🍋',
  gourmand: '🍫',
}

// Mock comments
const mockComments = [
  { id: '1', author: 'Rina', text: 'Wangi banget! Aku juga punya yang ini 💕', date: '2024-12-15', likes: 5 },
  { id: '2', author: 'Dimas', text: 'Cocok bgt sama vibes lo bro', date: '2024-12-14', likes: 3 },
  { id: '3', author: 'Sarah', text: 'Koleksi goals sih ini ✨', date: '2024-12-13', likes: 8 },
]

export default function ScentOfTheSoul() {
  const { perfumes } = usePerfumeStore()
  const { moments } = useMomentStore()
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      gsap.fromTo('.soul-card',
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
      )
    })
    return () => ctx.revert()
  }, [])

  const perfumePhotos = (perfumeId: string) =>
    moments.filter((m) => m.perfumeId === perfumeId && m.images.length > 0)

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="page-header text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Personal Lab</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary font-medium mt-4">
            Scent of <span className="italic text-gradient">The Soul</span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-lg mx-auto text-sm md:text-base">
            Jati dirimu tercermin dari aroma yang kau pilih. Lihat koleksi, kenangan, dan cerita di balik setiap parfummu.
          </p>
        </div>

        {/* User Profile Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto border-2 border-accent/30 rounded-full flex items-center justify-center mb-4 bg-surface-card">
            <span className="text-3xl">✨</span>
          </div>
          <p className="text-sm text-text-muted">
            {perfumes.length} parfum dalam koleksi • {moments.length} momen terabadikan
          </p>
        </div>

        {/* Perfume Collection Grid */}
        {perfumes.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto border border-accent/20 flex items-center justify-center mb-6">
              <Music className="w-9 h-9 text-accent/40" />
            </div>
            <p className="text-text-secondary font-serif text-xl">Belum ada parfum dalam koleksimu</p>
            <p className="text-sm text-text-muted mt-2">Tambahkan parfum di halaman Collection terlebih dahulu</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perfumes.map((perfume) => (
              <div
                key={perfume.id}
                onClick={() => setSelectedPerfume(perfume)}
                className="soul-card group relative p-6 bg-surface-card border border-border hover:border-accent/30 cursor-pointer transition-all duration-500 hover-glow"
              >
                {/* Verified badge */}
                {perfume.verified && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 bg-accent/20 border border-accent/30 text-[10px] text-accent font-medium tracking-wider">
                    VERIFIED ✓
                  </div>
                )}

                <div className="w-14 h-14 mx-auto mb-4 border border-accent/20 flex items-center justify-center group-hover:border-accent/40 transition-all">
                  <span className="text-2xl">{categoryEmoji[perfume.category]}</span>
                </div>

                <h3 className="font-serif text-lg text-text-primary text-center group-hover:text-accent transition-colors">
                  {perfume.name}
                </h3>
                <p className="text-xs text-text-muted text-center mt-1 tracking-wider uppercase">
                  {categoryLabels[perfume.category]}
                </p>

                {/* Photo count */}
                <div className="flex items-center justify-center gap-3 mt-4 text-[11px] text-text-muted">
                  <span className="flex items-center gap-1">
                    <Image className="w-3 h-3" />
                    {perfumePhotos(perfume.id).length} foto
                  </span>
                  {perfume.spotifyUrl && (
                    <span className="flex items-center gap-1 text-green-400">
                      <Music className="w-3 h-3" />
                      Spotify
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPerfume && (
        <PerfumeDetailModal
          perfume={selectedPerfume}
          photos={perfumePhotos(selectedPerfume.id)}
          onClose={() => setSelectedPerfume(null)}
          onShare={() => setShowShareModal(true)}
          onQR={() => setShowQRModal(true)}
        />
      )}

      {/* Share Modal */}
      {showShareModal && selectedPerfume && (
        <ShareModal
          perfume={selectedPerfume}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* QR Modal */}
      {showQRModal && (
        <QRModal onClose={() => setShowQRModal(false)} />
      )}
    </div>
  )
}

function PerfumeDetailModal({
  perfume,
  photos,
  onClose,
  onShare,
  onQR,
}: {
  perfume: Perfume
  photos: { id: string; title: string; images: string[]; date: string }[]
  onClose: () => void
  onShare: () => void
  onQR: () => void
}) {
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface-card border border-border shadow-2xl animate-fade-up">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-surface-card/95 backdrop-blur-sm border-b border-border">
          <div>
            <h2 className="font-serif text-xl text-text-primary">{perfume.name}</h2>
            <p className="text-xs text-text-muted tracking-wider uppercase mt-0.5">{perfume.brand}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onQR}
              className="p-2.5 border border-border hover:border-accent/30 text-text-muted hover:text-accent transition-all"
              aria-label="Scan QR"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={onShare}
              className="p-2.5 border border-border hover:border-accent/30 text-text-muted hover:text-accent transition-all"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-surface-elevated text-text-muted transition-all"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Perfume Visual */}
          <div className="text-center py-8 bg-surface-elevated border border-border-light overflow-hidden relative">
            {perfume.image ? (
              <>
                <img src={perfume.image} alt={perfume.name} className="w-full h-48 object-cover absolute inset-0 opacity-20 blur-sm" />
                <div className="relative z-10">
                  <span className="text-5xl block mb-4">{categoryEmoji[perfume.category]}</span>
                  <h3 className="font-serif text-2xl text-gradient">{perfume.name}</h3>
                  <p className="text-sm text-text-secondary mt-2">{categoryLabels[perfume.category]} • {perfume.brand}</p>
                </div>
              </>
            ) : (
              <>
                <span className="text-5xl block mb-4">{categoryEmoji[perfume.category]}</span>
                <h3 className="font-serif text-2xl text-gradient">{perfume.name}</h3>
                <p className="text-sm text-text-secondary mt-2">{categoryLabels[perfume.category]} • {perfume.brand}</p>
              </>
            )}
            {perfume.description && (
              <p className="text-sm text-text-muted mt-3 max-w-md mx-auto italic relative z-10">"{perfume.description}"</p>
            )}
          </div>

          {/* Spotify Embed */}
          {perfume.spotifyUrl && (
            <div>
              <h4 className="text-xs font-medium text-text-muted mb-3 tracking-wider uppercase flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-green-400" />
                Soundtrack Aroma
              </h4>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src={`https://open.spotify.com/embed/track/${extractSpotifyId(perfume.spotifyUrl)}?theme=0`}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="border-0"
                  title={`Spotify - ${perfume.name}`}
                />
              </div>
            </div>
          )}

          {/* Photo Gallery */}
          <div>
            <h4 className="text-xs font-medium text-text-muted mb-3 tracking-wider uppercase flex items-center gap-2">
              <Image className="w-3.5 h-3.5" />
              Momen dengan {perfume.name}
            </h4>
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {photos.flatMap((m) =>
                  m.images.map((img, i) => (
                    <div key={`${m.id}-${i}`} className="aspect-square overflow-hidden bg-surface-elevated border border-border-light group">
                      <img
                        src={img}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="text-center py-10 border border-border-light bg-surface-elevated">
                <Image className="w-8 h-8 text-text-muted/30 mx-auto mb-2" />
                <p className="text-xs text-text-muted">Belum ada foto. Tambah momen di halaman Moments.</p>
              </div>
            )}
          </div>

          {/* Social Interactions (Mock) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-medium text-text-muted tracking-wider uppercase">Interaksi</h4>
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-xs text-accent hover:text-accent-light transition-colors"
              >
                {showComments ? 'Sembunyikan' : 'Lihat'} komentar
              </button>
            </div>

            <div className="flex items-center gap-6 p-4 bg-surface-elevated border border-border-light">
              <button className="flex items-center gap-1.5 text-text-secondary hover:text-rose transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">24</span>
              </button>
              <button className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{mockComments.length}</span>
              </button>
              <button
                onClick={onShare}
                className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors ml-auto"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm">Share</span>
              </button>
            </div>

            {showComments && (
              <div className="mt-3 space-y-2">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-surface-elevated border border-border-light">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-text-primary">{comment.author}</span>
                      <span className="text-[10px] text-text-muted">{comment.date}</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">{comment.text}</p>
                    <div className="flex items-center gap-1 mt-2 text-text-muted">
                      <Heart className="w-3 h-3" />
                      <span className="text-[11px]">{comment.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ShareModal({ perfume, onClose }: { perfume: Perfume; onClose: () => void }) {
  const shareOptions = [
    {
      name: 'Instagram Story',
      icon: '📸',
      description: 'Buat story aesthetic dengan info parfummu',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Instagram Feed',
      icon: '🖼️',
      description: 'Generate post feed yang clean & premium',
      gradient: 'from-amber-500 to-rose-500',
    },
    {
      name: 'TikTok',
      icon: '🎬',
      description: 'Template video pendek tentang aromamu',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-surface-card border border-border shadow-2xl p-6 animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-surface-elevated transition-colors" aria-label="Tutup">
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">Share</span>
          <h3 className="font-serif text-xl text-text-primary mt-2">Bagikan {perfume.name}</h3>
          <p className="text-xs text-text-muted mt-1">Pilih platform untuk membuat konten estetik</p>
        </div>

        <div className="space-y-3">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              className="w-full flex items-center gap-4 p-4 bg-surface-elevated border border-border hover:border-accent/30 transition-all duration-300 text-left group"
              onClick={() => {
                // Generate a sharable card (mock - just download prompt)
                alert(`🎨 Generating ${option.name} card untuk "${perfume.name}"...\n\nFitur ini akan menghasilkan gambar aesthetic yang bisa kamu download & share langsung.`)
              }}
            >
              <span className="text-2xl">{option.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{option.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{option.description}</p>
              </div>
              <Download className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
            </button>
          ))}
        </div>

        <p className="text-[11px] text-text-muted text-center mt-5">
          Teman yang melihat share-mu bisa mengunjungi profil ini dan melihat koleksi aromamu
        </p>
      </div>
    </div>
  )
}

function QRModal({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleVerify = () => {
    // Mock QR verification
    if (code.length >= 6) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-surface-card border border-border shadow-2xl p-6 animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-surface-elevated transition-colors" aria-label="Tutup">
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto border border-accent/30 flex items-center justify-center mb-4">
            <QrCode className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-serif text-xl text-text-primary">Verifikasi Kepemilikan</h3>
          <p className="text-xs text-text-muted mt-2">
            Scan QR code pada botol/packaging UCHI untuk verifikasi keaslian
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-2 tracking-wider uppercase">Kode Aktivasi</label>
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setStatus('idle') }}
              placeholder="Masukkan kode dari QR..."
              className="w-full px-4 py-3.5 bg-surface-elevated border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all text-center tracking-widest font-mono"
            />
          </div>

          {status === 'success' && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 text-center">
              <p className="text-sm text-green-400 font-medium">✓ Terverifikasi!</p>
              <p className="text-xs text-green-400/70 mt-1">Parfum ini asli dan terdaftar atas namamu</p>
            </div>
          )}

          {status === 'error' && (
            <div className="p-3 bg-rose/10 border border-rose/30 text-center">
              <p className="text-sm text-rose font-medium">✗ Kode tidak valid</p>
              <p className="text-xs text-rose/70 mt-1">Pastikan kode minimal 6 karakter</p>
            </div>
          )}

          <button
            onClick={handleVerify}
            className="w-full py-3.5 bg-accent text-primary text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-all"
          >
            Verifikasi
          </button>
        </div>
      </div>
    </div>
  )
}

function extractSpotifyId(url: string): string {
  const match = url.match(/track\/([a-zA-Z0-9]+)/)
  return match ? match[1] : ''
}
