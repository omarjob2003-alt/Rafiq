import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, LogOut, Mail, Package, ShoppingBag, Users } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { useLocalized } from '../../hooks/useLocalized'
import { cn } from '../../lib/cn'
import { Receipt } from 'lucide-react'
import { FolderTree } from 'lucide-react'

export function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, logout } = useAdmin()
  const { t } = useLocalized()
  const { pathname } = useLocation()

  const tabs = [
    { href: '/admin', icon: LayoutDashboard, label: t('نظرة عامة', 'Overview') },
    { href: '/admin/orders', icon: ShoppingBag, label: t('الطلبات', 'Orders') },
    { href: '/admin/products', icon: Package, label: t('المنتجات', 'Products') },
    { href: '/admin/categories', icon: FolderTree, label: t('الفئات', 'Categories') },
    { href: '/admin/expenses', icon: Receipt, label: t('المصروفات', 'Expenses') },
    { href: '/admin/subscribers', icon: Users, label: t('المشتركين', 'Subscribers') },
    { href: '/admin/messages', icon: Mail, label: t('الرسائل', 'Messages') },
  ]

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[1300px] px-5 py-10 md:px-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark">{t('لوحة تحكم رفيق', 'Rafiq admin')}</h1>
          <p className="mt-1 text-xs text-muted dark:text-muted-dark">{t('مسجل دخول باسم', 'Logged in as')} {admin?.name}</p>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink dark:border-line-dark dark:text-ink-dark"><LogOut size={15} /> {t('خروج', 'Log out')}</button>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {tabs.map(tab => (
            <Link key={tab.href} to={tab.href} className={cn('flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm transition', pathname === tab.href ? 'bg-burgundy text-cream' : 'text-ink/80 hover:bg-burgundy/5 dark:text-ink-dark/80')}>
              <tab.icon size={16} /> {tab.label}
            </Link>
          ))}
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  </div>
}