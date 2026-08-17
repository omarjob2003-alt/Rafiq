import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCheck, CircleCheck, MapPin, Package, Search, Truck } from 'lucide-react'
import { useOrders } from '../context/OrdersContext'
import { useLocalized } from '../hooks/useLocalized'
import { products } from '../data/products'
import { cn } from '../lib/cn'

const steps = [
  { icon: CircleCheck, ar: 'طلبك تم استلامه', en: 'Order received' },
  { icon: Package, ar: 'جاري التجهيز', en: 'Being prepared' },
  { icon: Truck, ar: 'تم الشحن', en: 'Shipped' },
  { icon: MapPin, ar: 'خرج للتوصيل', en: 'Out for delivery' },
  { icon: CheckCheck, ar: 'تم التسليم', en: 'Delivered' },
]

function getStepIndex(dateIso: string) {
  const hoursPassed = (Date.now() - new Date(dateIso).getTime()) / 36e5
  if (hoursPassed < 2) return 0
  if (hoursPassed < 24) return 1
  if (hoursPassed < 48) return 2
  if (hoursPassed < 72) return 3
  return 4
}

export function TrackOrder() {
  const { orders } = useOrders()
  const { t, isArabic } = useLocalized()
  const [searchParams] = useSearchParams()
  const [orderId, setOrderId] = useState(searchParams.get('order') ?? '')
  const [searched, setSearched] = useState(Boolean(searchParams.get('order')))

  const order = orders.find(item => item.id.toLowerCase() === orderId.trim().toLowerCase())
  const stepIndex = order ? getStepIndex(order.date) : -1

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSearched(true)
  }

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[720px] px-5 py-12 md:px-10 md:py-20">
      <h1 className="text-center font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark md:text-4xl">{t('تتبع طلبك', 'Track your order')}</h1>
      <p className="mt-3 text-center text-sm text-muted dark:text-muted-dark">{t('اكتب رقم الطلب اللي وصلك بعد إتمام الشراء.', 'Enter the order number you received after checkout.')}</p>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 dark:border-line-dark dark:bg-paper-dark">
        <Search size={18} className="text-muted dark:text-muted-dark" />
        <input
          value={orderId}
          onChange={event => setOrderId(event.target.value)}
          placeholder={t('مثال: RFQ-123456', 'e.g. RFQ-123456')}
          className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted dark:text-ink-dark dark:placeholder:text-muted-dark"
          style={{ direction: 'ltr' }}
        />
        <button type="submit" className="rounded-lg bg-burgundy px-4 py-2 text-sm font-medium text-cream">{t('تتبع', 'Track')}</button>
      </form>

      {searched && !order && (
        <p className="mt-10 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش طلب برقم ده. تأكد من رقم الطلب وجرب تاني.', 'No order found with this number. Please check and try again.')}</p>
      )}

      {order && (
        <div className="mt-12">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-cream px-5 py-4 dark:bg-cream-dark">
            <div>
              <p className="font-medium text-ink dark:text-ink-dark">{order.id}</p>
              <p className="text-xs text-muted dark:text-muted-dark">{new Date(order.date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB')}</p>
            </div>
            <p className="text-sm font-semibold text-burgundy">{order.total} {t('جنيه', 'EGP')}</p>
          </div>

          <ol className="relative space-y-8 ps-1">
            {steps.map((step, index) => {
              const done = index <= stepIndex
              const isLast = index === steps.length - 1
              return <li key={step.en} className="relative flex gap-4">
                {!isLast && <span className={cn('absolute top-9 h-full w-0.5 start-[17px]', done && index < stepIndex ? 'bg-burgundy' : 'bg-line dark:bg-line-dark')} />}
                <span className={cn('z-10 grid size-9 shrink-0 place-items-center rounded-full transition', done ? 'bg-burgundy text-cream' : 'bg-cream text-muted dark:bg-cream-dark dark:text-muted-dark')}>
                  <step.icon size={16} />
                </span>
                <div className="pt-1.5">
                  <p className={cn('text-sm font-medium', done ? 'text-ink dark:text-ink-dark' : 'text-muted dark:text-muted-dark')}>{isArabic ? step.ar : step.en}</p>
                  {index === stepIndex && <p className="mt-0.5 text-xs text-burgundy">{t('المرحلة الحالية', 'Current stage')}</p>}
                </div>
              </li>
            })}
          </ol>

          <div className="mt-10 border-t border-line pt-6 dark:border-line-dark">
            <p className="mb-3 text-sm font-medium text-ink dark:text-ink-dark">{t('محتويات الطلب', 'Order items')}</p>
            <div className="space-y-2">
              {order.lines.map(line => {
                const product = products.find(item => item.id === line.productId)
                if (!product) return null
                return <div key={line.productId} className="flex items-center gap-3 text-sm">
                  <img src={product.image} alt="" className="size-10 rounded-lg object-cover" />
                  <span className="flex-1 text-ink/80 dark:text-ink-dark/80">{product.name} × {line.quantity}</span>
                  <span className="text-ink dark:text-ink-dark">{line.price * line.quantity} {t('جنيه', 'EGP')}</span>
                </div>
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
}