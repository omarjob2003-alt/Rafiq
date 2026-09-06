import { createContext, useContext, useState, type ReactNode } from 'react'

interface QuickViewContextType {
  openProductId: string | null
  openQuickView: (id: string) => void
  closeQuickView: () => void
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined)

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [openProductId, setOpenProductId] = useState<string | null>(null)
  return <QuickViewContext.Provider value={{ openProductId, openQuickView: setOpenProductId, closeQuickView: () => setOpenProductId(null) }}>
    {children}
  </QuickViewContext.Provider>
}

export function useQuickView() {
  const context = useContext(QuickViewContext)
  if (!context) throw new Error('useQuickView must be used inside QuickViewProvider')
  return context
}