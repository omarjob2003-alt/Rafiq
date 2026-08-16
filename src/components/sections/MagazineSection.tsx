import { SectionHeading } from '../ui/SectionHeading'
import { ArticleCard } from '../products/ArticleCard'
import { articles } from '../../data/content'
import { useLocalized } from '../../hooks/useLocalized'
export function MagazineSection() { const { t } = useLocalized(); return <section id="journal" className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark"><div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28"><SectionHeading eyebrow={t('اقرأ', 'READ')} heading={t('من مجلة رفيق', 'From the Rafiq journal')} /><div className="mt-11 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</div></div></section> }
