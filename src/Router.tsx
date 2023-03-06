import React, { useState } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AllianceForm from '@/pages/AllianceForm'
import ConsignmentForm from '@/pages/ConsignmentForm'
import ShareForm from '@/pages/ShareForm'
import Home from '@/pages/Home'

function Router() {
  const [progress, setProgress] = useState(20)

  return (
    <>
      <ProgressBarContainer>
        <EmptyProgressBar />
        <ProgressBar style={{ width: `${progress}%` }} />
      </ProgressBarContainer>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/request" />} />
          <Route path="/request" element={<Home />} />
          <Route path="/register/alliance" element={<AllianceForm setProgress={setProgress} />} />
          <Route path="/register/consignment" element={<ConsignmentForm setProgress={setProgress} />} />
          <Route path="/register/share" element={<ShareForm setProgress={setProgress} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router

const ProgressBarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: -1rem -1rem 0 -1rem;
`

const EmptyProgressBar = styled.span`
  position: absolute;
  width: 100%;
  height: 12px;
  background-color: #f2f2f2;
`

const ProgressBar = styled.span`
  position: relative;
  z-index: 10;
  height: 12px;
  background-color: #0099fe;
  transition: width 0.3s ease-in-out;
`
