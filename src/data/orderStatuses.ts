import { CheckCheck, CircleCheck, MapPin, Package, Truck } from 'lucide-react'

export type OrderStatus = 'received' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered'

export const orderStatuses: { id: OrderStatus; icon: typeof CircleCheck; ar: string; en: string }[] = [
  { id: 'received', icon: CircleCheck, ar: 'طلبك تم استلامه', en: 'Order received' },
  { id: 'processing', icon: Package, ar: 'جاري التجهيز', en: 'Being prepared' },
  { id: 'shipped', icon: Truck, ar: 'تم الشحن', en: 'Shipped' },
  { id: 'out_for_delivery', icon: MapPin, ar: 'خرج للتوصيل', en: 'Out for delivery' },
  { id: 'delivered', icon: CheckCheck, ar: 'تم التسليم', en: 'Delivered' },
]

export function getStatusIndex(status: OrderStatus) {
  return orderStatuses.findIndex(s => s.id === status)
}