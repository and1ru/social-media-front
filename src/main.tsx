import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// if there is an error and you wanna try it again dont reset values
// if you can create the user most reset values
// button delete post must chage when user chage the language also must be to the end