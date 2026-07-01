export interface Perfume {
  id: string
  name: string
  brand: string
  category: 'fresh' | 'floral' | 'woody' | 'oriental' | 'citrus' | 'gourmand'
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
  rating: number
  purchaseDate: string
  image?: string
  description?: string
  spotifyUrl?: string
  qrCode?: string
  verified?: boolean
}

export interface Moment {
  id: string
  perfumeId: string
  title: string
  description: string
  date: string
  location?: string
  mood: 'romantic' | 'adventurous' | 'peaceful' | 'energetic' | 'nostalgic' | 'confident'
  images: string[]
}

export interface JournalEntry {
  id: string
  perfumeId: string
  date: string
  occasion: string
  weather?: string
  mood: string
  longevity: number // 1-10
  sillage: number // 1-10
  notes: string
}

export interface TimelineEvent {
  id: string
  type: 'purchase' | 'moment' | 'journal'
  date: string
  title: string
  description: string
  perfumeId?: string
  image?: string
}

// === Scent of The Soul ===
export interface ScentPhoto {
  id: string
  perfumeId: string
  url: string
  caption?: string
  date: string
}

export interface ScentComment {
  id: string
  perfumeId: string
  author: string
  text: string
  date: string
  likes: number
}

// === Find Your Soul ===
export interface UchiCatalogItem {
  id: string
  name: string
  category: Perfume['category']
  image: string
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
  story: string
  aromaImages: string[] // emoji/icon representations
  mood: string[]
  occasion: string[]
  gender: 'unisex' | 'masculine' | 'feminine'
  price: string
  shopLinks: {
    shopee?: string
    tokopedia?: string
    tiktok?: string
  }
  spotifyUrl?: string
}

export interface AIRecommendation {
  perfumeId: string
  reason: string
  matchScore: number
}

// === UchiMate ===
export interface UserProfile {
  name: string
  email: string
  phone: string
  avatar?: string
  theme: 'dark' | 'light'
  purchaseHistory: PurchaseRecord[]
  joinDate: string
}

export interface PurchaseRecord {
  id: string
  perfumeName: string
  date: string
  price: string
  platform: 'shopee' | 'tokopedia' | 'tiktok' | 'offline'
}

// === Existing ===
export type MoodColor = {
  [key in Moment['mood']]: string
}

export const moodColors: MoodColor = {
  romantic: '#B76E79',
  adventurous: '#C9A96E',
  peaceful: '#7A8B6F',
  energetic: '#E8D5B0',
  nostalgic: '#8B6F4E',
  confident: '#3D2B1F',
}

export const moodLabels: Record<Moment['mood'], string> = {
  romantic: 'Romantis',
  adventurous: 'Petualangan',
  peaceful: 'Damai',
  energetic: 'Energik',
  nostalgic: 'Nostalgia',
  confident: 'Percaya Diri',
}

export const categoryLabels: Record<Perfume['category'], string> = {
  fresh: 'Fresh',
  floral: 'Floral',
  woody: 'Woody',
  oriental: 'Oriental',
  citrus: 'Citrus',
  gourmand: 'Gourmand',
}
