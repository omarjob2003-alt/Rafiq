import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Mail, MessageSquare } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { getMessages, markMessageRead, type ContactMessage } from '../lib/messages'
import { cn } from '../lib/cn'

export function AdminMessages() {
  const { logout } = useAdmin()
  const { t, isArabic } = useLocalized()
  usePageTitle(t('الرسائل والاقتراحات', 'Messages & suggestions'))
  const [messages, setMessages] = useState<ContactMessage[]>(getMessages())
  const [openId, setOpenId] = useState<string | null>(null)

  const unreadCount = messages.filter(message => !message.read).length

  const open = (message: ContactMessage) => {
    setOpenId(openId === message.id ? null : message.id)
    if (!message.read) {
      markMessageRead(message.id)
      setMessages(getMessages())
    }
  }

  return <div className="pt-[108px]">
    <div className="mx-auto max-w-[900px] px-5 py-10 md:px-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark">{t('الرسائل والاقتراحات', 'Messages & suggestions')}</h1>
          <div className="mt-2 flex gap-4 text-sm">
            <Link to="/admin/orders" className="text-muted hover:text-burgundy dark:text-muted-dark">{t('الطلبات', 'Orders')}</Link>
            <Link to="/admin/subscribers" className="text-muted hover:text-burgundy dark:text-muted-dark">{t('المشتركين', 'Subscribers')}</Link>
            <span className="font-medium text-burgundy">{t('الرسائل', 'Messages')}{unreadCount > 0 ? ` (${unreadCount})` : ''}</span>
          </div>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink dark:border-line-dark dark:text-ink-dark"><LogOut size={15} /> {t('خروج', 'Log out')}</button>
      </div>

      {messages.length === 0
        ? <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><MessageSquare size={22} /></span>
            <p className="text-sm text-muted dark:text-muted-dark">{t('مفيش رسايل لسه.', 'No messages yet.')}</p>
          </div>
        : <div className="mt-6 space-y-3">
            {messages.map(message => {
              const isOpen = openId === message.id
              return <div key={message.id} className={cn('rounded-xl border p-4 dark:border-line-dark', !message.read ? 'border-burgundy bg-burgundy/[.03] dark:bg-burgundy/10' : 'border-line')}>
                <button onClick={() => open(message)} className="flex w-full items-center justify-between gap-3 text-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-ink dark:text-ink-dark">{message.subject}</p>
                      {!message.read && <span className="size-2 rounded-full bg-burgundy" />}
                    </div>
                    <p className="text-xs text-muted dark:text-muted-dark">{message.name} · {new Date(message.date).toLocaleString(isArabic ? 'ar-EG' : 'en-GB')}</p>
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-3 space-y-2 border-t border-line pt-3 text-sm dark:border-line-dark">
                    <p className="text-ink/85 dark:text-ink-dark/85">{message.message}</p>
                    <a href={`mailto:${message.email}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-burgundy hover:underline" style={{ direction: 'ltr' }}><Mail size={12} /> {message.email}</a>
                  </div>
                )}
              </div>
            })}
          </div>}
    </div>
  </div>
}