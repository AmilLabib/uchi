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
