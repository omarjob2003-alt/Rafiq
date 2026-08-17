import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Link2, MessageCircle, Share2 } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { articles, articlesEn } from '../data/content'
import { journalContent } from '../data/journalContent'
import { products } from '../data/products'
import { ProductCard } from '../components/products/ProductCard'
import { ArticleCard } from '../components/products/ArticleCard'

export function JournalDetail() {
    const { articleId } = useParams()
    const { isArabic, t } = useLocalized()
    const article = articles.find(item => item.id === articleId) ?? articles[0]
    const copy = articlesEn[article.id]
    const blocks = journalContent[article.id] ?? []
    const relatedArticles = articles.filter(item => item.id !== article.id).slice(0, 2)
    const relatedProducts = products.slice(0, 3)
    const title = isArabic ? article.title : copy.title

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const copyLink = () => navigator.clipboard?.writeText(shareUrl)

    return <div className="pt-[108px]">
        <nav className="mx-auto max-w-[760px] px-5 pt-8 text-xs text-muted dark:text-muted-dark md:px-0">
            <Link to="/" className="hover:text-burgundy">{t('الرئيسية', 'Home')}</Link>
            <span className="mx-2">/</span>
            <Link to="/journal" className="hover:text-burgundy">{t('المجلة', 'Journal')}</Link>
            <span className="mx-2">/</span>
            <span className="text-ink dark:text-ink-dark">{title}</span>
        </nav>

        <article className="mx-auto max-w-[760px] px-5 py-8 md:px-0 md:py-12">
            <span className="inline-flex rounded-full bg-burgundy/[.06] px-3 py-1 text-xs font-medium text-burgundy dark:bg-burgundy/15">{isArabic ? article.category : copy.category}</span>
            <h1 className="mt-5 font-ar-heading text-3xl font-semibold leading-[1.4] text-ink dark:text-ink-dark md:text-4xl">{title}</h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted dark:text-muted-dark">
                <span className="inline-flex items-center gap-1.5"><Calendar size={14} />{new Date(article.date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className="inline-flex items-center gap-1.5"><Clock size={14} />{isArabic ? article.readTime : copy.readTime} {t('قراءة', 'read')}</span>
                <span>{t('فريق رفيق', 'The Rafiq team')}</span>
            </div>

            <img src={article.image} alt={title} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />

            <div className="mt-10 space-y-6">
                {blocks.map((block, index) => {
                    const text = isArabic ? block.ar : block.en
                    if (block.type === 'heading') return <h2 key={index} className="pt-2 font-ar-heading text-xl font-semibold text-ink dark:text-ink-dark">{text}</h2>
                    if (block.type === 'image') return <motion.img key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} src={article.image} alt={text} className="aspect-[3/2] w-full rounded-xl object-cover" />
                    return <p key={index} className="text-base leading-8 text-muted dark:text-muted-dark">{text}</p>
                })}
            </div>

            <div className="mt-10 flex items-center gap-3 border-t border-line pt-6 dark:border-line-dark">
                <span className="text-sm text-muted dark:text-muted-dark">{t('شارك المقال', 'Share this article')}</span>
                <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-8 place-items-center rounded-full border border-line text-ink transition hover:border-burgundy hover:text-burgundy dark:border-line-dark dark:text-ink-dark"><Share2 size={14} /></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="X" className="grid size-8 place-items-center rounded-full border border-line text-ink transition hover:border-burgundy hover:text-burgundy dark:border-line-dark dark:text-ink-dark"><MessageCircle size={14} /></a>
                <button onClick={copyLink} aria-label={t('نسخ الرابط', 'Copy link')} className="grid size-8 place-items-center rounded-full border border-line text-ink transition hover:border-burgundy hover:text-burgundy dark:border-line-dark dark:text-ink-dark"><Link2 size={14} /></button>
            </div>

            <Link to="/journal" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-burgundy hover:underline">
                <ArrowLeft size={15} className={isArabic ? '' : 'rotate-180'} />
                {t('رجوع للمجلة', 'Back to journal')}
            </Link>
        </article>

        <section className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark">
            <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
                <h2 className="mb-8 font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{t('قد يعجبك أيضًا', 'You might also like')}</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
                    {relatedProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
                </div>
            </div>
        </section>

        {relatedArticles.length > 0 && <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
            <h2 className="mb-8 font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{t('مقالات تانية', 'More articles')}</h2>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
                {relatedArticles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}
            </div>
        </section>}
    </div>
}