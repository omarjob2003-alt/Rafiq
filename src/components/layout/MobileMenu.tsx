import { useEffect, useState , useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Moon, Sun, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'
import { collections } from '../../data/collections'
import { cn } from '../../lib/cn'
import { Logo } from '../ui/Logo'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useQuickView } from '../../context/QuickViewContext'

interface MenuLink { label: string; href: string }
interface MenuSubmenu { id: string; label: string; children: MenuLink[] }
type MenuItem = ({ type: 'link' } & MenuLink) | ({ type: 'submenu' } & MenuSubmenu)

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { openProductId, closeQuickView } = useQuickView()
  const trapRef = useRef<HTMLDivElement>(null)
  useFocusTrap(trapRef, Boolean(openProductId))
  const { language, dir, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { productIds } = useWishlist()
  const { user } = useAuth()
  const isArabic = language === 'ar'
  const t = (ar: string, en: string) => (isArabic ? ar : en)
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null)

  const menuTree: MenuItem[] = [
    {
      type: 'submenu', id: 'products', label: t('المنتجات', 'Products'),
      children: [
        { label: t('كل المنتجات', 'All products'), href: '/shop' },
        ...collections.map(collection => ({ label: isArabic ? collection.name : collection.nameEn, href: `/shop?category=${collection.id}` })),
      ],
    },
    {
      type: 'submenu', id: 'collections', label: t('المجموعات', 'Collections'),
      children: [
        { label: t('كل المجموعات', 'All collections'), href: '/collections' },
        ...collections.map(collection => ({ label: isArabic ? collection.name : collection.nameEn, href: `/collections/${collection.id}` })),
      ],
    },
    { type: 'link', label: t('المجلة', 'Journal'), href: '/journal' },
    { type: 'link', label: t('عن رفيق', 'About Rafiq'), href: '/about' },
    { type: 'link', label: t('اتصل بنا', 'Contact us'), href: '/contact' },
  ]

  const activeSubmenu = menuTree.find((item): item is MenuItem & { type: 'submenu' } => item.type === 'submenu' && item.id === activeSubmenuId)

  const closeAll = () => {
    onClose()
    setTimeout(() => setActiveSubmenuId(null), 300)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') closeAll() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return <AnimatePresence>
    {open && (
      <motion.div onClick={closeQuickView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /*onClick={closeAll}*/ className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm">
        <motion.aside
          ref={trapRef}
          initial={{ x: isArabic ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: isArabic ? '100%' : '-100%' }}
          transition={{ duration: .35, ease: [0.16, 1, 0.3, 1] }}
          onClick={event => event.stopPropagation()}
          className={cn('absolute inset-y-0 flex w-[86%] max-w-sm flex-col overflow-hidden bg-cream dark:bg-cream-dark', dir === 'rtl' ? 'right-0' : 'left-0')}
        >
          <div className="flex items-center justify-between p-7 pb-0">
            <Logo />
            <button onClick={closeAll} aria-label={t('إغلاق', 'Close')} className="grid size-10 place-items-center rounded-full hover:bg-burgundy/5"><X size={20} /></button>
          </div>

          <div className="relative mt-8 flex-1 overflow-hidden">
            {/* المستوى الأول */}
            <motion.nav
              animate={{ x: activeSubmenuId ? (isArabic ? '-100%' : '100%') : 0 }}
              transition={{ duration: .3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col overflow-y-auto px-7"
            >
              {menuTree.map(item => item.type === 'link' ? (
                <Link key={item.href} to={item.href} onClick={closeAll} className="border-b border-line py-4 font-ar-heading text-lg text-ink dark:border-line-dark dark:text-ink-dark">
                  {item.label}
                </Link>
              ) : (
                <button key={item.id} onClick={() => setActiveSubmenuId(item.id)} className="flex items-center justify-between border-b border-line py-4 text-start font-ar-heading text-lg text-ink dark:border-line-dark dark:text-ink-dark">
                  {item.label}
                  <ArrowLeft size={17} className={cn('text-muted dark:text-muted-dark', isArabic ? '' : 'rotate-180')} />
                </button>
              ))}

              <Link onClick={closeAll} to="/wishlist" className="flex items-center justify-between border-b border-line py-4 font-ar-heading text-lg text-ink dark:border-line-dark dark:text-ink-dark">
                {t('المفضلة', 'Wishlist')}
                {productIds.length > 0 && <span className="grid size-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-burgundy-dark">{productIds.length}</span>}
              </Link>
              <Link onClick={closeAll} to={user ? '/account' : '/login'} className="border-b border-line py-4 font-ar-heading text-lg text-ink dark:border-line-dark dark:text-ink-dark">
                {user ? t('حسابي', 'My account') : t('تسجيل الدخول', 'Sign in')}
              </Link>
            </motion.nav>

            {/* مستوى الفروع */}
            <motion.nav
              animate={{ x: activeSubmenuId ? 0 : (isArabic ? '100%' : '-100%') }}
              transition={{ duration: .3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col overflow-y-auto px-7"
            >
              <button onClick={() => setActiveSubmenuId(null)} className="mb-3 flex items-center gap-2 py-3 text-sm text-muted dark:text-muted-dark">
                <ArrowRight size={16} className={isArabic ? '' : 'rotate-180'} />
                {t('رجوع', 'Back')}
              </button>
              {activeSubmenu && <p className="mb-2 font-ar-heading text-xl font-semibold text-ink dark:text-ink-dark">{activeSubmenu.label}</p>}
              {activeSubmenu?.children.map(child => (
                <Link key={child.href} to={child.href} onClick={closeAll} className="border-b border-line py-4 text-ink/85 dark:border-line-dark dark:text-ink-dark/85">
                  {child.label}
                </Link>
              ))}
            </motion.nav>
          </div>

          <div className="mt-auto flex items-center gap-3 p-7 pt-4">
            <button onClick={toggleLanguage} className="rounded-full border border-line px-4 py-2 text-sm dark:border-line-dark">{isArabic ? 'English' : 'العربية'}</button>
            <button onClick={toggleTheme} className="grid size-10 place-items-center rounded-full border border-line dark:border-line-dark">{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button>
          </div>
        </motion.aside>
      </motion.div>
    )}
  </AnimatePresence>
}