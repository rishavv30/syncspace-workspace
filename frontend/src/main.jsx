import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import App from './App'
import './index.css'

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>

    <BrowserRouter>

      <App />

      {/* Toast System */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 24,
          right: 24,
        }}
        toastOptions={{

          duration: 3500,

          style: {
            background:
              'rgba(15, 23, 42, 0.92)',

            color: '#f8fafc',

            border:
              '1px solid rgba(255,255,255,0.08)',

            backdropFilter: 'blur(18px)',

            WebkitBackdropFilter:
              'blur(18px)',

            borderRadius: '18px',

            padding: '14px 16px',

            fontFamily:
              'Inter, DM Sans, sans-serif',

            fontSize: '14px',

            fontWeight: '500',

            boxShadow:
              '0 10px 40px rgba(0,0,0,0.35)',

            letterSpacing: '0.01em',
          },

          success: {
            iconTheme: {
              primary: '#22d3ee',
              secondary: '#ffffff',
            },

            style: {
              border:
                '1px solid rgba(34,211,238,0.25)',
            },
          },

          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#ffffff',
            },

            style: {
              border:
                '1px solid rgba(248,113,113,0.25)',
            },
          },

          loading: {
            iconTheme: {
              primary: '#38bdf8',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)