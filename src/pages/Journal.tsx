import { useMemo, useState } from 'react'
import { useLocalized } from '../hooks/useLocalized'
import { articles, articlesEn } from '../data/content'
import { ArticleCard } from '../components/products/ArticleCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { NewsletterSection } from '../components/sections/NewsletterSection'
import { cn } from '../lib/cn'

export function Journal() {
  const { t, isArabic } = useLocalized()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(() => Array.from(new Set(articles.map(article => article.category))), [])

  const filtered = activeCategory ? articles.filter(article => article.category === activeCategory) : articles

  return <div className="pt-[108px]">
    <section className="border-b border-line dark:border-line-dark">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
        <SectionHeading eyebrow={t('اقرأ', 'READ')} heading={t('مجلة رفيق', 'The Rafiq journal')} subtitle={t('أفكار عملية عن التنظيم، التركيز، وبناء مساحة تشتغل لصالحك.', 'Practical ideas on organization, focus, and building a space that works for you.')} />
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
      <div className="mb-11 flex flex-wrap gap-2.5">
        <button onClick={() => setActiveCategory(null)} className={cn('rounded-full border px-4 py-2 text-sm transition dark:border-line-dark', !activeCategory ? 'border-burgundy bg-burgundy text-cream' : 'border-line text-ink hover:border-burgundy/40 dark:text-ink-dark')}>{t('الكل', 'All')}</button>
        {categories.map(category => {
          const englishCategory = articlesEn[articles.find(a => a.category === category)!.id].category
          return <button key={category} onClick={() => setActiveCategory(category)} className={cn('rounded-full border px-4 py-2 text-sm transition dark:border-line-dark', activeCategory === category ? 'border-burgundy bg-burgundy text-cream' : 'border-line text-ink hover:border-burgundy/40 dark:text-ink-dark')}>{isArabic ? category : englishCategory}</button>
        })}
      </div>

      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}
      </div>
    </section>

    <NewsletterSection />
  </div>
}