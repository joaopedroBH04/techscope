import { createContext, useContext, useState, type ReactNode } from 'react'

interface AppContextType {
  // Add global state here as needed
  // Example: theme: 'light' | 'dark'
  // Example: setTheme: (theme: 'light' | 'dark') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state] = useState<AppContextType>({
    // Initialize state here
  })

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
