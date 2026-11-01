const BASE_URL = import.meta.env.VITE_API_BASE_URL as string
const TOKEN_KEY = 'rafiq-token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  auth?: boolean
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = true } = options
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, 'تعذر الاتصال بالسيرفر - تأكد من الإنترنت.')
  }

  if (response.status === 204) return undefined as T

  const text = await response.text()
  let data: unknown = null
  if (text) {
    try { data = JSON.parse(text) } catch { data = text }
  }

  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearToken()
      window.dispatchEvent(new Event('rafiq:unauthorized'))
    }
    const message = (data && typeof data === 'object' && data !== null && 'message' in data)
      ? String((data as { message: unknown }).message)
      : `حصل خطأ (${response.status})`
    throw new ApiError(response.status, message)
  }

  return data as T
}

export const api = {
  get: <T>(path: string, auth = true) => apiRequest<T>(path, { method: 'GET', auth }),
  post: <T>(path: string, body?: unknown, auth = true) => apiRequest<T>(path, { method: 'POST', body, auth }),
  put: <T>(path: string, body?: unknown, auth = true) => apiRequest<T>(path, { method: 'PUT', body, auth }),
  delete: <T>(path: string, auth = true) => apiRequest<T>(path, { method: 'DELETE', auth }),
}