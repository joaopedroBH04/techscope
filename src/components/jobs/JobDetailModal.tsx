import { X, ExternalLink, MapPin, Building2, Calendar, Bookmark, BookmarkCheck, DollarSign, CheckCircle2, Gift, Clock, Globe, Search } from 'lucide-react'
import { Badge } from '../ui/Badge'
import type { Job } from '../../types'

interface JobDetailModalProps {
  job: Job
  onClose: () => void
  isSaved: boolean
  onToggleSave: () => void
}

function fmtSalary(n: number) {
  return `R$ ${n.toLocaleString('pt-BR')}`
}

function daysAgo(date: string) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Hoje'
  if (diff === 1) return 'Ontem'
  return `${diff} dias atrás`
}

export function JobDetailModal({ job, onClose, isSaved, onToggleSave }: JobDetailModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-brand-600 to-brand-800 p-6 rounded-t-2xl text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant={job.workModel === 'Remoto' ? 'success' : job.workModel === 'Híbrido' ? 'warning' : 'default'}>
                  {job.workModel}
                </Badge>
                <Badge variant="purple">{job.seniority}</Badge>
                {job.hot && (
                  <span className="px-2 py-0.5 bg-orange-500/30 text-orange-200 text-xs font-bold rounded-full border border-orange-400/30">
                    Hot
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold leading-tight">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-brand-200">
                <span className="flex items-center gap-1"><Building2 size={14} /> {job.company}</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {daysAgo(job.postedAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onToggleSave}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title={isSaved ? 'Remover dos salvos' : 'Salvar vaga'}
              >
                {isSaved ? <BookmarkCheck size={18} className="text-accent-400" /> : <Bookmark size={18} />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Salary */}
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-brand-500" />
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Faixa Salarial</span>
            </div>
            <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">
              {fmtSalary(job.salaryMin)} – {fmtSalary(job.salaryMax)}
              <span className="text-sm font-normal text-gray-400 ml-2">/ mês</span>
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sobre a vaga</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Requisitos</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 size={14} className="text-accent-500 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tecnologias & Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Gift size={15} className="text-brand-500" /> Benefícios
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {job.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-700 rounded-lg px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><Building2 size={12} /> {job.company}</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> Publicada {daysAgo(job.postedAt)}</span>
            <span className="flex items-center gap-1">{job.area}</span>
          </div>

          {/* CTAs — LinkedIn + Portal da empresa + Salvar */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm shadow-lg shadow-blue-500/20"
              >
                <Search size={16} /> Buscar no LinkedIn
              </a>
              <button
                onClick={onToggleSave}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  isSaved
                    ? 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800 text-accent-600 dark:text-accent-400'
                    : 'bg-white dark:bg-dark-700 border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-300 hover:border-brand-400'
                }`}
              >
                {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                {isSaved ? 'Salvo' : 'Salvar'}
              </button>
            </div>
            <a
              href={job.companyCareerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-6 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:border-brand-400 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all text-sm font-medium"
            >
              <Globe size={14} /> Portal de carreiras da {job.company} <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
