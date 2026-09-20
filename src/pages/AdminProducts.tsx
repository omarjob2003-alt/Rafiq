import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { products, productsEn } from '../data/products'
import { availabilityLabels } from '../data/availability'
import { setProductOverride, deleteProduct, isCustomProduct } from '../lib/productOverrides'
import { formatPrice } from '../lib/formatPrice'
import { AdminLayout } from '../components/admin/AdminLayout'
import type { ProductAvailability } from '../types'

export function AdminProducts() {
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

  const handleDelete = (productId: string, name: string) => {
    if (!window.confirm(t(`متأكد من حذف "${name}"؟`, `Are you sure you want to delete "${name}"?`))) return
    deleteProduct(productId, products)
    forceRerender(v => v + 1)
  }

  return <AdminLayout>
    <div className="flex items-center justify-between">
      <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('المنتجات', 'Products')}</h2>
      <Link to="/admin/products/new" className="inline-flex items-center gap-1.5 rounded-lg bg-burgundy px-4 py-2 text-sm font-medium text-cream transition hover:bg-burgundy-dark"><Plus size={15} /> {t('منتج جديد', 'New product')}</Link>
    </div>

    <div className="mt-4 space-y-3">
      {products.map(product => {
        const copy = productsEn[product.id]
        const currentAvailability = product.availability ?? 'available'
        return <div key={product.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-line p-4 dark:border-line-dark">
          <img src={product.image} alt="" className="size-14 shrink-0 rounded-lg object-cover" />
          <div className="min-w-[140px] flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-ink dark:text-ink-dark">{isArabic ? product.name : copy?.name}</p>
              {isCustomProduct(product.id) && <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-medium text-burgundy">{t('مخصص', 'Custom')}</span>}
            </div>
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

          <div className="flex items-center gap-1">
            <Link to={`/admin/products/${product.id}/edit`} aria-label={t('تعديل', 'Edit')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Pencil size={15} /></Link>
            <button onClick={() => handleDelete(product.id, product.name)} aria-label={t('حذف', 'Delete')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Trash2 size={15} /></button>
          </div>
        </div>
      })}
    </div>
  </AdminLayout>
}