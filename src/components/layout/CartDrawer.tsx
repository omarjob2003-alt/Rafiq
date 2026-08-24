import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'
import { useLocalized } from '../../hooks/useLocalized'
import { products, productsEn } from '../../data/products'
import { calculateDiscount } from '../../data/coupons'
import { cn } from '../../lib/cn'

export function CartDrawer() {
  const { items, updateQuantity, removeItem, isDrawerOpen, closeDrawer, couponCode } = useCart()
  const { isArabic, t } = useLocalized()
  const { dir } = useLanguage()

  const lines = items
    .map(item => ({ ...item, product: products.find(p => p.id === item.productId) }))
    .filter((line): line is typeof line & { product: NonNullable<typeof line.product> } => Boolean(line.product))

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  const discountAmount = calculateDiscount(subtotal, couponCode)
  const total = subtotal - discountAmount

  return <AnimatePresence>
    {isDrawerOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeDrawer} className="fixed inset-0 z-[85] bg-ink/40 backdrop-blur-sm">
      <motion.aside
        initial={{ x: dir === 'rtl' ? '100%' : '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: dir === 'rtl' ? '100%' : '-100%' }}
        transition={{ duration: .35, ease: [0.16, 1, 0.3, 1] }}
        onClick={event => event.stopPropagation()}
        className={cn('absolute inset-y-0 flex w-[88%] max-w-sm flex-col bg-cream dark:bg-cream-dark', dir === 'rtl' ? 'right-0' : 'left-0')}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 dark:border-line-dark">
          <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('السلة', 'Your cart')}{lines.length > 0 ? ` (${lines.length})` : ''}</h2>
          <button onClick={closeDrawer} aria-label={t('إغلاق', 'Close')} className="grid size-9 place-items-center rounded-full hover:bg-burgundy/5"><X size={19} /></button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><ShoppingBag size={22} /></span>
            <p className="text-sm text-muted dark:text-muted-dark">{t('السلة فاضية.', 'Your cart is empty.')}</p>
            <Link to="/shop" onClick={closeDrawer} className="rounded-full bg-burgundy px-6 py-2.5 text-sm font-semibold text-cream">{t('تسوق الآن', 'Shop now')}</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-line overflow-y-auto px-5 dark:divide-line-dark">
              {lines.map(line => {
                const copy = productsEn[line.product.id]
                const name = isArabic ? line.product.name : copy.name
                return <div key={line.productId} className="flex gap-3 py-4">
                  <img src={line.product.image} alt={name} className="size-16 shrink-0 rounded-lg object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-medium text-ink dark:text-ink-dark">{name}</p>
                      <button onClick={() => removeItem(line.productId)} aria-label={t('إزالة', 'Remove')} className="shrink-0 text-muted hover:text-burgundy dark:text-muted-dark"><Trash2 size={14} /></button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-line dark:border-line-dark">
                        <button onClick={() => updateQuantity(line.productId, line.quantity - 1)} className="p-1.5 text-muted hover:text-burgundy dark:text-muted-dark"><Minus size={12} /></button>
                        <span className="w-6 text-center text-xs text-ink dark:text-ink-dark">{line.quantity}</span>
                        <button onClick={() => updateQuantity(line.productId, line.quantity + 1)} className="p-1.5 text-muted hover:text-burgundy dark:text-muted-dark"><Plus size={12} /></button>
                      </div>
                      <p className="text-xs font-semibold text-burgundy">{line.product.price * line.quantity} {t('جنيه', 'EGP')}</p>
                    </div>
                  </div>
                </div>
              })}
            </div>

            <div className="border-t border-line p-5 dark:border-line-dark">
              {couponCode && <div className="mb-2 flex justify-between text-xs text-burgundy"><span>{t('خصم', 'Discount')}</span><span>-{discountAmount} {t('جنيه', 'EGP')}</span></div>}
              <div className="mb-4 flex justify-between text-base font-semibold text-ink dark:text-ink-dark">
                <span>{t('الإجمالي', 'Total')}</span><span>{total} {t('جنيه', 'EGP')}</span>
              </div>
              <Link to="/checkout" onClick={closeDrawer} className="mb-2.5 flex w-full items-center justify-center rounded-lg bg-burgundy py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('إتمام الطلب', 'Checkout')}</Link>
              <Link to="/cart" onClick={closeDrawer} className="flex w-full items-center justify-center text-sm text-muted hover:text-burgundy dark:text-muted-dark">{t('عرض السلة كاملة', 'View full cart')}</Link>
            </div>
          </>
        )}
      </motion.aside>
    </motion.div>}
  </AnimatePresence>
}