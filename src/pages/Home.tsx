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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#f2f2f2',
          width: '300px',
          height: '150px'
        }}
        onClick={() => {
          navigate('/register/service')
        }}
      >
        <p style={{ textAlign: 'center', wordBreak: 'keep-all' }}>
          주차장을 유료로 운영중입니다.
          <br /> 모두의주차장에 모바일 주차권을 판매하고 싶습니다.(제휴)
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#f2f2f2',
          width: '300px',
          height: '150px',
          textAlign: 'center'
        }}
        onClick={() => {
          navigate('/register/service')
        }}
      >
        <p style={{ textAlign: 'center', wordBreak: 'keep-all' }}>주차장 위탁운영을 맡기고 싶습니다.(위탁운영)</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#f2f2f2',
          width: '300px',
          height: '150px',
          textAlign: 'center'
        }}
        onClick={() => {
          navigate('/register/service')
        }}
      >
        비워두는 주차공간으로 수익을 내고 싶습니다.(공유)
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#f2f2f2',
          width: '300px',
          height: '30px',
          textAlign: 'center'
        }}
        onClick={() => {
          navigate('/register/service')
        }}
      >
        <p style={{ textAlign: 'center', wordBreak: 'keep-all' }}>거주자우선주차장을 공유하고 싶으신가요?(거주자)</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#f2f2f2',
          width: '300px',
          height: '30px',
          textAlign: 'center'
        }}
        onClick={() => {
          navigate('/register/service')
        }}
      >
        <p style={{ textAlign: 'center', wordBreak: 'keep-all' }}>
          2개소 이상의 주차장을 소유하고 있으신가요?(팝업창띄우기)
        </p>
      </div>
    </div>
  )
}

export default Home
