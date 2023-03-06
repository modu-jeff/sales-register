import axios from 'axios'
import React, { useState, useEffect } from 'react'

import type { IAllianceForm } from '@/components/AllianceForm'

import type { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form'

const FourthForm = ({
  register,
  watch,
  setValue,
  errors,
  setProgress
}: {
  register: UseFormRegister<IAllianceForm>
  watch: UseFormWatch<IAllianceForm>
  setValue: UseFormSetValue<IAllianceForm>
  errors: FieldErrors<IAllianceForm>
  setProgress: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [isAuth, setIsAuth] = useState(false)
  const [verifyCode, setVerifyCode] = useState('')

  const phoneValidation = async () => {
    const host = `${import.meta.env.VITE_API_HOST}/user`
    const endPoint = '/code/send'
    if (!watch().phone) return alert('폰번을 넣어주셈')

    try {
      const response = await axios.post(`${host}${endPoint}`, { phone: watch().phone })
      const { data } = response
      setIsAuth(true)
      setValue('authCode.authCodeSeq', data.data.authCodeSeq)
    } catch (err: any) {
      switch (err.code) {
        case 10000:
          return alert(err.message)
        case 10201:
          return alert(err.message)
        case 10200:
          return alert(err.message)
      }
    }
  }

  const verifyAuthCode = async () => {
    const host = `${import.meta.env.VITE_API_HOST}/user`
    const endPoint = '/code/verify'
    const { authCodeSeq } = watch().authCode

    try {
      await axios.post(`${host}${endPoint}`, { authCodeSeq, code: verifyCode, phone: watch().phone })
      alert('인증되었습니다.')
    } catch (err: any) {
      switch (err.code) {
        case 10204:
          return alert(err.message)
        case 10203:
          return alert(err.message)
        case 10202:
          return alert(err.message)
      }
    }
  }

  useEffect(() => {
    setProgress(100)
  }, [])

  return (
    <>
      <h3 style={{ marginTop: '3rem' }}>이름과 연락처를 알려주세요</h3>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>이름*</span>
          <input
            type="text"
            placeholder="담당자 이름"
            {...register('requesterName', {
              required: '이름을 입력해주세요'
            })}
          />
        </label>
        {errors.requesterName && <div style={{ color: 'red', fontSize: '12px' }}>{errors.requesterName.message}</div>}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>휴대폰 번호*</span>
          <input
            type="tel"
            maxLength={11}
            placeholder="숫자만 입력"
            {...register('phone', {
              required: '휴대폰 번호를 입력해주세요'
            })}
          />
        </label>
        <button type="button" onClick={phoneValidation}>
          인증번호요청
        </button>
        {errors.phone && <div style={{ color: 'red', fontSize: '12px' }}>{errors.phone.message}</div>}
        {isAuth && (
          <div>
            <input
              type="text"
              placeholder="인증 번호 입력"
              onChange={(e) => {
                setVerifyCode(e.target.value)
              }}
            />
            <button type="button" onClick={verifyAuthCode}>
              인증하기
            </button>
          </div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <div>소유관계*</div>
        <label>
          <input
            type="radio"
            value={1}
            {...register('ownershipType', {
              required: '소유관계를 선택해주세요'
            })}
          />
          소유주
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            value={2}
            {...register('ownershipType', {
              required: '소유관계를 선택해주세요'
            })}
          />
          임차인 또는 직원
        </label>
        {errors.ownershipType && <div style={{ color: 'red', fontSize: '12px' }}>{errors.ownershipType.message}</div>}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <div>개인정보 수집에 동의*</div>
        <label>
          <input
            type="radio"
            value="true"
            {...register('isPrivacyAgreed', {
              required: '개인정보 수집에 동의해주세요',
              validate: (value) => value === 'true' || '개인정보 수집에 비동의하시면 서비스 이용이 불가합니다.'
            })}
          />
          동의
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            value="false"
            onClick={() => alert('개인정보 수집에 비동의하시면 서비스 이용이 불가합니다.')}
            {...register('isPrivacyAgreed', {
              required: '개인정보 수집에 동의해주세요',
              validate: (value) => value === 'true' || '개인정보 수집에 비동의하시면 서비스 이용이 불가합니다.'
            })}
          />
          비동의
        </label>
        {errors.isPrivacyAgreed && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.isPrivacyAgreed.message}</div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>추천코드(선택)</span>
          <input type="text" placeholder="추천코드 입력" {...register('promotionCode')} />
        </label>
      </div>
      <div style={{ width: '98%', margin: '2rem 0' }}>
        <h3>부가 설명(선택입력)</h3>
        <textarea style={{ width: '100%', height: '90px', resize: 'none' }} {...register('description')} />
      </div>
    </>
  )
}

export default FourthForm
