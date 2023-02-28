import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem'
      }}
    >
      <div
        style={{
          marginBottom: '1rem',
          border: '1px solid black',
          width: '300px',
          height: '150px',
          textAlign: 'center',
          whiteSpace: 'normal',
          wordBreak: 'keep-all'
        }}
        onClick={() => {
          navigate('/register/service')
        }}
      >
        주차장을 유료로 운영중입니다. 모두의주차장에 모바일 주차권을 판매하고 싶습니다.
      </div>
      <div
        style={{
          marginBottom: '1rem',
          border: '1px solid black',
          width: '300px',
          height: '150px',
          textAlign: 'center'
        }}
        onClick={() => {
          navigate('/register/service')
        }}
      >
        2
      </div>
      <div
        style={{
          marginBottom: '1rem',
          border: '1px solid black',
          width: '300px',
          height: '150px',
          textAlign: 'center'
        }}
        onClick={() => {
          navigate('/register/service')
        }}
      >
        3
      </div>
      <div
        style={{
          marginBottom: '1rem',
          border: '1px solid black',
          width: '300px',
          height: '150px',
          textAlign: 'center'
        }}
        onClick={() => {
          navigate('/register/service')
        }}
      >
        4
      </div>
    </div>
  )
}

export default Home
