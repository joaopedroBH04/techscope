import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts'
import { DollarSign, TrendingUp, Info, Calculator } from 'lucide-react'
import { salaryData, salaryByArea, salaryTrend, seniorityColors } from '../data/salaries'
import clsx from 'clsx'

const seniorityLabels = ['junior', 'pleno', 'senior', 'especialista'] as const
const seniorityDisplay = { junior: 'Júnior', pleno: 'Pleno', senior: 'Sênior', especialista: 'Especialista' }

function fmtR(n: unknown) {
  return `R$ ${(n as number).toLocaleString('pt-BR')}`
}

function calcINSS(bruto: number) {
  if (bruto <= 1412) return bruto * 0.075
  if (bruto <= 2666.68) return 1412 * 0.075 + (bruto - 1412) * 0.09
  if (bruto <= 4000.03) return 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (bruto - 2666.68) * 0.12
  if (bruto <= 7786.02) return 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (bruto - 4000.03) * 0.14
  return 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14
}

function calcIRRF(baseIR: number) {
  if (baseIR <= 2259.20) return 0
  if (baseIR <= 2826.65) return baseIR * 0.075 - 169.44
  if (baseIR <= 3751.05) return baseIR * 0.15 - 381.44
  if (baseIR <= 4664.68) return baseIR * 0.225 - 662.77
  return baseIR * 0.275 - 896.00
}

