import { useState, useEffect, useCallback } from 'react'

export interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

interface CacheEntry<T> {
  data: T
  timestamp: number
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Custom hook for API calls with caching, retry logic, and error handling
 * 
 * Features:
 * - Automatic caching with configurable duration
 * - Retry mechanism with exponential backoff
 * - Error handling with descriptive messages
 * - Manual refetch capability
 * - Loading states
 */
export function useApi<T>(
  endpoint: string,
  options?: {
    cacheDuration?: number
    retryCount?: number
    retryDelay?: number
  }
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const cacheKey = `techscope-cache-${endpoint}`
  const cacheDuration = options?.cacheDuration ?? CACHE_DURATION
  const maxRetries = options?.retryCount ?? 3
  const baseDelay = options?.retryDelay ?? 1000

  const fetchData = useCallback(async (attempt = 0): Promise<void> => {
    try {
      // Check cache first
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const entry: CacheEntry<T> = JSON.parse(cached)
        const isExpired = Date.now() - entry.timestamp > cacheDuration
        
        if (!isExpired) {
          setData(entry.data)
          setLoading(false)
          return
        }
      }

      // Simulate API call (replace with actual fetch in production)
      // In production, replace this with: const response = await fetch(endpoint)
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // For now, we'll use mock data - this will be replaced with real API calls
      let responseData: T
      
      // Try to get from static data files based on endpoint
      if (endpoint.includes('jobs')) {
        const { jobs } = await import('../data/jobs')
        responseData = jobs as unknown as T
      } else if (endpoint.includes('news')) {
        const { news } = await import('../data/news')
        responseData = news as unknown as T
      } else if (endpoint.includes('salaries')) {
        const { salaries } = await import('../data/salaries')
        responseData = salaries as unknown as T
      } else if (endpoint.includes('careers')) {
        const { careers } = await import('../data/careers')
        responseData = careers as unknown as T
      } else if (endpoint.includes('tools')) {
        const { tools } = await import('../data/tools')
        responseData = tools as unknown as T
      } else {
        throw new Error(`Unknown endpoint: ${endpoint}`)
      }

      // Update cache
      localStorage.setItem(cacheKey, JSON.stringify({
        data: responseData,
        timestamp: Date.now()
      }))

      setData(responseData)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      
      // Retry with exponential backoff
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt)
        await new Promise(resolve => setTimeout(resolve, delay))
        return fetchData(attempt + 1)
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [endpoint, cacheKey, cacheDuration, maxRetries, baseDelay])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(async () => {
    // Clear cache before refetching
    localStorage.removeItem(cacheKey)
    setLoading(true)
    setError(null)
    await fetchData()
  }, [fetchData, cacheKey])

  return { data, loading, error, refetch }
}
