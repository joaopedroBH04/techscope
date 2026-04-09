import { useState } from 'react'
import { Search, Clock, ExternalLink, Tag } from 'lucide-react'
import { news } from '../data/news'
import { Badge } from '../components/ui/Badge'
import clsx from 'clsx'

const categories = ['Todas', 'Inteligência Artificial', 'Engenharia de Dados', 'Mercado de Trabalho', 'Cloud & IA', 'Desenvolvimento']

const categoryColors: Record<string, 'purple' | 'info' | 'success' | 'warning' | 'default'> = {
  'Inteligência Artificial': 'purple',
  'Engenharia de Dados': 'info',
  'Mercado de Trabalho': 'success',
  'Cloud & IA': 'warning',
  'Desenvolvimento': 'default',
  'Mercado': 'success',
}

export function News() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  const filtered = news.filter(n => {
    const matchesSearch = !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.summary.toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = selectedCategory === 'Todas' || n.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notícias & Tendências</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Acompanhe as últimas novidades do universo tech</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar notícias, ferramentas, tecnologias..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
              selectedCategory === cat
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">Nenhuma notícia encontrada</p>
        </div>
      ) : (
        <>
          {/* Featured Article */}
          {featured && (
            <div className="bg-gradient-to-br from-brand-600 to-dark-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="success">Destaque</Badge>
                  <span className="text-brand-200 text-sm">{featured.category}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold leading-tight mb-3">{featured.title}</h2>
                <p className="text-brand-200 text-sm md:text-base leading-relaxed mb-4">{featured.summary}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-brand-300">
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {featured.readTime} min</span>
                  <span>{featured.source}</span>
                  <span>{featured.publishedAt}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {featured.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-dark-700 rounded-xl border border-gray-100 dark:border-dark-600 p-5 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={categoryColors[item.category] ?? 'default'}>{item.category}</Badge>
                  <span className="text-xs text-gray-400">{item.readTime} min</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-2 line-clamp-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-3">
                  {item.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="flex items-center gap-0.5 text-xs text-gray-400 dark:text-gray-500">
                      <Tag size={9} />#{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-600">
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{item.source}</p>
                    <p className="text-xs text-gray-400">{item.publishedAt}</p>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-brand-500 font-medium hover:text-brand-600">
                    Ler <ExternalLink size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
