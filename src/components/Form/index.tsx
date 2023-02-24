import styled from 'styled-components'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { FieldErrors, useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import FirstForm from './FirstForm'
import SecondForm from './SecondForm'
import ThirdForm from './ThirdForm'

export interface State {
  latitude: number // 위도: 소수점 네자리까지 ex) 37.532600
  longitude: number // 경도: 소수점 여섯자리까지 ex) 127.024612
  parkinglotName: string // 주차장명 ex) 예시주차장
  roadViewPan: number // 로드뷰 좌우각도 0 ~ 360 ex) 30
  roadViewTilt: number // 로드뷰 상하각도  -85 ~ 85 ex) 45
  roadViewZoom: number // 로드뷰 확대축소 -3 ~ 3 ex) 17
  regionCode: string // 지역 코드 ex) 11414
  requesterName: string // 신청인이름 ex) 홍길동
  phone: string // 전화번호 ex) 010-1234-5678
  email: string // 이메일 ex) example@example.com
  partnerType: number // 파트너타입? 1: 공유 / 2: 제휴 / 3: 위탁 ex) 1
  ownershipType: number // 소유형태? 1: 임차인 / 2: 임대인 ex) 1
  buildingType: number // 빌딩유형? ex) 2
  address: string // 주소(도로명) ex) 서울특별시 강남구 강남대로 1234
  numberOfParkinglot: number // 주차면수 ex) 100
  numberOfPlace: number // 얜 뭐지? ex) 200
  parkingTypes: {
    // 어떻게 수익올릴래?
    isHourly: boolean // 시간권 판매 ex) true
    isMonthly: boolean // 월주차권 판매 ex) false
  }
  isOperates24Hours: boolean // 24시간 운영여부 ex) true
  parkinglotOptions: {
    // 주차장 옵션
    isExternalRestricted: boolean // 외부인 출입가능 ex) false
    isSiteManager: boolean // 현장관리자 여부 ex) false
    isBarriers: boolean // 차단기 여부 ex) false
  }
  description: string // 부가설명 ex) 응애 나 애기주차장
  parkingLotImage: File // 임시
  promotionCode: string // 임시
}

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
  roadAddress: string
  jibunAddress: string
  detailAddress: string
}

// TODO: 각 value들을 담을 때 무조건 string으로 담기는걸 다른 타입으로 바꿔서 담을 수 있는지 확인 필요
// number는 확인 완료, boolean 등등

const FormContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleSubmit, register, setValue, watch } = useForm<State>()

  const currentLocation = location.pathname.split('/').pop()

  const onCancel = () => {
    navigate('/request')
  }

  const prevPage = () => {
    navigate('/register/parking-lot-info')
  }

  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  const onError = (data: FieldErrors) => {
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
      <FormTemplate onSubmit={handleSubmit(onSubmit, onError)}>
        <Routes>
          <Route path="/service" element={<FirstForm setValue={setValue} register={register} />} />
          <Route
            path="/parking-lot-info"
            element={<SecondForm register={register} setValue={setValue} watch={watch} />}
          />
          <Route path="/user-info" element={<ThirdForm setValue={setValue} register={register} watch={watch} />} />
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
