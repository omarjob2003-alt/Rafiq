import { useState } from 'react'
import { Mail } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { AdminLayout } from '../components/admin/AdminLayout'

export function AdminSubscribers() {
  const { t } = useLocalized()
  usePageTitle(t('مشتركين النشرة', 'Newsletter subscribers'))
  const [subscribers] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('rafiq-subscribers') ?? '[]') } catch { return [] }
  })

  return <AdminLayout>
    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('مشتركين النشرة الإخبارية', 'Newsletter subscribers')}</h2>
    <p className="mt-2 text-sm text-muted dark:text-muted-dark">{t(`إجمالي المشتركين: ${subscribers.length}`, `Total subscribers: ${subscribers.length}`)}</p>

    {subscribers.length === 0
      ? <p className="mt-10 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش مشتركين لسه.', 'No subscribers yet.')}</p>
      : <div className="mt-6 divide-y divide-line rounded-xl border border-line dark:divide-line-dark dark:border-line-dark">
        {subscribers.map(email => (
          <div key={email} className="flex items-center gap-2.5 p-3.5 text-sm text-ink dark:text-ink-dark" style={{ direction: 'ltr', justifyContent: 'flex-end' }}>
            <Mail size={14} className="text-muted dark:text-muted-dark" /> {email}
          </div>
        ))}
      </div>}
  </AdminLayout>
}