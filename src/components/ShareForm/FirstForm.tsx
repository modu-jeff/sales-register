import React, { useEffect } from 'react'
import styled from 'styled-components'

import type { IShareForm } from '.'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

const FirstForm = ({
  errors,
  register,
  setProgress
}: {
  errors: FieldErrors<IShareForm>
  register: UseFormRegister<IShareForm>
  setProgress: React.Dispatch<React.SetStateAction<number>>
}) => {
  useEffect(() => {
    setProgress(40)
  }, [])

  return (
    <>
      <HeaderTitle>해당사항을 선택해주세요</HeaderTitle>
      <div style={{ margin: '2rem 0' }}>
        <SelectTitle>어떻게 수익을 올리고 싶으신가요?*</SelectTitle>
        <label>
          <input type="checkbox" value="hourly" {...register('parkingTypes.isHourly')} />
          시간당 요금
        </label>
        <br />
        <label>
          <input type="checkbox" value="monthly" {...register('parkingTypes.isMonthly')} />
          월주차 (일정하게 비워두는 시간이 있는경우 가능)
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <SelectTitle>외부인 출입이 가능한 주차장인가요?*</SelectTitle>
        <label>
          <input
            type="radio"
            value="true"
            {...register('parkinglotOptions.isExternalRestricted', {
              required: '외부인 출입 가능여부를 선택해주세요',
              validate: (value) => value === 'true' || '외부인 출입이 불가능한 주차장은 신청대상이 아닙니다.'
            })}
          />
          외부인출입 가능
        </label>
        <label>
          <input
            type="radio"
            value="false"
            onClick={() => alert('외부인 출입이 불가능한 주차장은 신청대상이 아닙니다.')}
            {...register('parkinglotOptions.isExternalRestricted', {
              required: '외부인 출입 가능여부를 선택해주세요',
              validate: (value) => value === 'true' || '외부인 출입이 불가능한 주차장은 신청대상이 아닙니다.'
            })}
          />
          아니오
        </label>
        {errors.parkinglotOptions?.isExternalRestricted && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.parkinglotOptions?.isExternalRestricted.message}</div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <SelectTitle>이중주차면인가요?*</SelectTitle>
        <label>
          <input
            type="radio"
            value="true"
            onClick={() => alert('이중 주차면은 서비스를 하지 않습니다.')}
            {...register('parkinglotOptions.isDoubleParked', {
              required: '이중주차면 여부를 선택해주세요',
              validate: (value) => value === 'false' || '이중 주차면은 서비스를 하지 않습니다.'
            })}
          />
          이중주차면
        </label>
        <label>
          <input
            type="radio"
            value="false"
            {...register('parkinglotOptions.isDoubleParked', {
              required: '이중주차면 여부를 선택해주세요',
              validate: (value) => value === 'false' || '이중 주차면은 서비스를 하지 않습니다.'
            })}
          />
          아니오
        </label>
        {errors.parkinglotOptions?.isDoubleParked && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.parkinglotOptions?.isDoubleParked.message}</div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <SelectTitle>지정 주차면이 있나요?*</SelectTitle>
        <label>
          <input
            type="radio"
            value="true"
            {...register('parkinglotOptions.isNotReservedSpace', {
              required: '지정 주차면 여부를 선택해주세요',
              validate: (value) => value === 'true' || '지정 주차면이 없는 경우 신청대상이 아닙니다.'
            })}
          />
          지정면 있음
        </label>
        <label>
          <input
            type="radio"
            value="false"
            onClick={() => alert('지정 주차면이 없는 경우 신청대상이 아닙니다.')}
            {...register('parkinglotOptions.isNotReservedSpace', {
              required: '지정 주차면 여부를 선택해주세요',
              validate: (value) => value === 'true' || '지정 주차면이 없는 경우 신청대상이 아닙니다.'
            })}
          />
          아니오(다른세대 주차가능)
        </label>
        {errors.parkinglotOptions?.isNotReservedSpace && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.parkinglotOptions?.isNotReservedSpace.message}</div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <SelectTitle>24시간동안 비워있어 자유롭게 주차가 가능한가요?*</SelectTitle>
        <label>
          <input
            type="radio"
            value="true"
            {...register('isOperates24Hours', {
              required: '24시간 운영 여부를 선택해주세요'
            })}
          />
          24시간 가능합니다.
        </label>
        <label>
          <input
            type="radio"
            value="false"
            {...register('isOperates24Hours', {
              required: '24시간 운영 여부를 선택해주세요'
            })}
          />
          아니오
        </label>
        {errors.isOperates24Hours && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.isOperates24Hours.message}</div>
        )}
      </div>
    </>
  )
}

export default FirstForm

const HeaderTitle = styled.h2`
  font-size: 22px;
`

const SelectTitle = styled.h3`
  font-size: 18px;
`
