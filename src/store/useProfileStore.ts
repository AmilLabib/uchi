import { useState, useEffect, useCallback } from 'react'
import type { UserProfile, PurchaseRecord } from '../types'

const PROFILE_KEY = 'uchi_profile'

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
  avatar: '',
  theme: 'dark',
  purchaseHistory: [],
  joinDate: new Date().toISOString().split('T')[0],
}

function loadProfile(): UserProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY)
    return data ? { ...defaultProfile, ...JSON.parse(data) } : defaultProfile
  } catch {
    return defaultProfile
  }
}

export function useProfileStore() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile)

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  }, [profile])

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }, [])

  const addPurchase = useCallback((purchase: Omit<PurchaseRecord, 'id'>) => {
    const newPurchase: PurchaseRecord = {
      ...purchase,
      id: crypto.randomUUID(),
    }
    setProfile((prev) => ({
      ...prev,
      purchaseHistory: [newPurchase, ...prev.purchaseHistory],
    }))
  }, [])

  const deletePurchase = useCallback((id: string) => {
    setProfile((prev) => ({
      ...prev,
      purchaseHistory: prev.purchaseHistory.filter((p) => p.id !== id),
    }))
  }, [])

  return { profile, updateProfile, addPurchase, deletePurchase }
}
