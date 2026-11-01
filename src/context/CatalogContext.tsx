import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { loadCatalog } from '../lib/catalogApi'
import { useLanguage } from './LanguageContext'

export function CatalogProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const isArabic = language === 'ar'

  const load = useCallback(async () => {
    setStatus('loading')
    try {
      await loadCatalog()
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }, [])

  useEffect(() => { load() }, [load])

  if (status === 'ready') return <>{children}</>

  return <div className="grid min-h-screen place-items-center bg-cream px-5 text-center dark:bg-cream-dark">
    <div>
      <p className="font-en-heading text-3xl tracking-wide text-burgundy" style={{ direction: 'ltr' }}>RAFIQ</p>
      {status === 'loading'
        ? <p className="mt-4 animate-pulse text-sm text-muted dark:text-muted-dark">{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
        : <>
          <p className="mt-4 text-sm text-muted dark:text-muted-dark">{isArabic ? 'تعذر تحميل المنتجات، تأكد من الاتصال وحاول تاني.' : "Couldn't load products. Check your connection and try again."}</p>
          <button onClick={load} className="mt-5 rounded-lg bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{isArabic ? 'إعادة المحاولة' : 'Try again'}</button>
        </>}
    </div>
  </div>
}