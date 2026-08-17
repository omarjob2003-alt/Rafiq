import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLocalized } from '../hooks/useLocalized'

export function Login() {
  const { login } = useAuth()
  const { t } = useLocalized()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const result = login(email, password)
    if (result.success) {
      const redirectTo = (location.state as { from?: string })?.from ?? '/account'
      navigate(redirectTo, { replace: true })
    } else {
      setError(t('البريد الإلكتروني أو كلمة المرور غير صحيحة.', 'Incorrect email or password.'))
    }
  }

  return <div className="flex min-h-[75vh] items-center justify-center px-5 pt-[108px]">
    <div className="w-full max-w-sm">
      <h1 className="text-center font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark">{t('تسجيل الدخول', 'Sign in')}</h1>
      <p className="mt-2 text-center text-sm text-muted dark:text-muted-dark">{t('اهلاً بيك تاني في رفيق', 'Welcome back to Rafiq')}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('البريد الإلكتروني', 'Email')}</span>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('كلمة المرور', 'Password')}</span>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>

        {error && <p className="text-sm text-burgundy">{error}</p>}

        <button type="submit" className="w-full rounded-lg bg-burgundy py-3.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('دخول', 'Sign in')}</button>
      </form>

      <p className="mt-6 text-center text-sm text-muted dark:text-muted-dark">
        {t('مالكش حساب؟', "Don't have an account?")} <Link to="/register" className="font-medium text-burgundy hover:underline">{t('إنشاء حساب', 'Create one')}</Link>
      </p>
    </div>
  </div>
}