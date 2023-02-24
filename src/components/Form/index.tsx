import styled from 'styled-components'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import FirstForm from './FirstForm'
import SecondForm from './SecondForm'
import ThirdForm from './ThirdForm'

export interface FormValues {
  parkingLot: string
  incomingModel: string[]
  allDayParking: boolean
  fieldManager: boolean
  crossingGate: boolean
  visitor: boolean
  description: string
  parkingLotImage: File
  parkingLotType: string
  parkingLotName: string
  userName: string
  phoneNumber: string
  relationship: string
  recommendCode: string
  approvalCollectingInfo: boolean
  address: string
}

// TODO: 각 value들을 담을 때 무조건 string으로 담기는걸 다른 타입으로 바꿔서 담을 수 있는지 확인 필요
// number는 확인 완료, boolean 등등

const FormContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleSubmit, register, setValue, watch } = useForm<FormValues>()

  const currentLocation = location.pathname.split('/').pop()

  const onCancel = () => {
    navigate('/request')
  }

  const prevPage = () => {
    navigate(-1)
  }

  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <RegisterSection>
      <ProgressStatusBox>
        <ProgressStatusBar currentLocation={currentLocation} path="service">
          희망서비스 선택
        </ProgressStatusBar>
        <ProgressStatusBar currentLocation={currentLocation} path="parking-lot-info">
          주차공간 정보 입력
        </ProgressStatusBar>
        <ProgressStatusBar currentLocation={currentLocation} path="user-info">
          신청자 정보 입력
        </ProgressStatusBar>
      </ProgressStatusBox>
      <FormTemplate onSubmit={handleSubmit(onSubmit)}>
        <Routes>
          <Route path="/service" element={<FirstForm register={register} />} />
          <Route
            path="/parking-lot-info"
            element={<SecondForm register={register} setValue={setValue} watch={watch} />}
          />
          <Route path="/user-info" element={<ThirdForm register={register} watch={watch} />} />
        </Routes>
        {currentLocation === 'user-info' && (
          <ButtonWrapper>
            <CancelButton type="button" onClick={onCancel}>
              취소
            </CancelButton>
            <CancelButton type="button" onClick={prevPage}>
              이전
            </CancelButton>
            <NextButton>신청하기</NextButton>
          </ButtonWrapper>
        )}
      </FormTemplate>
    </RegisterSection>
  )
}

export default FormContainer

const RegisterSection = styled.section`
  width: 70%;
  margin: 2rem auto;
`

const FormTemplate = styled.form``

const ButtonWrapper = styled.div``

const CancelButton = styled.button``

const NextButton = styled.button``

const ProgressStatusBox = styled.div`
  display: flex;
`

const ProgressStatusBar = styled.div<{
  path: string
  currentLocation?: string
}>`
  width: 300px;
  height: 50px;
  border: 1px solid black;
  background-color: ${({ path, currentLocation }) => (path === currentLocation ? '#DAEFFE' : 'none')};
  text-align: center;
`
