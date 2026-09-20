import type { Order } from '../context/OrdersContext'
import { products } from '../data/products'

export function getTopProducts(orders: Order[], limit = 5) {
  const counts = new Map<string, number>()
  orders.forEach(order => {
    order.lines.forEach(line => {
      counts.set(line.productId, (counts.get(line.productId) ?? 0) + line.quantity)
    })
  })
  return Array.from(counts.entries())
    .map(([productId, quantity]) => ({ product: products.find(p => p.id === productId), quantity }))
    .filter((entry): entry is { product: NonNullable<typeof entry.product>; quantity: number } => Boolean(entry.product))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit)
}

export function getLowStockProducts() {
  return products.filter(product => product.availability === 'limited' || product.availability === 'unavailable')
}

export function getSalesByDay(orders: Order[], days = 14) {
  const buckets = new Map<string, number>()
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const key = date.toISOString().slice(0, 10)
    buckets.set(key, 0)
  }

  orders.forEach(order => {
    const key = order.date.slice(0, 10)
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + order.total)
  })

  return Array.from(buckets.entries()).map(([date, total]) => ({
    label: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    value: total,
  }))
}

export interface CustomerSummary {
  email: string
  name: string
  orderCount: number
  totalSpent: number
  lastOrderDate: string
}

export function getRecentCustomers(orders: Order[], limit = 6): CustomerSummary[] {
  const map = new Map<string, CustomerSummary>()
  orders.forEach(order => {
    if (!order.customerEmail) return
    const existing = map.get(order.customerEmail)
    if (existing) {
      existing.orderCount += 1
      existing.totalSpent += order.total
      if (order.date > existing.lastOrderDate) existing.lastOrderDate = order.date
    } else {
      map.set(order.customerEmail, {
        email: order.customerEmail,
        name: order.customerName || order.customerEmail,
        orderCount: 1,
        totalSpent: order.total,
        lastOrderDate: order.date,
      })
    }
  })
  return Array.from(map.values()).sort((a, b) => b.lastOrderDate.localeCompare(a.lastOrderDate)).slice(0, limit)
}