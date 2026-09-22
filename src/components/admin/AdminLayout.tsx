import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogOut, Settings } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { useLocalized } from '../../hooks/useLocalized'
import { cn } from '../../lib/cn'
import { AdminTopBar } from './AdminTopBar'
import { adminSections } from '../../data/adminSections'

export function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, logout, hasPermission } = useAdmin()
  const { t } = useLocalized()
  const { pathname } = useLocation()

  const visibleSections = adminSections.filter(section => hasPermission(section.id))
  const tabs = admin?.isSuperAdmin
    ? [...visibleSections, { id: 'settings' as const, href: '/admin/settings', icon: Settings, ar: 'الإعدادات', en: 'Settings' }]
    : visibleSections

  return <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#1a1512]">
    <AdminTopBar />
    <div className="pt-14">
      <div className="mx-auto max-w-[1300px] px-5 py-8 md:px-10 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{t('لوحة تحكم رفيق', 'Rafiq admin')}</h1>
            <p className="mt-1 flex items-center gap-2 text-xs text-muted dark:text-muted-dark">
              <span>{t('مسجل دخول باسم', 'Logged in as')} {admin?.name}</span>
              {admin?.isSuperAdmin && <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-medium text-burgundy">{t('أدمن رئيسي', 'Super admin')}</span>}
            </p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink dark:border-line-dark dark:text-ink-dark"><LogOut size={15} /> {t('خروج', 'Log out')}</button>
        </div>

        <div className="mt-7 grid gap-8 md:grid-cols-[220px_1fr]">
          <aside className="flex gap-2 overflow-x-auto rounded-2xl bg-burgundy-dark p-2 md:flex-col md:overflow-visible">
            {tabs.map(tab => (
              <Link key={tab.href} to={tab.href} className={cn('flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm transition', pathname === tab.href ? /*'bg-[#FAD68A]*/ 'bg-gold text-burgundy-dark font-medium' : 'text-cream/75 hover:bg-cream/10 hover:text-cream')}>
                <tab.icon size={16} /> {t(tab.ar, tab.en)}
              </Link>
            ))}
          </aside>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  </div>
}




// import type { ReactNode } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { LayoutDashboard, LogOut, Mail, MessageCircleQuestion, Package, RotateCcw, ShoppingBag, Star, Users, History, FolderTree, Receipt } from 'lucide-react'
// import { useAdmin } from '../../context/AdminContext'
// import { useLocalized } from '../../hooks/useLocalized'
// import { cn } from '../../lib/cn'
// import { AdminTopBar } from './AdminTopBar'

// export function AdminLayout({ children }: { children: ReactNode }) {
//   const { admin, logout } = useAdmin()
//   const { t } = useLocalized()
//   const { pathname } = useLocation()

//   const tabs = [
//     { href: '/admin', icon: LayoutDashboard, label: t('نظرة عامة', 'Overview') },
//     { href: '/admin/orders', icon: ShoppingBag, label: t('الطلبات', 'Orders') },
//     { href: '/admin/products', icon: Package, label: t('المنتجات', 'Products') },
//     { href: '/admin/categories', icon: FolderTree, label: t('الفئات', 'Categories') },
//     { href: '/admin/stock-log', icon: History, label: t('سجل المخزون', 'Stock log') },
//     { href: '/admin/returns', icon: RotateCcw, label: t('الاستبدال والإرجاع', 'Returns') },
//     { href: '/admin/reviews', icon: Star, label: t('التقييمات', 'Reviews') },
//     { href: '/admin/questions', icon: MessageCircleQuestion, label: t('الأسئلة', 'Questions') },
//     { href: '/admin/expenses', icon: Receipt, label: t('المصروفات', 'Expenses') },
//     { href: '/admin/subscribers', icon: Users, label: t('المشتركين', 'Subscribers') },
//     { href: '/admin/messages', icon: Mail, label: t('الرسائل', 'Messages') },
//   ]

//   return <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#1a1512]">
//     <AdminTopBar />
//     <div className="pt-14">
//       <div className="mx-auto max-w-[1300px] px-5 py-8 md:px-10 md:py-10">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h1 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{t('لوحة تحكم رفيق', 'Rafiq admin')}</h1>
//             <p className="mt-1 text-xs text-muted dark:text-muted-dark">{t('مسجل دخول باسم', 'Logged in as')} {admin?.name}</p>
//           </div>
//           <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink dark:border-line-dark dark:text-ink-dark"><LogOut size={15} /> {t('خروج', 'Log out')}</button>
//         </div>

//         <div className="mt-7 grid gap-8 md:grid-cols-[220px_1fr]">
//           <aside className="flex gap-2 overflow-x-auto rounded-2xl bg-burgundy-dark p-2 md:flex-col md:overflow-visible">
//             {tabs.map(tab => (
//               <Link key={tab.href} to={tab.href} className={cn('flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm transition', pathname === tab.href ? 'bg-gold text-burgundy-dark font-medium' : 'text-cream/75 hover:bg-cream/10 hover:text-cream')}>
//                 <tab.icon size={16} /> {tab.label}
//               </Link>
//             ))}
//           </aside>
//           <div className="min-w-0">{children}</div>
//         </div>
//       </div>
//     </div>
//   </div>
// }