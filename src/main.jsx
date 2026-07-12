import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import './assets/css/index.css'

// Get the root element with error handling
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element with id "root" not found in index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)