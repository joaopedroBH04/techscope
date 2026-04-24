import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { MapPin, Building2, Clock, Bookmark, BookmarkCheck, Flame } from 'lucide-react'
import { Badge } from '../ui/Badge'
import clsx from 'clsx'
import type { Job } from '../../types'

interface Props {
  jobs: Job[]
  savedJobs: Set<string>
  onToggleSave: (id: string) => void
  onSelectJob: (job: Job) => void
}

function fmtSalary(min: number, max: number) {
  const fmt = (n: number) => `R$ ${(n / 1000).toFixed(0)}k`
  return `${fmt(min)} – ${fmt(max)}`
}

function daysAgo(date: string) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Hoje'
  if (diff === 1) return 'Ontem'
  return `${diff} dias atrás`
}

function seniorityVariant(s: Job['seniority']): 'default' | 'info' | 'warning' | 'success' | 'danger' | 'purple' {
  const map: Record<Job['seniority'], 'default' | 'info' | 'warning' | 'success' | 'danger' | 'purple'> = {
    'Estágio': 'default',
    'Júnior': 'info',
    'Pleno': 'warning',
    'Sênior': 'success',
    'Especialista': 'purple',
    'Gerência': 'danger',
  }
  return map[s]
}

export function VirtualizedJobList({ jobs, savedJobs, onToggleSave, onSelectJob }: Props) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: jobs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  })

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mb-4">
          <Building2 size={28} className="text-gray-400" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Nenhuma vaga encontrada</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Tente ajustar os filtros de busca</p>
      </div>
    )
  }

  return (
    <div ref={parentRef} className="max-h-[1800px] overflow-auto">
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(item => {
          const job = jobs[item.index]
          const saved = savedJobs.has(job.id)
          return (
            <div
              key={job.id}
              style={{
                position: 'absolute',
                top: item.start,
                left: 0,
                width: '100%',
                padding: '6px 0',
              }}
            >
              <div
                className={clsx(
                  'bg-white dark:bg-dark-700 rounded-xl border transition-all cursor-pointer group',
                  'hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-md',
                  job.hot
                    ? 'border-orange-200 dark:border-orange-800'
                    : 'border-gray-100 dark:border-dark-600'
                )}
                onClick={() => onSelectJob(job)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {job.hot && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-500">
                            <Flame size={12} /> Em alta
                          </span>
                        )}
                        <Badge variant={seniorityVariant(job.seniority)}>{job.seniority}</Badge>
                        <Badge variant="default">{job.workModel}</Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Building2 size={13} /> {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} /> {daysAgo(job.postedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); onToggleSave(job.id) }}
                        className={clsx(
                          'p-1.5 rounded-lg transition-colors',
                          saved
                            ? 'text-accent-500 bg-accent-50 dark:bg-accent-900/30'
                            : 'text-gray-400 hover:text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/30'
                        )}
                        aria-label={saved ? 'Remover dos salvos' : 'Salvar vaga'}
                      >
                        {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      </button>
                      <p className="text-sm font-semibold text-accent-600 dark:text-accent-400">
                        {fmtSalary(job.salaryMin, job.salaryMax)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.skills.slice(0, 5).map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs rounded-md bg-gray-50 dark:bg-dark-600 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-dark-500"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 5 && (
                      <span className="px-2 py-0.5 text-xs rounded-md bg-gray-50 dark:bg-dark-600 text-gray-400">
                        +{job.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
