import { useState, type FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLocalized } from '../../hooks/useLocalized'
import { addQuestion } from '../../lib/questions'

export function QuestionForm({ productId, onSubmitted }: { productId: string; onSubmitted: () => void }) {
  const { user } = useAuth()
  const { t } = useLocalized()
  const [question, setQuestion] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!user) {
    return <p className="rounded-lg bg-cream px-4 py-3 text-sm text-muted dark:bg-cream-dark dark:text-muted-dark">{t('سجّل دخولك عشان تقدر تسأل عن المنتج.', 'Sign in to ask a question about this product.')}</p>
  }

  if (submitted) {
    return <p className="rounded-lg bg-burgundy/[.05] px-4 py-3 text-sm text-burgundy dark:bg-burgundy/15">{t('وصل سؤالك - هيبان هنا بعد ما نرد عليه.', 'Your question is in - it will appear here once we reply.')}</p>
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!question.trim()) return
    addQuestion({ productId, question, askedByEmail: user.email, askedByName: user.name })
    setSubmitted(true)
    onSubmitted()
  }

  return <form onSubmit={handleSubmit} className="rounded-xl border border-line p-4 dark:border-line-dark">
    <p className="mb-2 text-sm font-medium text-ink dark:text-ink-dark">{t('عندك سؤال عن المنتج ده؟', 'Have a question about this product?')}</p>
    <textarea
      value={question}
      onChange={event => setQuestion(event.target.value)}
      rows={2}
      placeholder={t('اكتب سؤالك هنا...', 'Type your question here...')}
      className="w-full resize-none rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
    />
    <button type="submit" className="mt-3 rounded-lg bg-burgundy px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-burgundy-dark">{t('إرسال السؤال', 'Send question')}</button>
  </form>
}