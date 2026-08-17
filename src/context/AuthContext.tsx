import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface StoredUser { name: string; email: string; password: string }
interface SessionUser { name: string; email: string }

interface AuthContextType {
  user: SessionUser | null
  login: (email: string, password: string) => { success: boolean; error?: string }
  register: (name: string, email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
  updateProfile: (name: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function getUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem('rafiq-users') ?? '[]') } catch { return [] }
}
function saveUsers(users: StoredUser[]) { localStorage.setItem('rafiq-users', JSON.stringify(users)) }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => {
    try { return JSON.parse(localStorage.getItem('rafiq-session') ?? 'null') } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem('rafiq-session', JSON.stringify(user))
    else localStorage.removeItem('rafiq-session')
  }, [user])

  const login: AuthContextType['login'] = (email, password) => {
    const match = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!match) return { success: false, error: 'wrong-credentials' }
    setUser({ name: match.name, email: match.email })
    return { success: true }
  }

  const register: AuthContextType['register'] = (name, email, password) => {
    const users = getUsers()
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) return { success: false, error: 'email-taken' }
    const newUser = { name, email, password }
    saveUsers([...users, newUser])
    setUser({ name, email })
    return { success: true }
  }

  const logout = () => setUser(null)
  const updateProfile = (name: string) => {
    if (!user) return
    setUser({ ...user, name })
    saveUsers(getUsers().map(u => u.email === user.email ? { ...u, name } : u))
  }

  return <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}