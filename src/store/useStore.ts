import { useState, useEffect, useCallback } from 'react'
import type { Perfume, Moment, JournalEntry, TimelineEvent } from '../types'

const STORAGE_KEYS = {
  PERFUMES: 'uchi_perfumes',
  MOMENTS: 'uchi_moments',
  JOURNAL: 'uchi_journal',
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

export function usePerfumeStore() {
  const [perfumes, setPerfumes] = useState<Perfume[]>(() =>
    loadFromStorage(STORAGE_KEYS.PERFUMES, [])
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PERFUMES, perfumes)
  }, [perfumes])

  const addPerfume = useCallback((perfume: Omit<Perfume, 'id'>) => {
    const newPerfume: Perfume = {
      ...perfume,
      id: crypto.randomUUID(),
    }
    setPerfumes((prev) => [newPerfume, ...prev])
    return newPerfume
  }, [])

  const updatePerfume = useCallback((id: string, updates: Partial<Perfume>) => {
    setPerfumes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }, [])

  const deletePerfume = useCallback((id: string) => {
    setPerfumes((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return { perfumes, addPerfume, updatePerfume, deletePerfume }
}

export function useMomentStore() {
  const [moments, setMoments] = useState<Moment[]>(() =>
    loadFromStorage(STORAGE_KEYS.MOMENTS, [])
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.MOMENTS, moments)
  }, [moments])

  const addMoment = useCallback((moment: Omit<Moment, 'id'>) => {
    const newMoment: Moment = {
      ...moment,
      id: crypto.randomUUID(),
    }
    setMoments((prev) => [newMoment, ...prev])
    return newMoment
  }, [])

  const updateMoment = useCallback((id: string, updates: Partial<Moment>) => {
    setMoments((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    )
  }, [])

  const deleteMoment = useCallback((id: string) => {
    setMoments((prev) => prev.filter((m) => m.id !== id))
  }, [])

  return { moments, addMoment, updateMoment, deleteMoment }
}

export function useJournalStore() {
  const [entries, setEntries] = useState<JournalEntry[]>(() =>
    loadFromStorage(STORAGE_KEYS.JOURNAL, [])
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.JOURNAL, entries)
  }, [entries])

  const addEntry = useCallback((entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(),
    }
    setEntries((prev) => [newEntry, ...prev])
    return newEntry
  }, [])

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  return { entries, addEntry, deleteEntry }
}

export function useTimelineStore() {
  const { perfumes } = usePerfumeStore()
  const { moments } = useMomentStore()
  const { entries } = useJournalStore()

  const timeline: TimelineEvent[] = [
    ...perfumes.map((p): TimelineEvent => ({
      id: `p-${p.id}`,
      type: 'purchase',
      date: p.purchaseDate,
      title: `Membeli ${p.name}`,
      description: p.description || `Parfum ${p.category} dari ${p.brand}`,
      perfumeId: p.id,
      image: p.image,
    })),
    ...moments.map((m): TimelineEvent => ({
      id: `m-${m.id}`,
      type: 'moment',
      date: m.date,
      title: m.title,
      description: m.description,
      perfumeId: m.perfumeId,
      image: m.images[0],
    })),
    ...entries.map((e): TimelineEvent => ({
      id: `j-${e.id}`,
      type: 'journal',
      date: e.date,
      title: e.occasion,
      description: e.notes,
      perfumeId: e.perfumeId,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return { timeline }
}
