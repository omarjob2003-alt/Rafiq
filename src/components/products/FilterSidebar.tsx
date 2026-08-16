import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import { useLanguage } from '../../context/LanguageContext'
import { collections } from '../../data/collections'
import { usageTags, colorOptions } from '../../data/filters'
import { cn } from '../../lib/cn'

export interface FiltersState {
  categoryId: string | null
  usage: string[]
  colors: string[]
  maxPrice: number
}

const MAX_PRICE = 2000

export function createDefaultFilters(): FiltersState {
  return { categoryId: null, usage: [], colors: [], maxPrice: MAX_PRICE }
}

function FilterFields({ filters, onChange }: { filters: FiltersState; onChange: (next: FiltersState) => void }) {
  const { t, isArabic } = useLocalized()
  const toggleUsage = (id: string) => onChange({ ...filters, usage: filters.usage.includes(id) ? filters.usage.filter(item => item !== id) : [...filters.usage, id] })
  const toggleColor = (hex: string) => onChange({ ...filters, colors: filters.colors.includes(hex) ? filters.colors.filter(item => item !== hex) : [...filters.colors, hex] })

  return <div className="space-y-7">
    <div>
      <h3 className="mb-3 font-ar-heading text-sm font-semibold text-ink dark:text-ink-dark">{t('الفئة', 'Category')}</h3>
      <div className="space-y-2.5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/80 dark:text-ink-dark/80">
          <input type="radio" checked={filters.categoryId === null} onChange={() => onChange({ ...filters, categoryId: null })} className="accent-burgundy" />
          {t('الكل', 'All')}
        </label>
        {collections.map(collection => <label key={collection.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/80 dark:text-ink-dark/80">
          <input type="radio" checked={filters.categoryId === collection.id} onChange={() => onChange({ ...filters, categoryId: collection.id })} className="accent-burgundy" />
          {isArabic ? collection.name : collection.nameEn}
        </label>)}
      </div>
    </div>

    <div>
      <h3 className="mb-3 font-ar-heading text-sm font-semibold text-ink dark:text-ink-dark">{t('الاستخدام', 'Usage')}</h3>
      <div className="space-y-2.5">
        {usageTags.map(tag => <label key={tag.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/80 dark:text-ink-dark/80">
          <input type="checkbox" checked={filters.usage.includes(tag.id)} onChange={() => toggleUsage(tag.id)} className="accent-burgundy" />
          {isArabic ? tag.ar : tag.en}
        </label>)}
      </div>
    </div>

    <div>
      <h3 className="mb-3 font-ar-heading text-sm font-semibold text-ink dark:text-ink-dark">{t('السعر', 'Price')}</h3>
      <input type="range" min={0} max={MAX_PRICE} step={50} value={filters.maxPrice} onChange={event => onChange({ ...filters, maxPrice: Number(event.target.value) })} className="w-full accent-burgundy" />
      <div className="mt-2 flex justify-between text-xs text-muted dark:text-muted-dark">
        <span>0 {t('جنيه', 'EGP')}</span>
        <span>{filters.maxPrice} {t('جنيه', 'EGP')}</span>
      </div>
    </div>

    <div>
      <h3 className="mb-3 font-ar-heading text-sm font-semibold text-ink dark:text-ink-dark">{t('اللون', 'Color')}</h3>
      <div className="flex flex-wrap gap-2.5">
        {colorOptions.map(color => <button key={color.hex} onClick={() => toggleColor(color.hex)} aria-label={isArabic ? color.ar : color.en} style={{ backgroundColor: color.hex }} className={cn('size-8 rounded-full ring-2 ring-offset-2 ring-offset-cream transition dark:ring-offset-cream-dark', filters.colors.includes(color.hex) ? 'ring-burgundy' : 'ring-transparent')} />)}
      </div>
    </div>

    <button onClick={() => onChange(createDefaultFilters())} className="text-sm text-muted underline underline-offset-4 hover:text-burgundy dark:text-muted-dark">
      {t('إعادة تعيين الفلاتر', 'Reset filters')}
    </button>
  </div>
}

export function FilterSidebar({ filters, onChange }: { filters: FiltersState; onChange: (next: FiltersState) => void }) {
  const { t } = useLocalized()
  const { dir } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  return <>
    <aside className="hidden w-64 shrink-0 lg:block">
      <h2 className="mb-5 font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('تصفية المنتجات', 'Filter products')}</h2>
      <FilterFields filters={filters} onChange={onChange} />
    </aside>

    <button onClick={() => setMobileOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-ink dark:border-line-dark dark:text-ink-dark lg:hidden">
      <SlidersHorizontal size={16} /> {t('تصفية المنتجات', 'Filters')}
    </button>

    <AnimatePresence>
      {mobileOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm lg:hidden">
        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: .35, ease: [0.16, 1, 0.3, 1] }} onClick={event => event.stopPropagation()} dir={dir} className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream p-6 dark:bg-cream-dark">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('تصفية المنتجات', 'Filters')}</h2>
            <button onClick={() => setMobileOpen(false)} aria-label={t('إغلاق', 'Close')} className="grid size-9 place-items-center rounded-full hover:bg-burgundy/5"><X size={18} /></button>
          </div>
          <FilterFields filters={filters} onChange={onChange} />
          <button onClick={() => setMobileOpen(false)} className="mt-7 w-full rounded-lg bg-burgundy py-3.5 text-sm font-medium text-cream">{t('تطبيق الفلاتر', 'Apply filters')}</button>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>
}