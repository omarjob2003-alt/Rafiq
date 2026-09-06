import { useState } from 'react'
import type { Order } from '../context/OrdersContext'
import { getSeenStatus, markOrderSeen } from '../lib/orderSeenTracker'

export function useOrderStatusUpdates(orders: Order[]) {
  const [, forceRerender] = useState(0)

  const updatedOrderIds = orders
    .filter(order => {
      const seen = getSeenStatus(order.id)
      return seen !== undefined && seen !== order.status
    })
    .map(order => order.id)

  const markAllSeen = () => {
    orders.forEach(order => markOrderSeen(order.id, order.status))
    forceRerender(v => v + 1)
  }

  return { updatedOrderIds, unseenCount: updatedOrderIds.length, markAllSeen }
}