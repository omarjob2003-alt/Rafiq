import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import { productsEn } from '../../data/products'
import { articlesEn } from '../../data/content'
import { searchAll } from '../../lib/search'

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { isArabic, t } = useLocalized()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = searchAll(query)
  const hasQuery = query.trim().length > 0
  const hasResults = results.products.length || results.collections.length || results.articles.length

  const goToFullSearch = () => {
    if (!hasQuery) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    onClose()
  }

  return <AnimatePresence>
    {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[75] bg-ink/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: .3, ease: [0.16, 1, 0.3, 1] }}
        onClick={event => event.stopPropagation()}
        className="mx-auto mt-8 w-[92%] max-w-2xl overflow-hidden rounded-2xl bg-cream shadow-2xl dark:bg-cream-dark md:mt-24"
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4 dark:border-line-dark">
          <SearchIcon size={18} className="text-muted dark:text-muted-dark" />
          <input
            ref={inputRef}
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => { if (event.key === 'Enter') goToFullSearch() }}
            placeholder={t('دور على منتج، مجموعة، أو مقال...', 'Search for a product, collection, or article...')}
            className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted dark:text-ink-dark dark:placeholder:text-muted-dark"
          />
          <button onClick={onClose} aria-label={t('إغلاق', 'Close')} className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-burgundy/5"><X size={17} /></button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          {!hasQuery && <p className="py-8 text-center text-sm text-muted dark:text-muted-dark">{t('ابدأ الكتابة عشان تشوف النتائج', 'Start typing to see results')}</p>}

          {hasQuery && !hasResults && <p className="py-8 text-center text-sm text-muted dark:text-muted-dark">{t(`مفيش نتائج لـ "${query}"`, `No results for "${query}"`)}</p>}

          {results.products.length > 0 && <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">{t('منتجات', 'Products')}</p>
            <div className="space-y-1">
              {results.products.slice(0, 4).map(product => {
                const en = productsEn[product.id]
                return <a key={product.id} href={`/products/${product.id}`} onClick={onClose} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-burgundy/5">
                  <img src={product.image} alt="" className="size-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink dark:text-ink-dark">{isArabic ? product.name : en.name}</p>
                    <p className="text-xs text-muted dark:text-muted-dark">{product.price} {t('جنيه', 'EGP')}</p>
                  </div>
                </a>
              })}
            </div>
          </div>}

          {results.collections.length > 0 && <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">{t('مجموعات', 'Collections')}</p>
            <div className="space-y-1">
              {results.collections.map(collection => <a key={collection.id} href={collection.href} onClick={onClose} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-burgundy/5">
                <img src={collection.image} alt="" className="size-12 rounded-lg object-cover" />
                <p className="text-sm font-medium text-ink dark:text-ink-dark">{isArabic ? collection.name : collection.nameEn}</p>
              </a>)}
            </div>
          </div>}

          {results.articles.length > 0 && <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">{t('من المجلة', 'From the journal')}</p>
            <div className="space-y-1">
              {results.articles.slice(0, 3).map(article => {
                const en = articlesEn[article.id]
                return <a key={article.id} href={`/journal/${article.id}`} onClick={onClose} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-burgundy/5">
                  <img src={article.image} alt="" className="size-12 rounded-lg object-cover" />
                  <p className="truncate text-sm font-medium text-ink dark:text-ink-dark">{isArabic ? article.title : en.title}</p>
                </a>
              })}
            </div>
          </div>}

          {hasQuery && hasResults && <button onClick={goToFullSearch} className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line py-3 text-sm font-medium text-burgundy transition hover:border-burgundy dark:border-line-dark">
            {t(`كل النتائج لـ "${query}"`, `All results for "${query}"`)}
            <ArrowLeft size={14} className={isArabic ? '' : 'rotate-180'} />
          </button>}
        </div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>
}