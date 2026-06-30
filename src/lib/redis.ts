/**
 * Upstash Redis - Vercel Backend Integration
 * 
 * This file serves as documentation for the Redis setup.
 * Actual Redis operations happen in /api/ serverless functions.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.upstash.com/ and create a Redis database
 * 2. In Vercel project settings, add environment variables:
 *    - UPSTASH_REDIS_REST_URL
 *    - UPSTASH_REDIS_REST_TOKEN
 * 3. Deploy to Vercel - the /api/ routes will automatically connect
 * 
 * KEY STRUCTURE:
 * - user:{userId}:perfumes  -> JSON array of perfume objects
 * - user:{userId}:moments   -> JSON array of moment objects
 * - user:{userId}:journal   -> JSON array of journal entries
 * 
 * API ENDPOINTS (auto-created from /api/ folder):
 * - GET/POST /api/perfumes?userId=xxx
 * - GET/POST /api/moments?userId=xxx
 * - GET/POST /api/journal?userId=xxx
 */

export const API_ENDPOINTS = {
  perfumes: '/api/perfumes',
  moments: '/api/moments',
  journal: '/api/journal',
}

export async function syncToCloud(endpoint: string, userId: string, data: unknown) {
  try {
    const response = await fetch(`${endpoint}?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.ok
  } catch {
    console.warn('Cloud sync failed - data saved locally')
    return false
  }
}

export async function fetchFromCloud(endpoint: string, userId: string) {
  try {
    const response = await fetch(`${endpoint}?userId=${userId}`)
    if (response.ok) {
      return await response.json()
    }
    return null
  } catch {
    console.warn('Cloud fetch failed - using local data')
    return null
  }
}
