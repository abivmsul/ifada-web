// src/app/api/programs/route.ts
import { NextResponse } from 'next/server'
import { fetchProgramsServer } from '@/lib/fetchers/programs'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const search = url.searchParams.get('search') ?? undefined
    const featuredParam = url.searchParams.get('featured')
    const page = Number(url.searchParams.get('page') || '1')
    const pageSize = Number(url.searchParams.get('pageSize') || '9')

    const featured = featuredParam === '1' || featuredParam === 'true' ? true : featuredParam === '0' || featuredParam === 'false' ? false : undefined

    const data = await fetchProgramsServer({ page, pageSize, search, featured })

    return NextResponse.json(data)
  } catch (err) {
    console.error('API /api/programs error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
