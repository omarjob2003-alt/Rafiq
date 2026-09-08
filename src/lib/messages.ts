export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

const KEY = 'rafiq-messages'

export function getMessages(): ContactMessage[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}

export function addMessage(data: Omit<ContactMessage, 'id' | 'date' | 'read'>) {
  const messages = getMessages()
  const newMessage: ContactMessage = { ...data, id: `msg-${Date.now()}`, date: new Date().toISOString(), read: false }
  localStorage.setItem(KEY, JSON.stringify([newMessage, ...messages]))
}

export function markMessageRead(id: string) {
  const messages = getMessages().map(message => message.id === id ? { ...message, read: true } : message)
  localStorage.setItem(KEY, JSON.stringify(messages))
}