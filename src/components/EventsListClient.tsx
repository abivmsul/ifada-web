// src/components/EventsListClient.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import debounce from 'just-debounce-it'
import EventCard from './EventCard'
import cn from 'classnames'

type EventDTO = {
  _id: string
  title: string
  slug?: string
  start?: string
  end?: string | null
  startLabel?: string | null
  endLabel?: string | null
  location?: any
  isOnline?: boolean
  excerpt?: string
  coverImageUrl?: string | null
  featured?: boolean
}

type ApiResult = {
  items: EventDTO[]
  total: number
  page: number
  pageSize: number
}

export default function EventsListClient({ initialData }: { initialData: ApiResult }) {
  const [items, setItems] = useState<EventDTO[]>(initialData.items)
  const [total, setTotal] = useState<number>(initialData.total)
  const [page, setPage] = useState<number>(initialData.page || 1)
  const [pageSize, setPageSize] = useState<number>(initialData.pageSize || 9)
  const [search, setSearch] = useState<string>('')
  const [featuredOnly, setFeaturedOnly] = useState<boolean | undefined>(undefined)
  const [filterTab, setFilterTab] = useState<'upcoming' | 'ongoing' | 'past'>('upcoming')
  const [loading, setLoading] = useState(false)

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const fetchPage = async (p: number, s: string, featured?: boolean | undefined, filter?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', String(p))
      params.set('pageSize', String(pageSize))
      if (s && s.trim().length) params.set('search', s.trim())
      if (featured === true) params.set('featured', '1')
      if (featured === false) params.set('featured', '0')
      if (filter) params.set('filter', filter)

      const res = await fetch(`/api/events?${params.toString()}`, { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to fetch')
      setItems(json.items)
      setTotal(json.total)
      setPage(json.page)
    } catch (err) {
      console.error('fetch events', err)
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetch = useMemo(
    () =>
      debounce((p: number, q: string, f?: boolean | undefined, filter?: string) => {
        void fetchPage(p, q, f, filter)
      }, 300),
    [pageSize],
  )

  useEffect(() => {
    // when tab changes, load page 1 of that tab
    void fetchPage(1, search, featuredOnly, filterTab)
  }, [filterTab, pageSize])

  useEffect(() => {
    // page change
    void fetchPage(page, search, featuredOnly, filterTab)
  }, [page])

  useEffect(() => {
    setPage(1)
    debouncedFetch(1, search, featuredOnly, filterTab)
  }, [search, featuredOnly])

  const pagesToShow = useMemo(() => {
    const pages: (number | '...')[] = []
    const totalPagesLocal = Math.max(1, Math.ceil(total / pageSize))
    const maxVisible = 7
    if (totalPagesLocal <= maxVisible) {
      for (let i = 1; i <= totalPagesLocal; i++) pages.push(i)
      return pages
    }
    pages.push(1)
    const left = Math.max(2, page - 1)
    const right = Math.min(totalPagesLocal - 1, page + 1)
    if (left > 2) pages.push('...')
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < totalPagesLocal - 1) pages.push('...')
    pages.push(totalPagesLocal)
    return pages
  }, [total, page, pageSize])

  return (
    <div>
      {/* Controls */}
      <div className="mt-4 mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex overflow-hidden rounded-lg bg-white border">
            <button
              onClick={() => {
                setFilterTab('upcoming'); setPage(1)
              }}
              className={cn('px-4 py-2 text-sm', filterTab === 'upcoming' ? 'bg-primary text-white' : 'text-gray-700')}
            >
              Upcoming
            </button>
            <button
              onClick={() => {
                setFilterTab('ongoing'); setPage(1)
              }}
              className={cn('px-4 py-2 text-sm', filterTab === 'ongoing' ? 'bg-primary text-white' : 'text-gray-700')}
            >
              Ongoing
            </button>
            <button
              onClick={() => {
                setFilterTab('past'); setPage(1)
              }}
              className={cn('px-4 py-2 text-sm', filterTab === 'past' ? 'bg-primary text-white' : 'text-gray-700')}
            >
              Past
            </button>
          </div>

          <input
            className="border rounded px-3 py-2 w-full sm:w-[260px]"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={Boolean(featuredOnly)} onChange={(e) => setFeaturedOnly(e.target.checked ? true : undefined)} />
            <span className="text-sm">Featured only</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm">Per page:</label>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }} className="border rounded px-2 py-1">
            {[6, 9, 12].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading && items.length === 0 ? (
          <div className="col-span-full text-center py-8">Loading…</div>
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-600">No events found.</div>
        ) : (
          items.map((ev) => (
            <EventCard
              key={ev._id}
              title={ev.title}
              start={ev.start}
              end={ev.end}
              startLabel={ev.startLabel}
              endLabel={ev.endLabel}
              excerpt={ev.excerpt}
              imageUrl={ev.coverImageUrl ?? undefined}
              isOnline={ev.isOnline}
              location={ev.location}
              href={`/events/${ev.slug ?? ev._id}`}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600">
          Showing page {page} of {Math.max(1, Math.ceil(total / pageSize))} — {total} result{total === 1 ? '' : 's'}
        </div>

        <nav aria-label="Pagination" className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1 || loading} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>

          {pagesToShow.map((p, idx) => p === '...' ? (<span key={`e-${idx}`} className="px-2">…</span>) : (
            <button key={p} onClick={() => setPage(Number(p))} className={cn('px-3 py-1 border rounded', page === p ? 'bg-primary text-white' : 'bg-white')} disabled={loading}>
              {p}
            </button>
          ))}

          <button onClick={() => setPage((p) => Math.min(Math.max(1, Math.ceil(total / pageSize)), p + 1))} disabled={page >= Math.ceil(total / pageSize) || loading} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </nav>
      </div>
    </div>
  )
}
