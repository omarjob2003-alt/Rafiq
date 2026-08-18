import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'

export function NotFound() {
  const { t } = useLocalized()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  usePageTitle(t('الصفحة غير موجودة', 'Page not found'))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return <div className="flex min-h-[75vh] flex-col items-center justify-center px-5 pt-[108px] text-center">
    <span className="font-en-heading text-8xl text-burgundy/20">404</span>
    <h1 className="mt-4 font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark">{t('الصفحة مش موجودة', "This page doesn't exist")}</h1>
    <p className="mt-3 max-w-sm text-sm leading-7 text-muted dark:text-muted-dark">{t('يمكن الرابط اتغيّر أو الصفحة اتشالت. جرب تدور على اللي محتاجه، أو ارجع للرئيسية.', 'The link may have changed or the page was removed. Try searching for what you need, or head back home.')}</p>

    <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-sm items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 dark:border-line-dark dark:bg-paper-dark">
      <Search size={18} className="text-muted dark:text-muted-dark" />
      <input value={query} onChange={event => setQuery(event.target.value)} placeholder={t('دور على منتج أو مجموعة...', 'Search for a product or collection...')} className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted dark:text-ink-dark dark:placeholder:text-muted-dark" />
    </form>

    <div className="mt-7 flex gap-3">
      <Link to="/" className="rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('الرئيسية', 'Home')}</Link>
      <Link to="/shop" className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition hover:border-burgundy dark:border-line-dark dark:text-ink-dark">{t('تصفح المتجر', 'Browse shop')}</Link>
    </div>
  </div>
}