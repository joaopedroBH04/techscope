import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../../components/ui/ErrorBoundary'

function BrokenComponent(): never {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Conteúdo normal</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Conteúdo normal')).toBeInTheDocument()
  })

  it('renders error UI when a child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Oops! Algo deu errado')).toBeInTheDocument()
    spy.mockRestore()
  })

  it('renders custom fallback when provided and child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary fallback={<div>Fallback customizado</div>}>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Fallback customizado')).toBeInTheDocument()
    spy.mockRestore()
  })

  it('shows error message in details section', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Test error')).toBeInTheDocument()
    spy.mockRestore()
  })
})
