import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Boxes, Coffee, LayoutGrid, Sparkles } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { collections } from '../data/collections'
import { collectionStories } from '../data/collectionStories'
import { products } from '../data/products'
import { articles } from '../data/content'
import { ProductCard } from '../components/products/ProductCard'
import { ArticleCard } from '../components/products/ArticleCard'
import { ValueProps } from '../components/sections/ValueProps'
import { NewsletterSection } from '../components/sections/NewsletterSection'

const icons: Record<string, typeof LayoutGrid> = {
  workspace: LayoutGrid,
  organization: Boxes,
  everyday: Coffee,
  essentials: Sparkles,
}

export function CollectionDetail() {
  const { collectionId } = useParams()
  const { isArabic, t } = useLocalized()
  const collection = collections.find(item => item.id === collectionId) ?? collections[0]
  const story = collectionStories[collection.id]
  const Icon = icons[collection.id] ?? LayoutGrid
  const collectionProducts = products.filter(product => product.categoryId === collection.id)
  const relatedArticles = articles.slice(0, 3)
  const title = isArabic ? collection.name : collection.nameEn

  return <div className="pt-[108px]">
    <nav className="mx-auto max-w-[1440px] px-5 pt-6 text-xs text-muted dark:text-muted-dark md:px-10">
      <Link to="/" className="hover:text-burgundy">{t('الرئيسية', 'Home')}</Link>
      <span className="mx-2">/</span>
      <Link to="/collections" className="hover:text-burgundy">{t('المجموعات', 'Collections')}</Link>
      <span className="mx-2">/</span>
      <span className="text-ink dark:text-ink-dark">{title}</span>
    </nav>

    <section className="border-b border-line dark:border-line-dark">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-10 md:grid-cols-2 md:px-10 md:py-16">
        <img src={collection.image} alt={title} className="aspect-[4/3] w-full rounded-2xl object-cover md:rounded-[26px]" />
        <div>
          <span className="grid size-12 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><Icon size={22} /></span>
          <h1 className="mt-5 font-ar-heading text-4xl font-semibold leading-tight text-ink dark:text-ink-dark md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-md text-sm leading-8 text-muted dark:text-muted-dark">{isArabic ? collection.description : collection.nameEn}</p>
          <p className="mt-5 text-sm font-medium text-burgundy">{t(`${collectionProducts.length} منتج`, `${collectionProducts.length} products`)}</p>
        </div>
      </div>
    </section>

    <ValueProps />

    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <motion.img initial={{ opacity: 0, scale: 1.03 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .9 }} src={story.image} alt={isArabic ? story.titleAr : story.titleEn} className="aspect-[4/5] w-full rounded-[18px] object-cover md:aspect-[3/4] md:order-2" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="max-w-lg md:order-1">
          <span className="text-xs font-semibold tracking-[.2em] text-burgundy">{t('قصة المجموعة', 'COLLECTION STORY')}</span>
          <h2 className="mt-5 font-ar-heading text-3xl font-semibold leading-[1.4] text-ink dark:text-ink-dark md:text-4xl">{isArabic ? story.titleAr : story.titleEn}</h2>
          <p className="mt-6 text-base leading-8 text-muted dark:text-muted-dark">{isArabic ? story.textAr : story.textEn}</p>
        </motion.div>
      </div>
    </section>

    <section className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="mb-11 flex items-end justify-between">
          <h2 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark md:text-3xl">{t('منتجات صُممت لتعمل معًا', 'Products designed to work together')}</h2>
          <Link to={`/shop?category=${collection.id}`} className="hidden text-sm font-semibold text-burgundy hover:underline sm:inline-flex sm:items-center sm:gap-1.5">
            {t('تسوق الكل', 'Shop all')}
            <ArrowLeft size={15} className={isArabic ? '' : 'rotate-180'} />
          </Link>
        </div>
        {collectionProducts.length === 0
          ? <p className="text-sm text-muted dark:text-muted-dark">{t('منتجات المجموعة دي قريبًا.', 'Products for this collection are coming soon.')}</p>
          : <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
              {collectionProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
            </div>}
        <Link to={`/shop?category=${collection.id}`} className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy hover:underline sm:hidden">
          {t('تسوق الكل', 'Shop all')}
          <ArrowLeft size={15} className={isArabic ? '' : 'rotate-180'} />
        </Link>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      <h2 className="mb-9 font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark md:text-3xl">{t('اقرأ في المجلة', 'From the journal')}</h2>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}
      </div>
    </section>

    <NewsletterSection />
  </div>
}