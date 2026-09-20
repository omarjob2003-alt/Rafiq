import { Link } from 'react-router-dom'
import { AlertTriangle, Mail, MessageSquare, Package, ShoppingBag, TrendingUp, Users } from 'lucide-react'
import { useOrders } from '../context/OrdersContext'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { orderStatuses } from '../data/orderStatuses'
import { availabilityLabels } from '../data/availability'
import { formatPrice } from '../lib/formatPrice'
import { getMessages } from '../lib/messages'
import { getTotalExpenses } from '../lib/expenses'
import { getTopProducts, getLowStockProducts, getSalesByDay, getRecentCustomers } from '../lib/adminStats'
import { AdminLayout } from '../components/admin/AdminLayout'
import { MiniBarChart } from '../components/admin/MiniBarChart'

export function AdminOverview() {
  const { orders } = useOrders()
  const { t, isArabic } = useLocalized()
  usePageTitle(t('نظرة عامة', 'Overview'))

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalExpenses = getTotalExpenses()
  const netProfit = totalRevenue - totalExpenses
  const statusCounts = orderStatuses.map(status => ({ ...status, count: orders.filter(o => o.status === status.id).length }))
  const subscribersCount = (() => {
    try { return (JSON.parse(localStorage.getItem('rafiq-subscribers') ?? '[]') as string[]).length } catch { return 0 }
  })()
  const messages = getMessages()
  const unreadMessages = messages.filter(message => !message.read)
  const recentOrders = orders.slice(0, 5)
  const topProducts = getTopProducts(orders)
  const lowStock = getLowStockProducts()
  const salesData = getSalesByDay(orders)
  const recentCustomers = getRecentCustomers(orders)

  const stats = [
    { icon: TrendingUp, value: `${formatPrice(netProfit)} ${t('جنيه', 'EGP')}`, label: t('صافي الربح', 'Net profit') },
    { icon: ShoppingBag, value: orders.length, label: t('إجمالي الطلبات', 'Total orders') },
    { icon: Package, value: statusCounts.find(s => s.id === 'processing')?.count ?? 0, label: t('جاري التجهيز', 'Being prepared') },
    { icon: Users, value: subscribersCount, label: t('مشتركين النشرة', 'Newsletter subscribers') },
  ]

  return <AdminLayout>
    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('نظرة عامة', 'Overview')}</h2>

    <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map(stat => (
        <div key={stat.label} className="rounded-xl border border-line p-4 dark:border-line-dark">
          <span className="grid size-9 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><stat.icon size={16} /></span>
          <p className="mt-3 text-2xl font-semibold text-ink dark:text-ink-dark">{stat.value}</p>
          <p className="text-xs text-muted dark:text-muted-dark">{stat.label}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 rounded-xl border border-line p-5 dark:border-line-dark">
      <h3 className="font-ar-heading text-base font-semibold text-ink dark:text-ink-dark">{t('المبيعات آخر ١٤ يوم', 'Sales over the last 14 days')}</h3>
      <div className="mt-4">
        <MiniBarChart data={salesData.map(point => ({ label: point.label, value: point.value }))} />
        <div className="mt-2 flex justify-between text-[10px] text-muted dark:text-muted-dark">
          <span>{salesData[0]?.label}</span>
          <span>{salesData[salesData.length - 1]?.label}</span>
        </div>
      </div>
    </div>

    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-line p-5 dark:border-line-dark">
        <h3 className="font-ar-heading text-base font-semibold text-ink dark:text-ink-dark">{t('أكتر المنتجات مبيعًا', 'Top selling products')}</h3>
        {topProducts.length === 0
          ? <p className="mt-6 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش مبيعات كفاية لسه.', 'Not enough sales yet.')}</p>
          : <div className="mt-4 space-y-3">
            {topProducts.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3 text-sm">
                <img src={product.image} alt="" className="size-10 rounded-lg object-cover" />
                <span className="flex-1 text-ink/85 dark:text-ink-dark/85">{product.name}</span>
                <span className="text-xs text-muted dark:text-muted-dark">{t(`${quantity} قطعة`, `${quantity} sold`)}</span>
              </div>
            ))}
          </div>}
      </div>

      <div className="rounded-xl border border-line p-5 dark:border-line-dark">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-burgundy" />
          <h3 className="font-ar-heading text-base font-semibold text-ink dark:text-ink-dark">{t('تنبيهات المخزون', 'Inventory alerts')}</h3>
        </div>
        {lowStock.length === 0
          ? <p className="mt-6 text-center text-sm text-muted dark:text-muted-dark">{t('كل المخزون في وضع كويس.', 'Inventory looks healthy.')}</p>
          : <div className="mt-4 space-y-3">
            {lowStock.map(product => {
              const info = product.availability ? availabilityLabels[product.availability] : null
              return <div key={product.id} className="flex items-center gap-3 text-sm">
                <img src={product.image} alt="" className="size-10 rounded-lg object-cover" />
                <span className="flex-1 text-ink/85 dark:text-ink-dark/85">{product.name}</span>
                <span className="text-xs font-medium text-burgundy">{info ? (isArabic ? info.ar : info.en) : ''}{product.availability === 'limited' && product.stock !== undefined ? ` (${product.stock})` : ''}</span>
              </div>
            })}
          </div>}
      </div>
    </div>

    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-line p-5 dark:border-line-dark">
        <div className="flex items-center justify-between">
          <h3 className="font-ar-heading text-base font-semibold text-ink dark:text-ink-dark">{t('أحدث العملاء', 'Recent customers')}</h3>
        </div>
        {recentCustomers.length === 0
          ? <p className="mt-6 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش عملاء لسه.', 'No customers yet.')}</p>
          : <div className="mt-4 space-y-3">
            {recentCustomers.map(customer => (
              <div key={customer.email} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-ink dark:text-ink-dark">{customer.name}</p>
                  <p className="text-xs text-muted dark:text-muted-dark">{t(`${customer.orderCount} طلب`, `${customer.orderCount} orders`)}</p>
                </div>
                <span className="font-medium text-burgundy">{formatPrice(customer.totalSpent)} {t('جنيه', 'EGP')}</span>
              </div>
            ))}
          </div>}
      </div>

      <div className="rounded-xl border border-line p-5 dark:border-line-dark">
        <div className="flex items-center justify-between">
          <h3 className="font-ar-heading text-base font-semibold text-ink dark:text-ink-dark">{t('أحدث الطلبات', 'Recent orders')}</h3>
          <Link to="/admin/orders" className="text-xs font-medium text-burgundy hover:underline">{t('عرض الكل', 'View all')}</Link>
        </div>
        {recentOrders.length === 0
          ? <p className="mt-6 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش طلبات لسه.', 'No orders yet.')}</p>
          : <div className="mt-4 space-y-3">
            {recentOrders.map(order => {
              const status = orderStatuses.find(s => s.id === order.status)
              return <div key={order.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-ink dark:text-ink-dark">{order.id}</p>
                  <p className="text-xs text-muted dark:text-muted-dark">{order.customerName || t('عميل زائر', 'Guest customer')}</p>
                </div>
                <div className="text-end">
                  <p className="font-medium text-burgundy">{formatPrice(order.total)} {t('جنيه', 'EGP')}</p>
                  <p className="text-xs text-muted dark:text-muted-dark">{status ? (isArabic ? status.ar : status.en) : ''}</p>
                </div>
              </div>
            })}
          </div>}
      </div>
    </div>

    {unreadMessages.length > 0 && (
      <div className="mt-6 rounded-xl border border-burgundy/30 bg-burgundy/[.03] p-5 dark:bg-burgundy/10">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-ar-heading text-base font-semibold text-ink dark:text-ink-dark"><MessageSquare size={16} className="text-burgundy" /> {t('رسائل جديدة', 'New messages')}</h3>
          <Link to="/admin/messages" className="text-xs font-medium text-burgundy hover:underline">{t('عرض الكل', 'View all')}</Link>
        </div>
        <div className="mt-4 space-y-3">
          {unreadMessages.slice(0, 5).map(message => (
            <div key={message.id} className="flex items-start gap-2 text-sm">
              <Mail size={14} className="mt-0.5 shrink-0 text-burgundy" />
              <div>
                <p className="font-medium text-ink dark:text-ink-dark">{message.subject}</p>
                <p className="text-xs text-muted dark:text-muted-dark">{message.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </AdminLayout>
}