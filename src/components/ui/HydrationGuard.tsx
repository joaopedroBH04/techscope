import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationGuard({ children, fallback }: Props) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return fallback ?? (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
