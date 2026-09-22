import { Link } from 'react-router-dom'
import { Moon, Sun, ExternalLink } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import { useLocalized } from '../../hooks/useLocalized'
import { Logo} from '../ui/LogoDashBoard'

export function AdminTopBar() {
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLocalized()
  const isArabic = language === 'ar'

  return <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-cream/10 bg-burgundy-dark px-5 text-cream md:px-8">
    <div className="flex items-center gap-2.5">
      {/* <img src={logoDashBoard} alt="Rafiq Logo"  /> */}
      {/* <img src={logoDashBoard} alt="Rafiq Logo" /> */}
      <Link to="" className="xl:justify-self-center"><Logo className="text-center" /></Link>
      <span className="rounded-full bg-cream/10 px-2 py-0.5 text-[10px] font-medium text-cream/70">{t('لوحة التحكم', 'Admin')}</span>
    </div>
    <div className="flex items-center gap-2">
      <Link to="/" className="hidden items-center gap-1.5 text-xs text-cream/70 transition hover:text-cream sm:inline-flex">
        <ExternalLink size={13} /> {t('عرض المتجر', 'View store')}
      </Link>
      <button onClick={toggleLanguage} className="rounded-full border border-cream/25 px-2.5 py-1 text-[11px] font-bold text-cream/85 transition hover:border-cream">{isArabic ? 'EN' : 'ع'}</button>
      <button onClick={toggleTheme} className="grid size-8 place-items-center rounded-full text-cream/85 transition hover:bg-cream/10">{theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}</button>
    </div>
  </header>
}