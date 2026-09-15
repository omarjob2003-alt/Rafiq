import type { Product, ProductAvailability } from '../types'

export interface ProductOverride {
  availability?: ProductAvailability
  stock?: number
}

const KEY = 'rafiq-product-overrides'

function getOverrides(): Record<string, ProductOverride> {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') } catch { return {} }
}

export function setProductOverride(productId: string, override: ProductOverride, products: Product[]) {
  const overrides = getOverrides()
  overrides[productId] = override
  localStorage.setItem(KEY, JSON.stringify(overrides))

  // نطبّق التعديل فورًا على المصفوفة الأصلية عشان يبان في نفس الجلسة من غير ما تحتاج Refresh
  const product = products.find(p => p.id === productId)
  if (product) {
    product.availability = override.availability
    product.stock = override.stock
  }
}

export function applyProductOverrides(products: Product[]) {
  const overrides = getOverrides()
  products.forEach(product => {
    const override = overrides[product.id]
    if (override) {
      if (override.availability !== undefined) product.availability = override.availability
      if (override.stock !== undefined) product.stock = override.stock
    }
  })
}