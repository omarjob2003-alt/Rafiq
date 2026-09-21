export type StockChangeReason = 'sale' | 'return' | 'manual' | 'cancellation'

export interface StockLogEntry {
  id: string
  productId: string
  change: number
  reason: StockChangeReason
  note?: string
  date: string
  resultingStock: number
}

const KEY = 'rafiq-stock-log'

function getAll(): StockLogEntry[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}
function saveAll(entries: StockLogEntry[]) { localStorage.setItem(KEY, JSON.stringify(entries)) }

export function logStockChange(productId: string, change: number, reason: StockChangeReason, resultingStock: number, note?: string) {
  const entries = getAll()
  entries.unshift({ id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, productId, change, reason, note, date: new Date().toISOString(), resultingStock })
  saveAll(entries)
}

export function getStockLog(productId?: string): StockLogEntry[] {
  const all = getAll()
  return productId ? all.filter(entry => entry.productId === productId) : all
}