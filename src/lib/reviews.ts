export interface Review {
  id: string
  productId: string
  userEmail: string
  userName: string
  rating: number
  comment: string
  date: string
  approved: boolean
}

const KEY = 'rafiq-reviews'

function getAll(): Review[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}
function saveAll(reviews: Review[]) { localStorage.setItem(KEY, JSON.stringify(reviews)) }

export function addReview(data: Omit<Review, 'id' | 'date' | 'approved'>) {
  const reviews = getAll()
  reviews.push({ ...data, id: `rev-${Date.now()}`, date: new Date().toISOString(), approved: false })
  saveAll(reviews)
}

export function getApprovedReviews(productId: string): Review[] {
  return getAll().filter(r => r.productId === productId && r.approved).sort((a, b) => b.date.localeCompare(a.date))
}

export function getPendingReviews(): Review[] {
  return getAll().filter(r => !r.approved)
}

export function approveReview(id: string) {
  saveAll(getAll().map(r => r.id === id ? { ...r, approved: true } : r))
}

export function rejectReview(id: string) {
  saveAll(getAll().filter(r => r.id !== id))
}

export function hasReviewed(productId: string, userEmail: string): boolean {
  return getAll().some(r => r.productId === productId && r.userEmail.toLowerCase() === userEmail.toLowerCase())
}

export function getProductRatingSummary(productId: string) {
  const reviews = getApprovedReviews(productId)
  if (reviews.length === 0) return { average: 0, count: 0 }
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  return { average: Math.round(average * 10) / 10, count: reviews.length }
}