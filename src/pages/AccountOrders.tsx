import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import { useOrders } from '../context/OrdersContext'
import { useLocalized } from '../hooks/useLocalized'
import { AccountLayout } from '../components/account/AccountLayout'
import { products } from '../data/products'

export function AccountOrders() {
    const { orders } = useOrders()
    const { t, isArabic } = useLocalized()

    return <AccountLayout>
        <div className="rounded-2xl border border-line p-6 dark:border-line-dark md:p-8">
            <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('طلباتي', 'My orders')}</h2>
            {orders.length === 0
                ? <div className="mt-8 flex flex-col items-center gap-4 py-8 text-center">
                    <span className="grid size-14 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><Package size={22} /></span>
                    <p className="text-sm text-muted dark:text-muted-dark">{t('لسه معملتش أي طلب.', "You haven't placed any orders yet.")}</p>
                    <Link to="/shop" className="rounded-full bg-burgundy px-6 py-2.5 text-sm font-semibold text-cream">{t('تسوق الآن', 'Shop now')}</Link>
                </div>
                : <div className="mt-6 space-y-4">
                    {orders.map(order => <div key={order.id} className="rounded-xl border border-line p-4 dark:border-line-dark">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-medium text-ink dark:text-ink-dark">{order.id}</p>
                            <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-burgundy">{t('جاري التجهيز', 'Processing')}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted dark:text-muted-dark">{new Date(order.date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB')}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {order.lines.map(line => {
                                const product = products.find(p => p.id === line.productId)
                                return product ? <img key={line.productId} src={product.image} alt="" className="size-12 rounded-lg object-cover" /> : null
                            })}
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <p className="text-sm font-semibold text-burgundy">{order.total} {t('جنيه', 'EGP')}</p>
                            <Link to={`/track-order?order=${order.id}`} className="text-xs font-medium text-ink underline underline-offset-4 hover:text-burgundy dark:text-ink-dark">{t('تتبع الطلب', 'Track order')}</Link>
                        </div>
                    </div>)}
                </div>}
        </div>
    </AccountLayout>
}