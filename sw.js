// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register/react' // <-- Vite PWA virtual module

// 1. Register SW + Get update handler
const { needRefresh, updateSW } = registerSW({
  onNeedRefresh() {
    // User sees toast: "New version available"
    if (confirm('New version available. Reload to update?')) {
      updateSW(true) // true = reload after update
    }
  },
  onOfflineReady() {
    console.log('App ready for offline use.')
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* 2. Toast Component (renders only when needRefresh=true) */}
    {needRefresh && (
      <div style={{
        position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999,
        background: '#1e293b', color: 'white', padding: '1rem 1.5rem',
        borderRadius: '0.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem'
      }}>
        <span>New version ready.</span>
        <button onClick={() => updateSW(true)} style={{
          background: '#4A5446', color: 'white', border: 'none',
          padding: '0.4rem 1rem', borderRadius: '0.3rem', cursor: 'pointer'
        }}>Refresh</button>
        <button onClick={() => needRefresh(false)} style={{
          background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer'
        }}>Later</button>
      </div>
    )}
  </React.StrictMode>
)
