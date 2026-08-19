import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import type { Collection } from '../../types'

const MotionLink = motion(Link)

const englishDescriptions: Record<string, string> = { workspace: 'Essential pieces for your desk from the ground up.', organization: 'Tools that give everything a considered place.', everyday: 'Small details that transform daily routines.', essentials: 'The perfect starting point for a Rafiq space.' }

export function CollectionCard({ collection, index = 0 }: { collection: Collection; index?: number }) {
  const { isArabic } = useLocalized()
  const title = isArabic ? collection.name : collection.nameEn
  return <MotionLink to={collection.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: index * .08 }} className="group relative block aspect-[3/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-[16px] sm:w-full">
    <img src={collection.image} alt={title} className="size-full object-cover transition duration-700 group-hover:scale-[1.06]" /><div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/90 via-ink/10 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5"><div><p className="font-en-body text-[11px] uppercase tracking-[.17em] text-gold">{collection.nameEn}</p><h3 className="mt-1 font-ar-heading text-2xl font-semibold text-cream">{title}</h3><p className="mt-2 hidden max-w-[15rem] text-xs leading-5 text-cream/75 sm:block">{isArabic ? collection.description : englishDescriptions[collection.id]}</p></div><span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-ink transition group-hover:-translate-x-1"><ArrowLeft size={16} className={isArabic ? '' : 'rotate-180'} /></span></div>
  </MotionLink>
}