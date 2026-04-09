import { Brain, Database, Cpu, TrendingUp, Zap, BookOpen, ArrowRight, Star } from 'lucide-react'
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Badge } from '../components/ui/Badge'
import { StatCard } from '../components/ui/StatCard'
import { tools } from '../data/tools'
import { jobs } from '../data/jobs'
import { news } from '../data/news'

const aiInsights = [
  {
    id: '1',
    title: 'RAG (Retrieval-Augmented Generation)',
    category: 'IA Generativa',
    impact: 'Alto' as const,
    summary: 'Combina LLMs com bases de conhecimento proprietárias. Empresas estão usando para criar chatbots que acessam documentação interna, políticas e dados específicos da empresa.',
    tools: ['LangChain', 'Pinecone', 'Weaviate', 'OpenAI', 'Llama'],
    growth: 280,
  },
  {
    id: '2',
    title: 'Data Lakehouse Architecture',
    category: 'Engenharia de Dados',
    impact: 'Alto' as const,
    summary: 'Unificação de Data Lake e Data Warehouse em uma única plataforma. Delta Lake, Apache Iceberg e Hudi estão liderando essa transformação arquitetural.',
    tools: ['Databricks', 'Delta Lake', 'Apache Iceberg', 'dbt', 'Spark'],
    growth: 65,
  },
  {
    id: '3',
    title: 'MLOps & Feature Stores',
    category: 'Machine Learning',
    impact: 'Alto' as const,
    summary: 'Gestão do ciclo de vida completo de modelos ML. Feature Stores como Feast e Tecton resolvem o problema de consistência de features entre treino e inferência.',
    tools: ['MLflow', 'Feast', 'Tecton', 'Kubeflow', 'DVC'],
    growth: 85,
  },
  {
    id: '4',
    title: 'AI Agents & Automação',
    category: 'IA Generativa',
    impact: 'Alto' as const,
    summary: 'Agentes de IA que executam tarefas complexas de forma autônoma. AutoGPT, CrewAI e LangGraph permitem criar workflows de IA que tomam decisões e interagem com sistemas externos.',
    tools: ['CrewAI', 'LangGraph', 'AutoGen', 'LangChain', 'Claude'],
    growth: 420,
  },
  {
    id: '5',
    title: 'Real-time Analytics',
    category: 'Dados',
    impact: 'Médio' as const,
    summary: 'Processamento e análise de dados em tempo real com latências de milissegundos. Flink, Kafka Streams e Apache Pinot estão revolucionando como as empresas consomem dados operacionais.',
    tools: ['Apache Flink', 'Kafka', 'Apache Pinot', 'ClickHouse'],
    growth: 45,
  },
  {
    id: '6',
    title: 'Data Mesh & Governança',
    category: 'Estratégia de Dados',
    impact: 'Médio' as const,
    summary: 'Descentralização da propriedade de dados para times de domínio. Data Mesh como paradigma organizacional está sendo adotado por empresas como Zalando e Netflix.',
    tools: ['dbt', 'DataHub', 'Apache Atlas', 'Monte Carlo'],
    growth: 40,
  },
]

const aiAdoptionTrend = [
  { year: '2021', empresas: 25, investimento: 8 },
  { year: '2022', empresas: 40, investimento: 15 },
  { year: '2023', empresas: 55, investimento: 28 },
  { year: '2024', empresas: 70, investimento: 48 },
  { year: '2025', empresas: 82, investimento: 75 },
  { year: '2026', empresas: 91, investimento: 120 },
]

const impactColor = { Alto: 'danger', Médio: 'warning', Baixo: 'default' } as const

