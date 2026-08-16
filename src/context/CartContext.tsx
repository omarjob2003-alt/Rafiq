import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface CartLine {
  productId: string
  quantity: number
}

interface CartContextType {
  items: CartLine[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(() => {
    try {
      const saved = localStorage.getItem('rafiq-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('rafiq-cart', JSON.stringify(items))
  }, [items])

  const addItem = (productId: string, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.productId === productId)
      if (existing) {
        return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)
      }
      return [...prev, { productId, quantity }]
    })
  }

  const removeItem = (productId: string) => setItems(prev => prev.filter(item => item.productId !== productId))

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) { removeItem(productId); return }
    setItems(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item))
  }

  const clearCart = () => setItems([])
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}