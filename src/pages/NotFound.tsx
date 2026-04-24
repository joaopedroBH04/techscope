import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in text-center">
      <div className="text-8xl font-bold text-brand-500/20 dark:text-brand-400/10 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Página não encontrada</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        A página que você procura não existe ou foi movida.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          <Home size={16} /> Ir para o Dashboard
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-gray-300 font-semibold px-5 py-2.5 rounded-lg hover:border-brand-400 transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
      </div>
    </div>
  )
}
export default NotFound;
