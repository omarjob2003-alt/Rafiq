export type ReturnType = 'return' | 'exchange'
export type ReturnStatus = 'pending' | 'approved' | 'rejected' | 'completed'

export interface ReturnRequest {
  id: string
  orderId: string
  userEmail: string
  productId: string
  quantity: number
  type: ReturnType
  reason: string
  date: string
  status: ReturnStatus
}

const KEY = 'rafiq-return-requests'

function getAll(): ReturnRequest[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}
function saveAll(requests: ReturnRequest[]) { localStorage.setItem(KEY, JSON.stringify(requests)) }

export function addReturnRequest(data: Omit<ReturnRequest, 'id' | 'date' | 'status'>) {
  const requests = getAll()
  requests.push({ ...data, id: `ret-${Date.now()}`, date: new Date().toISOString(), status: 'pending' })
  saveAll(requests)
}

export function getUserReturnRequests(userEmail: string): ReturnRequest[] {
  return getAll().filter(r => r.userEmail === userEmail).sort((a, b) => b.date.localeCompare(a.date))
}

export function getAllReturnRequests(): ReturnRequest[] {
  return getAll().sort((a, b) => b.date.localeCompare(a.date))
}

export function updateReturnStatus(id: string, status: ReturnStatus) {
  saveAll(getAll().map(r => r.id === id ? { ...r, status } : r))
}

export function hasReturnRequest(orderId: string, productId: string): boolean {
  return getAll().some(r => r.orderId === orderId && r.productId === productId)
}