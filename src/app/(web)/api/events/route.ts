// src/app/api/events/route.ts
import { NextResponse } from 'next/server'
import { fetchEventsServer } from '@/lib/fetchers/events'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const search = url.searchParams.get('search') ?? undefined
    const page = Number(url.searchParams.get('page') || '1')
    const pageSize = Number(url.searchParams.get('pageSize') || '9')
    const featuredParam = url.searchParams.get('featured')
    const filter = url.searchParams.get('filter') as 'upcoming' | 'ongoing' | 'past' | null

    const featured =
      featuredParam === '1' || featuredParam === 'true' ? true : featuredParam === '0' || featuredParam === 'false' ? false : undefined

    const data = await fetchEventsServer({
      page,
      pageSize,
      search: search ?? undefined,
      featured,
      filterType: filter ?? undefined,
    })

    return NextResponse.json(data)
  } catch (err) {
    console.error('/api/events error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
