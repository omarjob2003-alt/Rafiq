import type { ProductAvailability } from '../types'

export const availabilityLabels: Record<ProductAvailability, { ar: string; en: string; tone: 'muted' | 'burgundy' | 'gold'; leadTimeAr?: string; leadTimeEn?: string }> = {
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

export function isPurchasable(availability: ProductAvailability | undefined) {
  return availability !== 'unavailable'
}

export function isMadeToOrder(availability: ProductAvailability | undefined) {
  return availability === 'made_to_order'
}

export function hasMadeToOrderItem(items: { availability?: ProductAvailability }[]) {
  return items.some(item => item.availability === 'made_to_order')
}