
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useAddressBook } from '../context/AddressBookContext'
import { trackCart, clearAbandonedCart } from '../lib/abandonedCarts'

export function CartAbandonmentTracker() {
  const { items } = useCart()
  const { user } = useAuth()
  const { defaultAddressId, addresses } = useAddressBook()

  useEffect(() => {
    if (!user) return
    if (items.length === 0) { clearAbandonedCart(user.email); return }
    const defaultAddress = addresses.find(address => address.id === defaultAddressId)
    trackCart(user.email, user.name, defaultAddress?.phone, items)
  }, [items, user, defaultAddressId, addresses])

  return null
}