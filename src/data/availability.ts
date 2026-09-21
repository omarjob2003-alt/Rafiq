import type { Product, EffectiveAvailability } from '../types'

export const DEFAULT_LOW_STOCK_THRESHOLD = 5

export const availabilityLabels: Record<EffectiveAvailability, { ar: string; en: string; tone: 'muted' | 'burgundy' | 'gold'; leadTimeAr?: string; leadTimeEn?: string }> = {
  available: { ar: 'متوفر', en: 'Available', tone: 'muted' },
  limited: { ar: 'كمية محدودة', en: 'Limited stock', tone: 'burgundy' },
  made_to_order: {
    ar: 'بيتصنّع خصيصًا لك',
    en: 'Made just for you',
    tone: 'gold',
    leadTimeAr: 'التوصيل خلال ١٠ إلى ١٤ يوم عمل',
    leadTimeEn: 'Delivered within 10–14 business days',
  },
  unavailable: { ar: 'قريبًا يرجع تاني', en: 'Back soon', tone: 'muted' },
}

export function getEffectiveAvailability(product: Product): EffectiveAvailability {
  if (product.stockMode === 'made_to_order') return 'made_to_order'
  if (product.stockMode === 'discontinued') return 'unavailable'
  const threshold = product.lowStockThreshold ?? DEFAULT_LOW_STOCK_THRESHOLD
  if (product.stock <= 0) return 'unavailable'
  if (product.stock <= threshold) return 'limited'
  return 'available'
}

export function isPurchasable(product: Product) {
  return getEffectiveAvailability(product) !== 'unavailable'
}

export function isMadeToOrder(product: Product) {
  return product.stockMode === 'made_to_order'
}

export function hasMadeToOrderItem(items: Product[]) {
  return items.some(p => p.stockMode === 'made_to_order')
}

export function getMaxOrderQuantity(product: Product): number {
  if (product.stockMode !== 'stock') return 99
  return Math.max(0, product.stock)
}