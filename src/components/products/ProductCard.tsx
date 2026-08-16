import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocalized } from '../../hooks/useLocalized'
import { cn } from '../../lib/cn'
import { productsEn } from '../../data/products'
import type { Product } from '../../types'
import { useCart } from '../../context/CartContext'


export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [wishlisted, setWishlisted] = useState(false)
  const { isArabic, t } = useLocalized()
  const { addItem } = useCart()
  const copy = productsEn[product.id]
  const name = isArabic ? product.name : copy.name
  const description = isArabic ? product.description : copy.description
  return <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .55, delay: index * .06 }} className="group">
    <Link to={`/products/${product.id}`} className="relative block aspect-[.96] overflow-hidden rounded-[14px] bg-paper dark:bg-paper-dark" aria-label={t(`عرض ${product.name}`, `View ${copy.name}`)}>
      <img src={product.image} alt={name} className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.055]" />
      <button onClick={event => { event.preventDefault(); setWishlisted(value => !value) }} aria-label={t('أضف للمفضلة', 'Add to wishlist')} className="absolute left-3 top-3 grid size-8 place-items-center rounded-full bg-cream/90 text-ink shadow-sm backdrop-blur transition hover:scale-105 dark:bg-paper-dark/90 dark:text-ink-dark"><Heart size={15} className={cn(wishlisted ? 'fill-burgundy text-burgundy' : '')} /></button>
      <button onClick={event => { event.preventDefault(); addItem(product.id, 1) }} aria-label={t('أضف للسلة', 'Add to cart')} className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-gold text-burgundy-dark opacity-100 shadow-sm transition hover:scale-105 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"><Plus size={17} /></button>
    </Link>
    <div className="pt-3">
      <div className="flex items-start justify-between gap-2">
        <Link to={`/products/${product.id}`} className="font-ar-heading text-sm font-semibold text-ink transition hover:text-burgundy dark:text-ink-dark">{name}</Link>
        <span className="shrink-0 text-sm font-semibold text-burgundy">{product.price} {isArabic ? product.currency : 'EGP'}</span>
      </div>
      <p className="mt-1 line-clamp-1 text-xs leading-5 text-muted dark:text-muted-dark">{description}</p>
      <div className="mt-2 flex gap-1.5">{product.colors.map(color => <i key={color} className="size-2 rounded-full ring-1 ring-black/5" style={{ backgroundColor: color }} />)}</div>
    </div>
  </motion.article>
}