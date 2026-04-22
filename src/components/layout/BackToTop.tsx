import { ArrowUp } from 'lucide-react'
import clsx from 'clsx'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export function BackToTop() {
  const { scrollProgress, isScrolled } = useScrollProgress({ threshold: 400 })

  if (!isScrolled) return null

  return (
    <>
      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-dark-700 z-40">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={clsx(
          'fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/30 flex items-center justify-center transition-all duration-300 group',
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </>
  )
}
