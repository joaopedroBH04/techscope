import { useState } from 'react'
import { GitBranch, TrendingUp, Clock, Star, ChevronRight, DollarSign } from 'lucide-react'
import { careerPaths, demandByArea } from '../data/careers'
import { Badge } from '../components/ui/Badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import clsx from 'clsx'
import type { CareerPath } from '../types'

function fmtR(n: unknown) {
  return `R$ ${(n as number).toLocaleString('pt-BR')}`
}

function DemandBadge({ demand }: { demand: CareerPath['marketDemand'] }) {
  const map = { 'Muito Alta': 'danger', 'Alta': 'warning', 'Média': 'default' } as const
  return <Badge variant={map[demand]}>{demand}</Badge>
}

export function CareerPaths() {
  const [selectedPath, setSelectedPath] = useState<CareerPath>(careerPaths[0])

  const demandChartData = demandByArea.map(d => ({
    area: d.area.split(' ')[0],
    demanda: d.demand,
    crescimento: d.growth,
  }))

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trilhas de Carreira</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Explore as rotas de crescimento para cada especialização em tecnologia</p>
      </div>

      {/* Area Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {careerPaths.map(path => (
          <button
            key={path.id}
            onClick={() => setSelectedPath(path)}
            className={clsx(
              'p-4 rounded-xl border text-left transition-all',
              selectedPath.id === path.id
                ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                : 'bg-white dark:bg-dark-700 border-gray-100 dark:border-dark-600 text-gray-800 dark:text-gray-200 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-md'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <GitBranch size={18} className={selectedPath.id === path.id ? 'text-brand-200' : 'text-brand-500'} />
              <DemandBadge demand={path.marketDemand} />
            </div>
            <h3 className="font-semibold text-sm mt-2">{path.area}</h3>
            <div className="flex items-center gap-3 mt-2 text-xs opacity-75">
              <span className="flex items-center gap-1"><Clock size={11} /> {path.avgTimeToSenior}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Path Detail */}
      <div className="bg-white dark:bg-dark-700 rounded-2xl border border-gray-100 dark:border-dark-600 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{selectedPath.area}</h2>
              <p className="text-brand-200 text-sm mt-1 max-w-2xl">{selectedPath.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <DemandBadge demand={selectedPath.marketDemand} />
              <span className="text-brand-200 text-sm flex items-center gap-1">
                <Clock size={13} /> {selectedPath.avgTimeToSenior} p/ Sênior
              </span>
            </div>
          </div>
        </div>

        {/* Stages Timeline */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp size={16} className="text-brand-500" /> Progressão de Carreira
          </h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-dark-600" />

            <div className="space-y-6">
              {selectedPath.stages.map((stage, i) => (
                <div key={stage.level} className="relative flex gap-4">
                  {/* Dot */}
                  <div className={clsx(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 flex-shrink-0',
                    i === selectedPath.stages.length - 1
                      ? 'bg-brand-500 border-brand-500 text-white'
                      : 'bg-white dark:bg-dark-700 border-gray-300 dark:border-dark-500 text-gray-500 dark:text-gray-400'
                  )}>
                    {i + 1}
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{stage.level}</h4>
                      <span className="flex items-center gap-1 text-brand-600 dark:text-brand-400 font-bold">
                        <DollarSign size={13} /> {fmtR(stage.avgSalary)}<span className="text-xs font-normal text-gray-400">/mês</span>
                      </span>
                      <span className="text-xs text-gray-400">{stage.yearsExp} exp.</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{stage.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.topSkills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs rounded-md font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Salary progression */}
        <div className="px-6 pb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star size={16} className="text-amber-500" /> Evolução Salarial
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={selectedPath.stages.map(s => ({ nivel: s.level, salario: s.avgSalary }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="nivel" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip
                formatter={(v: unknown) => [fmtR(v), 'Salário médio']}
                contentStyle={{ background: '#1e2535', border: 'none', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#e5e7eb' }}
              />
              <Bar dataKey="salario" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Demand Overview */}
      <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Demanda de Mercado por Especialização</h2>
        <p className="text-xs text-gray-400 mb-5">Score de 0-100 — quanto maior, mais aquecido o mercado para essa área</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={demandChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="area" tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <Tooltip
              contentStyle={{ background: '#1e2535', border: 'none', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#e5e7eb' }}
            />
            <Bar dataKey="demanda" name="Score Demanda" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-accent-600 to-brand-600 rounded-2xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Pronto para dar o próximo passo?</h2>
        <p className="text-brand-100 mb-4">Explore as vagas disponíveis para a sua área e compare os salários do mercado.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/vagas" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-4 py-2 rounded-lg hover:bg-brand-50 transition-colors text-sm">
            Ver Vagas <ChevronRight size={14} />
          </a>
          <a href="/salarios" className="inline-flex items-center gap-2 bg-brand-500/50 text-white font-semibold px-4 py-2 rounded-lg hover:bg-brand-500/70 transition-colors border border-white/20 text-sm">
            Comparar Salários <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
