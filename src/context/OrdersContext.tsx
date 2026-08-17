import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface OrderLine { productId: string; quantity: number; price: number }
export interface Order { id: string; date: string; lines: OrderLine[]; total: number; status: 'processing' }

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => string
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem('rafiq-orders') ?? '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('rafiq-orders', JSON.stringify(orders)) }, [orders])

  const addOrder: OrdersContextType['addOrder'] = (order) => {
    const id = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`
    setOrders(prev => [{ ...order, id, date: new Date().toISOString(), status: 'processing' }, ...prev])
    return id
  }

  return <OrdersContext.Provider value={{ orders, addOrder }}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) throw new Error('useOrders must be used inside OrdersProvider')
  return context
}