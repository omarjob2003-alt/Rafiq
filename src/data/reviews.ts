export interface Review {
  id: string
  nameAr: string
  nameEn: string
  rating: number
  commentAr: string
  commentEn: string
  date: string
}

export const reviewPool: Review[] = [
  { id: 'r1', nameAr: 'أحمد س.', nameEn: 'Ahmed S.', rating: 5, commentAr: 'جودة عالية جدًا وأحسن من المتوقع. المكتب بقى شكله تاني خالص.', commentEn: 'Very high quality, better than expected. My desk looks completely different now.', date: '2026-06-10' },
  { id: 'r2', nameAr: 'مريم ع.', nameEn: 'Mariam A.', rating: 4, commentAr: 'حلو ومريح، بس التوصيل اتأخر يوم عن الميعاد.', commentEn: 'Nice and comfortable, but delivery was a day late.', date: '2026-05-22' },
  { id: 'r3', nameAr: 'يوسف م.', nameEn: 'Youssef M.', rating: 5, commentAr: 'من أحسن حاجات اشتريتها لمكتبي. تفاصيل الخامة حسيتها فعلًا.', commentEn: 'One of the best things I bought for my desk. You can really feel the material quality.', date: '2026-04-30' },
  { id: 'r4', nameAr: 'سارة ن.', nameEn: 'Sara N.', rating: 4, commentAr: 'تصميم بسيط وأنيق، بيناسب أي مكتب.', commentEn: 'Simple, elegant design that fits any desk.', date: '2026-04-02' },
]

function hashId(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 1000
  return hash
}

export function getProductRating(productId: string) {
  const hash = hashId(productId)
  const average = 4.2 + (hash % 8) / 10
  const count = 24 + (hash % 140)
  return { average: Math.round(average * 10) / 10, count }
}

export function getProductReviews(productId: string) {
  const hash = hashId(productId)
  const start = hash % reviewPool.length
  return [reviewPool[start], reviewPool[(start + 1) % reviewPool.length], reviewPool[(start + 2) % reviewPool.length]]
}