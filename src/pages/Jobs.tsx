import { useState, useMemo } from 'react'
import { Search, MapPin, Building2, Briefcase, Filter, X, Flame, ExternalLink } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { jobs } from '../data/jobs'
import type { TechArea, Seniority, WorkModel } from '../types'
import clsx from 'clsx'

const areas: TechArea[] = ['Dados & BI', 'Inteligência Artificial', 'Machine Learning', 'DevOps & Cloud', 'Backend', 'Frontend', 'Segurança', 'Engenharia de Software']
const seniorities: Seniority[] = ['Estágio', 'Júnior', 'Pleno', 'Sênior', 'Especialista', 'Gerência']
const workModels: WorkModel[] = ['Remoto', 'Híbrido', 'Presencial']

function fmtSalary(n: number) {
  return `R$ ${(n / 1000).toFixed(0)}k`
}

export function Jobs() {
  const [search, setSearch] = useState('')
  const [selectedArea, setSelectedArea] = useState<TechArea | 'Todas'>('Todas')
  const [selectedSeniority, setSelectedSeniority] = useState<Seniority | 'Todas'>('Todas')
  const [selectedModel, setSelectedModel] = useState<WorkModel | 'Todos'>('Todos')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'recente' | 'salario'>('recente')

  const filtered = useMemo(() => {
    let list = [...jobs]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some(s => s.toLowerCase().includes(q))
      )
    }
    if (selectedArea !== 'Todas') list = list.filter(j => j.area === selectedArea)
    if (selectedSeniority !== 'Todas') list = list.filter(j => j.seniority === selectedSeniority)
    if (selectedModel !== 'Todos') list = list.filter(j => j.workModel === selectedModel)
    if (sortBy === 'salario') list.sort((a, b) => b.salaryMax - a.salaryMax)
    else list.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    return list
  }, [search, selectedArea, selectedSeniority, selectedModel, sortBy])

  const clearFilters = () => {
    setSearch('')
    setSelectedArea('Todas')
    setSelectedSeniority('Todas')
    setSelectedModel('Todos')
  }

  const hasFilters = search || selectedArea !== 'Todas' || selectedSeniority !== 'Todas' || selectedModel !== 'Todos'

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vagas de Tecnologia</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{filtered.length} vagas encontradas</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cargo, empresa ou skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
        </div>
        <div className="flex gap-2">
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

      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Briefcase size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nenhuma vaga encontrada</p>
            <p className="text-sm mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          filtered.map(job => (
            <div key={job.id} className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-5 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-md group">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                    {job.hot && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full">
                        <Flame size={10} /> Hot
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Building2 size={13} /> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {job.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant={job.workModel === 'Remoto' ? 'success' : job.workModel === 'Híbrido' ? 'warning' : 'default'}>
                      {job.workModel}
                    </Badge>
                    <Badge variant="purple">{job.seniority}</Badge>
                    <Badge variant="info">{job.area}</Badge>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className="font-bold text-brand-600 dark:text-brand-400">
                      {fmtSalary(job.salaryMin)} – {fmtSalary(job.salaryMax)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">por mês</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg transition-colors">
                    Candidatar <ExternalLink size={11} />
                  </button>
                  <p className="text-xs text-gray-400">{job.postedAt}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
