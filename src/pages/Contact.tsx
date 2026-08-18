import { useState, type FormEvent } from 'react'
import { ChevronDown, Mail, MapPin, MessageCircle } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { SectionHeading } from '../components/ui/SectionHeading'
import { cn } from '../lib/cn'
import { InstagramIcon, FacebookIcon, TiktokIcon } from '../components/ui/SocialIcons'
import { usePageTitle } from '../hooks/usePageTitle'

const faqs = [
    { ar: ['كام مدة التوصيل؟', 'التوصيل بياخد من يومين لأربعة أيام عمل جوه القاهرة والجيزة، ومن ٤ لـ٦ أيام لباقي المحافظات.'], en: ['How long does delivery take?', 'Delivery takes 2 to 4 business days within Cairo and Giza, and 4 to 6 days for other governorates.'] },
    { ar: ['ممكن أستبدل أو أرجّع المنتج؟', 'أيوه، عندك ١٤ يوم من تاريخ الاستلام لطلب استبدال أو استرجاع، طالما المنتج في حالته الأصلية.'], en: ['Can I exchange or return a product?', 'Yes, you have 14 days from delivery to request an exchange or return, as long as the product is in its original condition.'] },
    { ar: ['إيه طرق الدفع المتاحة؟', 'بندعم الدفع عند الاستلام وكمان البطاقات الائتمانية (فيزا وماستركارد).'], en: ['What payment methods are available?', 'We support cash on delivery as well as credit cards (Visa and Mastercard).'] },
    { ar: ['هل الشحن مجاني؟', 'الشحن مجاني للطلبات فوق ١٠٠٠ جنيه، وأقل من كده بيتحسب رسم شحن بسيط عند الدفع.'], en: ['Is shipping free?', 'Shipping is free for orders above 1000 EGP; a small shipping fee applies below that at checkout.'] },
]

export function Contact() {
    const { t } = useLocalized()
    usePageTitle(t('تواصل معنا', 'Contact Us'))
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [sent, setSent] = useState(false)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setSent(true)
    }

    return <div className="pt-[108px]">
        <section className="border-b border-line dark:border-line-dark">
            <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
                <SectionHeading eyebrow={t('تواصل معنا', 'CONTACT')} heading={t('إحنا هنا لو محتاج مساعدة', "We're here if you need help")} subtitle={t('اختار الطريقة الأسهل ليك، أو ابعتلنا رسالة وهنرد عليك في أقرب وقت.', 'Pick whichever way suits you, or send us a message and we will get back to you soon.')} />
            </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
            <div className="grid gap-12 lg:grid-cols-[340px_1fr]">
                <div className="space-y-4">
                    <a href="https://wa.me/201000000000" target="_blank" rel="noreferrer" className="flex items-center gap-3.5 rounded-xl border border-line p-4 transition hover:border-burgundy/40 dark:border-line-dark">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><MessageCircle size={17} /></span>
                        <div>
                            <p className="text-sm font-medium text-ink dark:text-ink-dark">{t('واتساب', 'WhatsApp')}</p>
                            <p className="text-xs text-muted dark:text-muted-dark" style={{ direction: 'ltr' }}>+20 100 000 0000</p>
                        </div>
                    </a>
                    <a href="mailto:info@rafiq.com" className="flex items-center gap-3.5 rounded-xl border border-line p-4 transition hover:border-burgundy/40 dark:border-line-dark">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><Mail size={17} /></span>
                        <div>
                            <p className="text-sm font-medium text-ink dark:text-ink-dark">{t('البريد الإلكتروني', 'Email')}</p>
                            <p className="text-xs text-muted dark:text-muted-dark" style={{ direction: 'ltr' }}>info@rafiq.com</p>
                        </div>
                    </a>
                    <div className="flex items-center gap-3.5 rounded-xl border border-line p-4 dark:border-line-dark">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><MapPin size={17} /></span>
                        <div>
                            <p className="text-sm font-medium text-ink dark:text-ink-dark">{t('المقر', 'Studio')}</p>
                            <p className="text-xs text-muted dark:text-muted-dark">{t('القاهرة، مصر', 'Cairo, Egypt')}</p>
                        </div>
                    </div>
                    <div className="flex gap-2.5 pt-2">
                        {[{ Icon: InstagramIcon, href: 'https://instagram.com', name: 'Instagram' }, { Icon: FacebookIcon, href: 'https://facebook.com', name: 'Facebook' }, { Icon: TiktokIcon, href: 'https://tiktok.com', name: 'TikTok' }].map(social => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} className="grid size-9 place-items-center rounded-full border border-line text-ink transition hover:border-burgundy hover:text-burgundy dark:border-line-dark dark:text-ink-dark"><social.Icon className="size-4" /></a>)}
                    </div>
                </div>

                <div className="rounded-2xl border border-line p-6 dark:border-line-dark md:p-8">
                    {sent ? (
                        <div className="flex flex-col items-center gap-3 py-10 text-center">
                            <span className="grid size-12 place-items-center rounded-full bg-burgundy/[.08] text-burgundy dark:bg-burgundy/20">✓</span>
                            <h2 className="font-ar-heading text-xl font-semibold text-ink dark:text-ink-dark">{t('وصلتنا رسالتك', 'Your message is on its way')}</h2>
                            <p className="max-w-xs text-sm text-muted dark:text-muted-dark">{t('هنرد عليك خلال يوم عمل واحد.', 'We will get back to you within one business day.')}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block text-sm">
                                    <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الاسم', 'Name')}</span>
                                    <input required className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
                                </label>
                                <label className="block text-sm">
                                    <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('البريد الإلكتروني', 'Email')}</span>
                                    <input type="email" required className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
                                </label>
                            </div>
                            <label className="block text-sm">
                                <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الموضوع', 'Subject')}</span>
                                <input required className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
                            </label>
                            <label className="block text-sm">
                                <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الرسالة', 'Message')}</span>
                                <textarea required rows={5} className="w-full resize-none rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
                            </label>
                            <button type="submit" className="rounded-lg bg-burgundy px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark">{t('إرسال الرسالة', 'Send message')}</button>
                        </form>
                    )}
                </div>
            </div>
        </section>

        <section id="faq" className="border-t border-line bg-cream dark:border-line-dark dark:bg-cream-dark">
            <div className="mx-auto max-w-[820px] px-5 py-16 md:px-10 md:py-24">
                <h2 className="text-center font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark md:text-3xl">{t('الأسئلة الشائعة', 'Frequently asked questions')}</h2>
                <div className="mt-9 divide-y divide-line dark:divide-line-dark">
                    {faqs.map((faq, index) => {
                        const [question, answer] = faq.ar
                        const [questionEn, answerEn] = faq.en
                        const open = openFaq === index
                        return <div key={index} className="py-4">
                            <button onClick={() => setOpenFaq(open ? null : index)} className="flex w-full items-center justify-between gap-3 text-start">
                                <span className="text-sm font-medium text-ink dark:text-ink-dark">{t(question, questionEn)}</span>
                                <ChevronDown size={16} className={cn('shrink-0 text-muted transition-transform dark:text-muted-dark', open && 'rotate-180')} />
                            </button>
                            {open && <p className="mt-3 text-sm leading-7 text-muted dark:text-muted-dark">{t(answer, answerEn)}</p>}
                        </div>
                    })}
                </div>
            </div>
        </section>
    </div>
}