import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { State } from '.'

const FirstForm = ({ register, setValue }: { register: UseFormRegister<State>; setValue: UseFormSetValue<State> }) => {
  const navigate = useNavigate()

  const onCancel = () => {
    navigate('/request')
  }

  const nextPage = () => {
    navigate('/register/parking-lot-info')
  }

  return (
    <>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <h3>주차 면 수를 입력해주세요</h3>
          <input
            type="number"
            {...register('numberOfParkinglot', {
              valueAsNumber: true
            })}
          />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>어떻게 수익을 올리고 싶으신가요?</h3>
        <label>
          <input type="checkbox" value="monthly" {...register('parkingTypes.isMonthly')} />
          월주차권 판매
        </label>
        <label>
          <input type="checkbox" value="hour" {...register('parkingTypes.isHourly')} />
          시간권 판매
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>24시간 입출차가 가능한 곳인가요?</h3>
        <label>
          <input type="radio" value="true" {...register('isOperates24Hours')} />
          24시간 가능합니다.
        </label>
        <label>
          <input type="radio" value="false" {...register('isOperates24Hours')} />
          아니오
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>현장관리자가 있나요?(유인으로 운영)</h3>
        <label>
          <input type="radio" value="true" {...register('parkinglotOptions.isSiteManager')} />
          현장관리자 있음
        </label>
        <label>
          <input type="radio" value="false" {...register('parkinglotOptions.isSiteManager')} />
          아니오
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>번호인식 차단기가 있나요?</h3>
        <label>
          <input type="radio" value="true" {...register('parkinglotOptions.isBarriers')} />
          차단기 있음
        </label>
        <label>
          <input type="radio" value="false" {...register('parkinglotOptions.isBarriers')} />
          아니오
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>외부인 출입이 가능한 주차장인가요?</h3>
        <label>
          <input type="radio" value="true" {...register('parkinglotOptions.isExternalRestricted')} />
          외부인출입 가능
        </label>
        <label>
          <input type="radio" value="false" {...register('parkinglotOptions.isExternalRestricted')} />
          아니오
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>부가 설명</h3>
        <textarea cols={50} rows={5} style={{ resize: 'none' }} {...register('description')} />
      </div>
      <ButtonWrapper>
        <CancelButton type="button" onClick={onCancel}>
          취소
        </CancelButton>
        <NextButton onClick={nextPage}>다음</NextButton>
      </ButtonWrapper>
    </>
  )
}

export default FirstForm

const ButtonWrapper = styled.div``

const CancelButton = styled.button``

const NextButton = styled.button``
