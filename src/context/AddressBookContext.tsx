import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api } from '../lib/apiClient'
import { useAuth } from './AuthContext'
import { governorates, OTHER_CITY_ID } from '../data/egyptLocations'

export interface SavedAddress {
  id: string
  label: string
  governorateId: string | null
  cityId: string | null
  customCity: string
  district: string
  street: string
  phone: string
}

interface AddressDto {
  id: number
  fullName: string
  phone: string
  alternatePhone: string | null
  city: string
  area: string
  streetAddress: string
  notes: string | null
  isDefault: boolean
}

type AddressInput = Omit<SavedAddress, 'id'>

interface AddressBookContextType {
  addresses: SavedAddress[]
  addAddress: (address: AddressInput) => Promise<boolean>
  updateAddress: (id: string, address: AddressInput) => Promise<boolean>
  removeAddress: (id: string) => Promise<void>
  defaultAddressId: string | null
  setDefaultAddressId: (id: string | null) => Promise<void>
}

const AddressBookContext = createContext<AddressBookContextType | undefined>(undefined)

// الـ API بيخزن city و area كنص حر، فبنحط المحافظة في city، والمدينة + الحي في area
function toDto(address: AddressInput, fullName: string, isDefault: boolean) {
  const governorate = governorates.find(g => g.id === address.governorateId)
  const city = governorate?.cities.find(c => c.id === address.cityId)
  const cityLabel = city ? city.ar : address.customCity
  return {
    fullName,
    phone: address.phone,
    alternatePhone: null,
    city: governorate?.ar ?? '',
    area: [cityLabel, address.district].filter(Boolean).join('، '),
    streetAddress: address.street,
    notes: null,
    isDefault,
  }
}

function fromDto(dto: AddressDto): SavedAddress {
  const cityText = dto.city ?? ''
  const governorate = governorates.find(g => g.ar === cityText || g.en.toLowerCase() === cityText.toLowerCase())
  const [first = '', ...rest] = (dto.area ?? '').split('، ')
  const city = governorate?.cities.find(c => c.ar === first || c.en.toLowerCase() === first.toLowerCase())
  return {
    id: String(dto.id),
    // الـ API مفيهوش اسم للعنوان، فبنعرض اسم المدينة بدله
    label: city ? city.ar : first || governorate?.ar || cityText,
    governorateId: governorate?.id ?? null,
    cityId: city ? city.id : first ? OTHER_CITY_ID : null,
    customCity: city ? '' : first,
    district: rest.join('، '),
    street: dto.streetAddress,
    phone: dto.phone,
  }
}

export function AddressBookProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const userEmail = user?.email ?? null
  const userName = user?.name ?? ''
  const [raw, setRaw] = useState<AddressDto[]>([])

  const addresses = useMemo(() => raw.map(fromDto), [raw])
  const defaultAddressId = useMemo(() => {
    const found = raw.find(address => address.isDefault)
    return found ? String(found.id) : null
  }, [raw])

  const load = useCallback(async () => {
    try { setRaw(await api.get<AddressDto[]>('/addresses')) } catch { /* نسيب القايمة زي ما هي */ }
  }, [])

  useEffect(() => {
    if (!userEmail) { setRaw([]); return }
    void load()
  }, [userEmail, load])

  const save = async (request: () => Promise<unknown>): Promise<boolean> => {
    try { await request(); await load(); return true } catch { return false }
  }

  const addAddress = (address: AddressInput) =>
    userEmail ? save(() => api.post('/addresses', toDto(address, userName, raw.length === 0))) : Promise.resolve(false)

  const updateAddress = (id: string, address: AddressInput) =>
    userEmail ? save(() => api.put(`/addresses/${id}`, toDto(address, userName, id === defaultAddressId))) : Promise.resolve(false)

  const removeAddress = async (id: string) => {
    if (!userEmail) return
    await save(() => api.delete(`/addresses/${id}`))
  }

  const setDefaultAddressId = async (id: string | null) => {
    if (!userEmail || !id) return
    const current = raw.find(address => String(address.id) === id)
    if (!current) return
    await save(() => api.put(`/addresses/${id}`, {
      fullName: current.fullName,
      phone: current.phone,
      alternatePhone: current.alternatePhone,
      city: current.city,
      area: current.area,
      streetAddress: current.streetAddress,
      notes: current.notes,
      isDefault: true,
    }))
  }

  return <AddressBookContext.Provider value={{ addresses, addAddress, updateAddress, removeAddress, defaultAddressId, setDefaultAddressId }}>
    {children}
  </AddressBookContext.Provider>
}

