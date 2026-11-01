export interface AbandonedCart {
  userEmail: string
  userName: string
  phone?: string
  items: { productId: string; quantity: number }[]
  updatedAt: string
  contacted: boolean
}

const KEY = 'rafiq-abandoned-carts'

function getAll(): Record<string, AbandonedCart> {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') } catch { return {} }
}
function saveAll(map: Record<string, AbandonedCart>) { localStorage.setItem(KEY, JSON.stringify(map)) }

export function trackCart(userEmail: string, userName: string, phone: string | undefined, items: { productId: string; quantity: number }[]) {
  const all = getAll()
  if (items.length === 0) { delete all[userEmail]; saveAll(all); return }
  const existing = all[userEmail]
  all[userEmail] = { userEmail, userName, phone, items, updatedAt: new Date().toISOString(), contacted: existing?.contacted ?? false }
  saveAll(all)
}

export function clearAbandonedCart(userEmail: string) {
  const all = getAll()
  delete all[userEmail]
  saveAll(all)
}

export function getAbandonedCarts(minMinutesIdle = 30): AbandonedCart[] {
  const all = getAll()
  const cutoff = Date.now() - minMinutesIdle * 60 * 1000
  return Object.values(all)
    .filter(cart => new Date(cart.updatedAt).getTime() < cutoff)
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt))
}

export function markContacted(userEmail: string, contacted: boolean) {
  const all = getAll()
  if (all[userEmail]) { all[userEmail].contacted = contacted; saveAll(all) }
}