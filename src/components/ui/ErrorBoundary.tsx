import type { ReactNode } from 'react'
import { Component } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Oops! Algo deu errado
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Desculpe pelo inconveniente. Tente recarregar a página ou voltar ao início.
            </p>
            {this.state.error && (
              <details className="text-left mb-4">
                <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-500">
                  Ver detalhes do erro
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 dark:bg-dark-800 rounded-lg text-xs text-red-500 overflow-auto max-h-40">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium"
            >
              <RefreshCw size={16} />
              Voltar ao início
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
