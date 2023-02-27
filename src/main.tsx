import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyle from './style/GlobalStyle'
import Router from './Router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router />
  </React.StrictMode>
)
