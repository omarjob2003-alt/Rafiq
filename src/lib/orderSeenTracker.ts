import type { OrderStatus } from '../data/orderStatuses'

const KEY = 'rafiq-order-seen-status'

function getMap(): Record<string, OrderStatus> {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') } catch { return {} }
}

export function getSeenStatus(orderId: string): OrderStatus | undefined {
  return getMap()[orderId]
}

export function markOrderSeen(orderId: string, status: OrderStatus) {
  const map = getMap()
  map[orderId] = status
  localStorage.setItem(KEY, JSON.stringify(map))
}