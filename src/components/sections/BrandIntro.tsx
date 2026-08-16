import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'

export function BrandIntro() {
  const { t, isArabic } = useLocalized()
  return <section id="story" className="bg-cream dark:bg-cream-dark"><div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
    <motion.div initial={{ opacity: 0, scale: 1.03 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .9 }} className="order-1 aspect-[4/5] overflow-hidden rounded-[18px] md:order-2 md:aspect-[3/4]"><img src="https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=1100&q=85&auto=format&fit=crop" alt={t('مساحة عمل رفيق منظمة بإضاءة دافئة', 'An organised Rafiq workspace')} className="size-full object-cover" /></motion.div>
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="order-2 max-w-lg md:order-1"><span className="text-xs font-semibold tracking-[.2em] text-burgundy">{t('اكتشف رفيق', 'DISCOVER RAFIQ')}</span><h2 className="mt-5 font-ar-heading text-3xl font-semibold leading-[1.45] text-ink dark:text-ink-dark md:text-[2.6rem]">{isArabic ? <>المكتب المرتب<br />يترك مساحة لأفكارك.</> : <>An organised desk<br />leaves room for ideas.</>}</h2><p className="mt-6 text-base leading-8 text-muted dark:text-muted-dark md:text-lg">{t('في رفيق، نؤمن أن ترتيب المساحة مش مجرد شكل جميل. لما كل شيء يكون في مكانه، يبقى عندك مساحة أكبر للتركيز، والتفكير، والإنجاز.', 'At Rafiq, organisation is more than a beautiful view. When everything has a considered place, you have more room to focus, think and make progress.')}</p><a href="#about" className="group mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-semibold text-ink transition hover:border-burgundy hover:text-burgundy dark:text-ink-dark">{t('اعرف قصتنا', 'Read our story')}<ArrowLeft size={16} className={isArabic ? 'transition group-hover:-translate-x-1' : 'rotate-180 transition group-hover:translate-x-1'} /></a></motion.div>
  </div></section>
}
