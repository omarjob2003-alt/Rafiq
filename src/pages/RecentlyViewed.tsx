import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { getRecentlyViewed } from '../hooks/useRecentlyViewed'
import { products } from '../data/products'
import { ProductCard } from '../components/products/ProductCard'

export function RecentlyViewed() {
  const { t } = useLocalized()
  usePageTitle(t('منتجات شفتها مؤخرًا', 'Recently viewed'))
  const ids = getRecentlyViewed()
  const items = ids.map(id => products.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-16">
      <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark md:text-4xl">{t('منتجات شفتها مؤخرًا', 'Recently viewed')}</h1>

      {items.length === 0
        ? <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><Clock size={26} /></span>
            <p className="max-w-xs text-sm text-muted dark:text-muted-dark">{t('لسه مفتحتش أي منتج. تصفح المتجر عشان يبدأ يظهر هنا.', "You haven't viewed any products yet. Browse the shop to start seeing them here.")}</p>
            <Link to="/shop" className="rounded-full bg-burgundy px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('تسوق الآن', 'Shop now')}</Link>
          </div>
        : <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {items.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>}
    </div>
  </div>
}