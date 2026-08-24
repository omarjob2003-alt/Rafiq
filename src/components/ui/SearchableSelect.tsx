import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import { cn } from '../../lib/cn'

export interface SelectOption {
  id: string
  label: string
}

interface SearchableSelectProps {
  value: string | null
  onChange: (id: string) => void
  options: SelectOption[]
  placeholder: string
  disabled?: boolean
  required?: boolean
}

export function SearchableSelect({ value, onChange, options, placeholder, disabled, required }: SearchableSelectProps) {
  const { t } = useLocalized()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = options.find(option => option.id === value)
  const filtered = options.filter(option => option.label.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 30) }
  }, [open])

  return <div ref={rootRef} className="relative">
    <button
      type="button"
      disabled={disabled}
      onClick={() => setOpen(v => !v)}
      className={cn(
        'flex w-full items-center justify-between rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm outline-none transition dark:border-line-dark dark:bg-cream-dark',
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:border-burgundy/40',
        selected ? 'text-ink dark:text-ink-dark' : 'text-muted dark:text-muted-dark'
      )}
    >
      <span className="truncate">{selected ? selected.label : placeholder}</span>
      <ChevronDown size={15} className={cn('shrink-0 text-muted transition-transform dark:text-muted-dark', open && 'rotate-180')} />
    </button>

    {/* input مخفي عشان يدعم required في الفورم من غير ما يتعارض مع التصميم */}
    <input tabIndex={-1} value={value ?? ''} required={required} onChange={() => {}} className="pointer-events-none absolute inset-x-0 bottom-0 h-0 w-full opacity-0" />

    {open && !disabled && (
      <div className="absolute z-30 mt-1.5 max-h-64 w-full overflow-hidden rounded-lg border border-line bg-cream shadow-lg dark:border-line-dark dark:bg-cream-dark">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2 dark:border-line-dark">
          <Search size={14} className="text-muted dark:text-muted-dark" />
          <input
            ref={inputRef}
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={t('دور...', 'Search...')}
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted dark:text-ink-dark dark:placeholder:text-muted-dark"
          />
        </div>
        <div className="max-h-52 overflow-y-auto py-1">
          {filtered.length === 0
            ? <p className="px-3.5 py-3 text-center text-xs text-muted dark:text-muted-dark">{t('مفيش نتائج', 'No results')}</p>
            : filtered.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => { onChange(option.id); setOpen(false) }}
                className={cn('block w-full px-3.5 py-2 text-start text-sm transition hover:bg-burgundy/5', option.id === value ? 'font-medium text-burgundy' : 'text-ink dark:text-ink-dark')}
              >
                {option.label}
              </button>
            ))}
        </div>
      </div>
    )}
  </div>
}