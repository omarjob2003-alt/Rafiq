import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, MapPin, Menu, Moon, Search, ShoppingBag, Sun, User, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { Logo } from '../ui/Logo'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { SearchOverlay } from './SearchOverlay'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'

const navigation = {
  ar: [
    { label: 'المنتجات', href: '/shop' },
    { label: 'المجموعات', href: '/collections' },
    { label: 'ابنِ مساحتك', href: '#story' },
    { label: 'الإلهام', href: '#inspiration' },
    { label: 'المجلة', href: '/journal' },
    { label: 'عن رفيق', href: '/about' },
  ],
  en: [
    { label: 'Products', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Build your space', href: '#story' },
    { label: 'Inspiration', href: '#inspiration' },
    { label: 'Journal', href: '/journal' },
    { label: 'About Rafiq', href: '/about' },
  ],
}

export function Header() {
  const { productIds } = useWishlist()
  const { user } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(14)
  const { itemCount } = useCart()
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const isArabic = language === 'ar'
  const links = navigation[language]
  const t = (ar: string, en: string) => isArabic ? ar : en

  return <>
    <div className="fixed inset-x-0 top-0 z-50 h-8 bg-burgundy-dark text-cream">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 text-[10px] md:px-10 md:text-[11px]">
        <span className="hidden items-center gap-1.5 sm:flex"><MapPin size={12} /> {t('التوصيل إلى: القاهرة', 'Delivering to: Cairo')}</span>
        <span className="mx-auto inline-flex items-center gap-2 font-medium"><span>⌁</span>{t('شحن مجاني للطلبات فوق ١٬٠٠٠ جنيه', 'Free shipping on orders over EGP 1,000')}</span>
        <span className="hidden sm:block">{t('مصر', 'Egypt')}</span>
      </div>
    </div>
    <header className={cn('fixed inset-x-0 top-8 z-40 border-b transition-all duration-500', scrolled ? 'border-line bg-cream/95 shadow-[0_8px_30px_rgba(43,33,31,.06)] backdrop-blur-lg dark:border-line-dark dark:bg-cream-dark/95' : 'border-transparent bg-cream/85 backdrop-blur-sm dark:bg-cream-dark/85')}>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center">
          <nav className="hidden items-center gap-7 xl:flex">
            {links.slice(0, 3).map(link => <a key={link.label} href={link.href} className="text-sm font-medium text-ink/80 transition hover:text-burgundy dark:text-ink-dark/80">{link.label}</a>)}
          </nav>
          <Logo className="text-center" />
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <nav className="ml-3 hidden items-center gap-7 xl:flex">
              {links.slice(3).map(link => <a key={link.label} href={link.href} className="text-sm font-medium text-ink/80 transition hover:text-burgundy dark:text-ink-dark/80">{link.label}</a>)}
            </nav>
            <button onClick={toggleLanguage} aria-label="Toggle language" className="hidden h-9 rounded-full border border-line px-2.5 text-[11px] font-bold transition hover:border-burgundy hover:text-burgundy dark:border-line-dark sm:inline-flex sm:items-center">{isArabic ? 'EN' : 'ع'}</button>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="hidden size-9 items-center justify-center rounded-full text-ink/75 transition hover:bg-burgundy/5 hover:text-burgundy dark:text-ink-dark/75 sm:inline-flex">{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
            <button onClick={() => setSearchOpen(true)} aria-label={t('بحث', 'Search')} className="inline-flex size-9 items-center justify-center rounded-full text-ink/75 transition hover:bg-burgundy/5 hover:text-burgundy dark:text-ink-dark/75"><Search size={18} /></button>
            <a href="/wishlist" aria-label={t('المفضلة', 'Wishlist')} className="relative hidden size-9 items-center justify-center rounded-full text-ink/75 transition hover:bg-burgundy/5 hover:text-burgundy dark:text-ink-dark/75 md:inline-flex">
              <Heart size={18} />
              {productIds.length > 0 && <span className="absolute -left-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-burgundy-dark">{productIds.length}</span>}
            </a>
            <a href={user ? '/account' : '/login'} aria-label={t('حسابي', 'Account')} className="hidden size-9 items-center justify-center rounded-full text-ink/75 transition hover:bg-burgundy/5 hover:text-burgundy dark:text-ink-dark/75 md:inline-flex"><User size={18} /></a>
            <Link to="/cart" aria-label={t('السلة', 'Cart')} className="relative inline-flex size-9 items-center justify-center rounded-full text-ink/75 transition hover:bg-burgundy/5 hover:text-burgundy dark:text-ink-dark/75">
              <ShoppingBag size={19} />
              {itemCount > 0 && <span className="absolute -left-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-burgundy-dark">{itemCount}</span>}
            </Link>
            <button onClick={() => setMenuOpen(true)} aria-label={t('القائمة', 'Menu')} className="inline-flex size-9 items-center justify-center rounded-full text-ink/75 lg:hidden dark:text-ink-dark/75"><Menu size={21} /></button>
          </div>
        </div>
      </div>
    </header>
    <AnimatePresence>{menuOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm">
      <motion.aside initial={{ x: isArabic ? '100%' : '-100%' }} animate={{ x: 0 }} exit={{ x: isArabic ? '100%' : '-100%' }} transition={{ duration: .35, ease: [0.16, 1, 0.3, 1] }} onClick={event => event.stopPropagation()} className={cn('absolute inset-y-0 flex w-[84%] max-w-sm flex-col bg-cream p-7 dark:bg-cream-dark', isArabic ? 'right-0' : 'left-0')}>
        <div className="flex items-center justify-between"><Logo /><button onClick={() => setMenuOpen(false)} aria-label={t('إغلاق', 'Close')} className="grid size-10 place-items-center rounded-full hover:bg-burgundy/5"><X size={20} /></button></div>
        <nav className="mt-10 flex flex-col">{links.map(link => <a onClick={() => setMenuOpen(false)} className="border-b border-line py-4 font-ar-heading text-lg text-ink dark:border-line-dark dark:text-ink-dark" key={link.label} href={link.href}>{link.label}</a>)}</nav>
        <div className="mt-auto flex items-center gap-3"><button onClick={toggleLanguage} className="rounded-full border border-line px-4 py-2 text-sm dark:border-line-dark">{isArabic ? 'English' : 'العربية'}</button><button onClick={toggleTheme} className="grid size-10 place-items-center rounded-full border border-line dark:border-line-dark">{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button></div>
      </motion.aside>
    </motion.div>}</AnimatePresence>
    <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
  </>
}

