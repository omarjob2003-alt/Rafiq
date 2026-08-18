import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Boxes, Coffee, LayoutGrid, Sparkles } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import { products } from '../../data/products'
import type { Collection } from '../../types'

const MotionLink = motion(Link)

const icons: Record<string, typeof LayoutGrid> = {
  workspace: LayoutGrid,
  organization: Boxes,
  everyday: Coffee,
  essentials: Sparkles,
}

const englishDescriptions: Record<string, string> = {
  workspace: 'Essential pieces for your desk from the ground up.',
  organization: 'Tools that give everything a considered place.',
  everyday: 'Small details that transform daily routines.',
  essentials: 'The perfect starting point for a Rafiq space.',
}

export function CollectionOverviewCard({ collection, index = 0 }: { collection: Collection; index?: number }) {
  const { isArabic, t } = useLocalized()
  const Icon = icons[collection.id] ?? LayoutGrid
  const count = products.filter(product => product.categoryId === collection.id).length

  return <MotionLink
    to={collection.href}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: .6, delay: index * .08 }}
    className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition hover:border-burgundy/30 dark:border-line-dark dark:bg-paper-dark sm:flex-row"
  >
    <div className="aspect-[4/3] overflow-hidden sm:aspect-auto sm:w-2/5">
      <img src={collection.image} alt={isArabic ? collection.name : collection.nameEn} className="size-full object-cover transition duration-700 group-hover:scale-[1.06]" />
    </div>
    <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-en-body text-[11px] uppercase tracking-[.17em] text-gold">{collection.nameEn}</p>
            <h3 className="mt-1 font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{isArabic ? collection.name : collection.nameEn}</h3>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><Icon size={18} /></span>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted dark:text-muted-dark">{isArabic ? collection.description : englishDescriptions[collection.id]}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-muted dark:text-muted-dark">{t(`${count} منتج`, `${count} products`)}</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy">
          {t('استكشف المجموعة', 'Explore collection')}
          <ArrowLeft size={15} className={isArabic ? 'transition group-hover:-translate-x-1' : 'rotate-180 transition group-hover:translate-x-1'} />
        </span>
      </div>
    </div>
  </MotionLink>
}