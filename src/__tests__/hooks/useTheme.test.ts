import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../../hooks/useTheme'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('useTheme', () => {
  it('reads stored theme from localStorage', () => {
    localStorage.setItem('techscope-theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('toggles theme on call', () => {
    localStorage.setItem('techscope-theme', 'light')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
    act(() => { result.current.toggleTheme() })
    expect(result.current.theme).toBe('dark')
  })

  it('applies dark class to documentElement when theme is dark', () => {
    localStorage.setItem('techscope-theme', 'dark')
    renderHook(() => useTheme())
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class when theme is light', () => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('techscope-theme', 'light')
    renderHook(() => useTheme())
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('persists theme in localStorage after toggle', () => {
    localStorage.setItem('techscope-theme', 'light')
    const { result } = renderHook(() => useTheme())
    act(() => { result.current.toggleTheme() })
    expect(localStorage.getItem('techscope-theme')).toBe('dark')
  })
})
