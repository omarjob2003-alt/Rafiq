import { useState } from 'react'
import { MessageCircle, ShoppingCart } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { getAbandonedCarts, markContacted } from '../lib/abandonedCarts'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { products } from '../data/products'
import { formatPrice } from '../lib/formatPrice'
import { AdminLayout } from '../components/admin/AdminLayout'
import { cn } from '../lib/cn'

const thresholds = [
  { minutes: 30, ar: 'نص ساعة', en: '30 minutes' },
  { minutes: 120, ar: 'ساعتين', en: '2 hours' },
  { minutes: 1440, ar: 'يوم', en: '1 day' },
]

export function AdminAbandonedCarts() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('سلال متروكة', 'Abandoned carts'))
  const [threshold, setThreshold] = useState(30)
  const [carts, setCarts] = useState(getAbandonedCarts(30))

  const handleThresholdChange = (minutes: number) => {
    setThreshold(minutes)
    setCarts(getAbandonedCarts(minutes))
  }

  const handleToggleContacted = (email: string, contacted: boolean) => {
    markContacted(email, contacted)
    setCarts(getAbandonedCarts(threshold))
  }

  const buildMessage = (name: string, itemsSummary: string) =>
    t(
      `السلام عليكم ${name}، معاك رفيق 🌿\nلاحظنا إنك ضايف (${itemsSummary}) للسلة ومكملتش الطلب.\nده مش تأكيد أوردر، إحنا بس بنتابع - لو حابب نساعدك تكمل، أو لو في أي مشكلة، احنا موجودين.`,
      `Hi ${name}, this is Rafiq 🌿\nWe noticed you added (${itemsSummary}) to your cart but didn't complete the order.\nThis isn't an order confirmation, we're just following up - happy to help you finish, or if there's an issue, we're here.`
    )

  return <AdminLayout>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('سلال متروكة', 'Abandoned carts')}</h2>
      <div className="flex gap-2">
        {thresholds.map(option => (
          <button key={option.minutes} onClick={() => handleThresholdChange(option.minutes)} className={cn('rounded-full border px-3.5 py-1.5 text-xs transition dark:border-line-dark', threshold === option.minutes ? 'border-burgundy bg-burgundy text-cream' : 'border-line text-ink dark:text-ink-dark')}>
            {t(`متروكة من ${isArabic ? option.ar : option.en}`, `Idle for ${option.en}`)}
          </button>
        ))}
      </div>
    </div>

    {carts.length === 0
      ? <div className="mt-16 flex flex-col items-center gap-3 text-center">
        <ShoppingCart size={24} className="text-muted dark:text-muted-dark" />
        <p className="text-sm text-muted dark:text-muted-dark">{t('مفيش سلال متروكة دلوقتي.', 'No abandoned carts right now.')}</p>
      </div>
      : <div className="mt-6 space-y-4">
        {carts.map(cart => {
          const lines = cart.items.map(item => ({ ...item, product: products.find(p => p.id === item.productId) })).filter(line => line.product)
          const total = lines.reduce((sum, line) => sum + (line.product?.price ?? 0) * line.quantity, 0)
          const itemsSummary = lines.map(line => `${line.product?.name} ×${line.quantity}`).join('، ')
          return <div key={cart.userEmail} className={cn('rounded-xl border p-4 dark:border-line-dark', cart.contacted ? 'border-line opacity-60' : 'border-burgundy/40 bg-burgundy/[.02] dark:bg-burgundy/10')}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-ink dark:text-ink-dark">{cart.userName}</p>
                <p className="text-xs text-muted dark:text-muted-dark" style={{ direction: 'ltr', textAlign: isArabic ? 'right' : 'left' }}>{cart.userEmail}{cart.phone ? ` · ${cart.phone}` : ''}</p>
                <p className="mt-1 text-xs text-muted dark:text-muted-dark">{t('آخر نشاط', 'Last activity')}: {new Date(cart.updatedAt).toLocaleString(isArabic ? 'ar-EG' : 'en-GB')}</p>
              </div>
              <span className="text-sm font-semibold text-burgundy">{formatPrice(total)} {t('جنيه', 'EGP')}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {lines.map(line => line.product && (
                <div key={line.productId} className="flex items-center gap-2 rounded-lg bg-cream px-2 py-1.5 text-xs dark:bg-cream-dark">
                  <img src={line.product.image} alt="" className="size-7 rounded object-cover" />
                  <span className="text-ink/80 dark:text-ink-dark/80">{line.product.name} ×{line.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {cart.phone && (
                <a href={buildWhatsAppLink(cart.phone, buildMessage(cart.userName, itemsSummary))} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-burgundy px-4 py-2 text-xs font-medium text-cream transition hover:bg-burgundy-dark">
                  <MessageCircle size={14} /> {t('تواصل عبر واتساب', 'Message on WhatsApp')}
                </a>
              )}
              {!cart.phone && <span className="text-xs text-muted dark:text-muted-dark">{t('مفيش رقم موبايل مسجل للعميل ده.', 'No phone number on file for this customer.')}</span>}
              <label className="flex items-center gap-1.5 text-xs text-ink/80 dark:text-ink-dark/80">
                <input type="checkbox" checked={cart.contacted} onChange={event => handleToggleContacted(cart.userEmail, event.target.checked)} className="accent-burgundy" />
                {t('تم التواصل', 'Contacted')}
              </label>
            </div>
          </div>
        })}
      </div>}
  </AdminLayout>
}