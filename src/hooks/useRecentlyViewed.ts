import { useEffect } from 'react'

const KEY = 'rafiq-recently-viewed'
const MAX_ITEMS = 8

export function trackRecentlyViewed(productId: string) {
  try {
    const raw = localStorage.getItem(KEY)
    const list: string[] = raw ? JSON.parse(raw) : []
    const next = [productId, ...list.filter(id => id !== productId)].slice(0, MAX_ITEMS)
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // localStorage غير متاح، تجاهل بهدوء
  }
}

export function getRecentlyViewed(excludeId?: string): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    const list: string[] = raw ? JSON.parse(raw) : []
    return excludeId ? list.filter(id => id !== excludeId) : list
  } catch {
    return []
  }
}

export function useTrackRecentlyViewed(productId: string) {
  useEffect(() => { trackRecentlyViewed(productId) }, [productId])
}