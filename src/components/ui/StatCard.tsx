import clsx from 'clsx'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change?: string
  positive?: boolean
  icon?: React.ReactNode
  gradient?: boolean
  description?: string
}

export function StatCard({ label, value, change, positive, icon, gradient, description }: StatCardProps) {
  return (
    <div className={clsx(
      'rounded-xl p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg',
      gradient
        ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-brand-500/20 shadow-lg'
        : 'bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 text-gray-900 dark:text-white'
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={clsx(
            'text-xs font-semibold uppercase tracking-wider mb-1',
            gradient ? 'text-brand-100' : 'text-gray-500 dark:text-gray-400'
          )}>
            {label}
          </p>
          <p className="text-2xl font-bold truncate">{value}</p>
          {description && (
            <p className={clsx(
              'text-xs mt-1',
              gradient ? 'text-brand-200' : 'text-gray-400 dark:text-gray-500'
            )}>
              {description}
            </p>
          )}
        </div>
        {icon && (
          <div className={clsx(
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            gradient ? 'bg-white/20' : 'bg-brand-50 dark:bg-brand-900/30 text-brand-500 dark:text-brand-400'
          )}>
            {icon}
          </div>
        )}
      </div>
      {change && (
        <div className={clsx(
          'flex items-center gap-1 mt-3 text-xs font-medium',
          positive
            ? gradient ? 'text-accent-400' : 'text-accent-600 dark:text-accent-400'
            : gradient ? 'text-red-300' : 'text-red-500 dark:text-red-400'
        )}>
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      )}
    </div>
  )
}
