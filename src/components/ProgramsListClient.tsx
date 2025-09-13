// src/components/ProgramsListClient.tsx
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Card from './Card'
import cn from 'classnames'
import debounce from 'just-debounce-it' // small debounce lib, or implement inline

type ProgramDTO = {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImageUrl?: string | null
  featured?: boolean
}

type ApiResult = {
  items: ProgramDTO[]
  total: number
  page: number
  pageSize: number
}

export default function ProgramsListClient({ initialData }: { initialData: ApiResult }) {
  const [items, setItems] = useState<ProgramDTO[]>(initialData.items)
  const [total, setTotal] = useState<number>(initialData.total)
  const [page, setPage] = useState<number>(initialData.page || 1)
  const [pageSize, setPageSize] = useState<number>(initialData.pageSize || 9)
  const [search, setSearch] = useState<string>('')
  const [featuredOnly, setFeaturedOnly] = useState<boolean | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  // build fetch function - wrap in useCallback to stabilize the function reference
  const fetchPage = useCallback(async (p: number, s: string, featured?: boolean | undefined) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', String(p))
      params.set('pageSize', String(pageSize))
      if (s && s.trim().length) params.set('search', s.trim())
      if (featured === true) params.set('featured', '1')
      if (featured === false) params.set('featured', '0')

      const res = await fetch(`/api/programs?${params.toString()}`, { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to fetch')
      setItems(json.items)
      setTotal(json.total)
      setPage(json.page)
    } catch (err) {
      console.error('fetchPage error', err)
    } finally {
      setLoading(false)
    }
  }, [pageSize]) // Add pageSize as dependency

  // debounce search to avoid too many requests
  // add fetchPage to the dependency array
  const debouncedFetch = useMemo(
    () =>
      debounce((p: number, q: string, f?: boolean | undefined) => {
        void fetchPage(p, q, f)
      }, 350),
    [pageSize, fetchPage], // Add fetchPage dependency
  )

  // initial effect: ensure page and data are in sync (no-op if initial already)
  useEffect(() => {
    // when pageSize changes, reset to page 1 and reload
    void fetchPage(1, search, featuredOnly)
  }, [pageSize, fetchPage, search, featuredOnly]) // Add all missing dependencies

  // when user changes page
  useEffect(() => {
    // load current page with current filters
    void fetchPage(page, search, featuredOnly)
  }, [page, fetchPage, search, featuredOnly]) // Add all missing dependencies

  // when search or featured toggles change, reset to page 1 and fetch (debounced)
  useEffect(() => {
    setPage(1)
    debouncedFetch(1, search, featuredOnly)
  }, [search, featuredOnly, debouncedFetch]) // Add debouncedFetch dependency

  // simple page numbers to render (show up to 7 pages with ellipsis)
  const pagesToShow = useMemo(() => {
    const pages: (number | '...')[] = []
    const maxVisible = 7
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }
    // Always show first, last, current +-1
    pages.push(1)
    const left = Math.max(2, page - 1)
    const right = Math.min(totalPages - 1, page + 1)

    if (left > 2) pages.push('...')
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < totalPages - 1) pages.push('...')
    pages.push(totalPages)
    return pages
  }, [totalPages, page])

  return (
    <div>
      {/* Controls */}
      <div className="mt-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="programSearch">Search Hadrels</label>
          <input
            id="programSearch"
            className="border rounded px-3 py-2 w-[220px]"
            placeholder="Search Hadrels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={Boolean(featuredOnly)}
              onChange={(e) => setFeaturedOnly(e.target.checked ? true : undefined)}
            />
            <span className="text-sm">Featured only</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm">Per page:</label>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="border rounded px-2 py-1">
            {[6, 9, 12, 18].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className={cn('grid gap-6', items.length ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : '')}>
        {loading && items.length === 0 ? (
          <div className="col-span-full text-center py-8">Loading…</div>
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-600">No Hadrels found.</div>
        ) : (
          items.map((p) => (
            <Card key={p._id} title={p.title} excerpt={p.excerpt} imageUrl={p.coverImageUrl ?? undefined} href={`/programs/${p.slug ?? p._id}`} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing page {page} of {totalPages} — {total} result{total === 1 ? '' : 's'}
        </div>

        <nav aria-label="Pagination" className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {pagesToShow.map((p, idx) =>
            p === '...' ? (
              <span key={`e-${idx}`} className="px-2">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(Number(p))}
                className={cn('px-3 py-1 border rounded', page === p ? 'bg-primary text-white' : 'bg-white')}
                disabled={loading}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}