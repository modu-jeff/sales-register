import axios from 'axios'
import { useState } from 'react'
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { State } from '.'

const ThirdForm = ({
  register,
  watch,
  setValue
}: {
  register: UseFormRegister<State>
  watch: UseFormWatch<State>
  setValue: UseFormSetValue<State>
}) => {
  const [isAuth, setIsAuth] = useState(false)
  const [verifyCode, setVerifyCode] = useState('')

  const phoneValidation = async () => {
    const host = 'https://api-dev.modudev.cloud/user'
    const endPoint = '/code/send'
    if (!watch().phone) return alert('폰번을 넣어주셈')

    try {
      setIsAuth(true)
      // const response = await axios.post(`${host}${endPoint}`, { phone: watch().phone })
      // const { data } = response
      // setValue('authCode.authCodeSeq', data.data.authCodeSeq)
      setValue('authCode.authCodeSeq', 10)
    } catch (err) {
      console.error(err)
    }
  }

  const verifyAuthCode = async () => {
    const host = 'https://api-dev.modudev.cloud/user'
    const endPoint = '/code/verify'
    const { authCodeSeq } = watch().authCode
    // TODO: 나중에 백엔드에서 에러코드를 정리하고, 그에 맞게 에러처리를 해야함
    // try {
    //   await axios.post(`${host}${endPoint}`, { authCodeSeq, code: verifyCode, phone: watch().phone })
    // } catch (err: any) {
    //   switch (err.code) {
    //     case 10204:
    //       return alert(err.message)
    //     case 10203:
    //       return alert(err.message)
    //     case 10202:
    //       return alert(err.message)
    //   }
    // }
  }

  return (
    <>
      <h3 style={{ marginTop: '3rem' }}>이름과 연락처를 알려주세요</h3>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>이름*</span>
          <input type="text" placeholder="담당자 이름" {...register('requesterName')} />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>휴대폰 번호*</span>
          <input type="tel" placeholder="숫자만 입력" {...register('phone')} />
        </label>
        <button type="button" onClick={phoneValidation}>
          인증번호요청
        </button>
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
              valueAsNumber: true
            })}
          />
          소유주
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            value={2}
            {...register('ownershipType', {
              valueAsNumber: true
            })}
          />
          임차인 또는 직원
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <div>개인정보 수집에 동의*</div>
        <label>
          <input type="radio" value="true" {...register('isPrivacyAgreed')} />
          동의
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input type="radio" value="false" {...register('isPrivacyAgreed')} />
          비동의
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>추천코드(선택)</span>
          <input type="text" placeholder="추천코드 입력" {...register('promotionCode')} />
        </label>
      </div>
    </>
  )
}

export default ThirdForm
