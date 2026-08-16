import { useLanguage } from '../context/LanguageContext'

export function useLocalized() {
  const { language } = useLanguage()
  return {
    language,
    isArabic: language === 'ar',
    t: (arabic: string, english: string) => language === 'ar' ? arabic : english,
  }
}
