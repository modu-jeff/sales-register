import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AllianceForm from './pages/AllianceForm'
import ConsignmentForm from './pages/ConsignmentForm'
import ShareForm from './pages/ShareForm'
import Home from './pages/Home'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/request" />} />
        <Route path="/request" element={<Home />} />
        <Route path="/register/alliance" element={<AllianceForm />} />
        <Route path="/register/consignment" element={<ConsignmentForm />} />
        <Route path="/register/share" element={<ShareForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
