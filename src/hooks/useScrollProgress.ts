import { useState, useEffect, useCallback } from 'react'

interface UseScrollProgressOptions {
  threshold?: number
}

export function useScrollProgress({ threshold = 100 }: UseScrollProgressOptions = {}) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [direction, setDirection] = useState<'up' | 'down'>('down')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0

      setScrollProgress(progress)
      setIsScrolled(scrollY > threshold)
      setDirection(scrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = scrollY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { scrollProgress, isScrolled, direction }
}

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((newValue: T | ((val: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = newValue instanceof Function ? newValue(prev) : newValue
      localStorage.setItem(key, JSON.stringify(valueToStore))
      return valueToStore
    })
  }, [key])

  return [storedValue, setValue] as const
}
