import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api, ApiError, setToken, clearToken, getToken } from '../lib/apiClient'

export interface AuthUser {
  name: string
  email: string
}

interface AuthResult {
  success: boolean
  error?: string
}

interface AuthResponse {
  token: string
}

interface AuthContextType {
  user: AuthUser | null
  isReady: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  register: (name: string, email: string, password: string) => Promise<AuthResult>
  logout: () => void
  updateProfile: (name: string) => Promise<AuthResult>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const GENERIC_ERROR = 'حصل خطأ غير متوقع، حاول تاني.'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const bootstrap = async () => {
      if (!getToken()) { setIsReady(true); return }
      try {
        const me = await api.get<AuthUser>('/auth/me')
        setUser(me)
      } catch {
        clearToken()
        setUser(null)
      } finally {
        setIsReady(true)
      }
    }
    bootstrap()
  }, [])

  useEffect(() => {
    const handler = () => setUser(null)
    window.addEventListener('rafiq:unauthorized', handler)
    return () => window.removeEventListener('rafiq:unauthorized', handler)
  }, [])

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await api.post<AuthResponse>('/auth/login', { email, password }, false)
      setToken(result.token)
      const me = await api.get<AuthUser>('/auth/me')
      setUser(me)
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof ApiError ? error.message : GENERIC_ERROR }
    }
  }

  const register = async (name: string, email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await api.post<AuthResponse>('/auth/register', { name, email, password }, false)
      setToken(result.token)
      const me = await api.get<AuthUser>('/auth/me')
      setUser(me)
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof ApiError ? error.message : GENERIC_ERROR }
    }
  }

  const logout = () => {
    clearToken()
    setUser(null)
  }

  const updateProfile = async (name: string): Promise<AuthResult> => {
    try {
      await api.put('/auth/profile', { name })
      setUser(prev => (prev ? { ...prev, name } : prev))
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof ApiError ? error.message : GENERIC_ERROR }
    }
  }

  return <AuthContext.Provider value={{ user, isReady, login, register, logout, updateProfile }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}