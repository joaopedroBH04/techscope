import type { SalaryData } from '../types'

export const salaryData: SalaryData[] = [
  {
    role: 'Engenheiro de Dados',
    area: 'Dados & BI',
    junior: 6500,
    pleno: 13000,
    senior: 22000,
    especialista: 33000,
  },
  {
    role: 'Cientista de Dados',
    area: 'Inteligência Artificial',
    junior: 7000,
    pleno: 14000,
    senior: 23000,
    especialista: 35000,
  },
  {
    role: 'Analista de BI',
    area: 'Dados & BI',
    junior: 5000,
    pleno: 10000,
    senior: 16000,
    especialista: 24000,
  },
  {
    role: 'ML Engineer',
    area: 'Machine Learning',
    junior: 8000,
    pleno: 15000,
    senior: 26000,
    especialista: 38000,
  },
  {
    role: 'Engenheiro de Software',
    area: 'Engenharia de Software',
    junior: 6000,
    pleno: 11000,
    senior: 19000,
    especialista: 28000,
  },
  {
    role: 'DevOps / SRE',
    area: 'DevOps & Cloud',
    junior: 7000,
    pleno: 13000,
    senior: 22000,
    especialista: 32000,
  },
  {
    role: 'Especialista em IA',
    area: 'Inteligência Artificial',
    junior: 9000,
    pleno: 17000,
    senior: 28000,
    especialista: 42000,
  },
  {
    role: 'Analista de Dados',
    area: 'Dados & BI',
    junior: 4000,
    pleno: 8000,
    senior: 14000,
    especialista: 20000,
  },
  {
    role: 'Data Architect',
    area: 'Dados & BI',
    junior: 10000,
    pleno: 18000,
    senior: 30000,
    especialista: 45000,
  },
  {
    role: 'Segurança da Informação',
    area: 'Segurança',
    junior: 6000,
    pleno: 12000,
    senior: 20000,
    especialista: 30000,
  },
  {
    role: 'Frontend Developer',
    area: 'Frontend',
    junior: 5000,
    pleno: 10000,
    senior: 17000,
    especialista: 25000,
  },
  {
    role: 'Backend Developer',
    area: 'Backend',
    junior: 6000,
    pleno: 12000,
    senior: 20000,
    especialista: 30000,
  },
]

export const seniorityColors: Record<string, string> = {
  junior: '#4ade80',
  pleno: '#818cf8',
  senior: '#f59e0b',
  especialista: '#f43f5e',
}

export const salaryByArea = [
  { area: 'IA / ML', avg: 24000, min: 8000, max: 45000 },
  { area: 'Dados & BI', avg: 18000, min: 4000, max: 45000 },
  { area: 'DevOps', avg: 18000, min: 7000, max: 35000 },
  { area: 'Backend', avg: 17000, min: 6000, max: 35000 },
  { area: 'Frontend', avg: 14000, min: 5000, max: 28000 },
  { area: 'Segurança', avg: 17000, min: 6000, max: 30000 },
  { area: 'Full Stack', avg: 15000, min: 5500, max: 28000 },
]

export const salaryTrend = [
  { year: '2020', dados: 8000, ia: 12000, devops: 9000, dev: 8500 },
  { year: '2021', dados: 10000, ia: 14000, devops: 11000, dev: 9500 },
  { year: '2022', dados: 13000, ia: 17000, devops: 14000, dev: 11000 },
  { year: '2023', dados: 16000, ia: 21000, devops: 16500, dev: 13000 },
  { year: '2024', dados: 19000, ia: 25000, devops: 19000, dev: 15000 },
  { year: '2025', dados: 22000, ia: 30000, devops: 22000, dev: 17000 },
  { year: '2026', dados: 25000, ia: 35000, devops: 24000, dev: 19000 },
]
