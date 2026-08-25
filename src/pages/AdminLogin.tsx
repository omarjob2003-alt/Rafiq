import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useLocalized } from '../hooks/useLocalized'

export function AdminLogin() {
  const { login } = useAdmin()
  const { t } = useLocalized()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (login(email, password)) navigate('/admin/orders', { replace: true })
    else setError(t('البريد الإلكتروني أو كلمة المرور غير صحيحة.', 'Incorrect email or password.'))
  }

  return <div className="flex min-h-[75vh] items-center justify-center px-5 pt-[108px]">
    <div className="w-full max-w-sm text-center">
      <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><Lock size={22} /></span>
      <h1 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{t('دخول لوحة التحكم', 'Admin dashboard')}</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-start">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('البريد الإلكتروني', 'Email')}</span>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('كلمة المرور', 'Password')}</span>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>
        {error && <p className="text-sm text-burgundy">{error}</p>}
        <button type="submit" className="w-full rounded-lg bg-burgundy py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('دخول', 'Sign in')}</button>
      </form>
    </div>
  </div>
}