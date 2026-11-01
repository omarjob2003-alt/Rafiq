import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { api } from '../lib/apiClient'
import { useAuth } from './AuthContext'
import { coupons } from '../data/coupons'

export interface CartLine {
  productId: string
  quantity: number
}

interface CartDto {
  items: { productId: string; quantity: number }[]
  couponCode: string | null
}

interface CartContextType {
  items: CartLine[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  couponCode: string | null
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: () => void
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  refreshCart: () => Promise<void>
}

const LOCAL_CART = 'rafiq-cart'
const LOCAL_COUPON = 'rafiq-coupon'
const CartContext = createContext<CartContextType | undefined>(undefined)

function readLocalItems(): CartLine[] {
  try { return JSON.parse(localStorage.getItem(LOCAL_CART) ?? '[]') } catch { return [] }
}
function readLocalCoupon(): string | null {
  return localStorage.getItem(LOCAL_COUPON)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth()
  const userEmail = user?.email ?? null
  const [items, setItems] = useState<CartLine[]>(readLocalItems)
  const [couponCode, setCouponCode] = useState<string | null>(readLocalCoupon)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const syncedFor = useRef<string | null>(null)
  const pending = useRef(0)

  const applyServerCart = useCallback((dto: CartDto) => {
    setItems(dto.items.map(item => ({ productId: item.productId, quantity: item.quantity })))
    setCouponCode(dto.couponCode ?? null)
  }, [])

  const refreshCart = useCallback(async () => {
    try { applyServerCart(await api.get<CartDto>('/cart')) } catch { /* نسيب الحالة زي ما هي */ }
  }, [applyServerCart])

  // زائر: نحفظ محليًا
  useEffect(() => {
    if (userEmail || !isReady) return
    localStorage.setItem(LOCAL_CART, JSON.stringify(items))
    if (couponCode) localStorage.setItem(LOCAL_COUPON, couponCode)
    else localStorage.removeItem(LOCAL_COUPON)
  }, [items, couponCode, userEmail, isReady])

  // مسجّل دخول: ندمج سلة الزائر في سلة الحساب مرة واحدة
  useEffect(() => {
    if (!isReady) return
    if (!userEmail) {
      if (syncedFor.current) { setItems([]); setCouponCode(null); syncedFor.current = null }
      return
    }
    if (syncedFor.current === userEmail) return
    syncedFor.current = userEmail

    const run = async () => {
      try {
        const localItems = readLocalItems()
        const localCoupon = readLocalCoupon()
        let dto = await api.get<CartDto>('/cart')
        for (const line of localItems) {
          try { dto = await api.post<CartDto>('/cart/items', { productId: line.productId, quantity: line.quantity }) } catch { /* منتج السيرفر رفضه */ }
        }
        if (localCoupon && !dto.couponCode) {
          try { dto = await api.post<CartDto>('/cart/coupon', { code: localCoupon }) } catch { /* كوبون مش صالح */ }
        }
        localStorage.removeItem(LOCAL_CART)
        localStorage.removeItem(LOCAL_COUPON)
        if (syncedFor.current === userEmail) applyServerCart(dto)
      } catch {
        syncedFor.current = null
      }
    }
    void run()
  }, [userEmail, isReady, applyServerCart])

  // بنطبّق رد السيرفر بس لما مفيش طلبات تانية شغالة، عشان الردود المتأخرة ما ترجّعش حالة قديمة
  const mutate = async (request: () => Promise<CartDto | undefined>) => {
    pending.current += 1
    let dto: CartDto | undefined
    let failed = false
    try { dto = await request() } catch { failed = true }
    pending.current -= 1
    if (pending.current > 0) return
    if (!failed && dto && Array.isArray(dto.items)) applyServerCart(dto)
    else await refreshCart()
  }

  const addItem = (productId: string, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.productId === productId)
      if (existing) return prev.map(item => (item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item))
      return [...prev, { productId, quantity }]
    })
    setIsDrawerOpen(true)
    if (userEmail) void mutate(() => api.post<CartDto>('/cart/items', { productId, quantity }))
  }

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId))
    if (userEmail) void mutate(() => api.delete<CartDto>(`/cart/items/${productId}`))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) { removeItem(productId); return }
    setItems(prev => prev.map(item => (item.productId === productId ? { ...item, quantity } : item)))
    if (userEmail) void mutate(() => api.put<CartDto>(`/cart/items/${productId}`, { quantity }))
  }

  const clearCart = () => {
    setItems([])
    setCouponCode(null)
    if (userEmail) void mutate(() => api.delete<CartDto>('/cart'))
  }

  const applyCoupon = async (code: string): Promise<boolean> => {
    const upper = code.trim().toUpperCase()
    if (!upper) return false
    if (!userEmail) {
      if (!(upper in coupons)) return false
      setCouponCode(upper)
      return true
    }
    try {
      const dto = await api.post<CartDto>('/cart/coupon', { code: upper })
      if (dto && Array.isArray(dto.items)) applyServerCart(dto)
      else await refreshCart()
      return true
    } catch {
      return false
    }
  }

  const removeCoupon = () => {
    setCouponCode(null)
    if (userEmail) void mutate(() => api.delete<CartDto>('/cart/coupon'))
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart, itemCount,
      couponCode, applyCoupon, removeCoupon,
      isDrawerOpen, openDrawer: () => setIsDrawerOpen(true), closeDrawer: () => setIsDrawerOpen(false),
      refreshCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

















// import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
// import { coupons } from '../data/coupons'
// import { products } from '../data/products'
// import { getMaxOrderQuantity, isPurchasable } from '../data/availability'

// export interface CartLine {
//   productId: string
//   quantity: number
// }

// interface CartContextType {
//   items: CartLine[]
//   addItem: (productId: string, quantity?: number) => void
//   removeItem: (productId: string) => void
//   updateQuantity: (productId: string, quantity: number) => void
//   clearCart: () => void
//   itemCount: number
//   couponCode: string | null
//   applyCoupon: (code: string) => boolean
//   removeCoupon: () => void
//   isDrawerOpen: boolean
//   openDrawer: () => void
//   closeDrawer: () => void
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<CartLine[]>(() => {
//     try {
//       const saved = localStorage.getItem('rafiq-cart')
//       return saved ? JSON.parse(saved) : []
//     } catch {
//       return []
//     }
//   })

//   const [isDrawerOpen, setIsDrawerOpen] = useState(false)
//   const openDrawer = () => setIsDrawerOpen(true)
//   const closeDrawer = () => setIsDrawerOpen(false)

//   const [couponCode, setCouponCode] = useState<string | null>(() => localStorage.getItem('rafiq-coupon'))

//   useEffect(() => {
//     if (couponCode) localStorage.setItem('rafiq-coupon', couponCode)
//     else localStorage.removeItem('rafiq-coupon')
//   }, [couponCode])

//   const applyCoupon = (code: string) => {
//     const upper = code.trim().toUpperCase()
//     if (!(upper in coupons)) return false
//     setCouponCode(upper)
//     return true
//   }
//   const removeCoupon = () => setCouponCode(null)

//   useEffect(() => {
//     localStorage.setItem('rafiq-cart', JSON.stringify(items))
//   }, [items])

//   const addItem = (productId: string, quantity = 1) => {
//   setItems(prev => {
//     const existing = prev.find(item => item.productId === productId)
//     if (existing) {
//       return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)
//     }
//     return [...prev, { productId, quantity }]
//   })
//   setIsDrawerOpen(true)
// }

//   const removeItem = (productId: string) => setItems(prev => prev.filter(item => item.productId !== productId))

//   const updateQuantity = (productId: string, quantity: number) => {
//     if (quantity < 1) { removeItem(productId); return }
//     const product = products.find(item => item.id === productId)
//     if (!product || !isPurchasable(product)) return
//     const nextQuantity = Math.min(quantity, getMaxOrderQuantity(product))
//     setItems(prev => prev.map(item => item.productId === productId ? { ...item, quantity: nextQuantity } : item))
//   }

//   const clearCart = () => { setItems([]); removeCoupon() }
//   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

// return (
//   <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, couponCode, applyCoupon, removeCoupon, isDrawerOpen, openDrawer, closeDrawer }}>
//     {children}
//   </CartContext.Provider>
// )
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (!context) throw new Error('useCart must be used inside CartProvider')
//   return context
// }