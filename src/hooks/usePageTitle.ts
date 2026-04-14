import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const titles: Record<string, string> = {
  '/': 'Dashboard | TechScope',
  '/vagas': 'Vagas de Tecnologia | TechScope',
  '/salarios': 'Salários & Remuneração | TechScope',
  '/noticias': 'Notícias & Tendências | TechScope',
  '/ferramentas': 'Ferramentas & Tecnologias | TechScope',
  '/trilhas': 'Trilhas de Carreira | TechScope',
  '/ia-dados': 'IA & Dados | TechScope',
}

export function usePageTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = titles[pathname] ?? 'TechScope | Dados, IA & Mercado Tech'
  }, [pathname])
}
