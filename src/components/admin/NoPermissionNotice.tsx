import { ShieldAlert } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'

export function NoPermissionNotice({ ar, en }: { ar?: string; en?: string }) {
  const { t } = useLocalized()
  const message = t(
    ar ?? 'حسابك مش معاه صلاحية الوصول للصفحة دي. تواصل مع الأدمن الرئيسي لو محتاج توصل ليها.',
    en ?? "Your account doesn't have permission to view this page. Contact the super admin if you need access."
  )
  return <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-line py-24 text-center dark:border-line-dark">
    <span className="grid size-14 place-items-center rounded-full bg-burgundy/[.06] text-burgundy dark:bg-burgundy/15"><ShieldAlert size={24} /></span>
    <div>
      <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('مفيش صلاحية', 'No permission')}</h2>
      <p className="mt-2 max-w-xs text-sm text-muted dark:text-muted-dark">{message}</p>
    </div>
  </div>
}