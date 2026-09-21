import type { Product, ProductAvailability, StockMode } from '../types'
import { logStockChange, type StockChangeReason } from './stockLog'

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
  stock?: number
  lowStockThreshold?: number
  stockMode?: StockMode
  availability?: ProductAvailability
}

const EDITS_KEY = 'rafiq-product-edits'
const CUSTOM_KEY = 'rafiq-custom-products'
const DELETED_KEY = 'rafiq-deleted-products'

function getEdits(): Record<string, ProductEdit> {
  try { return JSON.parse(localStorage.getItem(EDITS_KEY) ?? '{}') } catch { return {} }
}
function getCustom(): Product[] {
  try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) ?? '[]') } catch { return [] }
}
function getDeleted(): string[] {
  try { return JSON.parse(localStorage.getItem(DELETED_KEY) ?? '[]') } catch { return [] }
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
    const custom = getCustom().map(p => p.id === id ? { ...p, ...edit } : p)
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom))
  }
  const edits = getEdits()
  edits[id] = { ...edits[id], ...edit }
  localStorage.setItem(EDITS_KEY, JSON.stringify(edits))

  const target = products.find(p => p.id === id)
  if (target) Object.assign(target, edit)
}

export function setProductOverride(id: string, edit: ProductEdit, products: Product[]) {
  const stockMode = edit.availability === 'made_to_order' ? 'made_to_order' : edit.availability === 'unavailable' ? 'discontinued' : edit.availability ? 'stock' : edit.stockMode
  updateProduct(id, { ...edit, stockMode }, products)
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

// Ø£Ù‡Ù… ÙØ§Ù†ÙƒØ´Ù† Ø¬Ø¯ÙŠØ¯Ø© - Ø£ÙŠ ØªØºÙŠÙŠØ± ÙÙŠ Ø±Ù‚Ù… Ø§Ù„Ù…Ø®Ø²ÙˆÙ† Ù„Ø§Ø²Ù… ÙŠØ¹Ø¯ÙŠ Ù…Ù† Ù‡Ù†Ø§ Ø¹Ø´Ø§Ù† ÙŠØªØ³Ø¬Ù„ ÙÙŠ Ø§Ù„Ù„ÙˆØ¬
export function adjustStock(productId: string, delta: number, reason: StockChangeReason, products: Product[], note?: string) {
  const product = products.find(p => p.id === productId)
  if (!product || product.stockMode !== 'stock') return
  const nextStock = Math.max(0, product.stock + delta)
  updateProduct(productId, { stock: nextStock }, products)
  logStockChange(productId, delta, reason, nextStock, note)
}

export function applyProductOverrides(products: Product[]) {
  const edits = getEdits()
  const deleted = new Set(getDeleted())

  for (let i = products.length - 1; i >= 0; i--) {
    const product = products[i]
    if (deleted.has(product.id)) {
      products.splice(i, 1)
      continue
    }
    const edit = edits[product.id]
    if (edit) Object.assign(product, edit)
  }

  const custom = getCustom().filter(p => !deleted.has(p.id))
  custom.forEach(p => {
    if (!products.some(existing => existing.id === p.id)) products.push(p)
  })
}