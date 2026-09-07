import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Mail } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'

export function AdminSubscribers() {
  const { logout } = useAdmin()
  const { t } = useLocalized()
  usePageTitle(t('مشتركين النشرة', 'Newsletter subscribers'))
  const [subscribers] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('rafiq-subscribers') ?? '[]') } catch { return [] }
  })

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[900px] px-5 py-10 md:px-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark">{t('مشتركين النشرة الإخبارية', 'Newsletter subscribers')}</h1>
          <div className="mt-2 flex gap-4 text-sm">
            <Link to="/admin/orders" className="text-muted hover:text-burgundy dark:text-muted-dark">{t('الطلبات', 'Orders')}</Link>
            <span className="font-medium text-burgundy">{t('المشتركين', 'Subscribers')}</span>
          </div>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink dark:border-line-dark dark:text-ink-dark"><LogOut size={15} /> {t('خروج', 'Log out')}</button>
      </div>

      <p className="mt-6 text-sm text-muted dark:text-muted-dark">{t(`إجمالي المشتركين: ${subscribers.length}`, `Total subscribers: ${subscribers.length}`)}</p>

      {subscribers.length === 0
        ? <p className="mt-10 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش مشتركين لسه.', 'No subscribers yet.')}</p>
        : <div className="mt-6 divide-y divide-line rounded-xl border border-line dark:divide-line-dark dark:border-line-dark">
            {subscribers.map(email => (
              <div key={email} className="flex items-center gap-2.5 p-3.5 text-sm text-ink dark:text-ink-dark" style={{ direction: 'ltr', justifyContent: 'flex-end' }}>
                <Mail size={14} className="text-muted dark:text-muted-dark" /> {email}
              </div>
            ))}
          </div>}
    </div>
  </div>
}