export function useAddressBook() {
  const context = useContext(AddressBookContext)
  if (!context) throw new Error('useAddressBook must be used inside AddressBookProvider')
  return context
}












// import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
// import { useAuth } from './AuthContext'

// export interface SavedAddress {
//   id: string
//   label: string
//   governorateId: string | null
//   cityId: string | null
//   customCity: string
//   district: string
//   street: string
//   phone: string
// }

// interface AddressBookContextType {
//   addresses: SavedAddress[]
//   addAddress: (address: Omit<SavedAddress, 'id'>) => void
//   updateAddress: (id: string, address: Omit<SavedAddress, 'id'>) => void
//   removeAddress: (id: string) => void
//   defaultAddressId: string | null
//   setDefaultAddressId: (id: string | null) => void
// }

// const AddressBookContext = createContext<AddressBookContextType | undefined>(undefined)

// interface Store {
//   addresses: SavedAddress[]
//   defaultAddressId: string | null
// }

// function getAllStores(): Record<string, Store> {
//   try { return JSON.parse(localStorage.getItem('rafiq-addressbook') ?? '{}') } catch { return {} }
// }

// function saveAllStores(stores: Record<string, Store>) {
//   localStorage.setItem('rafiq-addressbook', JSON.stringify(stores))
// }

// export function AddressBookProvider({ children }: { children: ReactNode }) {
//   const { user } = useAuth()
//   const [addresses, setAddresses] = useState<SavedAddress[]>([])
//   const [defaultAddressId, setDefaultAddressIdState] = useState<string | null>(null)

//   useEffect(() => {
//     if (!user) { setAddresses([]); setDefaultAddressIdState(null); return }
//     const store = getAllStores()[user.email]
//     setAddresses(store?.addresses ?? [])
//     setDefaultAddressIdState(store?.defaultAddressId ?? null)
//   }, [user])

//   const persist = (nextAddresses: SavedAddress[], nextDefault: string | null) => {
//     if (!user) return
//     const stores = getAllStores()
//     stores[user.email] = { addresses: nextAddresses, defaultAddressId: nextDefault }
//     saveAllStores(stores)
//     setAddresses(nextAddresses)
//     setDefaultAddressIdState(nextDefault)
//   }

//   const addAddress: AddressBookContextType['addAddress'] = (address) => {
//     const id = `addr-${Date.now()}`
//     const next = [...addresses, { ...address, id }]
//     persist(next, defaultAddressId ?? id)
//   }

//   const updateAddress: AddressBookContextType['updateAddress'] = (id, address) => {
//     persist(addresses.map(item => item.id === id ? { ...address, id } : item), defaultAddressId)
//   }

//   const removeAddress = (id: string) => {
//     const next = addresses.filter(item => item.id !== id)
//     persist(next, defaultAddressId === id ? (next[0]?.id ?? null) : defaultAddressId)
//   }

//   const setDefaultAddressId = (id: string | null) => persist(addresses, id)

//   return <AddressBookContext.Provider value={{ addresses, addAddress, updateAddress, removeAddress, defaultAddressId, setDefaultAddressId }}>
//     {children}
//   </AddressBookContext.Provider>
// }

// export function useAddressBook() {
//   const context = useContext(AddressBookContext)
//   if (!context) throw new Error('useAddressBook must be used inside AddressBookProvider')
//   return context
// }