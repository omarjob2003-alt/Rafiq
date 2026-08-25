import { useState, type FormEvent } from 'react'
import { Check, Pencil, Plus, Star, Trash2, X } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { usePageTitle } from '../hooks/usePageTitle'
import { AccountLayout } from '../components/account/AccountLayout'
import { AddressCascadeFields, type AddressLocation } from '../components/checkout/AddressCascadeFields'
import { useAddressBook, type SavedAddress } from '../context/AddressBookContext'
import { governorates } from '../data/egyptLocations'
import { cn } from '../lib/cn'

const emptyForm = { label: '', governorateId: null as string | null, cityId: null as string | null, customCity: '', district: '', street: '', phone: '' }

export function AccountAddresses() {
  const { t, isArabic } = useLocalized()
  usePageTitle(t('عناويني', 'My addresses'))
  const { addresses, addAddress, updateAddress, removeAddress, defaultAddressId, setDefaultAddressId } = useAddressBook()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const startAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true) }
  const startEdit = (address: SavedAddress) => {
    setForm({ label: address.label, governorateId: address.governorateId, cityId: address.cityId, customCity: address.customCity, district: address.district, street: address.street, phone: address.phone })
    setEditingId(address.id)
    setShowForm(true)
  }

  const location: AddressLocation = { governorateId: form.governorateId, cityId: form.cityId, customCity: form.customCity, district: form.district }
  const setLocation = (next: AddressLocation) => setForm(prev => ({ ...prev, ...next }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const payload = { label: form.label, governorateId: form.governorateId, cityId: form.cityId, customCity: form.customCity, district: form.district, street: form.street, phone: form.phone }
    if (editingId) updateAddress(editingId, payload)
    else addAddress(payload)
    setShowForm(false)
  }

  const describeAddress = (address: SavedAddress) => {
    const gov = governorates.find(g => g.id === address.governorateId)
    const city = gov?.cities.find(c => c.id === address.cityId)
    const cityLabel = city ? (isArabic ? city.ar : city.en) : address.customCity
    const govLabel = gov ? (isArabic ? gov.ar : gov.en) : ''
    return [address.street, address.district, cityLabel, govLabel].filter(Boolean).join('، ')
  }

  return <AccountLayout>
    <div className="flex items-center justify-between">
      <h2 className="font-ar-heading text-lg font-semibold text-ink dark:text-ink-dark">{t('عناويني', 'My addresses')}</h2>
      {!showForm && <button onClick={startAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-burgundy px-4 py-2 text-sm font-medium text-cream transition hover:bg-burgundy-dark"><Plus size={15} /> {t('إضافة عنوان', 'Add address')}</button>}
    </div>

    {!showForm && (
      addresses.length === 0
        ? <p className="mt-8 text-sm text-muted dark:text-muted-dark">{t('لسه معملتش أي عنوان. أضف عنوان الأول عشان يبقى جاهز وقت الشراء.', "You haven't added any address yet. Add your first one so it's ready when you order.")}</p>
        : <div className="mt-6 space-y-3">
            {addresses.map(address => (
              <div key={address.id} className={cn('rounded-xl border p-4 dark:border-line-dark', defaultAddressId === address.id ? 'border-burgundy bg-burgundy/[.03] dark:bg-burgundy/10' : 'border-line')}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-ink dark:text-ink-dark">{address.label || t('عنوان', 'Address')}</p>
                      {defaultAddressId === address.id && <span className="rounded-full bg-gold/25 px-2 py-0.5 text-[10px] font-medium text-burgundy">{t('افتراضي', 'Default')}</span>}
                    </div>
                    <p className="mt-1 text-sm text-muted dark:text-muted-dark">{describeAddress(address)}</p>
                    {address.phone && <p className="mt-1 text-xs text-muted dark:text-muted-dark" style={{ direction: 'ltr', textAlign: isArabic ? 'right' : 'left' }}>{address.phone}</p>}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {defaultAddressId !== address.id && <button onClick={() => setDefaultAddressId(address.id)} aria-label={t('اجعله افتراضي', 'Set as default')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Star size={15} /></button>}
                    <button onClick={() => startEdit(address)} aria-label={t('تعديل', 'Edit')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Pencil size={15} /></button>
                    <button onClick={() => removeAddress(address.id)} aria-label={t('حذف', 'Delete')} className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-burgundy/5 hover:text-burgundy dark:text-muted-dark"><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
    )}

    {showForm && (
      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4 rounded-xl border border-line p-5 dark:border-line-dark">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink dark:text-ink-dark">{editingId ? t('تعديل العنوان', 'Edit address') : t('عنوان جديد', 'New address')}</p>
          <button type="button" onClick={() => setShowForm(false)} aria-label={t('إلغاء', 'Cancel')} className="grid size-8 place-items-center rounded-full hover:bg-burgundy/5"><X size={16} /></button>
        </div>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('اسم العنوان (البيت، الشغل...)', 'Address label (Home, Work...)')}</span>
          <input required value={form.label} onChange={e => setForm(prev => ({ ...prev, label: e.target.value }))} placeholder={t('مثال: البيت', 'e.g. Home')} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>

        <AddressCascadeFields value={location} onChange={setLocation} />

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('العنوان بالتفصيل', 'Street address')}</span>
          <input required value={form.street} onChange={e => setForm(prev => ({ ...prev, street: e.target.value }))} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('رقم الموبايل', 'Phone number')}</span>
          <input required value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} type="tel" inputMode="numeric" maxLength={11} pattern="01[0125][0-9]{8}" className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark" />
        </label>

        <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark"><Check size={16} /> {t('حفظ العنوان', 'Save address')}</button>
      </form>
    )}
  </AccountLayout>
}