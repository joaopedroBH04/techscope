export type TechArea =
  | 'Dados & BI'
  | 'Inteligência Artificial'
  | 'Machine Learning'
  | 'Engenharia de Software'
  | 'DevOps & Cloud'
  | 'Segurança'
  | 'Mobile'
  | 'Frontend'
  | 'Backend'
  | 'Full Stack'
  | 'Produto'

export type Seniority = 'Estágio' | 'Júnior' | 'Pleno' | 'Sênior' | 'Especialista' | 'Gerência'

export type WorkModel = 'Remoto' | 'Híbrido' | 'Presencial'

export interface Job {
  id: string
  title: string
  company: string
  area: TechArea
  seniority: Seniority
  workModel: WorkModel
  location: string
  salaryMin: number
  salaryMax: number
  skills: string[]
  postedAt: string
  description: string
  hot: boolean
}

export interface SalaryData {
  role: string
  area: TechArea
  junior: number
  pleno: number
  senior: number
  especialista: number
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  url: string
  category: string
  publishedAt: string
  readTime: number
  tags: string[]
  imageUrl?: string
}

export interface Tool {
  id: string
  name: string
  category: string
  description: string
  trendScore: number
  demandJobs: number
  avgSalaryBonus: number
  usageGrowth: number
  tags: string[]
  logoColor: string
  isNew?: boolean
  isHot?: boolean
}

export interface CareerPath {
  id: string
  area: TechArea
  stages: CareerStage[]
  avgTimeToSenior: string
  marketDemand: 'Alta' | 'Muito Alta' | 'Média'
  description: string
}

export interface CareerStage {
  level: Seniority
  avgSalary: number
  topSkills: string[]
  yearsExp: string
  description: string
}

export interface MarketStat {
  label: string
  value: string
  change: string
  positive: boolean
  icon: string
}

export interface AIInsight {
  id: string
  title: string
  category: string
  impact: 'Alto' | 'Médio' | 'Baixo'
  summary: string
  tools: string[]
  publishedAt: string
}
