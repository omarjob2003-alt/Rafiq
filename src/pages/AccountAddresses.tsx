import { useState } from 'react'
import { useLocalized } from '../hooks/useLocalized'
import { AccountLayout } from '../components/account/AccountLayout'
import { usePageTitle } from '../hooks/usePageTitle'

export function AccountAddresses() {
  const { t } = useLocalized()
  usePageTitle(t('عناويني', 'My Addresses'))
  const [saved, setSaved] = useState(false)

  return <AccountLayout>
    <div className="rounded-2xl border border-line p-6 dark:border-line-dark md:p-8">
      <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('عنوان الشحن الافتراضي', 'Default shipping address')}</h2>
      <form onSubmit={e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000) }} className="mt-6 grid max-w-md gap-4 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2"><span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('العنوان بالتفصيل', 'Street address')}</span><input className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" /></label>
        <label className="block text-sm"><span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('المحافظة', 'City')}</span><input className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" /></label>
        <label className="block text-sm"><span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('رقم الموبايل', 'Phone number')}</span><input className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" /></label>
        <button type="submit" className="rounded-lg bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark sm:col-span-2 sm:w-fit">{saved ? t('تم الحفظ ✓', 'Saved ✓') : t('حفظ العنوان', 'Save address')}</button>
      </form>
    </div>
  </AccountLayout>
}