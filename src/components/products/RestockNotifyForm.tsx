import { useState, type FormEvent } from 'react'
import { Bell, Check } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import { addRestockRequest } from '../../lib/restockNotify'

export function RestockNotifyForm({ productId }: { productId: string }) {
  const { t } = useLocalized()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!email) return
    addRestockRequest(productId, email)
    setSubmitted(true)
  }

  if (submitted) {
    return <p className="mt-6 flex items-center gap-2 rounded-lg bg-burgundy/[.05] px-4 py-3.5 text-sm text-burgundy dark:bg-burgundy/15">
      <Check size={16} /> {t('تمام، هنبعتلك إيميل فور ما يرجع متوفر.', "Got it, we'll email you the moment it's back.")}
    </p>
  }

  return <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
    <div className="flex flex-1 items-center gap-2 rounded-lg border border-line bg-cream px-3.5 dark:border-line-dark dark:bg-cream-dark">
      <Bell size={16} className="shrink-0 text-muted dark:text-muted-dark" />
      <input
        type="email"
        required
        value={email}
        onChange={event => setEmail(event.target.value)}
        placeholder={t('بريدك الإلكتروني', 'Your email address')}
        className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-muted dark:text-ink-dark dark:placeholder:text-muted-dark"
      />
    </div>
    <button type="submit" className="rounded-lg bg-burgundy px-5 py-3 text-sm font-medium text-cream transition hover:bg-burgundy-dark">{t('نبهني', 'Notify me')}</button>
  </form>
}