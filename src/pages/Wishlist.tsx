import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useLocalized } from '../hooks/useLocalized'
import { products } from '../data/products'
import { ProductCard } from '../components/products/ProductCard'

export function Wishlist() {
  const { productIds } = useWishlist()
  const { t } = useLocalized()
  const items = products.filter(product => productIds.includes(product.id))

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-16">
      <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark md:text-4xl">{t('المفضلة', 'Wishlist')}</h1>

      {items.length === 0
        ? <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><Heart size={26} /></span>
            <p className="max-w-xs text-sm text-muted dark:text-muted-dark">{t('لسه مضفتش أي منتج للمفضلة.', "You haven't added anything to your wishlist yet.")}</p>
            <Link to="/shop" className="rounded-full bg-burgundy px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('تسوق الآن', 'Shop now')}</Link>
          </div>
        : <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {items.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>}
    </div>
  </div>
}