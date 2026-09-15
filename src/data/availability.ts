import type { ProductAvailability } from '../types'

export const availabilityLabels: Record<ProductAvailability, { ar: string; en: string; tone: 'muted' | 'burgundy' | 'gold' }> = {
  available: { ar: 'متوفر', en: 'Available', tone: 'muted' },
  limited: { ar: 'كمية محدودة', en: 'Limited stock', tone: 'burgundy' },
  made_to_order: { ar: 'قيد التصنيع', en: 'Made to order', tone: 'gold' },
  unavailable: { ar: 'غير متوفر', en: 'Unavailable', tone: 'muted' },
}

export function isPurchasable(availability: ProductAvailability | undefined) {
  return availability !== 'unavailable'
}