/**
 * Vercel Serverless API Route: /api/moments
 * 
 * GET /api/moments?userId=xxx  -> Returns user's moments
 * POST /api/moments            -> Saves user's moments
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
      const data = await redis.get(`user:${userId}:moments`)
      return res.status(200).json({ moments: data || [] })
    } catch {
      return res.status(500).json({ error: 'Failed to fetch moments' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { moments } = req.body
      await redis.set(`user:${userId}:moments`, JSON.stringify(moments))
      return res.status(200).json({ success: true })
    } catch {
      return res.status(500).json({ error: 'Failed to save moments' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
