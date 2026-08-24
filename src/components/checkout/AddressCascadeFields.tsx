import { useLocalized } from '../../hooks/useLocalized'
import { governorates, getCityOptions, OTHER_CITY_ID } from '../../data/egyptLocations'
import { SearchableSelect } from '../ui/SearchableSelect'

export interface AddressLocation {
  governorateId: string | null
  cityId: string | null
  customCity: string
  district: string
}

interface AddressCascadeFieldsProps {
  value: AddressLocation
  onChange: (next: AddressLocation) => void
}

export function AddressCascadeFields({ value, onChange }: AddressCascadeFieldsProps) {
  const { isArabic, t } = useLocalized()
  const governorateOptions = governorates.map(g => ({ id: g.id, label: isArabic ? g.ar : g.en }))
  const cityOptions = getCityOptions(value.governorateId, isArabic)
  const showCustomCity = value.cityId === OTHER_CITY_ID

  return <div className="grid gap-4 sm:grid-cols-2">
    <label className="block text-sm">
      <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('المحافظة', 'Governorate')}</span>
      <SearchableSelect
        value={value.governorateId}
        onChange={governorateId => onChange({ ...value, governorateId, cityId: null, customCity: '' })}
        options={governorateOptions}
        placeholder={t('اختر المحافظة', 'Select governorate')}
      />
    </label>

    <label className="block text-sm">
      <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('المدينة / المركز', 'City / Center')}</span>
      <SearchableSelect
        value={value.cityId}
        onChange={cityId => onChange({ ...value, cityId, customCity: '' })}
        options={cityOptions}
        placeholder={t('اختر المدينة', 'Select city')}
        disabled={!value.governorateId}
      />
    </label>

    {showCustomCity && (
      <label className="block text-sm sm:col-span-2">
        <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('اكتب اسم المدينة', 'Type the city name')}</span>
        <input
          value={value.customCity}
          onChange={event => onChange({ ...value, customCity: event.target.value })}
          className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
        />
      </label>
    )}

    <div className="block text-sm sm:col-span-2">
      <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الحي / المنطقة', 'District / Area')}</span>
      <input
        value={value.district}
        onChange={event => onChange({ ...value, district: event.target.value })}
        placeholder={t('اكتب اسم الحي أو المنطقة', 'Type the district or area name')}
        className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
      />
    </div>
  </div>
}

// import { useLocalized } from '../../hooks/useLocalized'
// import { governorates } from '../../data/egyptLocations'
// import { SearchableSelect } from './../ui/SearchableSelect'

// export interface AddressLocation {
//   governorateId: string | null
//   city: string
//   district: string
// }

// interface AddressCascadeFieldsProps {
//   value: AddressLocation
//   onChange: (next: AddressLocation) => void
// }

// export function AddressCascadeFields({ value, onChange }: AddressCascadeFieldsProps) {
//   const { isArabic, t } = useLocalized()
//   const governorateOptions = governorates.map(g => ({ id: g.id, label: isArabic ? g.ar : g.en }))

//   return <div className="grid gap-4 sm:grid-cols-2">
//     <label className="block text-sm">
//       <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('المحافظة', 'Governorate')}</span>
//       <SearchableSelect
//         value={value.governorateId}
//         onChange={governorateId => onChange({ ...value, governorateId })}
//         options={governorateOptions}
//         placeholder={t('اختر المحافظة', 'Select governorate')}
//       />
//     </label>

//     <label className="block text-sm">
//       <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('المدينة / المركز', 'City / Center')}</span>
//       <input
//         value={value.city}
//         onChange={event => onChange({ ...value, city: event.target.value })}
//         placeholder={t('اكتب اسم المدينة', 'Type the city name')}
//         className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
//       />
//     </label>

//     <div className="block text-sm sm:col-span-2">
//       <span className="mb-1.5 block text-ink/80 dark:text-ink-dark/80">{t('الحي / المنطقة', 'District / Area')}</span>
//       <input
//         value={value.district}
//         onChange={event => onChange({ ...value, district: event.target.value })}
//         placeholder={t('اكتب اسم الحي أو المنطقة', 'Type the district or area name')}
//         className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-burgundy dark:border-line-dark dark:bg-cream-dark dark:text-ink-dark"
//       />
//     </div>
//   </div>
// }