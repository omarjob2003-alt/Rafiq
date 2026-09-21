import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { getStockLog } from '../lib/stockLog'
import { products } from '../data/products'
import { AdminLayout } from '../components/admin/AdminLayout'
import { cn } from '../lib/cn'

const reasonLabels = {
  sale: { ar: 'بيع', en: 'Sale' },
  return: { ar: 'إرجاع', en: 'Return' },
  manual: { ar: 'تعديل يدوي', en: 'Manual adjustment' },
  cancellation: { ar: 'إلغاء طلب', en: 'Order cancellation' },
}

export function AdminStockLog() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('سجل حركة المخزون', 'Stock log'))
  const log = getStockLog()

  return <AdminLayout>
    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('سجل حركة المخزون', 'Stock log')}</h2>

    {log.length === 0
      ? <p className="mt-10 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش حركة مسجلة لسه.', 'No stock movement recorded yet.')}</p>
      : <div className="mt-6 divide-y divide-line rounded-xl border border-line dark:divide-line-dark dark:border-line-dark">
        {log.map(entry => {
          const product = products.find(p => p.id === entry.productId)
          const reason = reasonLabels[entry.reason]
          return <div key={entry.id} className="flex items-center gap-3 p-3.5 text-sm">
            {product && <img src={product.image} alt="" className="size-9 rounded-lg object-cover" />}
            <div className="flex-1">
              <p className="text-ink dark:text-ink-dark">{product ? (isArabic ? product.name : product.id) : entry.productId}</p>
              <p className="text-xs text-muted dark:text-muted-dark">{isArabic ? reason.ar : reason.en} · {new Date(entry.date).toLocaleString(isArabic ? 'ar-EG' : 'en-GB')}{entry.note ? ` · ${entry.note}` : ''}</p>
            </div>
            <span className={cn('font-medium', entry.change < 0 ? 'text-burgundy' : 'text-green-700 dark:text-green-500')}>{entry.change > 0 ? '+' : ''}{entry.change}</span>
            <span className="text-xs text-muted dark:text-muted-dark">→ {entry.resultingStock}</span>
          </div>
        })}
      </div>}
  </AdminLayout>
}