import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'
import { ReactGpt } from './ReactGpt'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactGpt />
  </React.StrictMode>,
)
