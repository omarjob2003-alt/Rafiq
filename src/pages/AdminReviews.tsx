import { useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { getPendingReviews, approveReview, rejectReview } from '../lib/reviews'
import { products } from '../data/products'
import { StarRating } from '../components/ui/StarRating'
import { AdminLayout } from '../components/admin/AdminLayout'

export function AdminReviews() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('التقييمات', 'Reviews'))
  const [pending, setPending] = useState(getPendingReviews())

  const handleApprove = (id: string) => { approveReview(id); setPending(getPendingReviews()) }
  const handleReject = (id: string) => { rejectReview(id); setPending(getPendingReviews()) }

  return <AdminLayout>
    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('تقييمات في انتظار المراجعة', 'Reviews awaiting approval')}</h2>

    {pending.length === 0
      ? <p className="mt-10 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش تقييمات محتاجة مراجعة دلوقتي.', 'No reviews awaiting review right now.')}</p>
      : <div className="mt-6 space-y-4">
        {pending.map(review => {
          const product = products.find(p => p.id === review.productId)
          return <div key={review.id} className="rounded-xl border border-line p-4 dark:border-line-dark">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {product && <img src={product.image} alt="" className="size-10 rounded-lg object-cover" />}
                <div>
                  <p className="text-sm font-medium text-ink dark:text-ink-dark">{product ? (isArabic ? product.name : product.id) : review.productId}</p>
                  <p className="text-xs text-muted dark:text-muted-dark">{review.userName} · {new Date(review.date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB')}</p>
                </div>
              </div>
              <StarRating rating={review.rating} size={14} />
            </div>
            {review.comment && <p className="mt-3 text-sm leading-7 text-ink/85 dark:text-ink-dark/85">{review.comment}</p>}
            <div className="mt-3 flex gap-2">
              <button onClick={() => handleApprove(review.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-burgundy px-4 py-2 text-xs font-medium text-cream transition hover:bg-burgundy-dark"><Check size={14} /> {t('موافقة ونشر', 'Approve & publish')}</button>
              <button onClick={() => handleReject(review.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-xs text-ink transition hover:border-burgundy hover:text-burgundy dark:border-line-dark dark:text-ink-dark"><Trash2 size={14} /> {t('رفض وحذف', 'Reject & delete')}</button>
            </div>
          </div>
        })}
      </div>}
  </AdminLayout>
}