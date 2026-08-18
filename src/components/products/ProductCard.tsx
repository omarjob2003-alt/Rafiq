import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Plus, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocalized } from '../../hooks/useLocalized'
import { cn } from '../../lib/cn'
import { productsEn } from '../../data/products'
import type { Product } from '../../types'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useState } from 'react'



export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [justAdded, setJustAdded] = useState(false)
  const { isArabic, t } = useLocalized()
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const copy = productsEn[product.id]
  const name = isArabic ? product.name : copy.name
  const description = isArabic ? product.description : copy.description
  return <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .55, delay: index * .06 }} className="group">
    <Link to={`/products/${product.id}`} className="relative block aspect-[.96] overflow-hidden rounded-[14px] bg-paper dark:bg-paper-dark" aria-label={t(`عرض ${product.name}`, `View ${copy.name}`)}>
      <img src={product.image} alt={name} className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.055]" />
      <button onClick={event => { event.preventDefault(); toggle(product.id) }} aria-label={t('أضف للمفضلة', 'Add to wishlist')} className="absolute left-3 top-3 grid size-8 place-items-center rounded-full bg-cream/90 text-ink shadow-sm backdrop-blur transition hover:scale-105 dark:bg-paper-dark/90 dark:text-ink-dark"><Heart size={15} className={cn(wishlisted ? 'fill-burgundy text-burgundy' : '')} /></button>
      <motion.button
        onClick={event => {
          event.preventDefault()
          addItem(product.id, 1)
          setJustAdded(true)
          setTimeout(() => setJustAdded(false), 1200)
        }}
        animate={justAdded ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: .4, ease: 'easeOut' }}
        aria-label={t('أضف للسلة', 'Add to cart')}
        className={cn(
          'absolute bottom-3 right-3 grid size-9 place-items-center rounded-full shadow-sm transition-colors sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100',
          justAdded ? 'bg-burgundy text-cream opacity-100' : 'bg-gold text-burgundy-dark opacity-100 hover:scale-105'
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {justAdded
            ? <motion.span key="check" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ duration: .25 }}><Check size={17} /></motion.span>
            : <motion.span key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: .2 }}><Plus size={17} /></motion.span>}
        </AnimatePresence>
      </motion.button>
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