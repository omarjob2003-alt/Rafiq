import { useState } from 'react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { getAllReturnRequests, updateReturnStatus, type ReturnStatus } from '../lib/returns'
import { returnStatusLabels } from '../data/returnStatuses'
import { products } from '../data/products'
import { AdminLayout } from '../components/admin/AdminLayout'
import { adjustStock } from '../lib/productOverrides'

export function AdminReturns() {
    const { t, isArabic } = useLocalized()
    usePageTitle(t('الاستبدال والإرجاع', 'Returns & exchanges'))
    const [requests, setRequests] = useState(getAllReturnRequests())

    const handleUpdate = (id: string, status: ReturnStatus) => {
        updateReturnStatus(id, status)
        const request = requests.find(r => r.id === id)
        if (request && status === 'approved' && request.type === 'return') {
            adjustStock(request.productId, request.quantity, 'return', products, `${t('إرجاع طلب', 'Return of order')} ${request.orderId}`)
        }
        setRequests(getAllReturnRequests())
    }
    return <AdminLayout>
        <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('طلبات الاستبدال والإرجاع', 'Return & exchange requests')}</h2>

        {requests.length === 0
            ? <p className="mt-10 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش طلبات لسه.', 'No requests yet.')}</p>
            : <div className="mt-6 space-y-4">
                {requests.map(request => {
                    const product = products.find(p => p.id === request.productId)
                    return <div key={request.id} className="rounded-xl border border-line p-4 dark:border-line-dark">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {product && <img src={product.image} alt="" className="size-10 rounded-lg object-cover" />}
                                <div>
                                    <p className="text-sm font-medium text-ink dark:text-ink-dark">{product ? (isArabic ? product.name : product.id) : request.productId} × {request.quantity}</p>
                                    <p className="text-xs text-muted dark:text-muted-dark">{request.orderId} · {request.userEmail} · {new Date(request.date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB')}</p>
                                </div>
                            </div>
                            <span className="rounded-full bg-gold/20 px-2.5 py-1 text-[11px] font-medium text-burgundy">{t(request.type === 'exchange' ? 'استبدال' : 'إرجاع', request.type === 'exchange' ? 'Exchange' : 'Return')}</span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-ink/85 dark:text-ink-dark/85">{request.reason}</p>
                        <select
                            value={request.status}
                            onChange={event => handleUpdate(request.id, event.target.value as ReturnStatus)}
                            className="mt-3 rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
                        >
                            {(Object.keys(returnStatusLabels) as ReturnStatus[]).map(key => <option key={key} value={key}>{isArabic ? returnStatusLabels[key].ar : returnStatusLabels[key].en}</option>)}
                        </select>
                    </div>
                })}
            </div>}
    </AdminLayout>
}