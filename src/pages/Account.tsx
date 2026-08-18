import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLocalized } from '../hooks/useLocalized'
import { AccountLayout } from '../components/account/AccountLayout'
import { usePageTitle } from '../hooks/usePageTitle'

export function Account() {
  const { user, updateProfile } = useAuth()
  const { t } = useLocalized()
  usePageTitle(t('حسابي', 'My Account'))
  const [name, setName] = useState(user?.name ?? '')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    updateProfile(name)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return <AccountLayout>
    <div className="rounded-2xl border border-line p-6 dark:border-line-dark md:p-8">
      <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('البيانات الشخصية', 'Personal information')}</h2>
      <form onSubmit={handleSubmit} className="mt-6 max-w-sm space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الاسم الكامل', 'Full name')}</span>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('البريد الإلكتروني', 'Email')}</span>
          <input value={user?.email} disabled className="w-full rounded-lg border border-line bg-cream/60 px-3.5 py-2.5 text-sm text-muted outline-none dark:border-line-dark dark:bg-cream-dark/60 dark:text-muted-dark" />
        </label>
        <button type="submit" className="rounded-lg bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{saved ? t('تم الحفظ ✓', 'Saved ✓') : t('حفظ التعديلات', 'Save changes')}</button>
      </form>
    </div>
  </AccountLayout>
}