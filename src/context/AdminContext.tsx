import { createContext, useContext, useState, type ReactNode } from 'react'

// حسابات الأدمن - مخزنة هنا بشكل ثابت (مش في قاعدة بيانات حقيقية، ده نظام تمثيلي للتجربة فقط).
// ضيف حساب جديد أو غيّر البيانات دي زي ما تحب.
const ADMIN_ACCOUNTS = [
  { email: 'admin@rafiq.com', password: 'Rafiq@Admin2026', name: 'عمر' },
]

interface AdminSession {
  email: string
  name: string
}

interface AdminContextType {
  admin: AdminSession | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminSession | null>(() => {
    try { return JSON.parse(sessionStorage.getItem('rafiq-admin-session') ?? 'null') } catch { return null }
  })

  const login = (email: string, password: string) => {
    const match = ADMIN_ACCOUNTS.find(account => account.email.toLowerCase() === email.toLowerCase() && account.password === password)
    if (!match) return false
    const session = { email: match.email, name: match.name }
    sessionStorage.setItem('rafiq-admin-session', JSON.stringify(session))
    setAdmin(session)
    return true
  }

  const logout = () => {
    sessionStorage.removeItem('rafiq-admin-session')
    setAdmin(null)
  }

  return <AdminContext.Provider value={{ admin, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used inside AdminProvider')
  return context
}