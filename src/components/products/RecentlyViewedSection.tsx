import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import { getRecentlyViewed } from '../../hooks/useRecentlyViewed'
import { products, productsEn } from '../../data/products'

export function RecentlyViewedSection({ excludeId }: { excludeId?: string }) {
  const { t, isArabic } = useLocalized()
  const ids = getRecentlyViewed(excludeId)
  const items = ids.map(id => products.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p))

  if (items.length === 0) return null

  return <div className="mb-8 md:mb-10">
    <div className="mb-4 flex items-center justify-between">
      <p className="text-xs font-medium text-muted dark:text-muted-dark">{t('شفت كمان', 'Also viewed')}</p>
      <Link to="/recently-viewed" className="inline-flex items-center gap-1 text-xs font-medium text-burgundy transition hover:underline">
        {t('شوف الكل', 'See all')}
        <ArrowLeft size={12} className={isArabic ? '' : 'rotate-180'} />
      </Link>
    </div>
    <div className="flex gap-4 overflow-x-auto pb-1">
      {items.slice(0, 6).map(product => {
        const name = isArabic ? product.name : productsEn[product.id].name
        return <Link key={product.id} to={`/products/${product.id}`} className="group flex shrink-0 flex-col items-center gap-1.5 w-16">
          <span className="size-14 overflow-hidden rounded-full ring-1 ring-line transition group-hover:ring-burgundy dark:ring-line-dark">
            <img src={product.image} alt={name} className="size-full object-cover" />
          </span>
          <span className="line-clamp-1 text-center text-[10px] text-muted transition group-hover:text-burgundy dark:text-muted-dark">{name}</span>
        </Link>
      })}
    </div>
  </div>
}