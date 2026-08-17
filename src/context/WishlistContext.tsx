import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface WishlistContextType {
  productIds: string[]
  toggle: (productId: string) => void
  isWishlisted: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('rafiq-wishlist') ?? '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('rafiq-wishlist', JSON.stringify(productIds)) }, [productIds])

  const toggle = (productId: string) => {
    setProductIds(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId])
  }
  const isWishlisted = (productId: string) => productIds.includes(productId)

  return <WishlistContext.Provider value={{ productIds, toggle, isWishlisted }}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider')
  return context
}