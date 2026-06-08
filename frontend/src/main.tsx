import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { routes} from './Components/Routing/DynamicRoutes'
import { ThemeProvider } from './Components/StateManagement/UseStateThemeToggler.tsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider>
       {/* <RouterProvider router={routes} /> */}
       <App />
      </ThemeProvider>
  </React.StrictMode>,
)
