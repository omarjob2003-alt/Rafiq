import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useQuickView } from '../../context/QuickViewContext'
import { useLocalized } from '../../hooks/useLocalized'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { products, productsEn } from '../../data/products'

export function QuickViewModal() {
  const { openProductId, closeQuickView } = useQuickView()
  const { isArabic, t } = useLocalized()
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const [quantity, setQuantity] = useState(1)

  const product = products.find(p => p.id === openProductId)
  const copy = product ? productsEn[product.id] : null

  return <AnimatePresence>
    {product && copy && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeQuickView} className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: .95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: .95, y: 10 }}
          transition={{ duration: .25 }}
          onClick={event => event.stopPropagation()}
          className="grid max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-cream dark:bg-cream-dark sm:grid-cols-2"
        >
          <div className="aspect-square sm:aspect-auto">
            <img src={product.image} alt={isArabic ? product.name : copy.name} className="size-full object-cover" />
          </div>
          <div className="relative p-6">
            <button onClick={closeQuickView} aria-label={t('إغلاق', 'Close')} className="absolute end-4 top-4 grid size-8 place-items-center rounded-full hover:bg-burgundy/5"><X size={17} /></button>
            <h2 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{isArabic ? product.name : copy.name}</h2>
            <p className="mt-3 text-xl font-semibold text-burgundy">{product.price} {isArabic ? product.currency : 'EGP'}</p>
            <p className="mt-3 text-sm leading-7 text-muted dark:text-muted-dark">{isArabic ? product.description : copy.description}</p>
            <div className="mt-4 flex gap-1.5">{product.colors.map(color => <i key={color} className="size-3 rounded-full ring-1 ring-black/5" style={{ backgroundColor: color }} />)}</div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-lg border bg-paper dark:border-line-dark dark:bg-paper-dark">
                <button onClick={() => setQuantity(v => Math.max(1, v - 1))} className="p-2.5 text-muted hover:text-burgundy dark:text-muted-dark"><Minus size={15} /></button>
                <span className="w-8 text-center text-sm text-ink dark:text-ink-dark">{quantity}</span>
                <button onClick={() => setQuantity(v => v + 1)} className="p-2.5 text-muted hover:text-burgundy dark:text-muted-dark"><Plus size={15} /></button>
              </div>
              <button onClick={() => { addItem(product.id, quantity); closeQuickView() }} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-burgundy px-4 py-3 text-sm font-medium text-cream transition hover:bg-burgundy-dark"><ShoppingBag size={16} /> {t('أضف للسلة', 'Add to cart')}</button>
              <button onClick={() => toggle(product.id)} aria-label={t('المفضلة', 'Wishlist')} className="grid size-11 shrink-0 place-items-center rounded-lg border border-burgundy text-burgundy"><Heart size={17} className={isWishlisted(product.id) ? 'fill-burgundy' : ''} /></button>
            </div>

            <Link to={`/products/${product.id}`} onClick={closeQuickView} className="mt-5 inline-block text-sm font-medium text-burgundy hover:underline">{t('عرض التفاصيل الكاملة', 'View full details')}</Link>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
}