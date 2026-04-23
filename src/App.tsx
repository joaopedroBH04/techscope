import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { BackToTop } from './components/layout/BackToTop'
import { usePageTitle } from './hooks/usePageTitle'
import { lazy, Suspense, type ReactNode } from 'react'

// Lazy loaded pages for performance optimization
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Jobs = lazy(() => import('./pages/Jobs'))
const Salary = lazy(() => import('./pages/Salary'))
const News = lazy(() => import('./pages/News'))
const Tools = lazy(() => import('./pages/Tools'))
const CareerPaths = lazy(() => import('./pages/CareerPaths'))
const AIData = lazy(() => import('./pages/AIData'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback component
function PageLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
    </div>
  )
}

// Wrapper component for lazy routes with consistent loading state
function LazyRoute({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      {children}
    </Suspense>
  )
}

function AppContent() {
  usePageTitle()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Routes>
          <Route path="/" element={<LazyRoute><Dashboard /></LazyRoute>} />
          <Route path="/vagas" element={<LazyRoute><Jobs /></LazyRoute>} />
          <Route path="/salarios" element={<LazyRoute><Salary /></LazyRoute>} />
          <Route path="/noticias" element={<LazyRoute><News /></LazyRoute>} />
          <Route path="/ferramentas" element={<LazyRoute><Tools /></LazyRoute>} />
          <Route path="/trilhas" element={<LazyRoute><CareerPaths /></LazyRoute>} />
          <Route path="/ia-dados" element={<LazyRoute><AIData /></LazyRoute>} />
          <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
          <AppContent />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
