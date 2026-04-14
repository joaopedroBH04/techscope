import { Link } from 'react-router-dom'
import { TrendingUp, Code2, Briefcase, Mail, Send } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { path: '/vagas', label: 'Vagas' },
  { path: '/salarios', label: 'Salários' },
  { path: '/noticias', label: 'Notícias' },
  { path: '/ferramentas', label: 'Ferramentas' },
  { path: '/trilhas', label: 'Trilhas' },
  { path: '/ia-dados', label: 'IA & Dados' },
]

const resources = [
  { href: 'https://news.google.com/search?q=inteligência+artificial+Brasil&hl=pt-BR', label: 'Notícias de IA' },
  { href: 'https://www.linkedin.com/jobs/search/?keywords=dados&location=Brazil', label: 'Vagas no LinkedIn' },
  { href: 'https://roadmap.sh/', label: 'Roadmaps de Carreira' },
  { href: 'https://survey.stackoverflow.co/', label: 'Stack Overflow Survey' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-600 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center shadow-lg">
                <TrendingUp size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Tech<span className="text-brand-500">Scope</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Portal de tecnologia e mercado de trabalho para profissionais de Dados, IA e Tech.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://github.com/joaopedroBH04" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-500 transition-colors">
                <Code2 size={16} />
              </a>
              <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-500 transition-colors">
                <Briefcase size={16} />
              </a>
              <a href="mailto:contato@techscope.com" className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-500 transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Navegação</h3>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Recursos</h3>
            <ul className="space-y-2.5">
              {resources.map(r => (
                <li key={r.label}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Newsletter</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Receba tendências e vagas semanalmente.</p>
            {subscribed ? (
              <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-lg p-3 text-sm text-accent-700 dark:text-accent-400 font-medium">
                Inscrito com sucesso!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
                <button type="submit" className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors flex-shrink-0">
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 dark:border-dark-600 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} TechScope. Dados ilustrativos para fins educacionais.</p>
          <p className="text-xs text-gray-400">
            Feito com React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
