import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { OrderStatus } from '../data/orderStatuses'

export interface OrderLine { productId: string; quantity: number; price: number }

export interface Order {
  id: string
  date: string
  lines: OrderLine[]
  total: number
  status: OrderStatus
  userEmail: string | null
  customerName: string
  customerEmail: string
  customerPhone: string
  altPhone: string
  addressText: string
}

type NewOrder = Omit<Order, 'id' | 'date' | 'status'>

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: NewOrder) => string
  updateStatus: (orderId: string, status: OrderStatus) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem('rafiq-orders') ?? '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('rafiq-orders', JSON.stringify(orders)) }, [orders])

  const addOrder: OrdersContextType['addOrder'] = (order) => {
    const id = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`
    setOrders(prev => [{ ...order, id, date: new Date().toISOString(), status: 'received' }, ...prev])
    return id
  }

  const updateStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status } : order))
  }

  return <OrdersContext.Provider value={{ orders, addOrder, updateStatus }}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) throw new Error('useOrders must be used inside OrdersProvider')
  return context
}