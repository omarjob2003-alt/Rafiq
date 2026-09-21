import { useState, type FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLocalized } from '../../hooks/useLocalized'
import { addReview, hasReviewed } from '../../lib/reviews'
import { StarRatingInput } from '../ui/StarRatingInput'

export function ReviewForm({ productId, onSubmitted }: { productId: string; onSubmitted: () => void }) {
  const { user } = useAuth()
  const { t } = useLocalized()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!user || hasReviewed(productId, user.email)) return null

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (rating === 0) return
    addReview({ productId, userEmail: user.email, userName: user.name, rating, comment })
    setSubmitted(true)
    onSubmitted()
  }

  if (submitted) {
    return <p className="rounded-lg bg-burgundy/[.05] px-4 py-3 text-sm text-burgundy dark:bg-burgundy/15">{t('شكرًا لتقييمك - هيظهر للناس بعد ما نراجعه.', 'Thanks for your review - it will appear once reviewed.')}</p>
  }

  return <form onSubmit={handleSubmit} className="rounded-xl border border-line p-4 dark:border-line-dark">
    <p className="mb-2 text-sm font-medium text-ink dark:text-ink-dark">{t('قيّم المنتج ده', 'Rate this product')}</p>
    <StarRatingInput value={rating} onChange={setRating} />
    <textarea
      value={comment}
      onChange={event => setComment(event.target.value)}
      rows={3}
      placeholder={t('اكتب رأيك (اختياري)', 'Write your thoughts (optional)')}
      className="mt-3 w-full resize-none rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
    />
    <button type="submit" disabled={rating === 0} className="mt-3 rounded-lg bg-burgundy px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-burgundy-dark disabled:cursor-not-allowed disabled:opacity-50">
      {t('إرسال التقييم', 'Submit review')}
    </button>
  </form>
}