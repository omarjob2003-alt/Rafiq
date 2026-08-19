import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { CollectionCard } from '../products/CollectionCard'
import { collections } from '../../data/collections'
import { useLocalized } from '../../hooks/useLocalized'
export function CollectionsSection() 
{ const { t, isArabic } = useLocalized(); return <section id="collections" className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark"><div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28"><div className="flex flex-wrap items-end justify-between gap-6"><SectionHeading eyebrow={t('مجموعاتنا', 'OUR COLLECTIONS')} heading={t('اختر مساحتك', 'Choose your space')} subtitle={t('منتجات صممت لتعيش مع طريقة استخدامك لمساحتك.', 'Products made around the way you use your space.')} /><Link to="/collections" className="mb-1 inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-burgundy transition hover:underline">{t('عرض كل المجموعات', 'View all collections')}<ArrowLeft size={15} className={isArabic ? '' : 'rotate-180'} /></Link></div><div className="-mx-5 mt-11 flex gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">{collections.map((collection, index) => <CollectionCard key={collection.id} collection={collection} index={index} />)}</div></div></section> }
