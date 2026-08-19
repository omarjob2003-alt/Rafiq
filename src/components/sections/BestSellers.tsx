import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ProductCard } from '../products/ProductCard'
import { bestSellers } from '../../data/products'
import { useLocalized } from '../../hooks/useLocalized'
export function BestSellers() { const { t, isArabic } = useLocalized(); return <section className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark"><div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28"><div className="flex flex-wrap items-end justify-between gap-6"><SectionHeading eyebrow={t('مختارات رفيق', 'RAFIQ EDITS')} heading={t('الأكثر طلبًا', 'Most loved')} align="start" /><Link to="/shop" className="mb-1 inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-burgundy transition hover:underline">{t('عرض كل المنتجات', 'View all products')}<ArrowLeft size={15} className={isArabic ? '' : 'rotate-180'} /></Link></div><div className="mt-11 grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-5">{bestSellers.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div></div></section> }
