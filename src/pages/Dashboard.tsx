import { Link } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import {
  Briefcase, DollarSign, TrendingUp, Zap, Brain,
  ArrowRight, Flame, Star, BookOpen, ExternalLink,
} from 'lucide-react'
import { StatCard } from '../components/ui/StatCard'
import { Badge } from '../components/ui/Badge'
import { jobs } from '../data/jobs'
import { salaryTrend } from '../data/salaries'
import { news } from '../data/news'
import { topTrendingTools } from '../data/tools'
import { demandByArea } from '../data/careers'

const marketStats = [
  { label: 'Vagas Abertas em Dados & IA', value: '18.400+', change: '+35% vs 2025', positive: true, icon: <Briefcase size={18} />, gradient: true },
  { label: 'Salário Médio Sênior IA', value: 'R$ 27.000', change: '+20% vs 2025', positive: true, icon: <DollarSign size={18} /> },
  { label: 'Ferramentas em Alta', value: '45 novas', change: 'IA Generativa lidera', positive: true, icon: <TrendingUp size={18} /> },
  { label: 'Déficit de Profissionais', value: '200 mil', change: 'Oportunidade enorme', positive: true, icon: <Zap size={18} /> },
]

const radarData = demandByArea.slice(0, 7).map(d => ({
  subject: d.area.split(' ')[0],
  demand: d.demand,
  fullMark: 100,
}))

export function Dashboard() {
  const hotJobs = jobs.filter(j => j.hot).slice(0, 4)
  const topNews = news.slice(0, 3)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-dark-900 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 bg-accent-500/20 text-accent-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-accent-500/30">
              <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
              Mercado ao vivo
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Mercado de Tecnologia 2026
          </h1>
          <p className="text-brand-200 text-lg max-w-2xl">
            Dados, IA, vagas, salários e tendências em tempo real para profissionais de tecnologia.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/vagas" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-4 py-2 rounded-lg hover:bg-brand-50 transition-colors">
              <Briefcase size={16} /> Ver Vagas
            </Link>
            <Link to="/salarios" className="inline-flex items-center gap-2 bg-brand-500/50 text-white font-semibold px-4 py-2 rounded-lg hover:bg-brand-500/70 transition-colors border border-white/20">
              <DollarSign size={16} /> Comparar Salários
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketStats.map((stat, i) => (
          <StatCard key={i} {...stat} gradient={i === 0} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Salary Trend */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">Evolução Salarial por Área</h2>
              <p className="text-xs text-gray-400 mt-0.5">Média em R$ — 2020 a 2026</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salaryTrend}>
              <defs>
                <linearGradient id="dados" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip
                formatter={(v) => [`R$ ${(v as number).toLocaleString("pt-BR")}`, ""]}
                contentStyle={{ background: '#1e2535', border: 'none', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#e5e7eb' }}
              />
              <Area type="monotone" dataKey="ia" name="IA & ML" stroke="#4ade80" fill="url(#ia)" strokeWidth={2} />
              <Area type="monotone" dataKey="dados" name="Dados & BI" stroke="#818cf8" fill="url(#dados)" strokeWidth={2} />
              <Area type="monotone" dataKey="devops" name="DevOps" stroke="#f59e0b" fill="none" strokeWidth={2} strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-accent-400 rounded" /> IA & ML</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-brand-400 rounded" /> Dados & BI</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-amber-400 rounded" /> DevOps</span>
          </div>
        </div>

        {/* Demand Radar */}
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Demanda por Área</h2>
          <p className="text-xs text-gray-400 mb-4">Score de aquecimento do mercado</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" opacity={0.4} />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Demanda" dataKey="demand" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hot Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Flame size={18} className="text-orange-500" /> Vagas em Destaque
          </h2>
          <Link to="/vagas" className="flex items-center gap-1 text-brand-500 hover:text-brand-600 text-sm font-medium">
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hotJobs.map(job => (
            <a
              key={job.id}
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-4 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-md group block"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 bg-brand-50 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                  <Brain size={16} className="text-brand-500" />
                </div>
                <Badge variant={job.workModel === 'Remoto' ? 'success' : job.workModel === 'Híbrido' ? 'warning' : 'default'}>
                  {job.workModel}
                </Badge>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mt-2 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{job.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{job.company}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
                  R$ {(job.salaryMin / 1000).toFixed(0)}k – {(job.salaryMax / 1000).toFixed(0)}k
                </span>
                <Badge variant="purple">{job.seniority}</Badge>
              </div>
              <span className="flex items-center gap-1 mt-2 text-xs text-brand-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Ver no LinkedIn <ExternalLink size={10} />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Row: News + Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest News */}
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen size={16} className="text-brand-500" /> Últimas Notícias
            </h2>
            <Link to="/noticias" className="flex items-center gap-1 text-brand-500 hover:text-brand-600 text-sm font-medium">
              Ver mais <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {topNews.map(item => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors group block"
              >
                <div className="w-1 self-stretch rounded-full bg-brand-400 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-brand-500 font-medium">{item.category}</span>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight mt-0.5 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.source} · {item.readTime} min leitura</p>
                </div>
                <ExternalLink size={12} className="text-gray-300 dark:text-gray-600 group-hover:text-brand-400 transition-colors flex-shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </div>

        {/* Trending Tools */}
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Star size={16} className="text-amber-500" /> Ferramentas em Alta
            </h2>
            <Link to="/ferramentas" className="flex items-center gap-1 text-brand-500 hover:text-brand-600 text-sm font-medium">
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {topTrendingTools.map((tool, i) => (
              <div key={tool.name} className="flex items-center gap-3">
                <span className="w-5 text-xs font-bold text-gray-400 dark:text-gray-500 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{tool.name}</span>
                    <span className="text-xs text-accent-600 dark:text-accent-400 font-semibold">+{tool.growth}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-dark-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full"
                      style={{ width: `${tool.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-100 dark:border-brand-800">
            <p className="text-xs text-brand-700 dark:text-brand-300">
              <strong>Destaque:</strong> Vector Databases cresce 320% — impulsionado pela adoção massiva de RAG e IA Generativa.
            </p>
          </div>
        </div>
      </div>

      {/* Trending Bar */}
      <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Top Crescimento por Especialização em 2026</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={demandByArea.slice(0, 8)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis dataKey="area" type="category" tick={{ fontSize: 11, fill: '#9ca3af' }} width={120} />
            <Tooltip
              formatter={(v: unknown) => [`${v}/100`, 'Score']}
              contentStyle={{ background: '#1e2535', border: 'none', borderRadius: 8, fontSize: 12 }}
            />
            <Bar dataKey="demand" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
