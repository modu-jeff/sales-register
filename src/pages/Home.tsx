import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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
      <HeaderTitle>신청유형을 선택해주세요</HeaderTitle>

      <RequestTemplate>
        <RequestRadio
          id="alliance"
          type="radio"
          value="/register/alliance"
          name="form-type"
          onChange={handleFormType}
        />
        <RequestLabel formType={formType} to="/register/alliance" htmlFor="alliance">
          주차장을 유료로 운영중입니다.
          <br />
          앱에 주차권을 판매하고 싶습니다.
        </RequestLabel>
        <RequestRadio
          id="consignment"
          type="radio"
          value="/register/consignment"
          name="form-type"
          onChange={handleFormType}
        />
        <RequestLabel formType={formType} to="/register/consignment" htmlFor="consignment">
          주차장 위탁운영을 맡기고 싶습니다.
        </RequestLabel>
        <RequestRadio id="share" type="radio" value="/register/share" name="form-type" onChange={handleFormType} />
        <RequestLabel formType={formType} to="/register/share" htmlFor="share">
          비워두는 주차공간을 활용하여
          <br /> 수익을 내고 싶습니다.
        </RequestLabel>
      </RequestTemplate>

      <MultipleAllianceRequestBox
        onClick={() => {
          alert('팝업 들어가유\n전화번호 안내도 들어가유 라는 메시지 표출')
        }}
      >
        2개소 이상 제휴신청을 원하시나요?
      </MultipleAllianceRequestBox>

      <ProgressButton type="button" onClick={moveToNextPage}>
        다음
      </ProgressButton>
    </>
  )
}

export default Home

const HeaderTitle = styled.h3`
  font-size: 22px;
`

const RequestTemplate = styled.div`
  display: grid;
  row-gap: 1rem;
  margin: 2rem auto;
  grid-template-columns: 1fr 5fr;
  align-items: center;
  width: 100%;
  height: 200px;
`

const RequestLabel = styled.label<{ formType: string; to: string }>`
  font-size: 18px;
  color: ${({ formType, to }) => (formType === to ? '#0099fe' : '#000')};
`

const RequestRadio = styled.input`
  width: 20px;
  height: 20px;
`

const MultipleAllianceRequestBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #f2f2f2;
  width: 100%;
  height: 60px;
  border-radius: 4px;
  cursor: pointer;
`

const ProgressButton = styled.button`
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  background-color: #0099fe;
  width: 100%;
  height: 50px;
  cursor: pointer;
`
