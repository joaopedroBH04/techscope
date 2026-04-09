import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Dashboard } from './pages/Dashboard'
import { Jobs } from './pages/Jobs'
import { Salary } from './pages/Salary'
import { News } from './pages/News'
import { Tools } from './pages/Tools'
import { CareerPaths } from './pages/CareerPaths'
import { AIData } from './pages/AIData'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vagas" element={<Jobs />} />
            <Route path="/salarios" element={<Salary />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/ferramentas" element={<Tools />} />
            <Route path="/trilhas" element={<CareerPaths />} />
            <Route path="/ia-dados" element={<AIData />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
