import { useState, useMemo } from 'react'
import { TrendingUp, Search, Zap, Star, BarChart3 } from 'lucide-react'
import { tools, techStackByRole } from '../data/tools'
import { Badge } from '../components/ui/Badge'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import clsx from 'clsx'

const categories = ['Todas', 'Linguagem', 'Transformação de Dados', 'Processamento de Dados', 'IA Generativa', 'MLOps', 'DevOps & Cloud', 'Banco de Dados', 'BI & Visualização', 'Deep Learning', 'Streaming', 'Frontend', 'Plataforma de Dados', 'Infrastructure as Code', 'Orquestração', 'Data Warehouse']

export function Tools() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedRole, setSelectedRole] = useState(Object.keys(techStackByRole)[0])
  const [sortBy, setSortBy] = useState<'trend' | 'demand' | 'growth'>('trend')

  const filtered = tools
    .filter(t => {
      const q = search.toLowerCase()
      const matchSearch = !search || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q))
      const matchCat = selectedCategory === 'Todas' || t.category === selectedCategory
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      if (sortBy === 'trend') return b.trendScore - a.trendScore
      if (sortBy === 'demand') return b.demandJobs - a.demandJobs
      return b.usageGrowth - a.usageGrowth
    })

  const roleStack = useMemo(() => techStackByRole[selectedRole] ?? [], [selectedRole])
  
  // Use useMemo to avoid calling Math.random during render
  const radarData = useMemo(() => {
    return roleStack.slice(0, 6).map((skill, index) => ({
      subject: skill.split(' ')[0],
      // Use deterministic values based on index for purity
      value: 70 + ((index * 7) % 30),
      fullMark: 100,
    }))
  }, [roleStack])

  const growthChartData = tools
    .sort((a, b) => b.usageGrowth - a.usageGrowth)
    .slice(0, 8)
    .map(t => ({ name: t.name, crescimento: t.usageGrowth }))

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ferramentas & Tecnologias</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Explore o ecossistema tech e as ferramentas mais demandadas pelo mercado</p>
      </div>

      {/* Top trending row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tools.filter(t => t.isHot).slice(0, 6).map(tool => (
          <div key={tool.id} className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-3 text-center hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-md">
            <div
              className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: tool.logoColor }}
            >
              {tool.name.slice(0, 2)}
            </div>
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-tight">{tool.name}</p>
            <p className="text-xs text-accent-600 dark:text-accent-400 font-medium mt-0.5">+{tool.usageGrowth}%</p>
            {tool.isNew && <Badge variant="success" size="sm">Novo</Badge>}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            <TrendingUp size={16} className="text-brand-500" /> Maior Crescimento de Adoção
          </h2>
          <p className="text-xs text-gray-400 mb-4">% de crescimento em vagas que exigem a ferramenta</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={growthChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#9ca3af' }} width={90} />
              <Tooltip
                formatter={(v: unknown) => [`+${v}%`, 'Crescimento']}
                contentStyle={{ background: '#1e2535', border: 'none', borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="crescimento" fill="#4ade80" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Role Stack Radar */}
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star size={16} className="text-amber-500" /> Stack por Cargo
          </h2>
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 mb-4 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {Object.keys(techStackByRole).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" opacity={0.4} />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Radar name="Domínio" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {roleStack.map(skill => (
              <span key={skill} className="px-2 py-0.5 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs rounded-md font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Demand Comparison */}
      <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          <BarChart3 size={16} className="text-brand-500" /> Demanda vs Crescimento por Skill
        </h2>
        <p className="text-xs text-gray-400 mb-4">Comparando número de vagas e velocidade de adoção das top ferramentas</p>
        <div className="space-y-3">
          {tools
            .sort((a, b) => b.demandJobs - a.demandJobs)
            .slice(0, 10)
            .map(tool => {
              const maxDemand = tools.reduce((max, t) => Math.max(max, t.demandJobs), 0)
              const maxGrowth = tools.reduce((max, t) => Math.max(max, t.usageGrowth), 0)
              return (
                <div key={tool.id} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: tool.logoColor }}
                  >
                    {tool.name.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{tool.name}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-brand-500 font-semibold">{tool.demandJobs.toLocaleString('pt-BR')} vagas</span>
                        <span className="text-accent-500 font-semibold">+{tool.usageGrowth}%</span>
                      </div>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="flex-1 bg-gray-100 dark:bg-dark-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-500 rounded-full transition-all"
                          style={{ width: `${(tool.demandJobs / maxDemand) * 100}%` }}
                        />
                      </div>
                      <div className="flex-1 bg-gray-100 dark:bg-dark-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-500 rounded-full transition-all"
                          style={{ width: `${(tool.usageGrowth / maxGrowth) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="flex items-center gap-6 mt-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 bg-brand-500 rounded-full" /> Demanda (vagas)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 bg-accent-500 rounded-full" /> Crescimento (%)</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ferramenta..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="trend">Trend Score</option>
          <option value="demand">Mais Demandadas</option>
          <option value="growth">Maior Crescimento</option>
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.slice(0, 10).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
              selectedCategory === cat
                ? 'bg-brand-500 text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/30'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(tool => (
          <div key={tool.id} className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-5 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-md">
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: tool.logoColor }}
              >
                {tool.name.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{tool.name}</h3>
                  {tool.isHot && (
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-orange-500">
                      <Zap size={9} />Hot
                    </span>
                  )}
                  {tool.isNew && <Badge variant="success">Novo</Badge>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{tool.category}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{tool.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {tool.tags.slice(0, 4).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 bg-gray-100 dark:bg-dark-600 text-gray-500 dark:text-gray-400 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="border-t border-gray-100 dark:border-dark-600 pt-3 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-400">Trend</p>
                <p className="font-bold text-brand-600 dark:text-brand-400 text-sm">{tool.trendScore}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Vagas</p>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{tool.demandJobs.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Crescimento</p>
                <p className="font-bold text-accent-600 dark:text-accent-400 text-sm">+{tool.usageGrowth}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Tools;
