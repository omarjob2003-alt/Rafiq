
export interface RestockRequest {
  productId: string
  email: string
  date: string
}

const KEY = 'rafiq-restock-requests'

function getAll(): RestockRequest[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}

export function addRestockRequest(productId: string, email: string) {
  const all = getAll()
  if (all.some(request => request.productId === productId && request.email.toLowerCase() === email.toLowerCase())) return
  all.push({ productId, email, date: new Date().toISOString() })
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function getRestockRequests(): RestockRequest[] {
  return getAll()
}

export function getRestockCount(productId: string): number {
  return getAll().filter(request => request.productId === productId).length
}