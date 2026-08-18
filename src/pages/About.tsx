import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Layers, Leaf, Ruler, Sparkles } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { SectionHeading } from '../components/ui/SectionHeading'
import { BrandStatement } from '../components/sections/BrandStatement'
import { NewsletterSection } from '../components/sections/NewsletterSection'
import { usePageTitle } from '../hooks/usePageTitle'

const principles = [
  { icon: Sparkles, ar: ['البساطة أولًا', 'كل قطعة بنصممها بنشيل منها أي حاجة زيادة، ونسيب بس اللي بيفرق فعليًا.'], en: ['Simplicity first', 'Every piece is stripped of anything unnecessary, leaving only what truly matters.'] },
  { icon: Layers, ar: ['خامات تستحق الثقة', 'بنختار جلد وخشب ومعدن يتحمل الاستخدام اليومي، ويكبر معاك بشكل أحلى.'], en: ['Materials worth trusting', 'We choose leather, wood and metal that hold up to daily use and age beautifully.'] },
  { icon: Ruler, ar: ['تفاصيل مدروسة', 'من مقاس الحواف لدرجة اللون، كل تفصيلة بتتفحص أكتر من مرة قبل ما توصلك.'], en: ['Considered details', 'From edge sizing to color tone, every detail is checked more than once before it reaches you.'] },
  { icon: Heart, ar: ['بالعربي، من الأول', 'مصممين لمستخدم عربي، مش ترجمة لتصميم غربي.'], en: ['Arabic by design', 'Made for an Arabic user, not a translated version of a Western design.'] },
]

