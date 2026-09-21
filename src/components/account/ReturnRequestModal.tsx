import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import { useAuth } from '../../context/AuthContext'
import { addReturnRequest, type ReturnType } from '../../lib/returns'
import { products } from '../../data/products'
import type { Order } from '../../context/OrdersContext'
import { cn } from '../../lib/cn'

interface ReturnRequestModalProps {
  order: Order | null
  onClose: () => void
  onSubmitted: () => void
}

export function ReturnRequestModal({ order, onClose, onSubmitted }: ReturnRequestModalProps) {
  const { t, isArabic } = useLocalized()
  const { user } = useAuth()
  const [productId, setProductId] = useState('')
  const [type, setType] = useState<ReturnType>('return')
  const [reason, setReason] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!order || !user || !productId) return
    const line = order.lines.find(l => l.productId === productId)
    if (!line) return
    addReturnRequest({ orderId: order.id, userEmail: user.email, productId, quantity: line.quantity, type, reason })
    onSubmitted()
    onClose()
  }

  return <AnimatePresence>
    {order && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .95 }} onClick={event => event.stopPropagation()} className="w-full max-w-md rounded-2xl bg-cream p-6 dark:bg-cream-dark">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('طلب استبدال أو إرجاع', 'Return or exchange request')}</h2>
            <button onClick={onClose} aria-label={t('إغلاق', 'Close')} className="grid size-8 place-items-center rounded-full hover:bg-burgundy/5"><X size={16} /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('المنتج', 'Product')}</span>
              <select required value={productId} onChange={e => setProductId(e.target.value)} className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none dark:border-line-dark dark:bg-paper-dark dark:text-ink-dark">
                <option value="">{t('اختار منتج من الطلب', 'Select a product from this order')}</option>
                {order.lines.map(line => {
                  const product = products.find(p => p.id === line.productId)
                  return product ? <option key={line.productId} value={line.productId}>{isArabic ? product.name : product.id} × {line.quantity}</option> : null
                })}
              </select>
            </label>

            <div>
              <p className="mb-1.5 text-sm text-ink/80 dark:text-ink-dark/80">{t('نوع الطلب', 'Request type')}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setType('return')} className={cn('flex-1 rounded-lg border px-3 py-2.5 text-sm transition dark:border-line-dark', type === 'return' ? 'border-burgundy bg-burgundy/[.05] text-burgundy dark:bg-burgundy/15' : 'border-line text-ink dark:text-ink-dark')}>{t('إرجاع', 'Return')}</button>
                <button type="button" onClick={() => setType('exchange')} className={cn('flex-1 rounded-lg border px-3 py-2.5 text-sm transition dark:border-line-dark', type === 'exchange' ? 'border-burgundy bg-burgundy/[.05] text-burgundy dark:bg-burgundy/15' : 'border-line text-ink dark:text-ink-dark')}>{t('استبدال', 'Exchange')}</button>
              </div>
            </div>

            <label className="block text-sm">
              <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('السبب', 'Reason')}</span>
              <textarea required rows={3} value={reason} onChange={e => setReason(e.target.value)} placeholder={t('احكيلنا إيه المشكلة...', 'Tell us what went wrong...')} className="w-full resize-none rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none dark:border-line-dark dark:bg-paper-dark dark:text-ink-dark" />
            </label>

            <button type="submit" className="w-full rounded-lg bg-burgundy py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('إرسال الطلب', 'Submit request')}</button>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
}