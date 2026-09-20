import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { collections } from '../data/collections'
import { products } from '../data/products'
import { addCustomCollection, updateCollection, deleteCollection, isCustomCollection } from '../lib/collectionOverrides'
import { slugify } from '../lib/slugify'
import { AdminLayout } from '../components/admin/AdminLayout'
import type { Collection } from '../types'

const emptyForm = { name: '', nameEn: '', description: '', image: '' }

export function AdminCategories() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('الفئات', 'Categories'))
  const [, forceRerender] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  const productCount = (id: string) => products.filter(p => p.categoryIds.includes(id)).length

  const startAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true) }
  const startEdit = (collection: Collection) => {
    setForm({ name: collection.name, nameEn: collection.nameEn, description: collection.description, image: collection.image })
    setEditingId(collection.id)
    setShowForm(true)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (editingId) {
      updateCollection(editingId, form, collections)
    } else {
      const id = slugify(form.nameEn || form.name)
      const newCollection: Collection = { id, name: form.name, nameEn: form.nameEn, description: form.description, image: form.image, href: `/collections/${id}` }
      addCustomCollection(newCollection, collections)
    }
    setShowForm(false)
    forceRerender(v => v + 1)
  }

  const handleDelete = (id: string) => {
    const count = productCount(id)
    const confirmMessage = count > 0
      ? t(`الفئة دي مربوطة بـ ${count} منتج - حذفها هيشيلها من عندهم بس مش هيمسح المنتجات نفسها. متأكد؟`, `This category is linked to ${count} product(s) - deleting it removes the tag from them but not the products themselves. Are you sure?`)
      : t('متأكد من حذف الفئة دي؟', 'Are you sure you want to delete this category?')
    if (!window.confirm(confirmMessage)) return
    deleteCollection(id, collections)
    forceRerender(v => v + 1)
  }

  return <AdminLayout>
    <div className="flex items-center justify-between">
      <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('الفئات (المجموعات)', 'Categories (Collections)')}</h2>
      {!showForm && <button onClick={startAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-burgundy px-4 py-2 text-sm font-medium text-cream transition hover:bg-burgundy-dark"><Plus size={15} /> {t('فئة جديدة', 'New category')}</button>}
    </div>

    {showForm && (
      <form onSubmit={handleSubmit} className="mt-5 space-y-4 rounded-xl border border-line p-5 dark:border-line-dark">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink dark:text-ink-dark">{editingId ? t('تعديل الفئة', 'Edit category') : t('فئة جديدة', 'New category')}</p>
          <button type="button" onClick={() => setShowForm(false)} aria-label={t('إلغاء', 'Cancel')} className="grid size-8 place-items-center rounded-full hover:bg-burgundy/5"><X size={16} /></button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الاسم بالعربي', 'Name (Arabic)')}</span>
            <input required value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الاسم بالإنجليزي', 'Name (English)')}</span>
            <input required value={form.nameEn} onChange={e => setForm(prev => ({ ...prev, nameEn: e.target.value }))} disabled={Boolean(editingId)} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy disabled:cursor-not-allowed disabled:opacity-50 dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
          </label>
        </div>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الوصف', 'Description')}</span>
          <textarea required rows={3} value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="w-full resize-none rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('رابط الصورة', 'Image URL')}</span>
          <input required type="url" value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} placeholder="https://..." className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" style={{ direction: 'ltr' }} />
        </label>

        {!editingId && <p className="text-xs text-muted dark:text-muted-dark">{t('معرّف الفئة (Slug) هيتولّد تلقائيًا من الاسم الإنجليزي، ومينفعش يتغيّر بعد الإنشاء.', 'The category ID (slug) is generated automatically from the English name, and cannot be changed after creation.')}</p>}

        <button type="submit" className="rounded-lg bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{editingId ? t('حفظ التعديلات', 'Save changes') : t('إنشاء الفئة', 'Create category')}</button>
      </form>
    )}

    <div className="mt-6 space-y-3">
      {collections.map(collection => (
        <div key={collection.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-line p-4 dark:border-line-dark">
          <img src={collection.image} alt="" className="size-14 shrink-0 rounded-lg object-cover" />
          <div className="min-w-[160px] flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-ink dark:text-ink-dark">{isArabic ? collection.name : collection.nameEn}</p>
              {isCustomCollection(collection.id) && <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-medium text-burgundy">{t('مخصصة', 'Custom')}</span>}
            </div>
            <p className="text-xs text-muted dark:text-muted-dark">{t(`${productCount(collection.id)} منتج`, `${productCount(collection.id)} products`)}</p>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => startEdit(collection)} aria-label={t('تعديل', 'Edit')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Pencil size={15} /></button>
            <button onClick={() => handleDelete(collection.id)} aria-label={t('حذف', 'Delete')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Trash2 size={15} /></button>
          </div>
        </div>
      ))}
    </div>
  </AdminLayout>
}