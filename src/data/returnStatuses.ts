import type { ReturnStatus } from '../lib/returns'

export const returnStatusLabels: Record<ReturnStatus, { ar: string; en: string; tone: 'muted' | 'burgundy' | 'gold' }> = {
  pending: { ar: 'قيد المراجعة', en: 'Under review', tone: 'gold' },
  approved: { ar: 'تمت الموافقة', en: 'Approved', tone: 'burgundy' },
  rejected: { ar: 'مرفوض', en: 'Rejected', tone: 'muted' },
  completed: { ar: 'تم الإتمام', en: 'Completed', tone: 'muted' },
}