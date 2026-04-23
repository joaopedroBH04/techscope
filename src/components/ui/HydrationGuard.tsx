interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationGuard({ children, fallback }: Props) {
  // Simple SSR guard: check if window exists (client-side)
  const isClient = typeof window !== 'undefined'
  
  if (!isClient) {
    return fallback ?? (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  
  return <>{children}</>
}
