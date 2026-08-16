import { SectionHeading } from '../ui/SectionHeading'
import { ProductCard } from '../products/ProductCard'
import { bestSellers } from '../../data/products'
import { useLocalized } from '../../hooks/useLocalized'
export function BestSellers() { const { t } = useLocalized(); return <section className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark"><div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28"><SectionHeading eyebrow={t('مختارات رفيق', 'RAFIQ EDITS')} heading={t('الأكثر طلبًا', 'Most loved')} align="start" /><div className="mt-11 grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-5">{bestSellers.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div></div></section> }
