export interface Expense {
  id: string
  category: 'shipping' | 'marketing' | 'rent' | 'salaries' | 'supplies' | 'other'
  description: string
  amount: number
  date: string
}

const KEY = 'rafiq-expenses'

export function getExpenses(): Expense[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}

export function addExpense(data: Omit<Expense, 'id'>) {
  const expenses = getExpenses()
  const newExpense: Expense = { ...data, id: `exp-${Date.now()}` }
  localStorage.setItem(KEY, JSON.stringify([newExpense, ...expenses]))
}

export function removeExpense(id: string) {
  localStorage.setItem(KEY, JSON.stringify(getExpenses().filter(expense => expense.id !== id)))
}

export function getTotalExpenses(): number {
  return getExpenses().reduce((sum, expense) => sum + expense.amount, 0)
}