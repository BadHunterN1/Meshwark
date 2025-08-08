import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PathProvider } from './context/PathContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PathProvider>
      <App />
    </PathProvider>
  </StrictMode>
)
