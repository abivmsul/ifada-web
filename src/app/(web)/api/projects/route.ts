// src/app/api/projects/route.ts
import { NextResponse } from 'next/server'
import { fetchProjectsServer } from '@/lib/fetchers/projects'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const search = url.searchParams.get('search') ?? undefined
    const featuredParam = url.searchParams.get('featured')
    const status = (url.searchParams.get('status') as 'upcoming'|'ongoing'|'completed'|null) ?? undefined
    const page = Number(url.searchParams.get('page') || '1')
    const pageSize = Number(url.searchParams.get('pageSize') || '9')

    const featured = featuredParam === '1' || featuredParam === 'true' ? true : featuredParam === '0' || featuredParam === 'false' ? false : undefined

    const data = await fetchProjectsServer({ page, pageSize, search, featured, status })

    const res = NextResponse.json(data)
    res.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59')
    return res
  } catch (err) {
    console.error('/api/projects error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