export function AIData() {
  const aiJobs = jobs.filter(j => j.area === 'Inteligência Artificial' || j.area === 'Machine Learning' || j.area === 'Dados & BI')
  const aiNews = news.filter(n => ['Inteligência Artificial', 'Engenharia de Dados', 'Cloud & IA'].includes(n.category))
  const dataTools = tools.filter(t => ['Transformação de Dados', 'Processamento de Dados', 'IA Generativa', 'MLOps', 'Deep Learning', 'Plataforma de Dados'].includes(t.category))

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-900 via-brand-900 to-dark-800 p-8 text-white border border-brand-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-48 h-48 bg-brand-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent-500 rounded-full blur-2xl" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={20} className="text-brand-400" />
            <span className="text-brand-300 font-semibold text-sm">Dados & Inteligência Artificial</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">O epicentro da revolução tech</h1>
          <p className="text-brand-200 text-base max-w-2xl leading-relaxed">
            IA e Dados são as áreas de maior crescimento, demanda e remuneração no mercado tech global. Acompanhe as tendências, ferramentas e oportunidades desta fronteira.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Vagas em IA & Dados" value="8.200+" change="+52% vs 2025" positive icon={<Brain size={16} />} gradient />
        <StatCard label="Salário Médio Sênior" value="R$ 25.000" change="+22% ano" positive icon={<TrendingUp size={16} />} />
        <StatCard label="Déficit de Talentos" value="200 mil" description="No Brasil em 2026" icon={<Zap size={16} />} />
        <StatCard label="Empresas Usando IA" value="91%" change="Em 2026 (vs 25% em 2021)" positive icon={<Cpu size={16} />} />
      </div>

      {/* AI Adoption Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Adoção de IA nas Empresas Brasileiras</h2>
          <p className="text-xs text-gray-400 mb-4">% de empresas com projetos de IA e investimento em BI USD</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={aiAdoptionTrend}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ background: '#1e2535', border: 'none', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="empresas" name="% Empresas" stroke="#6366f1" fill="url(#grad1)" strokeWidth={2} />
              <Line type="monotone" dataKey="investimento" name="Investimento (BI USD)" stroke="#4ade80" strokeWidth={2} dot={{ r: 3, fill: '#4ade80' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Tools in this area */}
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star size={16} className="text-amber-500" /> Ferramentas Essenciais
          </h2>
          <div className="space-y-2.5">
            {dataTools.slice(0, 7).map(tool => (
              <div key={tool.id} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: tool.logoColor }}
                >
                  {tool.name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{tool.name}</span>
                    <span className="text-xs font-semibold text-accent-600 dark:text-accent-400 ml-2">+{tool.usageGrowth}%</span>
                  </div>
                  <div className="h-1 bg-gray-100 dark:bg-dark-600 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${tool.trendScore}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div>
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap size={16} className="text-brand-500" /> Tendências & Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiInsights.map(insight => (
            <div key={insight.id} className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-5 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-brand-500 dark:text-brand-400">{insight.category}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={impactColor[insight.impact]}>Impacto {insight.impact}</Badge>
                  <span className="text-xs font-bold text-accent-600 dark:text-accent-400">+{insight.growth}%</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{insight.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{insight.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {insight.tools.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs in this area */}
      <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Database size={16} className="text-brand-500" /> Vagas em Dados & IA
          </h2>
          <a href="/vagas" className="flex items-center gap-1 text-brand-500 hover:text-brand-600 text-sm font-medium">
            Ver todas <ArrowRight size={14} />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiJobs.slice(0, 6).map(job => (
            <div key={job.id} className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-100 dark:border-dark-700 hover:border-brand-400 dark:hover:border-brand-600 transition-all">
              <p className="font-medium text-gray-900 dark:text-white text-sm">{job.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{job.company}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={job.workModel === 'Remoto' ? 'success' : 'warning'}>{job.workModel}</Badge>
                <Badge variant="purple">{job.seniority}</Badge>
              </div>
              <p className="text-brand-600 dark:text-brand-400 font-bold text-sm mt-2">
                R$ {(job.salaryMin/1000).toFixed(0)}k – {(job.salaryMax/1000).toFixed(0)}k
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* News in AI area */}
      <div>
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen size={16} className="text-brand-500" /> Notícias de IA & Dados
        </h2>
        <div className="space-y-3">
          {aiNews.map(item => (
            <div key={item.id} className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-4 flex gap-4 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-sm cursor-pointer">
              <div className="w-1 self-stretch rounded-full bg-brand-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-brand-500">{item.category}</span>
                  <span className="text-xs text-gray-400">{item.source}</span>
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">{item.title}</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.summary}</p>
              </div>
              <div className="text-xs text-gray-400 flex-shrink-0 text-right">
                <p>{item.readTime} min</p>
                <p className="mt-1">{item.publishedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
