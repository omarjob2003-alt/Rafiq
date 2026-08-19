import { SectionHeading } from '../ui/SectionHeading'
import { ProductCard } from '../products/ProductCard'
import { getRecentlyViewed } from '../../hooks/useRecentlyViewed'
import { products } from '../../data/products'
import { useLocalized } from '../../hooks/useLocalized'



export function RecentlyViewedHomeSection() {
    const { t, } = useLocalized()
    const ids = getRecentlyViewed()
    const items = ids.map(id => products.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p))

    if (items.length === 0) return null

    return <section className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
            <SectionHeading eyebrow={t('استكمل من هنا', 'PICK UP WHERE YOU LEFT OFF')} heading={t('منتجات شفتها مؤخرًا', 'Recently viewed')} align="start" />
            <div className="mt-11 grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-5">
                {items.slice(0, 5).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
            </div>
        </div>
    </section>

}