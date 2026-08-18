import { Star } from 'lucide-react'
import { cn } from '../../lib/cn'

export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={size} className={cn(star <= Math.round(rating) ? 'fill-gold text-gold' : 'fill-none text-line dark:text-line-dark')} />)}
  </div>
}