const materials = [
  { ar: 'جلد صناعي فاخر', en: 'Premium vegan leather', image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=500&q=80&auto=format&fit=crop' },
  { ar: 'خشب طبيعي', en: 'Solid wood', image: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=500&q=80&auto=format&fit=crop' },
  { ar: 'معدن مطلي', en: 'Powder-coated metal', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80&auto=format&fit=crop' },
  { ar: 'قماش كانفاس', en: 'Cotton canvas', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=500&q=80&auto=format&fit=crop' },
]

export function About() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('عن رفيق', 'About Rafiq'))

  return <div className="pt-[108px]">
    <section className="border-b border-line dark:border-line-dark">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-14 md:grid-cols-2 md:px-10 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <span className="text-xs font-semibold tracking-[.2em] text-burgundy">{t('عن رفيق', 'ABOUT RAFIQ')}</span>
          <h1 className="mt-5 font-ar-heading text-4xl font-semibold leading-[1.35] text-ink dark:text-ink-dark md:text-5xl">
            {t('رفيق يعني', 'Rafiq means')} <span className="text-burgundy">{t('رفيق دربك.', 'your companion.')}</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-muted dark:text-muted-dark">{t('مش مجرد اسم براند. دي الفكرة اللي بنينا عليها كل قطعة - إننا نكون معاك في مساحتك اليومية، من غير ما نزاحمك أو نلفت النظر لنفسنا.', 'It is not just a brand name. It is the idea behind every piece we make - to be with you in your everyday space, without crowding it or asking for attention.')}</p>
        </motion.div>
        <motion.img initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9 }} src="https://images.unsplash.com/photo-1541558869434-2840d308329a?w=1100&q=85&auto=format&fit=crop" alt={t('حرفي رفيق أثناء العمل', 'A Rafiq craftsperson at work')} className="aspect-[4/3] w-full rounded-2xl object-cover md:rounded-[26px]" />
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      <SectionHeading eyebrow={t('المشكلة', 'THE PROBLEM')} heading={t('مساحة العمل بقت مصدر تشتت،\nمش مصدر تركيز.', 'The workspace became a source\nof distraction, not focus.')} subtitle={t('كابلات متلخبطة، أوراق مبعثرة، أدوات مالهاش مكان ثابت - كل ده بياخد من تركيزك من غير ما تلاحظ.', 'Tangled cables, scattered papers, tools with no fixed place - it all quietly steals your focus.')} />
    </section>

    <section className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24 md:gap-16">
        <motion.img initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .9 }} src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1100&q=85&auto=format&fit=crop" alt="" className="aspect-square w-full rounded-2xl object-cover md:rounded-[26px]" />
        <div>
          <span className="text-xs font-semibold tracking-[.2em] text-burgundy">{t('فلسفتنا', 'OUR PHILOSOPHY')}</span>
          <h2 className="mt-5 font-ar-heading text-3xl font-semibold leading-[1.4] text-ink dark:text-ink-dark md:text-4xl">{t('لما مكانك يكون مرتب،\nبيتحرر جزء من دماغك.', 'When your space is in order,\npart of your mind is freed.')}</h2>
          <p className="mt-6 max-w-md text-base leading-8 text-muted dark:text-muted-dark">{t('إحنا في رفيق مش بنبيعلك أدوات مكتبية. بنصمملك نظام بسيط يخلي كل حاجة في مكانها، عشان تركيزك يفضل لنفسك بس - مش لترتيب اللي حواليك.', 'At Rafiq we do not sell you office supplies. We design you a simple system that keeps everything in its place, so your focus stays for yourself - not for tidying what is around you.')}</p>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      <SectionHeading align="center" eyebrow={t('مبادئنا', 'DESIGN PRINCIPLES')} heading={t('إزاي بنفكر في كل منتج', 'How we think about every product')} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((item, index) => <motion.div key={item.en[0]} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .6, delay: index * .08 }} className="rounded-2xl border border-line p-6 dark:border-line-dark">
          <span className="grid size-11 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><item.icon size={19} /></span>
          <h3 className="mt-5 font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{isArabic ? item.ar[0] : item.en[0]}</h3>
          <p className="mt-2 text-sm leading-7 text-muted dark:text-muted-dark">{isArabic ? item.ar[1] : item.en[1]}</p>
        </motion.div>)}
      </div>
    </section>

    <section className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <SectionHeading eyebrow={t('الخامات', 'MATERIALS')} heading={t('نختار بعناية،\nمش بسرعة.', 'We choose with care,\nnot with speed.')} subtitle={t('كل خامة بنستخدمها بتتفحص من ناحية الجودة والاستدامة قبل ما تدخل أي منتج رفيق.', 'Every material we use is checked for quality and durability before it enters a Rafiq product.')} />
        <div className="mt-11 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {materials.map((material, index) => <motion.div key={material.en} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .6, delay: index * .08 }}>
            <div className="aspect-square overflow-hidden rounded-2xl"><img src={material.image} alt={isArabic ? material.ar : material.en} className="size-full object-cover" /></div>
            <p className="mt-3 text-center text-sm font-medium text-ink dark:text-ink-dark">{isArabic ? material.ar : material.en}</p>
          </motion.div>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><Leaf size={22} /></span>
        <h2 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark md:text-3xl">{t('الاستدامة مش خطوة إضافية،\nهي جزء من التصميم.', 'Sustainability is not an add-on,\nit is part of the design.')}</h2>
        <p className="max-w-md text-sm leading-8 text-muted dark:text-muted-dark">{t('بنصمم منتجاتنا لتعيش معاك سنين طويلة، مش عشان تتغير كل موسم. جودة تدوم أفضل من كمية بتتغير بسرعة.', 'We design our products to live with you for years, not to be replaced every season. Lasting quality beats fast-changing quantity.')}</p>
      </div>
    </section>

    <BrandStatement />

    <section className="mx-auto max-w-[1440px] px-5 py-16 text-center md:px-10 md:py-24">
      <h2 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark md:text-3xl">{t('جاهز تبني مساحتك؟', 'Ready to build your space?')}</h2>
      <Link to="/shop" className="mt-7 inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-4 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('تسوق منتجات رفيق', 'Shop Rafiq products')}</Link>
    </section>

    <NewsletterSection />
  </div>
}