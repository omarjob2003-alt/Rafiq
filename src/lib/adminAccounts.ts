import type { PermissionKey } from '../data/adminSections'

// طبقة تخزين حسابات الأدمن - كل التعامل مع localStorage محصور هنا وبس.
// لما نيجي ننقل على باك اند حقيقي، التغيير هيبقى محصور جوه الفانكشنز دي فقط
// (تتحول لـ async وتنادي API بدل localStorage) - من غير ما أي حاجة تانية في
// المشروع (Context، الصفحات) تحتاج تتغيّر في الشكل الأساسي بتاعها.

export interface AdminAccount {
  id: string
  email: string
  password: string
  name: string
  permissions: PermissionKey[]
  createdAt: string
}

export interface AdminSessionData {
  email: string
  name: string
  isSuperAdmin: boolean
  permissions: PermissionKey[]
}

// الأدمن الرئيسي (Super Admin) - ثابت في الكود مش متخزن مع باقي الحسابات.
// هو الوحيد اللي معاه كل الصلاحيات تلقائيًا، والوحيد اللي يقدر يوصل لصفحة الإعدادات.
const SUPER_ADMIN = {
  email: 'admin@rafiq.com',
  password: 'Rafiq@Admin2026',
  name: 'عمر',
}

const KEY = 'rafiq-admin-accounts'

function readAll(): AdminAccount[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}
function writeAll(accounts: AdminAccount[]) {
  localStorage.setItem(KEY, JSON.stringify(accounts))
}

export function getAdminAccounts(): AdminAccount[] {
  return readAll()
}

export function addAdminAccount(data: { email: string; password: string; name: string; permissions: PermissionKey[] }): { success: boolean; error?: 'email-taken' } {
  const email = data.email.trim().toLowerCase()
  const accounts = readAll()
  if (email === SUPER_ADMIN.email.toLowerCase() || accounts.some(a => a.email.toLowerCase() === email)) {
    return { success: false, error: 'email-taken' }
  }
  const account: AdminAccount = {
    id: `admin-${Date.now()}`,
    email,
    password: data.password,
    name: data.name,
    permissions: data.permissions,
    createdAt: new Date().toISOString(),
  }
  writeAll([...accounts, account])
  return { success: true }
}

export function updateAdminAccount(id: string, edit: Partial<Pick<AdminAccount, 'name' | 'password' | 'permissions'>>) {
  writeAll(readAll().map(a => a.id === id ? { ...a, ...edit } : a))
}

export function removeAdminAccount(id: string) {
  writeAll(readAll().filter(a => a.id !== id))
}

export function verifyAdminCredentials(email: string, password: string): AdminSessionData | null {
  const normalized = email.trim().toLowerCase()

  if (normalized === SUPER_ADMIN.email.toLowerCase() && password === SUPER_ADMIN.password) {
    return { email: SUPER_ADMIN.email, name: SUPER_ADMIN.name, isSuperAdmin: true, permissions: [] }
  }

  const account = readAll().find(a => a.email.toLowerCase() === normalized && a.password === password)
  if (!account) return null
  return { email: account.email, name: account.name, isSuperAdmin: false, permissions: account.permissions }
}