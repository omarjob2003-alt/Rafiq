import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import { Logo } from '../ui/Logo'

export function CheckoutHeader() {
  const { t } = useLocalized()
  return <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur dark:border-line-dark dark:bg-cream-dark/95">
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-10">
      <Logo />
      <span className="inline-flex items-center gap-1.5 text-xs text-muted dark:text-muted-dark">
        <Lock size={13} /> {t('دفع آمن', 'Secure checkout')}
      </span>
      <Link to="/cart" className="text-xs text-muted hover:text-burgundy dark:text-muted-dark">{t('رجوع للسلة', 'Back to cart')}</Link>
    </div>
  </header>
}