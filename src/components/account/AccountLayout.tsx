import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, LogOut, MapPin, Package, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLocalized } from '../../hooks/useLocalized'
import { cn } from '../../lib/cn'

export function AccountLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const { t } = useLocalized()
  const { pathname } = useLocation()

  const tabs = [
    { href: '/account', icon: User, label: t('بياناتي', 'Profile') },
    { href: '/account/orders', icon: Package, label: t('طلباتي', 'Orders') },
    { href: '/account/addresses', icon: MapPin, label: t('عناويني', 'Addresses') },
    { href: '/wishlist', icon: Heart, label: t('المفضلة', 'Wishlist') },
  ]

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-10 md:py-16">
      <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark">{t('أهلًا،', 'Hi,')} {user?.name}</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {tabs.map(tab => (
            <Link key={tab.href} to={tab.href} className={cn('flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm transition', pathname === tab.href ? 'bg-burgundy text-cream' : 'text-ink/80 hover:bg-burgundy/5 dark:text-ink-dark/80')}>
              <tab.icon size={16} /> {tab.label}
            </Link>
          ))}
          <button onClick={logout} className="flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark">
            <LogOut size={16} /> {t('تسجيل الخروج', 'Log out')}
          </button>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  </div>
}