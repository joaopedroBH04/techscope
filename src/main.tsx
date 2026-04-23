import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initWebVitals } from './lib/web-vitals'

// Inicializa monitoramento de Web Vitals
if (import.meta.env.PROD) {
  initWebVitals()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
