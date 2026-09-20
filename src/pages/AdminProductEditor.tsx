import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { products, productsEn } from '../data/products'
import { collections } from '../data/collections'
import { availabilityLabels } from '../data/availability'
import { usageTags, colorOptions } from '../data/filters'
import { addCustomProduct, updateProduct, getEnglishEdit } from '../lib/productOverrides'
import { slugify } from '../lib/slugify'
import { AdminLayout } from '../components/admin/AdminLayout'
import { cn } from '../lib/cn'
import type { Product, ProductAvailability } from '../types'

const emptyForm = {
  name: '', nameEn: '', description: '', descriptionEn: '',
  price: '', image: '', categoryIds: [] as string[], colors: [] as string[], usage: [] as string[],
  availability: 'available' as ProductAvailability, stock: '',
}

export function AdminProductEditor() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { t, isArabic } = useLocalized()
  const editingProduct = productId ? products.find(p => p.id === productId) : undefined
  usePageTitle(editingProduct ? t('تعديل منتج', 'Edit product') : t('منتج جديد', 'New product'))

  const [form, setForm] = useState(() => {
    if (!editingProduct) return emptyForm
    const enEdit = getEnglishEdit(editingProduct.id)
    return {
      name: editingProduct.name,
      nameEn: enEdit.nameEn ?? productsEn[editingProduct.id]?.name ?? '',
      description: editingProduct.description,
      descriptionEn: enEdit.descriptionEn ?? productsEn[editingProduct.id]?.description ?? '',
      price: String(editingProduct.price),
      image: editingProduct.image,
      categoryIds: editingProduct.categoryIds,
      colors: editingProduct.colors,
      usage: editingProduct.usage,
      availability: editingProduct.availability ?? 'available',
      stock: editingProduct.stock !== undefined ? String(editingProduct.stock) : '',
    }
  })

  const toggleCategory = (id: string) => setForm(prev => ({ ...prev, categoryIds: prev.categoryIds.includes(id) ? prev.categoryIds.filter(c => c !== id) : [...prev.categoryIds, id] }))
  const toggleUsage = (id: string) => setForm(prev => ({ ...prev, usage: prev.usage.includes(id) ? prev.usage.filter(u => u !== id) : [...prev.usage, id] }))
  const toggleColor = (hex: string) => setForm(prev => ({ ...prev, colors: prev.colors.includes(hex) ? prev.colors.filter(c => c !== hex) : [...prev.colors, hex] }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (form.categoryIds.length === 0) { window.alert(t('اختار فئة واحدة على الأقل.', 'Select at least one category.')); return }

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image,
      categoryIds: form.categoryIds,
      colors: form.colors,
      usage: form.usage,
      availability: form.availability,
      stock: form.availability === 'limited' && form.stock !== '' ? Number(form.stock) : undefined,
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, { ...payload, nameEn: form.nameEn, descriptionEn: form.descriptionEn }, products)
    } else {
      const id = slugify(form.nameEn || form.name)
      if (products.some(p => p.id === id)) { window.alert(t('في منتج تاني بنفس المعرّف ده، غيّر الاسم الإنجليزي شوية.', 'Another product already has this ID, tweak the English name a bit.')); return }
      const newProduct: Product = { id, currency: 'جنيه', category: form.categoryIds[0], ...payload }
      addCustomProduct(newProduct, form.nameEn, form.descriptionEn, products)
    }

    navigate('/admin/products')
  }

  return <AdminLayout>
    <div className="flex items-center justify-between">
      <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{editingProduct ? t('تعديل منتج', 'Edit product') : t('منتج جديد', 'New product')}</h2>
      <button onClick={() => navigate('/admin/products')} aria-label={t('إلغاء', 'Cancel')} className="grid size-8 place-items-center rounded-full hover:bg-burgundy/5"><X size={16} /></button>
    </div>

    <form onSubmit={handleSubmit} className="mt-5 max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الاسم بالعربي', 'Name (Arabic)')}</span>
          <input required value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الاسم بالإنجليزي', 'Name (English)')}</span>
          <input required value={form.nameEn} onChange={e => setForm(prev => ({ ...prev, nameEn: e.target.value }))} disabled={Boolean(editingProduct)} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy disabled:cursor-not-allowed disabled:opacity-50 dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" style={{ direction: 'ltr' }} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الوصف بالعربي', 'Description (Arabic)')}</span>
          <textarea required rows={3} value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="w-full resize-none rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الوصف بالإنجليزي', 'Description (English)')}</span>
          <textarea required rows={3} value={form.descriptionEn} onChange={e => setForm(prev => ({ ...prev, descriptionEn: e.target.value }))} className="w-full resize-none rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" style={{ direction: 'ltr' }} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('السعر (جنيه)', 'Price (EGP)')}</span>
          <input required type="number" min={1} value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('رابط الصورة', 'Image URL')}</span>
          <input required type="url" value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} placeholder="https://..." className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" style={{ direction: 'ltr' }} />
        </label>
      </div>

      <div>
        <p className="mb-2 text-sm text-ink/80 dark:text-ink-dark/80">{t('الفئات (تقدر تختار أكتر من واحدة)', 'Categories (you can pick more than one)')}</p>
        <div className="flex flex-wrap gap-2">
          {collections.map(collection => (
            <button key={collection.id} type="button" onClick={() => toggleCategory(collection.id)} className={cn('rounded-full border px-3.5 py-1.5 text-xs transition dark:border-line-dark', form.categoryIds.includes(collection.id) ? 'border-burgundy bg-burgundy text-cream' : 'border-line text-ink dark:text-ink-dark')}>
              {isArabic ? collection.name : collection.nameEn}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm text-ink/80 dark:text-ink-dark/80">{t('تاجات الاستخدام', 'Usage tags')}</p>
        <div className="flex flex-wrap gap-2">
          {usageTags.map(tag => (
            <button key={tag.id} type="button" onClick={() => toggleUsage(tag.id)} className={cn('rounded-full border px-3.5 py-1.5 text-xs transition dark:border-line-dark', form.usage.includes(tag.id) ? 'border-burgundy bg-burgundy text-cream' : 'border-line text-ink dark:text-ink-dark')}>
              {isArabic ? tag.ar : tag.en}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm text-ink/80 dark:text-ink-dark/80">{t('الألوان', 'Colors')}</p>
        <div className="flex flex-wrap gap-2.5">
          {colorOptions.map(color => (
            <button key={color.hex} type="button" onClick={() => toggleColor(color.hex)} aria-label={isArabic ? color.ar : color.en} style={{ backgroundColor: color.hex }} className={cn('size-8 rounded-full ring-2 ring-offset-2 ring-offset-cream transition dark:ring-offset-cream-dark', form.colors.includes(color.hex) ? 'ring-burgundy' : 'ring-transparent')} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الحالة', 'Availability')}</span>
          <select value={form.availability} onChange={e => setForm(prev => ({ ...prev, availability: e.target.value as ProductAvailability }))} className="w-full rounded-lg border border-line bg-cream px-3 py-2.5 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark">
            {(Object.keys(availabilityLabels) as ProductAvailability[]).map(key => <option key={key} value={key}>{isArabic ? availabilityLabels[key].ar : availabilityLabels[key].en}</option>)}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الكمية (لو كمية محدودة)', 'Stock (if limited)')}</span>
          <input type="number" min={0} value={form.stock} onChange={e => setForm(prev => ({ ...prev, stock: e.target.value }))} disabled={form.availability !== 'limited'} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>
      </div>

      {!editingProduct && <p className="text-xs text-muted dark:text-muted-dark">{t('معرّف المنتج هيتولّد تلقائيًا من الاسم الإنجليزي، ومينفعش يتغيّر بعد الإنشاء.', "The product's ID is generated automatically from the English name, and cannot be changed after creation.")}</p>}

      <button type="submit" className="rounded-lg bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{editingProduct ? t('حفظ التعديلات', 'Save changes') : t('إنشاء المنتج', 'Create product')}</button>
    </form>
  </AdminLayout>
}