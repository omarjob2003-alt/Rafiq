export const coupons: Record<string, number> = { RAFIQ10: 0.1, WELCOME50: 50 }

export function calculateDiscount(subtotal: number, code: string | null) {
  if (!code || !(code in coupons)) return 0
  const value = coupons[code]
  return value < 1 ? Math.round(subtotal * value) : Math.min(value, subtotal)
}