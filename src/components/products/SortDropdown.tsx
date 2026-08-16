import { useLocalized } from '../../hooks/useLocalized'

export type SortValue = 'newest' | 'price-asc' | 'price-desc'

const options: { value: SortValue; ar: string; en: string }[] = [
  { value: 'newest', ar: 'الأحدث', en: 'Newest' },
  { value: 'price-asc', ar: 'السعر: من الأقل', en: 'Price: low to high' },
  { value: 'price-desc', ar: 'السعر: من الأعلى', en: 'Price: high to low' },
]

export function SortDropdown({ value, onChange }: { value: SortValue; onChange: (value: SortValue) => void }) {
  const { isArabic, t } = useLocalized()
  return <label className="flex items-center gap-2 text-sm text-ink/80 dark:text-ink-dark/80">
    <span className="hidden sm:inline">{t('ترتيب:', 'Sort:')}</span>
    <select value={value} onChange={event => onChange(event.target.value as SortValue)} className="rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark">
      {options.map(option => <option key={option.value} value={option.value}>{isArabic ? option.ar : option.en}</option>)}
    </select>
  </label>
}