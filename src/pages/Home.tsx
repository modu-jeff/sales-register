import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [formType, setFormType] = useState('')

  const handleFormType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormType(e.target.value)
  }

  const moveToNextPage = () => {
    if (!formType) {
      return alert('신청유형을 선택해주세요')
    } else {
      navigate(formType)
    }
  }

  return (
    <>
      <h3 style={{ fontSize: '22px' }}>신청유형을 선택해주세요</h3>
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
            display: 'grid',
            // rowGap: '1rem',
            gridTemplateColumns: '1fr 5fr',
            alignItems: 'center',
            width: '100%',
            height: '200px'
          }}
        >
          <input
            style={{
              width: '20px',
              height: '20px'
            }}
            id="alliance"
            type="radio"
            value="/register/alliance"
            name="form-type"
            onChange={handleFormType}
          />
          <label htmlFor="alliance" style={{ fontSize: '18px' }}>
            주차장을 유료로 운영중입니다.
            <br />
            앱에 주차권을 판매하고 싶습니다.
          </label>
          <input
            style={{
              width: '20px',
              height: '20px'
            }}
            id="consignment"
            type="radio"
            value="/register/consignment"
            name="form-type"
            onChange={handleFormType}
          />
          <label htmlFor="consignment" style={{ fontSize: '18px' }}>
            주차장 위탁운영을 맡기고 싶습니다.
          </label>
          <input
            style={{
              width: '20px',
              height: '20px'
            }}
            id="share"
            type="radio"
            value="/register/share"
            name="form-type"
            onChange={handleFormType}
          />
          <label htmlFor="share" style={{ fontSize: '18px' }}>
            비워두는 주차공간을 활용하여
            <br /> 수익을 내고 싶습니다.
          </label>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1rem',
            backgroundColor: '#f2f2f2',
            width: '100%',
            height: '55px',
            borderRadius: '4px',
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={() => {
            alert('팝업 들어가유\n전화번호 안내도 들어가유 라는 메시지 표출')
          }}
        >
          <p style={{ textAlign: 'center', wordBreak: 'keep-all' }}>2개소 이상 제휴신청을 원하시나요?</p>
        </div>

        <button
          style={{
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#0099FE',
            width: '100%',
            height: '40px',
            cursor: 'pointer'
          }}
          onClick={moveToNextPage}
        >
          다음
        </button>

        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#f2f2f2',
            width: '300px',
            height: '150px',
            cursor: 'pointer'
          }}
          onClick={() => {
            navigate('/register/alliance')
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
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={() => {
            navigate('/register/consignment')
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
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={() => {
            navigate('/register/share')
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
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={() => {
            alert('앱으로 이동 아니면\n앱다운해서 앱에서 진행해주쇼 라는 메시지 표출')
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
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={() => {
            alert('팝업 들어가유\n전화번호 안내도 들어가유 라는 메시지 표출')
          }}
        >
          <p style={{ textAlign: 'center', wordBreak: 'keep-all' }}>
            2개소 이상의 주차장을 소유하고 있으신가요?(팝업창띄우기)
          </p>
        </div> */}
      </div>
    </>
  )
}

export default Home
