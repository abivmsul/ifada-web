// src/lib/youtube.ts
export function extractYouTubeId(url?: string | null): string | null {
  if (!url) return null
  try {
    // match v=, /embed/, youtu.be/
    const m = url.match(/(?:youtube\.com\/.*(?:v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/)
    if (m && m[1]) return m[1]
    // as fallback try to parse query param
    const u = new URL(url)
    return u.searchParams.get('v')
  } catch {
    return null
  }
}

export function youtubeEmbedUrl(id: string, privacy = true) {
  const host = privacy ? 'https://www.youtube-nocookie.com/embed/' : 'https://www.youtube.com/embed/'
  return `${host}${id}?rel=0&modestbranding=1`
}

export function youtubeThumbnail(id: string, size = 'hqdefault') {
  // sizes: default, mqdefault, hqdefault, sddefault, maxresdefault
  return `https://img.youtube.com/vi/${id}/${size}.jpg`
}
