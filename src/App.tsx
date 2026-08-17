import { useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useLanguage } from './context/LanguageContext'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { Product } from './pages/Product'
import { Shop } from './pages/Shop'
import { Collections } from './pages/Collections'
import { CollectionDetail } from './pages/CollectionDetail'
import { Cart } from './pages/Cart'
import { CheckoutHeader } from './components/layout/CheckoutHeader'
import { Checkout } from './pages/Checkout'
import { About } from './pages/About'
import { Search } from './pages/Search'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Account } from './pages/Account'
import { AccountOrders } from './pages/AccountOrders'
import { AccountAddresses } from './pages/AccountAddresses'
import { Wishlist } from './pages/Wishlist'
import { RequireAuth } from './components/layout/RequireAuth'
import { TrackOrder } from './pages/TrackOrder'
import { Journal } from './pages/Journal'
import { JournalDetail } from './pages/JournalDetail'

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Storefront() {
  const { dir } = useLanguage()
  const { pathname } = useLocation()
  const isCheckout = pathname.startsWith('/checkout')

  return <div dir={dir} className="min-h-screen bg-cream transition-colors duration-300 dark:bg-cream-dark">
    {isCheckout ? <CheckoutHeader /> : <Header />}
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:collectionId" element={<CollectionDetail />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
        <Route path="/account/orders" element={<RequireAuth><AccountOrders /></RequireAuth>} />
        <Route path="/account/addresses" element={<RequireAuth><AccountAddresses /></RequireAuth>} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:articleId" element={<JournalDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
    {!isCheckout && <Footer />}
  </div>
}

export default function App() {
  return <BrowserRouter><ScrollToTop /><Storefront /></BrowserRouter>
}
