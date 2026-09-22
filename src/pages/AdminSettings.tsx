import { useState, type FormEvent } from 'react'
import { Pencil, Plus, ShieldCheck, Trash2, X } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { AdminLayout } from '../components/admin/AdminLayout'
import { adminSections, type PermissionKey } from '../data/adminSections'
import { getAdminAccounts, addAdminAccount, updateAdminAccount, removeAdminAccount, type AdminAccount } from '../lib/adminAccounts'
import { useAdmin } from '../context/AdminContext'
import { cn } from '../lib/cn'

const emptyForm = { name: '', email: '', password: '', permissions: [] as PermissionKey[] }

export function AdminSettings() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('الإعدادات', 'Settings'))
  const { admin } = useAdmin()

  const [, forceRerender] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const accounts = getAdminAccounts()

  const startAdd = () => { setForm(emptyForm); setEditingId(null); setError(''); setShowForm(true) }
  const startEdit = (account: AdminAccount) => {
    setForm({ name: account.name, email: account.email, password: '', permissions: account.permissions })
    setEditingId(account.id)
    setError('')
    setShowForm(true)
  }

  const togglePermission = (id: PermissionKey) => {
    setForm(prev => ({ ...prev, permissions: prev.permissions.includes(id) ? prev.permissions.filter(p => p !== id) : [...prev.permissions, id] }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (editingId) {
      updateAdminAccount(editingId, {
        name: form.name,
        permissions: form.permissions,
        ...(form.password ? { password: form.password } : {}),
      })
    } else {
      if (!form.password) { setError(t('لازم تحدد باسورد للأدمن الجديد.', 'A password is required for the new admin.')); return }
      const result = addAdminAccount({ email: form.email, password: form.password, name: form.name, permissions: form.permissions })
      if (!result.success) { setError(t('الإيميل ده مستخدم قبل كده.', 'This email is already in use.')); return }
    }

    setShowForm(false)
    forceRerender(v => v + 1)
  }

  const handleDelete = (id: string) => {
    if (!window.confirm(t('متأكد من حذف الأدمن ده؟', 'Are you sure you want to delete this admin?'))) return
    removeAdminAccount(id)
    forceRerender(v => v + 1)
  }

  return <AdminLayout>
    <div className="flex items-center justify-between">
      <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('الإعدادات والصلاحيات', 'Settings & permissions')}</h2>
      {!showForm && <button onClick={startAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-burgundy px-4 py-2 text-sm font-medium text-cream transition hover:bg-burgundy-dark"><Plus size={15} /> {t('أدمن جديد', 'New admin')}</button>}
    </div>

    <div className="mt-5 flex items-center gap-3 rounded-xl border border-gold/30 bg-gold/[.06] p-4 dark:bg-gold/10">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/20 text-burgundy"><ShieldCheck size={18} /></span>
      <div>
        <p className="text-sm font-medium text-ink dark:text-ink-dark">{admin?.name} <span className="text-xs text-muted dark:text-muted-dark" style={{ direction: 'ltr' }}>({admin?.email})</span></p>
        <p className="text-xs text-muted dark:text-muted-dark">{t('الأدمن الرئيسي - له كل الصلاحيات دايمًا، ومش ممكن حذفه أو تعديل صلاحياته من هنا.', 'Super admin - always has full access, and cannot be deleted or edited from here.')}</p>
      </div>
    </div>

    {showForm && (
      <form onSubmit={handleSubmit} className="mt-5 space-y-4 rounded-xl border border-line p-5 dark:border-line-dark">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink dark:text-ink-dark">{editingId ? t('تعديل أدمن', 'Edit admin') : t('أدمن جديد', 'New admin')}</p>
          <button type="button" onClick={() => setShowForm(false)} aria-label={t('إلغاء', 'Cancel')} className="grid size-8 place-items-center rounded-full hover:bg-burgundy/5"><X size={16} /></button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الاسم', 'Name')}</span>
            <input required value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الإيميل', 'Email')}</span>
            <input required type="email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} disabled={Boolean(editingId)} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy disabled:cursor-not-allowed disabled:opacity-50 dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" style={{ direction: 'ltr' }} />
          </label>
        </div>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{editingId ? t('باسورد جديد (سيبه فاضي لو مش هتغيّره)', 'New password (leave empty to keep it)') : t('الباسورد', 'Password')}</span>
          <input required={!editingId} type="text" value={form.password} onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" style={{ direction: 'ltr' }} />
        </label>

        <div>
          <p className="mb-2 text-sm text-ink/80 dark:text-ink-dark/80">{t('الصفحات اللي يقدر يشوفها', 'Pages this admin can access')}</p>
          <div className="flex flex-wrap gap-2">
            {adminSections.map(section => (
              <button key={section.id} type="button" onClick={() => togglePermission(section.id)} className={cn('rounded-full border px-3.5 py-1.5 text-xs transition dark:border-line-dark', form.permissions.includes(section.id) ? 'border-burgundy bg-burgundy text-cream' : 'border-line text-ink dark:text-ink-dark')}>
                {isArabic ? section.ar : section.en}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-xs text-burgundy">{error}</p>}

        <button type="submit" className="rounded-lg bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{editingId ? t('حفظ التعديلات', 'Save changes') : t('إنشاء الحساب', 'Create account')}</button>
      </form>
    )}

    <div className="mt-6 space-y-3">
      {accounts.length === 0 && !showForm && (
        <p className="rounded-xl border border-dashed border-line py-10 text-center text-sm text-muted dark:border-line-dark dark:text-muted-dark">{t('مفيش أدمنز تانيين لسه. أضف واحد بالزرار اللي فوق.', 'No other admins yet. Add one with the button above.')}</p>
      )}
      {accounts.map(account => (
        <div key={account.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-line p-4 dark:border-line-dark">
          <div className="min-w-[160px] flex-1">
            <p className="text-sm font-medium text-ink dark:text-ink-dark">{account.name}</p>
            <p className="text-xs text-muted dark:text-muted-dark" style={{ direction: 'ltr' }}>{account.email}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {account.permissions.length === 0
                ? <span className="text-[11px] text-muted dark:text-muted-dark">{t('من غير صلاحيات', 'No permissions')}</span>
                : account.permissions.map(id => {
                  const section = adminSections.find(s => s.id === id)
                  if (!section) return null
                  return <span key={id} className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted dark:border-line-dark dark:text-muted-dark">{isArabic ? section.ar : section.en}</span>
                })}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => startEdit(account)} aria-label={t('تعديل', 'Edit')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Pencil size={15} /></button>
            <button onClick={() => handleDelete(account.id)} aria-label={t('حذف', 'Delete')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Trash2 size={15} /></button>
          </div>
        </div>
      ))}
    </div>
  </AdminLayout>
}