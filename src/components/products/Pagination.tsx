import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../lib/cn'

export function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (page: number) => void }) {
  const { dir } = useLanguage()
  if (totalPages <= 1) return null
  const Prev = dir === 'rtl' ? ChevronRight : ChevronLeft
  const Next = dir === 'rtl' ? ChevronLeft : ChevronRight

  return <div className="mt-12 flex items-center justify-center gap-2">
    <button disabled={page === 1} onClick={() => onChange(page - 1)} className="grid size-9 place-items-center rounded-full border border-line text-ink disabled:opacity-30 dark:border-line-dark dark:text-ink-dark"><Prev size={16} /></button>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => <button key={number} onClick={() => onChange(number)} className={cn('grid size-9 place-items-center rounded-full text-sm transition', page === number ? 'bg-burgundy text-cream' : 'text-ink hover:bg-burgundy/5 dark:text-ink-dark')}>{number}</button>)}
    <button disabled={page === totalPages} onClick={() => onChange(page + 1)} className="grid size-9 place-items-center rounded-full border border-line text-ink disabled:opacity-30 dark:border-line-dark dark:text-ink-dark"><Next size={16} /></button>
  </div>
}