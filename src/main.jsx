import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Mainframe from "./components/Mainframe.jsx"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Mainframe>
    </Mainframe>
  </StrictMode>,
)
