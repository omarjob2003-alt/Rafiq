import { motion } from 'framer-motion'
import { Gem, LayoutGrid, PenLine, Clock } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'

export function ValueProps() {
  const { t } = useLocalized()
  const values = [{ icon: PenLine, title: t('مصمم بعناية', 'Thoughtfully made'), text: t('تفاصيل مدروسة لكل يوم', 'Details for every day') }, { icon: Gem, title: t('جودة تدوم', 'Made to last'), text: t('خامات مختارة بعناية', 'Carefully selected materials') }, { icon: LayoutGrid, title: t('تنظيم أبسط', 'Simple organisation'), text: t('لكل شيء مكان', 'A place for everything') }, { icon: Clock, title: t('رفيق في كل وقت', 'A daily companion'), text: t('منتجات تعيش معك', 'Objects that live with you') }]
  return <section className="border-b border-line bg-cream dark:border-line-dark dark:bg-cream-dark"><div className="mx-auto max-w-[1440px] px-5 py-9 md:px-10 md:py-11"><div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-6">{values.map(({ icon: Icon, title, text }, index) => <motion.div key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="flex items-center gap-3 border-line last:border-none md:border-s md:px-6 first:md:pr-0"><span className="grid size-10 place-items-center rounded-full bg-burgundy/[.06] text-burgundy"><Icon size={18} strokeWidth={1.5} /></span><div><p className="font-ar-heading text-sm font-semibold text-ink dark:text-ink-dark">{title}</p><p className="mt-1 text-xs text-muted dark:text-muted-dark">{text}</p></div></motion.div>)}</div></div></section>
}
