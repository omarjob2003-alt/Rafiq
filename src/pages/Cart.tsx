import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLocalized } from '../hooks/useLocalized'
import { products, productsEn } from '../data/products'
import { usePageTitle } from '../hooks/usePageTitle'
import { useState } from 'react'
import { Tag } from 'lucide-react'


export function Cart() {
  const { items, updateQuantity, removeItem } = useCart()
  const { isArabic, t } = useLocalized()
  usePageTitle(t('سلة رفيق', 'Rafiq Cart'))

  const lines = items
    .map(item => ({ ...item, product: products.find(p => p.id === item.productId) }))
    .filter((line): line is typeof line & { product: NonNullable<typeof line.product> } => Boolean(line.product))

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [couponError, setCouponError] = useState('')
  const [city, setCity] = useState('cairo')

  const coupons: Record<string, number> = { RAFIQ10: 0.1, WELCOME50: 50 }

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase()
    if (!code) return
    if (!(code in coupons)) {
      setCouponError(t('الكوبون ده مش صحيح.', 'This coupon is not valid.'))
      setCoupon(null)
      return
    }
    setCouponError('')
    setCoupon({ code, discount: coupons[code] })
  }

  const discountAmount = coupon ? (coupon.discount < 1 ? Math.round(subtotal * coupon.discount) : coupon.discount) : 0
  const estimatedShipping = city === 'cairo' ? (subtotal - discountAmount >= 1000 ? 0 : 60) : 90
  const estimatedTotal = subtotal - discountAmount + estimatedShipping
  const freeShippingThreshold = 1000
  const remaining = Math.max(0, freeShippingThreshold - subtotal)

  if (lines.length === 0) {
    return <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 pt-[108px] text-center">
      <span className="grid size-16 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><ShoppingBag size={26} /></span>
      <h1 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{t('السلة فاضية', 'Your cart is empty')}</h1>
      <p className="max-w-xs text-sm text-muted dark:text-muted-dark">{t('لسه مضفتش أي منتج للسلة. يلا نلاقيلك حاجة تعجبك.', 'You have not added anything yet. Let\u2019s find something you\u2019ll love.')}</p>
      <Link to="/shop" className="rounded-full bg-burgundy px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('تسوق الآن', 'Shop now')}</Link>
    </div>
  }

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-10 md:py-16">
      <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark md:text-4xl">{t('سلة التسوق', 'Shopping cart')}</h1>

      <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="divide-y divide-line dark:divide-line-dark">
          {lines.map(line => {
            const copy = productsEn[line.product.id]
            const name = isArabic ? line.product.name : copy.name
            return <div key={line.productId} className="flex gap-4 py-6 first:pt-0">
              <Link to={`/products/${line.product.id}`} className="size-24 shrink-0 overflow-hidden rounded-xl bg-paper dark:bg-paper-dark sm:size-28">
                <img src={line.product.image} alt={name} className="size-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to={`/products/${line.product.id}`} className="font-ar-heading text-base font-semibold text-ink hover:text-burgundy dark:text-ink-dark">{name}</Link>
                    <p className="mt-1 text-sm text-muted dark:text-muted-dark">{line.product.price} {t('جنيه', 'EGP')}</p>
                  </div>
                  <button onClick={() => removeItem(line.productId)} aria-label={t('إزالة', 'Remove')} className="text-muted transition hover:text-burgundy dark:text-muted-dark"><Trash2 size={17} /></button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-line dark:border-line-dark">
                    <button onClick={() => updateQuantity(line.productId, line.quantity - 1)} aria-label={t('تقليل الكمية', 'Decrease quantity')} className="p-2 text-muted hover:text-burgundy dark:text-muted-dark"><Minus size={14} /></button>
                    <span className="w-7 text-center text-sm text-ink dark:text-ink-dark">{line.quantity}</span>
                    <button onClick={() => updateQuantity(line.productId, line.quantity + 1)} aria-label={t('زيادة الكمية', 'Increase quantity')} className="p-2 text-muted hover:text-burgundy dark:text-muted-dark"><Plus size={14} /></button>
                  </div>
                  <p className="text-sm font-semibold text-burgundy">{line.product.price * line.quantity} {t('جنيه', 'EGP')}</p>
                </div>
              </div>
            </div>
          })}
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-paper p-6 dark:border-line-dark dark:bg-paper-dark">
          <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('ملخص الطلب', 'Order summary')}</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-ink/80 dark:text-ink-dark/80"><span>{t('المجموع الفرعي', 'Subtotal')}</span><span>{subtotal} {t('جنيه', 'EGP')}</span></div>
            {coupon && <div className="flex justify-between text-burgundy"><span>{t('الخصم', 'Discount')}</span><span>-{discountAmount} {t('جنيه', 'EGP')}</span></div>}
            <div className="flex justify-between text-ink/80 dark:text-ink-dark/80"><span>{t('الشحن المتوقع', 'Estimated shipping')}</span><span>{estimatedShipping === 0 ? t('مجاني', 'Free') : `${estimatedShipping} ${t('جنيه', 'EGP')}`}</span></div>
          </div>
          {remaining > 0
            ? <p className="mt-4 rounded-lg bg-burgundy/[.05] px-3 py-2.5 text-xs text-burgundy dark:bg-burgundy/15">{t(`أضف منتجات بـ ${remaining} جنيه كمان للحصول على شحن مجاني.`, `Add ${remaining} EGP more for free shipping.`)}</p>
            : <p className="mt-4 rounded-lg bg-burgundy/[.05] px-3 py-2.5 text-xs text-burgundy dark:bg-burgundy/15">{t('مبروك، طلبك هيوصلك شحن مجاني.', 'You\u2019ve unlocked free shipping.')}</p>}
          <div className="mt-5 space-y-2">
            <p className="text-sm font-medium text-ink dark:text-ink-dark">{t('عندك كوبون؟', 'Have a coupon?')}</p>
            <div className="flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-line px-3 dark:border-line-dark">
                <Tag size={14} className="text-muted dark:text-muted-dark" />
                <input value={couponInput} onChange={e => setCouponInput(e.target.value)} placeholder={t('كود الخصم', 'Coupon code')} className="w-full bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-muted dark:text-ink-dark dark:placeholder:text-muted-dark" style={{ direction: 'ltr' }} />
              </div>
              <button onClick={applyCoupon} className="rounded-lg border border-line px-4 text-sm font-medium text-ink transition hover:border-burgundy dark:border-line-dark dark:text-ink-dark">{t('تطبيق', 'Apply')}</button>
            </div>
            {couponError && <p className="text-xs text-burgundy">{couponError}</p>}
            {coupon && <p className="text-xs text-burgundy">{t(`تم تطبيق كوبون ${coupon.code} ✓`, `Coupon ${coupon.code} applied ✓`)}</p>}
          </div>

          <div className="mt-5 space-y-2">
            <p className="text-sm font-medium text-ink dark:text-ink-dark">{t('تقدير الشحن', 'Estimate shipping')}</p>
            <select value={city} onChange={e => setCity(e.target.value)} className="w-full rounded-lg border border-line bg-cream px-3 py-2.5 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark">
              <option value="cairo">{t('القاهرة والجيزة', 'Cairo & Giza')}</option>
              <option value="other">{t('باقي المحافظات', 'Other governorates')}</option>
            </select>
          </div>
          <div className="mt-5 flex justify-between border-t border-line pt-5 text-base font-semibold text-ink dark:border-line-dark dark:text-ink-dark">
            <span>{t('الإجمالي المتوقع', 'Estimated total')}</span><span>{estimatedTotal} {t('جنيه', 'EGP')}</span>
          </div>
          <Link to="/checkout" className="mt-6 flex w-full items-center justify-center rounded-lg bg-burgundy py-3.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('إتمام الطلب', 'Checkout')}</Link>
          <Link to="/shop" className="mt-3 flex w-full items-center justify-center text-sm text-muted hover:text-burgundy dark:text-muted-dark">{t('متابعة التسوق', 'Continue shopping')}</Link>
        </aside>
      </div>
    </div>
  </div>
}