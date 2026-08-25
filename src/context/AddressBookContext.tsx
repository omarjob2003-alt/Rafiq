import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useAuth } from './AuthContext'

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

interface AddressBookContextType {
  addresses: SavedAddress[]
  addAddress: (address: Omit<SavedAddress, 'id'>) => void
  updateAddress: (id: string, address: Omit<SavedAddress, 'id'>) => void
  removeAddress: (id: string) => void
  defaultAddressId: string | null
  setDefaultAddressId: (id: string | null) => void
}

const AddressBookContext = createContext<AddressBookContextType | undefined>(undefined)

interface Store {
  addresses: SavedAddress[]
  defaultAddressId: string | null
}

function getAllStores(): Record<string, Store> {
  try { return JSON.parse(localStorage.getItem('rafiq-addressbook') ?? '{}') } catch { return {} }
}

function saveAllStores(stores: Record<string, Store>) {
  localStorage.setItem('rafiq-addressbook', JSON.stringify(stores))
}

export function AddressBookProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<SavedAddress[]>([])
  const [defaultAddressId, setDefaultAddressIdState] = useState<string | null>(null)

  useEffect(() => {
    if (!user) { setAddresses([]); setDefaultAddressIdState(null); return }
    const store = getAllStores()[user.email]
    setAddresses(store?.addresses ?? [])
    setDefaultAddressIdState(store?.defaultAddressId ?? null)
  }, [user])

  const persist = (nextAddresses: SavedAddress[], nextDefault: string | null) => {
    if (!user) return
    const stores = getAllStores()
    stores[user.email] = { addresses: nextAddresses, defaultAddressId: nextDefault }
    saveAllStores(stores)
    setAddresses(nextAddresses)
    setDefaultAddressIdState(nextDefault)
  }

  const addAddress: AddressBookContextType['addAddress'] = (address) => {
    const id = `addr-${Date.now()}`
    const next = [...addresses, { ...address, id }]
    persist(next, defaultAddressId ?? id)
  }

  const updateAddress: AddressBookContextType['updateAddress'] = (id, address) => {
    persist(addresses.map(item => item.id === id ? { ...address, id } : item), defaultAddressId)
  }

  const removeAddress = (id: string) => {
    const next = addresses.filter(item => item.id !== id)
    persist(next, defaultAddressId === id ? (next[0]?.id ?? null) : defaultAddressId)
  }

  const setDefaultAddressId = (id: string | null) => persist(addresses, id)

  return <AddressBookContext.Provider value={{ addresses, addAddress, updateAddress, removeAddress, defaultAddressId, setDefaultAddressId }}>
    {children}
  </AddressBookContext.Provider>
}

export function useAddressBook() {
  const context = useContext(AddressBookContext)
  if (!context) throw new Error('useAddressBook must be used inside AddressBookProvider')
  return context
}