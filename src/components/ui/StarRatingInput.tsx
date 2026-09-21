import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '../../lib/cn'

export function StarRatingInput({ value, onChange, size = 22 }: { value: number; onChange: (value: number) => void; size?: number }) {
  const [hover, setHover] = useState(0)
  return <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map(star => (
      <button key={star} type="button" onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} onClick={() => onChange(star)} aria-label={String(star)}>
        <Star size={size} className={cn((hover || value) >= star ? 'fill-gold text-gold' : 'fill-none text-line dark:text-line-dark')} />
      </button>
    ))}
  </div>
}