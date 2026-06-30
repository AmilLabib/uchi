/**
 * Vercel Serverless API Route: /api/journal
 * 
 * GET /api/journal?userId=xxx  -> Returns user's journal entries
 * POST /api/journal            -> Saves user's journal entries
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
      const data = await redis.get(`user:${userId}:journal`)
      return res.status(200).json({ journal: data || [] })
    } catch {
      return res.status(500).json({ error: 'Failed to fetch journal' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { journal } = req.body
      await redis.set(`user:${userId}:journal`, JSON.stringify(journal))
      return res.status(200).json({ success: true })
    } catch {
      return res.status(500).json({ error: 'Failed to save journal' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
