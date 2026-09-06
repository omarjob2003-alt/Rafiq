import { useState } from 'react'
import { LogOut, Mail, MapPin, Phone, User } from 'lucide-react'
import { useOrders } from '../context/OrdersContext'
import { useAdmin } from '../context/AdminContext'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { orderStatuses, type OrderStatus } from '../data/orderStatuses'
import { products } from '../data/products'
import { cn } from '../lib/cn'
import { Search } from 'lucide-react'

export function AdminOrders() {
  const { orders, updateStatus } = useOrders()
  const { admin, logout } = useAdmin()
  const { t, isArabic } = useLocalized()
  usePageTitle(t('إدارة الطلبات', 'Manage orders'))
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  // const filtered = filter === 'all' ? orders : orders.filter(order => order.status === filter)
const filtered = orders
  .filter(order => filter === 'all' || order.status === filter)
  .filter(order => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      order.id.toLowerCase().includes(q) ||
      (order.customerName ?? '').toLowerCase().includes(q) ||
      (order.customerEmail ?? '').toLowerCase().includes(q)
    )
  })

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark">{t('إدارة الطلبات', 'Manage orders')}</h1>
          <p className="mt-1 text-xs text-muted dark:text-muted-dark">{t('مسجل دخول باسم', 'Logged in as')} {admin?.name}</p>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink dark:border-line-dark dark:text-ink-dark"><LogOut size={15} /> {t('خروج', 'Log out')}</button>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-line bg-cream px-3.5 py-2.5 dark:border-line-dark dark:bg-cream-dark">
        <Search size={16} className="text-muted dark:text-muted-dark" />
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder={t('دور برقم الطلب أو اسم العميل أو الإيميل...', 'Search by order number, customer name, or email...')}
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted dark:text-ink-dark dark:placeholder:text-muted-dark"
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')} className={cn('rounded-full border px-3.5 py-1.5 text-xs dark:border-line-dark', filter === 'all' ? 'border-burgundy bg-burgundy text-cream' : 'border-line text-ink dark:text-ink-dark')}>{t('الكل', 'All')} ({orders.length})</button>
        {orderStatuses.map(status => (
          <button key={status.id} onClick={() => setFilter(status.id)} className={cn('rounded-full border px-3.5 py-1.5 text-xs dark:border-line-dark', filter === status.id ? 'border-burgundy bg-burgundy text-cream' : 'border-line text-ink dark:text-ink-dark')}>
            {isArabic ? status.ar : status.en} ({orders.filter(o => o.status === status.id).length})
          </button>
        ))}
      </div>

      {filtered.length === 0
        ? <p className="mt-16 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش طلبات هنا.', 'No orders here.')}</p>
        : <div className="mt-8 space-y-4">
          {filtered.map(order => {
            const expanded = expandedId === order.id
            return <div key={order.id} className="rounded-xl border border-line dark:border-line-dark">
              <button onClick={() => setExpandedId(expanded ? null : order.id)} className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-start md:p-5">
                <div>
                  <p className="font-medium text-ink dark:text-ink-dark">{order.id}</p>
                  <p className="text-xs text-muted dark:text-muted-dark">{order.customerName || t('عميل زائر', 'Guest customer')} · {new Date(order.date).toLocaleString(isArabic ? 'ar-EG' : 'en-GB')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-burgundy">{order.total} {t('جنيه', 'EGP')}</span>
                  <select
                    value={order.status}
                    onClick={event => event.stopPropagation()}
                    onChange={event => updateStatus(order.id, event.target.value as OrderStatus)}
                    className="rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
                  >
                    {orderStatuses.map(status => <option key={status.id} value={status.id}>{isArabic ? status.ar : status.en}</option>)}
                  </select>
                </div>
              </button>

              {expanded && (
                <div className="border-t border-line p-4 dark:border-line-dark md:p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-ink dark:text-ink-dark"><User size={14} className="text-muted dark:text-muted-dark" /> {order.customerName || '—'}</p>
                      <p className="flex items-center gap-2 text-ink dark:text-ink-dark" style={{ direction: 'ltr', justifyContent: isArabic ? 'flex-end' : 'flex-start' }}><Mail size={14} className="text-muted dark:text-muted-dark" /> {order.customerEmail || '—'}</p>
                      <p className="flex items-center gap-2 text-ink dark:text-ink-dark" style={{ direction: 'ltr', justifyContent: isArabic ? 'flex-end' : 'flex-start' }}><Phone size={14} className="text-muted dark:text-muted-dark" /> {order.customerPhone || '—'}{order.altPhone ? ` / ${order.altPhone}` : ''}</p>
                      <p className="flex items-start gap-2 text-ink dark:text-ink-dark"><MapPin size={14} className="mt-0.5 shrink-0 text-muted dark:text-muted-dark" /> {order.addressText || t('مفيش عنوان مسجل', 'No address recorded')}</p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted dark:text-muted-dark">{t('محتويات الطلب', 'Order items')}</p>
                      <div className="space-y-1.5">
                        {order.lines.map(line => {
                          const product = products.find(p => p.id === line.productId)
                          return product ? <div key={line.productId} className="flex items-center gap-2 text-sm">
                            <img src={product.image} alt="" className="size-9 rounded-lg object-cover" />
                            <span className="flex-1 text-ink/80 dark:text-ink-dark/80">{product.name} × {line.quantity}</span>
                            <span className="text-ink dark:text-ink-dark">{line.price * line.quantity} {t('جنيه', 'EGP')}</span>
                          </div> : null
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          })}
        </div>}
    </div>
  </div>
}