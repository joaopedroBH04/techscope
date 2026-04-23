import { useState, useMemo, useCallback } from 'react'
import { Search, MapPin, Building2, Briefcase, Filter, X, Flame, ExternalLink, Bookmark, BookmarkCheck, Clock, Users, TrendingUp } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { JobDetailModal } from '../components/jobs/JobDetailModal'
import { VirtualizedJobList } from '../components/jobs/VirtualizedJobList'
import { jobs } from '../data/jobs'
import type { Job, TechArea, Seniority, WorkModel } from '../types'
import clsx from 'clsx'

const areas: TechArea[] = ['Dados & BI', 'Inteligência Artificial', 'Machine Learning', 'DevOps & Cloud', 'Backend', 'Frontend', 'Segurança', 'Engenharia de Software']
const seniorities: Seniority[] = ['Estágio', 'Júnior', 'Pleno', 'Sênior', 'Especialista', 'Gerência']
const workModels: WorkModel[] = ['Remoto', 'Híbrido', 'Presencial']

function fmtSalary(n: number) {
  return `R$ ${(n / 1000).toFixed(0)}k`
}

function daysAgo(date: string) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Hoje'
  if (diff === 1) return 'Ontem'
  return `${diff}d atrás`
}

export function Jobs() {
  const [search, setSearch] = useState('')
  const [selectedArea, setSelectedArea] = useState<TechArea | 'Todas'>('Todas')
  const [selectedSeniority, setSelectedSeniority] = useState<Seniority | 'Todas'>('Todas')
  const [selectedModel, setSelectedModel] = useState<WorkModel | 'Todos'>('Todos')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'recente' | 'salario'>('recente')
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [savedJobs, setSavedJobs] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('techscope-saved-jobs')
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch { return new Set() }
  })

  const toggleSave = useCallback((jobId: string) => {
    setSavedJobs(prev => {
      const next = new Set(prev)
      if (next.has(jobId)) next.delete(jobId)
      else next.add(jobId)
      localStorage.setItem('techscope-saved-jobs', JSON.stringify([...next]))
      return next
    })
  }, [])

  const filtered = useMemo(() => {
    let list = [...jobs]
    if (showSavedOnly) list = list.filter(j => savedJobs.has(j.id))
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some(s => s.toLowerCase().includes(q)) ||
        j.area.toLowerCase().includes(q)
      )
    }
    if (selectedArea !== 'Todas') list = list.filter(j => j.area === selectedArea)
    if (selectedSeniority !== 'Todas') list = list.filter(j => j.seniority === selectedSeniority)
    if (selectedModel !== 'Todos') list = list.filter(j => j.workModel === selectedModel)
    if (sortBy === 'salario') list.sort((a, b) => b.salaryMax - a.salaryMax)
    else list.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    return list
  }, [search, selectedArea, selectedSeniority, selectedModel, sortBy, showSavedOnly, savedJobs])

  const clearFilters = () => {
    setSearch('')
    setSelectedArea('Todas')
    setSelectedSeniority('Todas')
    setSelectedModel('Todos')
    setShowSavedOnly(false)
  }

  const hasFilters = search || selectedArea !== 'Todas' || selectedSeniority !== 'Todas' || selectedModel !== 'Todos' || showSavedOnly

  // Quick stats
  const remoteCount = jobs.filter(j => j.workModel === 'Remoto').length
  const avgSalary = Math.round(jobs.reduce((sum, j) => sum + (j.salaryMin + j.salaryMax) / 2, 0) / jobs.length)
  const hotCount = jobs.filter(j => j.hot).length

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vagas de Tecnologia</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{filtered.length} vagas encontradas · {savedJobs.size} salvas</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-50 dark:bg-brand-900/30 rounded-lg flex items-center justify-center"><Briefcase size={16} className="text-brand-500" /></div>
          <div><p className="text-lg font-bold text-gray-900 dark:text-white">{jobs.length}</p><p className="text-xs text-gray-400">Total de vagas</p></div>
        </div>
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-accent-50 dark:bg-accent-900/30 rounded-lg flex items-center justify-center"><Users size={16} className="text-accent-500" /></div>
          <div><p className="text-lg font-bold text-gray-900 dark:text-white">{remoteCount}</p><p className="text-xs text-gray-400">Vagas remotas</p></div>
        </div>
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-50 dark:bg-amber-900/30 rounded-lg flex items-center justify-center"><TrendingUp size={16} className="text-amber-500" /></div>
          <div><p className="text-lg font-bold text-gray-900 dark:text-white">R$ {(avgSalary/1000).toFixed(0)}k</p><p className="text-xs text-gray-400">Salário médio</p></div>
        </div>
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center"><Flame size={16} className="text-orange-500" /></div>
          <div><p className="text-lg font-bold text-gray-900 dark:text-white">{hotCount}</p><p className="text-xs text-gray-400">Em destaque</p></div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cargo, empresa, skill ou área..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={clsx(
              'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors',
              showSavedOnly
                ? 'bg-accent-500 border-accent-500 text-white'
                : 'border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 hover:border-accent-400'
            )}
          >
            <BookmarkCheck size={15} /> Salvas{savedJobs.size > 0 && ` (${savedJobs.size})`}
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'recente' | 'salario')}
            className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="recente">Mais recente</option>
            <option value="salario">Maior salário</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors',
              showFilters
                ? 'bg-brand-500 border-brand-500 text-white'
                : 'border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 hover:border-brand-400'
            )}
          >
            <Filter size={15} /> Filtros
          </button>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium"
            >
              <X size={14} /> Limpar
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-5 animate-slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Área</p>
              <div className="flex flex-wrap gap-2">
                {(['Todas', ...areas] as const).map(a => (
                  <button
                    key={a}
                    onClick={() => setSelectedArea(a as typeof selectedArea)}
                    className={clsx(
                      'px-2.5 py-1 rounded-lg text-xs font-medium transition-all',
                      selectedArea === a
                        ? 'bg-brand-500 text-white'
                        : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/30'
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Senioridade</p>
              <div className="flex flex-wrap gap-2">
                {(['Todas', ...seniorities] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSeniority(s as typeof selectedSeniority)}
                    className={clsx(
                      'px-2.5 py-1 rounded-lg text-xs font-medium transition-all',
                      selectedSeniority === s
                        ? 'bg-brand-500 text-white'
                        : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/30'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Modelo de Trabalho</p>
              <div className="flex flex-wrap gap-2">
                {(['Todos', ...workModels] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedModel(m as typeof selectedModel)}
                    className={clsx(
                      'px-2.5 py-1 rounded-lg text-xs font-medium transition-all',
                      selectedModel === m
                        ? 'bg-brand-500 text-white'
                        : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/30'
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Cards - Virtualized for Performance */}
      <VirtualizedJobList
        jobs={filtered}
        savedJobs={savedJobs}
        onToggleSave={toggleSave}
        onSelectJob={setSelectedJob}
      />

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          isSaved={savedJobs.has(selectedJob.id)}
          onToggleSave={() => toggleSave(selectedJob.id)}
        />
      )}
    </div>
  )
}
