import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { products, productsEn } from '../data/products'
import { availabilityLabels } from '../data/availability'
import { setProductOverride } from '../lib/productOverrides'
import { formatPrice } from '../lib/formatPrice'
import type { ProductAvailability } from '../types'

export function AdminProducts() {
  const { logout } = useAdmin()
  const { t, isArabic } = useLocalized()
  usePageTitle(t('إدارة المنتجات', 'Manage products'))
  const [, forceRerender] = useState(0)

  const handleChange = (productId: string, field: 'availability' | 'stock', value: string) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    const nextAvailability = field === 'availability' ? (value as ProductAvailability) : (product.availability ?? 'available')
    const nextStock = field === 'stock' ? (value === '' ? undefined : Number(value)) : product.stock

    setProductOverride(productId, { availability: nextAvailability, stock: nextStock }, products)
    forceRerender(v => v + 1)
  }

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark">{t('إدارة المنتجات', 'Manage products')}</h1>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <Link to="/admin/orders" className="text-muted hover:text-burgundy dark:text-muted-dark">{t('الطلبات', 'Orders')}</Link>
            <span className="font-medium text-burgundy">{t('المنتجات', 'Products')}</span>
            <Link to="/admin/subscribers" className="text-muted hover:text-burgundy dark:text-muted-dark">{t('المشتركين', 'Subscribers')}</Link>
            <Link to="/admin/messages" className="text-muted hover:text-burgundy dark:text-muted-dark">{t('الرسائل', 'Messages')}</Link>
          </div>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink dark:border-line-dark dark:text-ink-dark"><LogOut size={15} /> {t('خروج', 'Log out')}</button>
      </div>

      <div className="mt-8 space-y-3">
        {products.map(product => {
          const copy = productsEn[product.id]
          const currentAvailability = product.availability ?? 'available'
          return <div key={product.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-line p-4 dark:border-line-dark">
            <img src={product.image} alt="" className="size-14 shrink-0 rounded-lg object-cover" />
            <div className="min-w-[140px] flex-1">
              <p className="text-sm font-medium text-ink dark:text-ink-dark">{isArabic ? product.name : copy.name}</p>
              <p className="text-xs text-muted dark:text-muted-dark">{formatPrice(product.price)} {t('جنيه', 'EGP')}</p>
            </div>

            <select
              value={currentAvailability}
              onChange={event => handleChange(product.id, 'availability', event.target.value)}
              className="rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
            >
              {(Object.keys(availabilityLabels) as ProductAvailability[]).map(key => (
                <option key={key} value={key}>{isArabic ? availabilityLabels[key].ar : availabilityLabels[key].en}</option>
              ))}
            </select>

            <label className="flex items-center gap-2 text-sm text-ink/80 dark:text-ink-dark/80">
              {t('الكمية', 'Stock')}
              <input
                type="number"
                min={0}
                value={product.stock ?? ''}
                onChange={event => handleChange(product.id, 'stock', event.target.value)}
                disabled={currentAvailability !== 'limited'}
                placeholder="-"
                className="w-20 rounded-lg border border-line bg-cream px-2.5 py-2 text-sm text-ink outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
              />
            </label>
          </div>
        })}
      </div>
    </div>
  </div>
}