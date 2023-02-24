import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyle from './style/GlobalStyle'
import Router from './Router'
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  </React.StrictMode>
)
