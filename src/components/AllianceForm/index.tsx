import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import FirstForm from './FirstForm'
import SecondForm from './SecondForm'
import ThirdForm from './ThirdForm'

import type { FieldErrors, FieldValues } from 'react-hook-form'

export interface IAllianceForm {
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
  authCode: {
    // 유저 인증코드
    authCodeSeq: number // 인증코드 시퀀스 ex) 1
  }
  description: string // 부가설명 ex) 응애 나 애기주차장
  isPrivacyAgreed: boolean // 개인정보 수집동의 ex) true
  parkingLotImage: FormData // 임시
  promotionCode: string // 추천코드 ex) 1234
}

const AllianceFormContainer = () => {
  const navigate = useNavigate()

  const [formStep, setFormStep] = useState(1)
  const { handleSubmit, register, setValue, watch, formState } = useForm<IAllianceForm>()
  const { errors } = formState

  const onCancel = () => {
    navigate('/request')
  }

  const prevPage = () => {
    switch (formStep) {
      case 3:
        return setFormStep(2)
      case 2:
        return setFormStep(1)
    }
  }

  const onSubmit = (data: FieldValues) => {
    // data 타입은 IAllianceForm임
    const { parkingLotImage, ...rest } = data

    // POST 요청시 formattedData를 body에 담아서 보낼 것
    const formattedData = {
      ...rest,
      parkingTypes: {
        isHourly: data.parkingTypes.isHourly === 'hourly',
        isMonthly: data.parkingTypes.isMonthly === 'monthly'
      },
      isOperates24Hours: data.isOperates24Hours === 'true',
      parkinglotOptions: {
        isExternalRestricted: data.parkinglotOptions.isExternalRestricted === 'true',
        isSiteManager: data.parkinglotOptions.isSiteManager === 'true',
        isBarriers: data.parkinglotOptions.isBarriers === 'true'
      },
      isPrivacyAgreed: data.isPrivacyAgreed === 'true',
      buildingType: Number(data.buildingType),
      ownershipType: Number(data.ownershipType)
    }

    switch (formStep) {
      case 1:
        return setFormStep(2)
      case 2:
        return setFormStep(3)
      case 3:
        return console.log(formattedData)
    }

    // parkingLotImage는 FormData로 따로 api요청해서 보내야 함
  }

  const onError = (data: FieldErrors) => {
    console.log(data)
  }

  return (
    <RegisterSection>
      <ProgressStatusBox>
        <ProgressStatusBar formStep={formStep} step={1}>
          희망서비스 선택
        </ProgressStatusBar>
        <ProgressStatusBar formStep={formStep} step={2}>
          주차공간 정보 입력
        </ProgressStatusBar>
        <ProgressStatusBar formStep={formStep} step={3}>
          신청자 정보 입력
        </ProgressStatusBar>
      </ProgressStatusBox>
      <FormTemplate onSubmit={handleSubmit(onSubmit, onError)}>
        {formStep === 1 && <FirstForm errors={errors} register={register} />}
        {formStep === 2 && <SecondForm register={register} errors={errors} setValue={setValue} watch={watch} />}
        {formStep === 3 && <ThirdForm setValue={setValue} errors={errors} register={register} watch={watch} />}
        <ButtonWrapper>
          <CancelButton formStep={formStep} type="button" onClick={onCancel}>
            취소
          </CancelButton>
          <PrevButton formStep={formStep} type="button" onClick={prevPage}>
            이전
          </PrevButton>
          <NextButton>{formStep === 3 ? '신청하기' : '다음'}</NextButton>
        </ButtonWrapper>
      </FormTemplate>
    </RegisterSection>
  )
}

export default AllianceFormContainer

const RegisterSection = styled.section`
  width: 100%;
  margin: 1rem auto 2rem auto;
`

const FormTemplate = styled.form``

const ButtonWrapper = styled.div``

const CancelButton = styled.button<{ formStep: number }>`
  display: ${({ formStep }) => (formStep === 1 ? 'inline-block' : 'none')};
`

const PrevButton = styled.button<{ formStep: number }>`
  display: ${({ formStep }) => (formStep === 1 ? 'none' : 'inline-block')};
`

const NextButton = styled.button``

const ProgressStatusBox = styled.div`
  display: flex;
`

const ProgressStatusBar = styled.div<{
  formStep: number
  step: number
}>`
  width: 300px;
  height: 50px;
  border: 1px solid black;
  background-color: ${({ step, formStep }) => (step === formStep ? '#DAEFFE' : 'none')};
  text-align: center;
`
