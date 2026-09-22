import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import { AdminLayout } from '../admin/AdminLayout'
import { NoPermissionNotice } from '../admin/NoPermissionNotice'

export function RequireSuperAdmin({ children }: { children: React.ReactNode }) {
  const { admin } = useAdmin()
  if (!admin) return <Navigate to="/admin/login" replace />
  if (!admin.isSuperAdmin) {
    return <AdminLayout><NoPermissionNotice ar="صفحة الإعدادات مخصصة للأدمن الرئيسي بس." en="The settings page is for the super admin only." /></AdminLayout>
  }
  return <>{children}</>
}