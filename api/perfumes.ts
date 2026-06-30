/**
 * Vercel Serverless API Route: /api/perfumes
 * 
 * GET /api/perfumes?userId=xxx  -> Returns user's perfume collection
 * POST /api/perfumes            -> Saves user's perfume collection
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
      const data = await redis.get(`user:${userId}:perfumes`)
      return res.status(200).json({ perfumes: data || [] })
    } catch {
      return res.status(500).json({ error: 'Failed to fetch perfumes' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { perfumes } = req.body
      await redis.set(`user:${userId}:perfumes`, JSON.stringify(perfumes))
      return res.status(200).json({ success: true })
    } catch {
      return res.status(500).json({ error: 'Failed to save perfumes' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
