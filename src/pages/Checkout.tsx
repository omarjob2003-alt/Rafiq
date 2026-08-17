import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Check, CreditCard, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLocalized } from '../hooks/useLocalized'
import { products } from '../data/products'
import { cn } from '../lib/cn'
import { useOrders } from '../context/OrdersContext'

export function Checkout() {
    const { addOrder } = useOrders()
    const { items, clearCart } = useCart()
    const { t } = useLocalized()
    const [shipping, setShipping] = useState<'standard' | 'express'>('standard')
    const [payment, setPayment] = useState<'cod' | 'card'>('cod')
    const [placed, setPlaced] = useState(false)
    const [orderNumber, setOrderNumber] = useState('')

    const lines = items
        .map(item => ({ ...item, product: products.find(p => p.id === item.productId) }))
        .filter((line): line is typeof line & { product: NonNullable<typeof line.product> } => Boolean(line.product))

    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
    const shippingCost = shipping === 'express' ? 90 : subtotal >= 1000 ? 0 : 60
    const total = subtotal + shippingCost

    if (!placed && lines.length === 0) return <Navigate to="/cart" replace />

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const id = addOrder({ lines: lines.map(line => ({ productId: line.productId, quantity: line.quantity, price: line.product.price })), total })
        setOrderNumber(id)
        setPlaced(true)
        clearCart()
    }

    if (placed) {
        return <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-5 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-burgundy/[.08] text-burgundy dark:bg-burgundy/20"><Check size={28} /></span>
            <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark">{t('تم استلام طلبك', 'Your order is confirmed')}</h1>
            <p className="max-w-sm text-sm leading-7 text-muted dark:text-muted-dark">{t('شكرًا لثقتك في رفيق. هنبعتلك تفاصيل الشحن على بريدك الإلكتروني قريبًا.', 'Thank you for trusting Rafiq. We will send your shipping details by email shortly.')}</p>
            <p className="rounded-full bg-cream px-5 py-2 text-sm font-medium text-ink dark:bg-cream-dark dark:text-ink-dark">{t('رقم الطلب', 'Order number')}: {orderNumber}</p>
            <Link to="/" className="mt-2 rounded-full bg-burgundy px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('العودة للرئيسية', 'Back to home')}</Link>
        </div>
    }

    return <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-10 md:py-14">
        <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-10">
                <section>
                    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('١. بيانات التواصل', '1. Contact information')}</h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <Field label={t('الاسم الكامل', 'Full name')} required className="sm:col-span-2" />
                        <Field
                            label={t('رقم الموبايل', 'Phone number')}
                            type="tel"
                            required
                            inputMode="numeric"
                            maxLength={11}
                            pattern="01[0125][0-9]{8}"
                            title={t('رقم موبايل مصري صحيح، مثال: 01012345678', 'A valid Egyptian phone number, e.g. 01012345678')}
                            placeholder="01xxxxxxxxx"
                        />
                        <Field
                            label={t('رقم موبايل إضافي (اختياري)', 'Alternative phone (optional)')}
                            type="tel"
                            inputMode="numeric"
                            maxLength={11}
                            pattern="01[0125][0-9]{8}"
                            title={t('رقم موبايل مصري صحيح، مثال: 01012345678', 'A valid Egyptian phone number, e.g. 01012345678')}
                            placeholder="01xxxxxxxxx"
                        />
                        <Field label={t('البريد الإلكتروني', 'Email')} type="email" required className="sm:col-span-2" />
                    </div>
                    <p className="mt-2.5 text-xs text-muted dark:text-muted-dark">{t('ممكن نتواصل معاك على الرقم ده لتأكيد الطلب قبل الشحن.', 'We may contact you on this number to confirm your order before shipping.')}</p>
                </section>

                <section>
                    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('٢. عنوان الشحن', '2. Shipping address')}</h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <Field label={t('المحافظة', 'City')} required />
                        <Field label={t('المنطقة', 'Area')} required />
                        <Field label={t('العنوان بالتفصيل', 'Street address')} required className="sm:col-span-2" />
                        <Field label={t('ملاحظات إضافية (اختياري)', 'Additional notes (optional)')} className="sm:col-span-2" />
                    </div>
                </section>

                <section>
                    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('٣. طريقة الشحن', '3. Shipping method')}</h2>
                    <div className="mt-4 space-y-3">
                        <OptionRow icon={Truck} active={shipping === 'standard'} onClick={() => setShipping('standard')} title={t('شحن عادي', 'Standard shipping')} subtitle={t('من ٢ إلى ٤ أيام عمل', '2 to 4 business days')} price={subtotal >= 1000 ? t('مجاني', 'Free') : `60 ${t('جنيه', 'EGP')}`} />
                        <OptionRow icon={Truck} active={shipping === 'express'} onClick={() => setShipping('express')} title={t('شحن سريع', 'Express shipping')} subtitle={t('خلال ٢٤ ساعة داخل القاهرة والجيزة', 'Within 24 hours in Cairo & Giza')} price={`90 ${t('جنيه', 'EGP')}`} />
                    </div>
                </section>

                <section>
                    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('٤. طريقة الدفع', '4. Payment method')}</h2>
                    <div className="mt-4 space-y-3">
                        <OptionRow icon={CreditCard} active={payment === 'cod'} onClick={() => setPayment('cod')} title={t('الدفع عند الاستلام', 'Cash on delivery')} subtitle={t('ادفع نقدًا لما طلبك يوصلك', 'Pay in cash when your order arrives')} />
                        <OptionRow icon={CreditCard} active={payment === 'card'} onClick={() => setPayment('card')} title={t('بطاقة ائتمان', 'Credit card')} subtitle={t('فيزا أو ماستركارد', 'Visa or Mastercard')} />
                        {payment === 'card' && <div className="grid gap-4 rounded-xl border border-line p-4 dark:border-line-dark sm:grid-cols-2">
                            <Field label={t('رقم البطاقة', 'Card number')} required className="sm:col-span-2" />
                            <Field label={t('تاريخ الانتهاء', 'Expiry date')} required />
                            <Field label="CVC" required />
                        </div>}
                    </div>
                </section>
            </div>

            <aside className="h-fit rounded-2xl border border-line bg-paper p-6 dark:border-line-dark dark:bg-paper-dark lg:sticky lg:top-24">
                <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('ملخص الطلب', 'Order summary')}</h2>
                <div className="mt-4 space-y-3 border-b border-line pb-4 dark:border-line-dark">
                    {lines.map(line => <div key={line.productId} className="flex items-center gap-3 text-sm">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-cream dark:bg-cream-dark">
                            <img src={line.product.image} alt="" className="size-full object-cover" />
                            <span className="absolute -left-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-burgundy text-[10px] font-bold text-cream">{line.quantity}</span>
                        </div>
                        <span className="flex-1 text-ink/80 dark:text-ink-dark/80">{line.product.name}</span>
                        <span className="text-ink dark:text-ink-dark">{line.product.price * line.quantity} {t('جنيه', 'EGP')}</span>
                    </div>)}
                </div>
                <div className="mt-4 space-y-2.5 text-sm">
                    <div className="flex justify-between text-ink/80 dark:text-ink-dark/80"><span>{t('المجموع الفرعي', 'Subtotal')}</span><span>{subtotal} {t('جنيه', 'EGP')}</span></div>
                    <div className="flex justify-between text-ink/80 dark:text-ink-dark/80"><span>{t('الشحن', 'Shipping')}</span><span>{shippingCost === 0 ? t('مجاني', 'Free') : `${shippingCost} ${t('جنيه', 'EGP')}`}</span></div>
                </div>
                <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-semibold text-ink dark:border-line-dark dark:text-ink-dark">
                    <span>{t('الإجمالي', 'Total')}</span><span>{total} {t('جنيه', 'EGP')}</span>
                </div>
                <button type="submit" className="mt-6 w-full rounded-lg bg-burgundy py-3.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('تأكيد الطلب', 'Place order')}</button>
            </aside>
        </form>
    </div>
}

function Field({ label, className, ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return <label className={cn('block text-sm', className)}>
        <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{label}</span>
        <input {...props} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
    </label>
}

function OptionRow({ icon: Icon, active, onClick, title, subtitle, price }: { icon: typeof Truck; active: boolean; onClick: () => void; title: string; subtitle: string; price?: string }) {
    return <button type="button" onClick={onClick} className={cn('flex w-full items-center gap-3 rounded-xl border p-4 text-start transition dark:border-line-dark', active ? 'border-burgundy bg-burgundy/[.03] dark:bg-burgundy/10' : 'border-line hover:border-burgundy/30')}>
        <span className={cn('grid size-9 shrink-0 place-items-center rounded-full', active ? 'bg-burgundy text-cream' : 'bg-cream text-ink dark:bg-cream-dark dark:text-ink-dark')}><Icon size={16} /></span>
        <span className="flex-1">
            <span className="block text-sm font-medium text-ink dark:text-ink-dark">{title}</span>
            <span className="block text-xs text-muted dark:text-muted-dark">{subtitle}</span>
        </span>
        {price && <span className="text-sm font-medium text-ink dark:text-ink-dark">{price}</span>}
    </button>
}