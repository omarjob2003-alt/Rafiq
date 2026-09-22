import { LayoutDashboard, ShoppingBag, Package, FolderTree, History, RotateCcw, Star, MessageCircleQuestion, Receipt, Users, Mail } from 'lucide-react'

export type PermissionKey =
  | 'overview' | 'orders' | 'products' | 'categories' | 'stockLog'
  | 'returns' | 'reviews' | 'questions' | 'expenses' | 'subscribers' | 'messages'

export interface AdminSection {
  id: PermissionKey
  href: string
  icon: typeof LayoutDashboard
  ar: string
  en: string
}

// المصدر الوحيد لقايمة صفحات الأدمن - مستخدم في الـ Sidebar (AdminLayout)
// وفي فورم الصلاحيات بتاع صفحة الإعدادات (AdminSettings)، عشان أي صفحة تتضاف
// تتسجل هنا مرة واحدة بس وتظهر تلقائيًا في المكانين.
export const adminSections: AdminSection[] = [
  { id: 'overview', href: '/admin', icon: LayoutDashboard, ar: 'نظرة عامة', en: 'Overview' },
  { id: 'orders', href: '/admin/orders', icon: ShoppingBag, ar: 'الطلبات', en: 'Orders' },
  { id: 'products', href: '/admin/products', icon: Package, ar: 'المنتجات', en: 'Products' },
  { id: 'categories', href: '/admin/categories', icon: FolderTree, ar: 'الفئات', en: 'Categories' },
  { id: 'stockLog', href: '/admin/stock-log', icon: History, ar: 'سجل المخزون', en: 'Stock log' },
  { id: 'returns', href: '/admin/returns', icon: RotateCcw, ar: 'الاستبدال والإرجاع', en: 'Returns' },
  { id: 'reviews', href: '/admin/reviews', icon: Star, ar: 'التقييمات', en: 'Reviews' },
  { id: 'questions', href: '/admin/questions', icon: MessageCircleQuestion, ar: 'الأسئلة', en: 'Questions' },
  { id: 'expenses', href: '/admin/expenses', icon: Receipt, ar: 'المصروفات', en: 'Expenses' },
  { id: 'subscribers', href: '/admin/subscribers', icon: Users, ar: 'المشتركين', en: 'Subscribers' },
  { id: 'messages', href: '/admin/messages', icon: Mail, ar: 'الرسائل', en: 'Messages' },
]