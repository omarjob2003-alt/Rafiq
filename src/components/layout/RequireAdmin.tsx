import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { admin } = useAdmin()
  if (!admin) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}