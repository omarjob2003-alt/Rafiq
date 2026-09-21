export interface ProductQuestion {
  id: string
  productId: string
  question: string
  askedByEmail: string
  askedByName: string
  date: string
  answer?: string
  answeredDate?: string
}

const KEY = 'rafiq-questions'

function getAll(): ProductQuestion[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}
function saveAll(questions: ProductQuestion[]) { localStorage.setItem(KEY, JSON.stringify(questions)) }

export function addQuestion(data: Omit<ProductQuestion, 'id' | 'date'>) {
  const questions = getAll()
  questions.push({ ...data, id: `q-${Date.now()}`, date: new Date().toISOString() })
  saveAll(questions)
}

export function getAnsweredQuestions(productId: string): ProductQuestion[] {
  return getAll().filter(q => q.productId === productId && q.answer).sort((a, b) => b.date.localeCompare(a.date))
}

export function getUnansweredQuestions(): ProductQuestion[] {
  return getAll().filter(q => !q.answer).sort((a, b) => a.date.localeCompare(b.date))
}

export function answerQuestion(id: string, answer: string) {
  saveAll(getAll().map(q => q.id === id ? { ...q, answer, answeredDate: new Date().toISOString() } : q))
}