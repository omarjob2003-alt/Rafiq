import { useState } from 'react'
import { Mail, MessageSquare } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { getMessages, markMessageRead, type ContactMessage } from '../lib/messages'
import { AdminLayout } from '../components/admin/AdminLayout'
import { cn } from '../lib/cn'

export function AdminMessages() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('الرسائل والاقتراحات', 'Messages & suggestions'))
  const [messages, setMessages] = useState<ContactMessage[]>(getMessages())
  const [openId, setOpenId] = useState<string | null>(null)

  const open = (message: ContactMessage) => {
    setOpenId(openId === message.id ? null : message.id)
    if (!message.read) {
      markMessageRead(message.id)
      setMessages(getMessages())
    }
  }

  return <AdminLayout>
    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('الرسائل والاقتراحات', 'Messages & suggestions')}</h2>

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
  </AdminLayout>
}