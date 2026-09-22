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
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'
import { RecentlyViewed } from './pages/RecentlyViewed'
import { CartDrawer } from './components/layout/CartDrawer'
import { AdminLogin } from './pages/AdminLogin'
import { AdminOrders } from './pages/AdminOrders'
import { RequireAdminPermission } from './components/layout/RequireAdminPermission'
import { RequireSuperAdmin } from './components/layout/RequireSuperAdmin'
// import { RequireAdmin } from './components/layout/RequireAdmin'
import { QuickViewModal } from './components/products/QuickViewModal'
import { AdminSubscribers } from './pages/AdminSubscribers'
import { AdminMessages } from './pages/AdminMessages'
import { AdminProducts } from './pages/AdminProducts'
import { AdminOverview } from './pages/AdminOverview'
import { AdminExpenses } from './pages/AdminExpenses'
import { AdminCategories } from './pages/AdminCategories'
import { AdminProductEditor } from './pages/AdminProductEditor'
import { AdminReviews } from './pages/AdminReviews'
import { AdminReturns } from './pages/AdminReturns'
import { AdminQuestions } from './pages/AdminQuestions'
import { AdminStockLog } from './pages/AdminStockLog'
import { AdminSettings } from './pages/AdminSettings'
import { AdminTopBar } from './components/admin/AdminTopBar'

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Storefront() {
  const { dir } = useLanguage()
  const { pathname } = useLocation()
  const isCheckout = pathname.startsWith('/checkout')
  const isAdmin = pathname.startsWith('/admin')

  return <div dir={dir} className="min-h-screen bg-cream transition-colors duration-300 dark:bg-cream-dark">
    <a href="#main-content" className="fixed -top-full left-1/2 z-[100] -translate-x-1/2 rounded-full bg-burgundy px-5 py-2.5 text-sm font-medium text-cream focus:top-3 transition-[top]">
      {dir === 'rtl' ? 'تخطي للمحتوى الرئيسي' : 'Skip to main content'}
    </a>
    {isCheckout ? <CheckoutHeader /> : isAdmin ? <AdminTopBar /> : <Header />}
    <main id="main-content">
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/recently-viewed" element={<RecentlyViewed />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAdminPermission permission="overview"><AdminOverview /></RequireAdminPermission>} />
        <Route path="/admin/orders" element={<RequireAdminPermission permission="orders"><AdminOrders /></RequireAdminPermission>} />
        <Route path="/admin/orders/:orderId" element={<RequireAdminPermission permission="orders"><AdminOrders /></RequireAdminPermission>} />
        <Route path="/admin/subscribers" element={<RequireAdminPermission permission="subscribers"><AdminSubscribers /></RequireAdminPermission>} />
        <Route path="/admin/messages" element={<RequireAdminPermission permission="messages"><AdminMessages /></RequireAdminPermission>} />
        <Route path="/admin/products" element={<RequireAdminPermission permission="products"><AdminProducts /></RequireAdminPermission>} />
        <Route path="/admin/expenses" element={<RequireAdminPermission permission="expenses"><AdminExpenses /></RequireAdminPermission>} />
        <Route path="/admin/categories" element={<RequireAdminPermission permission="categories"><AdminCategories /></RequireAdminPermission>} />
        <Route path="/admin/products/new" element={<RequireAdminPermission permission="products"><AdminProductEditor /></RequireAdminPermission>} />
        <Route path="/admin/products/:productId/edit" element={<RequireAdminPermission permission="products"><AdminProductEditor /></RequireAdminPermission>} />
        <Route path="/admin/reviews" element={<RequireAdminPermission permission="reviews"><AdminReviews /></RequireAdminPermission>} />
        <Route path="/admin/returns" element={<RequireAdminPermission permission="returns"><AdminReturns /></RequireAdminPermission>} />
        <Route path="/admin/questions" element={<RequireAdminPermission permission="questions"><AdminQuestions /></RequireAdminPermission>} />
        <Route path="/admin/stock-log" element={<RequireAdminPermission permission="stockLog"><AdminStockLog /></RequireAdminPermission>} />
        <Route path="/admin/settings" element={<RequireSuperAdmin><AdminSettings /></RequireSuperAdmin>} />



        <Route path="*" element={<NotFound />} />
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
    </main>
    {!isCheckout && !isAdmin && <Footer />}
    {!isAdmin && <CartDrawer />}
    {!isAdmin && <QuickViewModal />}
  </div>
}

export default function App() {
  return <BrowserRouter><ScrollToTop /><Storefront /></BrowserRouter>
}
