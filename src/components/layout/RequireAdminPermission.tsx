import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import { AdminLayout } from '../admin/AdminLayout'
import { NoPermissionNotice } from '../admin/NoPermissionNotice'
import type { PermissionKey } from '../../data/adminSections'

export function RequireAdminPermission({ permission, children }: { permission: PermissionKey; children: React.ReactNode }) {
  const { admin, hasPermission } = useAdmin()
  if (!admin) return <Navigate to="/admin/login" replace />
  if (!hasPermission(permission)) return <AdminLayout><NoPermissionNotice /></AdminLayout>
  return <>{children}</>
}