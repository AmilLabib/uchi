/**
 * Vercel Serverless API Route: /api/profile
 * 
 * GET /api/profile?userId=xxx  -> Returns user's profile
 * POST /api/profile            -> Saves user's profile
 */

import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export default async function handler(req: any, res: any) {
  const userId = (req.query.userId as string) || 'default'

  if (req.method === 'GET') {
    try {
      const data = await redis.get(`user:${userId}:profile`)
      return res.status(200).json({ profile: data || null })
    } catch {
      return res.status(500).json({ error: 'Failed to fetch profile' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { profile } = req.body
      await redis.set(`user:${userId}:profile`, JSON.stringify(profile))
      return res.status(200).json({ success: true })
    } catch {
      return res.status(500).json({ error: 'Failed to save profile' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
