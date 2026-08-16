import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpLeft } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'

export function HeroSection() {
  const { t, isArabic } = useLocalized()
  return <section className="bg-cream pb-10 pt-[124px] dark:bg-cream-dark md:pb-14 md:pt-[132px]"><div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
    <div className="rafiq-hero overflow-hidden rounded-[18px] border border-line/70 dark:border-line-dark md:rounded-[22px]">
      <div className="grid min-h-[600px] md:min-h-[530px] md:grid-cols-[.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, x: isArabic ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="rafiq-hero-copy flex flex-col justify-center px-7 py-12 sm:px-12 md:order-2 md:px-[12%]">
          <span className="mb-4 inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-[.18em] text-gold"><i className="h-px w-7 bg-gold" /> {t('رفيق لكل يوم', 'RAFIQ FOR EVERY DAY')}</span>
          <h1 className="font-ar-heading text-[2.7rem] font-semibold leading-[1.22] text-burgundy-dark dark:text-cream sm:text-6xl">{isArabic ? <>أشياء صغيرة،<br /><span className="relative inline-block">تُحدث فرقًا كبيرًا.<i className="absolute -bottom-1 right-0 h-[3px] w-[48%] rounded-full bg-gold" /></span></> : <>Small things.<br /><span className="relative inline-block">A meaningful difference.<i className="absolute -bottom-1 left-0 h-[3px] w-[48%] rounded-full bg-gold" /></span></>}</h1>
          <p className="mt-7 max-w-md text-base leading-8 text-muted dark:text-muted-dark">{t('منتجات عملية وبسيطة تساعدك تنظم يومك، وتركز على اللي يهمك.', 'Simple, practical objects that help organise your day and leave room for what matters.')}</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#products" className="inline-flex items-center gap-2 rounded-xl bg-burgundy px-6 py-3.5 text-sm font-semibold text-cream shadow-[0_12px_22px_rgba(112,13,50,.16)] transition hover:-translate-y-0.5 hover:bg-burgundy-dark">{t('تسوّق الآن', 'Shop now')}<ArrowLeft size={16} className={isArabic ? '' : 'rotate-180'} /></a><a href="#collections" className="inline-flex items-center gap-2 rounded-xl border border-burgundy/25 px-6 py-3.5 text-sm font-semibold text-burgundy transition hover:bg-burgundy/5">{t('اكتشف المجموعات', 'Explore collections')}<ArrowUpLeft size={15} className={isArabic ? '' : 'rotate-180'} /></a></div>
          <div className="mt-10 flex items-center gap-7 border-t border-burgundy/10 pt-5 text-xs text-muted dark:border-cream/10 dark:text-muted-dark"><span><b className="block text-base text-ink dark:text-ink-dark">+١٢</b>{t('منتج مصمم بعناية', 'thoughtful products')}</span><span><b className="block text-base text-ink dark:text-ink-dark">٤.٩/٥</b>{t('من تقييمات العملاء', 'from our customers')}</span></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative min-h-[310px] overflow-hidden md:order-1 md:min-h-0"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=90&auto=format&fit=crop" alt={t('مكتب منظم بإضاءة طبيعية دافئة', 'Warm organised desk')} className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/35 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 rounded-lg border border-cream/35 bg-burgundy-dark/70 px-4 py-3 text-xs text-cream backdrop-blur"><b className="block font-ar-heading text-sm">{t('منظم المكتب', 'Desk organiser')}</b><span className="text-cream/70">٨٩٠ {t('جنيه', 'EGP')}</span></div></motion.div>
      </div>
    </div>
  </div></section>
}
