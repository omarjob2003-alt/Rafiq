import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'

interface MobileStickyBuyBarProps {
  show: boolean
  name: string
  price: number
  currency: string
  image: string
  onAdd: () => void
}

export function MobileStickyBuyBar({ show, name, price, currency, image, onAdd }: MobileStickyBuyBarProps) {
  const { t } = useLocalized()

  return <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: .3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-3 py-2 backdrop-blur-lg dark:border-line-dark dark:bg-cream-dark/95 md:hidden"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-2.5">
          <img src={image} alt="" className="size-9 shrink-0 rounded-md object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-ink dark:text-ink-dark">{name}</p>
            <p className="text-xs font-semibold text-burgundy">{price} {currency}</p>
          </div>
          <button onClick={onAdd} className="flex shrink-0 items-center gap-1.5 rounded-lg bg-burgundy px-3.5 py-2 text-xs font-medium text-cream transition hover:bg-burgundy-dark">
            <ShoppingBag size={13} /> {t('أضف', 'Add')}
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
}