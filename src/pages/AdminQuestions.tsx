import { useState } from 'react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { getUnansweredQuestions, answerQuestion } from '../lib/questions'
import { products } from '../data/products'
import { AdminLayout } from '../components/admin/AdminLayout'

export function AdminQuestions() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('أسئلة العملاء', 'Customer questions'))
  const [questions, setQuestions] = useState(getUnansweredQuestions())
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  const handleAnswer = (id: string) => {
    const answer = drafts[id]?.trim()
    if (!answer) return
    answerQuestion(id, answer)
    setQuestions(getUnansweredQuestions())
    setDrafts(prev => { const next = { ...prev }; delete next[id]; return next })
  }

  return <AdminLayout>
    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('أسئلة في انتظار الرد', 'Questions awaiting a reply')}</h2>

    {questions.length === 0
      ? <p className="mt-10 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش أسئلة محتاجة رد دلوقتي.', 'No questions awaiting a reply right now.')}</p>
      : <div className="mt-6 space-y-4">
        {questions.map(question => {
          const product = products.find(p => p.id === question.productId)
          return <div key={question.id} className="rounded-xl border border-line p-4 dark:border-line-dark">
            <div className="flex items-center gap-3">
              {product && <img src={product.image} alt="" className="size-10 rounded-lg object-cover" />}
              <div>
                <p className="text-sm font-medium text-ink dark:text-ink-dark">{product ? (isArabic ? product.name : product.id) : question.productId}</p>
                <p className="text-xs text-muted dark:text-muted-dark">{question.askedByName} · {new Date(question.date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB')}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink/85 dark:text-ink-dark/85">{question.question}</p>
            <textarea
              value={drafts[question.id] ?? ''}
              onChange={event => setDrafts(prev => ({ ...prev, [question.id]: event.target.value }))}
              rows={2}
              placeholder={t('اكتب الرد هنا...', 'Type your reply here...')}
              className="mt-3 w-full resize-none rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
            />
            <button onClick={() => handleAnswer(question.id)} className="mt-3 rounded-lg bg-burgundy px-5 py-2 text-sm font-medium text-cream transition hover:bg-burgundy-dark">{t('نشر الرد', 'Post reply')}</button>
          </div>
        })}
      </div>}
  </AdminLayout>
}