function SalaryCalculator() {
  const [calcRole, setCalcRole] = useState(salaryData[0].role)
  const [calcLevel, setCalcLevel] = useState<typeof seniorityLabels[number]>('pleno')
  const [dependents, setDependents] = useState(0)

  const roleInfo = salaryData.find(s => s.role === calcRole) ?? salaryData[0]
  const bruto = roleInfo[calcLevel]
  const inss = calcINSS(bruto)
  const baseIR = bruto - inss - (dependents * 189.59)
  const irrf = calcIRRF(baseIR)
  const liquido = bruto - inss - irrf
  const anual = liquido * 13

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-400 mb-1.5 block">Cargo</label>
          <select
            value={calcRole}
            onChange={e => setCalcRole(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {salaryData.map(s => <option key={s.role} value={s.role}>{s.role}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-400 mb-1.5 block">Senioridade</label>
          <div className="flex gap-2 flex-wrap">
            {seniorityLabels.map(level => (
              <button
                key={level}
                onClick={() => setCalcLevel(level)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  calcLevel === level ? 'text-white shadow' : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-300'
                )}
                style={calcLevel === level ? { backgroundColor: seniorityColors[level] } : {}}
              >
                {seniorityDisplay[level]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-400 mb-1.5 block">Dependentes</label>
          <div className="flex items-center gap-3">
            <button onClick={() => setDependents(Math.max(0, dependents - 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-300 font-bold text-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-dark-500 transition-colors">−</button>
            <span className="text-lg font-bold text-gray-900 dark:text-white w-6 text-center">{dependents}</span>
            <button onClick={() => setDependents(Math.min(10, dependents + 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-300 font-bold text-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-dark-500 transition-colors">+</button>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-5 border border-gray-100 dark:border-dark-600">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Salário Bruto</span>
            <span className="font-bold text-gray-900 dark:text-white">{fmtR(bruto)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">INSS</span>
            <span className="font-semibold text-red-500">− {fmtR(Math.round(inss))}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">IRRF</span>
            <span className="font-semibold text-red-500">− {fmtR(Math.round(irrf))}</span>
          </div>
          <div className="border-t border-gray-200 dark:border-dark-600 pt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Salário Líquido</span>
            <span className="text-xl font-bold text-accent-600 dark:text-accent-400">{fmtR(Math.round(liquido))}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Estimativa Anual (13º)</span>
            <span className="font-semibold text-brand-600 dark:text-brand-400">{fmtR(Math.round(anual))}</span>
          </div>
        </div>
        <div className="mt-4 p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <p className="text-xs text-blue-600 dark:text-blue-400 flex items-start gap-1.5">
            <Info size={11} className="flex-shrink-0 mt-0.5" />
            Valores estimados com base nas faixas INSS/IRRF 2024. Não inclui benefícios, bônus ou PLR.
          </p>
        </div>
      </div>
    </div>
  )
}

export function Salary() {
  const [selectedRole, setSelectedRole] = useState(salaryData[0].role)
  const [selectedSeniority, setSelectedSeniority] = useState<typeof seniorityLabels[number]>('senior')

  const roleData = salaryData.find(s => s.role === selectedRole) ?? salaryData[0]

  const comparisonData = salaryData.map(s => ({
    role: s.role.split(' ').slice(0, 2).join(' '),
    value: s[selectedSeniority],
  })).sort((a, b) => b.value - a.value)

  const barData = seniorityLabels.map(level => ({
    level: seniorityDisplay[level],
    salario: roleData[level],
    fill: seniorityColors[level],
  }))

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Salários & Remuneração</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Comparativo de salários por cargo, senioridade e área no Brasil</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Maior Média (Sênior)', value: 'R$ 35.000', desc: 'Especialista em IA', color: 'text-accent-600 dark:text-accent-400' },
          { label: 'Crescimento Anual', value: '+20%', desc: 'Área de IA & ML', color: 'text-brand-600 dark:text-brand-400' },
          { label: 'Média Geral Mercado', value: 'R$ 15.800', desc: 'Todos os níveis', color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Diferença Jnr → Snr', value: '3,5x', desc: 'Engenheiro de Dados', color: 'text-purple-600 dark:text-purple-400' },
        ].map((c, i) => (
          <div key={i} className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">{c.label}</p>
            <p className={clsx('text-2xl font-bold', c.color)}>{c.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Selector + Bars */}
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <DollarSign size={16} className="text-brand-500" /> Salário por Cargo
          </h2>
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-400 mb-2 block">Selecionar cargo:</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {salaryData.map(s => (
                <option key={s.role} value={s.role}>{s.role}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="level" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip
                formatter={(v: unknown) => [fmtR(v), 'Salário médio']}
                contentStyle={{ background: '#1e2535', border: 'none', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#e5e7eb' }}
              />
              <Bar dataKey="salario" radius={[6, 6, 0, 0]}>
                {barData.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-1.5">
              <Info size={12} className="flex-shrink-0 mt-0.5" />
              Valores representam a <strong>mediana do mercado brasileiro</strong>. Podem variar por empresa, localização e benefícios.
            </p>
          </div>
        </div>

        {/* Comparison by Seniority */}
        <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-brand-500" /> Comparativo por Senioridade
          </h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            {seniorityLabels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedSeniority(level)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  selectedSeniority === level
                    ? 'text-white shadow'
                    : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-500'
                )}
                style={selectedSeniority === level ? { backgroundColor: seniorityColors[level] } : {}}
              >
                {seniorityDisplay[level]}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={comparisonData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} horizontal={false} />
              <XAxis type="number" tickFormatter={v => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis dataKey="role" type="category" tick={{ fontSize: 10, fill: '#9ca3af' }} width={110} />
              <Tooltip
                formatter={(v: unknown) => [fmtR(v), 'Salário médio']}
                contentStyle={{ background: '#1e2535', border: 'none', borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="value" fill={seniorityColors[selectedSeniority]} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Salary by Area */}
      <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-6">Salário Médio por Área Tecnológica</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {salaryByArea.map(area => (
            <div key={area.area} className="p-4 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">{area.area}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{fmtR(area.avg)}</p>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                <span>Min: {fmtR(area.min)}</span>
                <span>Max: {fmtR(area.max)}</span>
              </div>
              <div className="mt-2 h-1.5 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full"
                  style={{ width: `${(area.avg / 45000) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Calculator */}
      <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator size={16} className="text-accent-500" /> Calculadora Salarial
        </h2>
        <p className="text-xs text-gray-400 mb-5">Simule seu salário líquido com base no cargo e senioridade</p>
        <SalaryCalculator />
      </div>

      {/* Salary Trend */}
      <div className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Tendência Salarial — 2020 a 2026</h2>
        <p className="text-xs text-gray-400 mb-5">Evolução da remuneração média por segmento</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={salaryTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <Tooltip
              formatter={(v: unknown) => [fmtR(v), '']}
              contentStyle={{ background: '#1e2535', border: 'none', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#e5e7eb' }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
            <Line type="monotone" dataKey="ia" name="IA & ML" stroke="#4ade80" strokeWidth={2.5} dot={{ fill: '#4ade80', r: 3 }} />
            <Line type="monotone" dataKey="dados" name="Dados & BI" stroke="#818cf8" strokeWidth={2.5} dot={{ fill: '#818cf8', r: 3 }} />
            <Line type="monotone" dataKey="devops" name="DevOps" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 3 }} />
            <Line type="monotone" dataKey="dev" name="Dev" stroke="#f43f5e" strokeWidth={2.5} dot={{ fill: '#f43f5e', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
