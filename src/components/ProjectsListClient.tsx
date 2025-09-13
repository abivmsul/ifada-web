// src/components/ProjectsListClient.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import debounce from 'just-debounce-it'
import ProjectCard from './ProjectCard'
import ProjectsListSkeleton from '@/components/skeletons/ProjectsListSkeleton'
import cn from 'classnames'

type ProjectDTO = {
  _id: string
  title: string
  slug?: string
  status?: string
  startLabel?: string | null
  excerpt?: string
  coverImageUrl?: string | null
  featured?: boolean
}

type ApiResult = {
  items: ProjectDTO[]
  total: number
  page: number
  pageSize: number
}

/**
 * Client component for project listing
 * - shows shadcn skeleton grid when loading
 * - uses server initialData to avoid flash
 */
export default function ProjectsListClient({ initialData }: { initialData: ApiResult }) {
  const [items, setItems] = useState<ProjectDTO[]>(initialData?.items ?? [])
  const [total, setTotal] = useState<number>(initialData?.total ?? 0)
  const [page, setPage] = useState<number>(initialData?.page ?? 1)
  const [pageSize, setPageSize] = useState<number>(initialData?.pageSize ?? 9)
  const [search, setSearch] = useState<string>('')
  const [featuredOnly, setFeaturedOnly] = useState<boolean | undefined>(undefined)
  const [statusFilter, setStatusFilter] = useState<'all'|'upcoming'|'ongoing'|'completed'>('all')
  const [loading, setLoading] = useState(false)

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const fetchPage = async (p: number, s: string, featured?: boolean | undefined, status?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', String(p))
      params.set('pageSize', String(pageSize))
      if (s && s.trim().length) params.set('search', s.trim())
      if (featured === true) params.set('featured', '1')
      if (featured === false) params.set('featured', '0')
      if (status && status !== 'all') params.set('status', status)

      const res = await fetch(`/api/projects?${params.toString()}`, { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to fetch')
      // the API returns { items, total, page, pageSize } (matching your route)
      setItems(json.items ?? [])
      setTotal(Number(json.total ?? 0))
      setPage(Number(json.page ?? p))
    } catch (err) {
      console.error('fetch projects', err)
    } finally {
      setLoading(false)
    }
  }

  // Debounced fetch for search/filter changes
  const debouncedFetch = useMemo(
    () =>
      debounce((p: number, q: string, f?: boolean, status?: string) => {
        void fetchPage(p, q, f, status)
      }, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageSize]
  )

  // Sync when pageSize changes: reset to page 1 and fetch
  useEffect(() => {
    setPage(1)
    void fetchPage(1, search, featuredOnly, statusFilter === 'all' ? undefined : statusFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize])

  // Fetch when page changes
  useEffect(() => {
    void fetchPage(page, search, featuredOnly, statusFilter === 'all' ? undefined : statusFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // Search / filters: reset page and debounced fetch
  useEffect(() => {
    setPage(1)
    debouncedFetch(1, search, featuredOnly, statusFilter === 'all' ? undefined : statusFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, featuredOnly, statusFilter])

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
      <div className="mt-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <input
            className="border rounded px-3 py-2 w-[220px]"
            placeholder="Search projects..."
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

          <div className="inline-flex items-center gap-2 border rounded overflow-hidden">
            {(['all','upcoming','ongoing','completed'] as const).map(s => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1) }}
                className={cn('px-3 py-1 text-sm', statusFilter === s ? 'bg-primary text-white' : 'text-gray-700')}
              >
                {s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm">Per page:</label>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }} className="border rounded px-2 py-1">
            {[6,9,12].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading && (items.length === 0) ? (
          // show skeletons matching pageSize count while there are no cached items
          <div className="col-span-full">
            <ProjectsListSkeleton count={pageSize} />
          </div>
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-600">No projects found.</div>
        ) : (
          items.map(p => (
            <ProjectCard
              key={p._id}
              title={p.title}
              excerpt={p.excerpt}
              imageUrl={p.coverImageUrl ?? undefined}
              href={`/projects/${p.slug ?? p._id}`}
              status={p.status}
              startLabel={p.startLabel}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing page {page} of {Math.max(1, Math.ceil(total / pageSize))} — {total} result{total === 1 ? '' : 's'}
        </div>

        <nav aria-label="Pagination" className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1 || loading} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>

          {pagesToShow.map((p, idx) => p === '...' ? (<span key={`e-${idx}`} className="px-2">…</span>) : (
            <button key={p} onClick={() => setPage(Number(p))} className={cn('px-3 py-1 border rounded', page === p ? 'bg-primary text-white' : 'bg-white')} disabled={loading}>
              {p}
            </button>
          ))}

          <button onClick={() => setPage(p => Math.min(Math.ceil(total / pageSize), p + 1))} disabled={page >= Math.ceil(total / pageSize) || loading} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </nav>
      </div>
    </div>
  )
}
