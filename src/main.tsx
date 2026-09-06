import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import { OrdersProvider } from './context/OrdersContext'
import { AddressBookProvider } from './context/AddressBookContext'
import { AdminProvider } from './context/AdminContext'
import { QuickViewProvider } from './context/QuickViewContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AdminProvider>
          <AddressBookProvider>
          <CartProvider>
            <WishlistProvider>
              <OrdersProvider>
                <QuickViewProvider>
                <App />
                </QuickViewProvider>
              </OrdersProvider>
            </WishlistProvider>
          </CartProvider>
          </AddressBookProvider>
          </AdminProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)