import type { Product, ProductAvailability } from '../types'

export interface ProductOverride {
  availability?: ProductAvailability
  stock?: number
}

export interface ProductEdit {
  name?: string
  nameEn?: string
  description?: string
  descriptionEn?: string
  price?: number
  image?: string
  categoryIds?: string[]
  colors?: string[]
  usage?: string[]
  availability?: ProductAvailability
  stock?: number
}

const OVERRIDES_KEY = 'rafiq-product-overrides'
const EDITS_KEY = 'rafiq-product-edits'
const CUSTOM_KEY = 'rafiq-custom-products'
const DELETED_KEY = 'rafiq-deleted-products'

function getOverrides(): Record<string, ProductOverride> {
  try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) ?? '{}') } catch { return {} }
}
function getEdits(): Record<string, ProductEdit> {
  try { return JSON.parse(localStorage.getItem(EDITS_KEY) ?? '{}') } catch { return {} }
}
function getCustom(): Product[] {
  try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) ?? '[]') } catch { return [] }
}
function getDeleted(): string[] {
  try { return JSON.parse(localStorage.getItem(DELETED_KEY) ?? '[]') } catch { return [] }
}

// حافظنا عليها زي ما هي عشان صفحة "حالة المنتج" القديمة تفضل شغالة من غير تغيير
export function setProductOverride(productId: string, override: ProductOverride, products: Product[]) {
  const overrides = getOverrides()
  overrides[productId] = override
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides))
  const product = products.find(p => p.id === productId)
  if (product) {
    product.availability = override.availability
    product.stock = override.stock
  }
}

export function isCustomProduct(id: string): boolean {
  return getCustom().some(p => p.id === id)
}

export function addCustomProduct(product: Product, nameEn: string, descriptionEn: string, products: Product[]) {
  const custom = getCustom()
  custom.push(product)
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom))

  const edits = getEdits()
  edits[product.id] = { nameEn, descriptionEn }
  localStorage.setItem(EDITS_KEY, JSON.stringify(edits))

  products.push(product)
}

export function updateProduct(id: string, edit: ProductEdit, products: Product[]) {
  if (isCustomProduct(id)) {
    const custom = getCustom().map(p => p.id === id ? { ...p, ...edit, name: edit.name ?? p.name, description: edit.description ?? p.description } : p)
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom))
  }
  const edits = getEdits()
  edits[id] = { ...edits[id], ...edit }
  localStorage.setItem(EDITS_KEY, JSON.stringify(edits))

  const target = products.find(p => p.id === id)
  if (target) Object.assign(target, edit)
}

export function deleteProduct(id: string, products: Product[]) {
  const deleted = getDeleted()
  if (!deleted.includes(id)) deleted.push(id)
  localStorage.setItem(DELETED_KEY, JSON.stringify(deleted))

  const custom = getCustom().filter(p => p.id !== id)
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom))

  const index = products.findIndex(p => p.id === id)
  if (index !== -1) products.splice(index, 1)
}

export function getEnglishEdit(id: string): { nameEn?: string; descriptionEn?: string } {
  return getEdits()[id] ?? {}
}

export function applyProductOverrides(products: Product[]) {
  const overrides = getOverrides()
  const edits = getEdits()
  const deleted = new Set(getDeleted())

  for (let i = products.length - 1; i >= 0; i--) {
    const product = products[i]
    if (deleted.has(product.id)) {
      products.splice(i, 1)
      continue
    }
    const override = overrides[product.id]
    if (override) {
      product.availability = override.availability
      product.stock = override.stock
    }
    const edit = edits[product.id]
    if (edit) Object.assign(product, edit)
  }

  const custom = getCustom().filter(p => !deleted.has(p.id))
  custom.forEach(p => {
    if (!products.some(existing => existing.id === p.id)) products.push(p)
  })
}