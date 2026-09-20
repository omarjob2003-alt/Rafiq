import { useState, type FormEvent } from 'react'
import { Trash2 } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { getExpenses, addExpense, removeExpense, type Expense } from '../lib/expenses'
import { expenseCategories } from '../data/expenseCategories'
import { formatPrice } from '../lib/formatPrice'
import { AdminLayout } from '../components/admin/AdminLayout'

export function AdminExpenses() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('المصروفات', 'Expenses'))
  const [expenses, setExpenses] = useState<Expense[]>(getExpenses())
  const [category, setCategory] = useState<Expense['category']>('other')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const value = Number(amount)
    if (!value || value <= 0) return
    addExpense({ category, description, amount: value, date: new Date().toISOString() })
    setExpenses(getExpenses())
    setDescription('')
    setAmount('')
  }

  const handleDelete = (id: string) => {
    removeExpense(id)
    setExpenses(getExpenses())
  }

  return <AdminLayout>
    <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('المصروفات', 'Expenses')}</h2>
    <p className="mt-1 text-sm text-muted dark:text-muted-dark">{t('إجمالي المصروفات', 'Total expenses')}: <span className="font-semibold text-burgundy">{formatPrice(total)} {t('جنيه', 'EGP')}</span></p>

    <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-line p-4 dark:border-line-dark">
      <label className="text-sm">
        <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('البند', 'Category')}</span>
        <select value={category} onChange={e => setCategory(e.target.value as Expense['category'])} className="rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark">
          {expenseCategories.map(cat => <option key={cat.id} value={cat.id}>{isArabic ? cat.ar : cat.en}</option>)}
        </select>
      </label>
      <label className="min-w-[180px] flex-1 text-sm">
        <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الوصف', 'Description')}</span>
        <input value={description} onChange={e => setDescription(e.target.value)} required className="w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
      </label>
      <label className="text-sm">
        <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('المبلغ', 'Amount')}</span>
        <input type="number" min={1} value={amount} onChange={e => setAmount(e.target.value)} required className="w-28 rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
      </label>
      <button type="submit" className="rounded-lg bg-burgundy px-5 py-2 text-sm font-medium text-cream transition hover:bg-burgundy-dark">{t('إضافة', 'Add')}</button>
    </form>

    {expenses.length === 0
      ? <p className="mt-10 text-center text-sm text-muted dark:text-muted-dark">{t('مفيش مصروفات مسجلة لسه.', 'No expenses recorded yet.')}</p>
      : <div className="mt-6 divide-y divide-line rounded-xl border border-line dark:divide-line-dark dark:border-line-dark">
        {expenses.map(expense => {
          const cat = expenseCategories.find(c => c.id === expense.category)
          return <div key={expense.id} className="flex items-center justify-between gap-3 p-3.5 text-sm">
            <div>
              <p className="text-ink dark:text-ink-dark">{expense.description}</p>
              <p className="text-xs text-muted dark:text-muted-dark">{cat ? (isArabic ? cat.ar : cat.en) : expense.category} · {new Date(expense.date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB')}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-burgundy">{formatPrice(expense.amount)} {t('جنيه', 'EGP')}</span>
              <button onClick={() => handleDelete(expense.id)} aria-label={t('حذف', 'Delete')} className="text-muted transition hover:text-burgundy dark:text-muted-dark"><Trash2 size={15} /></button>
            </div>
          </div>
        })}
      </div>}
  </AdminLayout>
}