import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { products, productsEn } from '../data/products'
import { getEffectiveAvailability, availabilityLabels } from '../data/availability'
import { adjustStock, updateProduct, deleteProduct, isCustomProduct } from '../lib/productOverrides'
import { formatPrice } from '../lib/formatPrice'
import { AdminLayout } from '../components/admin/AdminLayout'
import type { StockMode } from '../types'

export function AdminProducts() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('إدارة المنتجات', 'Manage products'))
  const [, forceRerender] = useState(0)

  const handleStockModeChange = (productId: string, mode: StockMode) => {
    updateProduct(productId, { stockMode: mode }, products)
    forceRerender(v => v + 1)
  }

  const handleAdjust = (productId: string, delta: number) => {
    adjustStock(productId, delta, 'manual', products, t('تعديل يدوي من لوحة التحكم', 'Manual adjustment from dashboard'))
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
      <div className="flex gap-2">
        <Link to="/admin/stock-log" className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm text-ink dark:border-line-dark dark:text-ink-dark">{t('سجل المخزون', 'Stock log')}</Link>
        <Link to="/admin/products/new" className="inline-flex items-center gap-1.5 rounded-lg bg-burgundy px-4 py-2 text-sm font-medium text-cream transition hover:bg-burgundy-dark"><Plus size={15} /> {t('منتج جديد', 'New product')}</Link>
      </div>
    </div>

    <div className="mt-4 space-y-3">
      {products.map(product => {
        const copy = productsEn[product.id]
        const effective = getEffectiveAvailability(product)
        const info = availabilityLabels[effective]
        return <div key={product.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-line p-4 dark:border-line-dark">
          <img src={product.image} alt="" className="size-14 shrink-0 rounded-lg object-cover" />
          <div className="min-w-[140px] flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-ink dark:text-ink-dark">{isArabic ? product.name : copy?.name}</p>
              {isCustomProduct(product.id) && <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-medium text-burgundy">{t('مخصص', 'Custom')}</span>}
            </div>
            <p className="text-xs text-muted dark:text-muted-dark">{formatPrice(product.price)} {t('جنيه', 'EGP')} · {isArabic ? info.ar : info.en}</p>
          </div>

          <select
            value={product.stockMode}
            onChange={event => handleStockModeChange(product.id, event.target.value as StockMode)}
            className="rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
          >
            <option value="stock">{t('بيتباع من مخزون', 'Sold from stock')}</option>
            <option value="made_to_order">{t('يتصنّع عند الطلب', 'Made to order')}</option>
            <option value="discontinued">{t('متوقف نهائيًا', 'Discontinued')}</option>
          </select>

          {product.stockMode === 'stock' && (
            <div className="flex items-center gap-2">
              <button onClick={() => handleAdjust(product.id, -1)} className="grid size-8 place-items-center rounded-lg border border-line text-ink dark:border-line-dark dark:text-ink-dark">−</button>
              <span className="w-10 text-center text-sm font-medium text-ink dark:text-ink-dark">{product.stock}</span>
              <button onClick={() => handleAdjust(product.id, 1)} className="grid size-8 place-items-center rounded-lg border border-line text-ink dark:border-line-dark dark:text-ink-dark">+</button>
              <button onClick={() => { const amount = Number(window.prompt(t('كام قطعة هتضيف؟', 'How many units to add?'), '10')); if (amount > 0) handleAdjust(product.id, amount) }} className="rounded-lg border border-line px-2.5 py-1.5 text-xs text-ink dark:border-line-dark dark:text-ink-dark">{t('تزويد', 'Restock')}</button>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Link to={`/admin/products/${product.id}/edit`} aria-label={t('تعديل', 'Edit')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Pencil size={15} /></Link>
            <button onClick={() => handleDelete(product.id, product.name)} aria-label={t('حذف', 'Delete')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Trash2 size={15} /></button>
          </div>
        </div>
      })}
    </div>
  </AdminLayout>
}