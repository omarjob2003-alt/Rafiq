import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLocalized } from '../hooks/useLocalized'
import { products, productsEn } from '../data/products'

export function Cart() {
  const { items, updateQuantity, removeItem } = useCart()
  const { isArabic, t } = useLocalized()

  const lines = items
    .map(item => ({ ...item, product: products.find(p => p.id === item.productId) }))
    .filter((line): line is typeof line & { product: NonNullable<typeof line.product> } => Boolean(line.product))

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
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
            <div className="flex justify-between text-ink/80 dark:text-ink-dark/80"><span>{t('الشحن', 'Shipping')}</span><span>{t('يُحسب عند الدفع', 'Calculated at checkout')}</span></div>
          </div>
          {remaining > 0
            ? <p className="mt-4 rounded-lg bg-burgundy/[.05] px-3 py-2.5 text-xs text-burgundy dark:bg-burgundy/15">{t(`أضف منتجات بـ ${remaining} جنيه كمان للحصول على شحن مجاني.`, `Add ${remaining} EGP more for free shipping.`)}</p>
            : <p className="mt-4 rounded-lg bg-burgundy/[.05] px-3 py-2.5 text-xs text-burgundy dark:bg-burgundy/15">{t('مبروك، طلبك هيوصلك شحن مجاني.', 'You\u2019ve unlocked free shipping.')}</p>}
          <div className="mt-5 flex justify-between border-t border-line pt-5 text-base font-semibold text-ink dark:border-line-dark dark:text-ink-dark">
            <span>{t('الإجمالي', 'Total')}</span><span>{subtotal} {t('جنيه', 'EGP')}</span>
          </div>
          <Link to="/checkout" className="mt-6 flex w-full items-center justify-center rounded-lg bg-burgundy py-3.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('إتمام الطلب', 'Checkout')}</Link>
          <Link to="/shop" className="mt-3 flex w-full items-center justify-center text-sm text-muted hover:text-burgundy dark:text-muted-dark">{t('متابعة التسوق', 'Continue shopping')}</Link>
        </aside>
      </div>
    </div>
  </div>
}