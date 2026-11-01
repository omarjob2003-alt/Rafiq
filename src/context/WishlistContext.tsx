import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { api } from '../lib/apiClient'
import { useAuth } from './AuthContext'

interface WishlistItemDto { productId: string }

interface WishlistContextType {
  productIds: string[]
  toggle: (productId: string) => void
  isWishlisted: (productId: string) => boolean
}

const LOCAL_KEY = 'rafiq-wishlist'
const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

function readLocal(): string[] {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]') } catch { return [] }
}

const flip = (list: string[], id: string) => (list.includes(id) ? list.filter(item => item !== id) : [...list, id])

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth()
  const userEmail = user?.email ?? null
  const [productIds, setProductIds] = useState<string[]>(readLocal)
  const syncedFor = useRef<string | null>(null)

  // زائر: نحفظ محليًا
  useEffect(() => {
    if (userEmail || !isReady) return
    localStorage.setItem(LOCAL_KEY, JSON.stringify(productIds))
  }, [productIds, userEmail, isReady])

  // مسجّل دخول: ندمج المحلي مع السيرفر مرة واحدة
  useEffect(() => {
    if (!isReady) return
    if (!userEmail) {
      if (syncedFor.current) { setProductIds([]); syncedFor.current = null }
      return
    }
    if (syncedFor.current === userEmail) return
    syncedFor.current = userEmail

    const run = async () => {
      try {
        const server = await api.get<WishlistItemDto[]>('/wishlist')
        const serverIds = server.map(item => item.productId)
        const uploaded: string[] = []
        for (const id of readLocal().filter(local => !serverIds.includes(local))) {
          try { await api.post(`/wishlist/${id}`); uploaded.push(id) } catch { /* منتج مش موجود على السيرفر */ }
        }
        localStorage.removeItem(LOCAL_KEY)
        if (syncedFor.current === userEmail) setProductIds([...serverIds, ...uploaded])
      } catch {
        syncedFor.current = null
      }
    }
    void run()
  }, [userEmail, isReady])

  const toggle = useCallback((productId: string) => {
    setProductIds(prev => flip(prev, productId))
    if (userEmail) {
      api.post(`/wishlist/${productId}`).catch(() => setProductIds(prev => flip(prev, productId)))
    }
  }, [userEmail])

  const isWishlisted = (productId: string) => productIds.includes(productId)

  return <WishlistContext.Provider value={{ productIds, toggle, isWishlisted }}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider')
  return context
}


// import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// interface WishlistContextType {
//   productIds: string[]
//   toggle: (productId: string) => void
//   isWishlisted: (productId: string) => boolean
// }

// const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

// export function WishlistProvider({ children }: { children: ReactNode }) {
//   const [productIds, setProductIds] = useState<string[]>(() => {
//     try { return JSON.parse(localStorage.getItem('rafiq-wishlist') ?? '[]') } catch { return [] }
//   })

//   useEffect(() => { localStorage.setItem('rafiq-wishlist', JSON.stringify(productIds)) }, [productIds])

//   const toggle = (productId: string) => {
//     setProductIds(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId])
//   }
//   const isWishlisted = (productId: string) => productIds.includes(productId)

//   return <WishlistContext.Provider value={{ productIds, toggle, isWishlisted }}>{children}</WishlistContext.Provider>
// }

// export function useWishlist() {
//   const context = useContext(WishlistContext)
//   if (!context) throw new Error('useWishlist must be used inside WishlistProvider')
//   return context
// }