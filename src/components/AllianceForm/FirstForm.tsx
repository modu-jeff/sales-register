import React from 'react'

import type { IAllianceForm } from '.'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

const FirstForm = ({
  register,
  errors
}: {
  register: UseFormRegister<IAllianceForm>
  errors: FieldErrors<IAllianceForm>
}) => {
  return (
    <>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <h3>주차 면 수를 입력해주세요*</h3>
          <input
            type="number"
            {...register('numberOfParkinglot', {
              required: '주차 면 수를 입력해주세요'
            })}
          />
        </label>
        {errors.numberOfParkinglot && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.numberOfParkinglot.message}</div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>어떻게 수익을 올리고 싶으신가요?*</h3>
        <label>
          <input type="checkbox" value="monthly" {...register('parkingTypes.isMonthly')} />
          월주차권 판매
        </label>
        <label>
          <input type="checkbox" value="hourly" {...register('parkingTypes.isHourly')} />
          시간권 판매
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>24시간 입출차가 가능한 곳인가요?*</h3>
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
      <div style={{ margin: '2rem 0' }}>
        <h3>현장관리자가 있나요?(유인으로 운영)*</h3>
        <label>
          <input
            type="radio"
            value="true"
            {...register('parkinglotOptions.isSiteManager', {
              required: '현장관리자 여부를 선택해주세요'
            })}
          />
          현장관리자 있음
        </label>
        <label>
          <input
            type="radio"
            value="false"
            {...register('parkinglotOptions.isSiteManager', {
              required: '현장관리자 여부를 선택해주세요'
            })}
          />
          아니오
        </label>
        {errors.parkinglotOptions?.isSiteManager && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.parkinglotOptions?.isSiteManager.message}</div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>번호인식 차단기가 있나요?*</h3>
        <label>
          <input
            type="radio"
            value="true"
            {...register('parkinglotOptions.isBarriers', {
              required: '차단기 여부를 선택해주세요'
            })}
          />
          차단기 있음
        </label>
        <label>
          <input
            type="radio"
            value="false"
            {...register('parkinglotOptions.isBarriers', {
              required: '차단기 여부를 선택해주세요'
            })}
          />
          아니오
        </label>
        {errors.parkinglotOptions?.isBarriers && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.parkinglotOptions?.isBarriers.message}</div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>외부인 출입이 가능한 주차장인가요?*</h3>
        <label>
          <input
            type="radio"
            value="true"
            {...register('parkinglotOptions.isExternalRestricted', {
              required: '외부인 출입 가능여부를 선택해주세요'
            })}
          />
          외부인출입 가능
        </label>
        <label>
          <input
            type="radio"
            value="false"
            onClick={() => alert('외부인 출입이 불가능한 주차장은 현재 서비스를 제공하지 않습니다.')}
            {...register('parkinglotOptions.isExternalRestricted', {
              required: '외부인 출입 가능여부를 선택해주세요'
            })}
          />
          아니오
        </label>
        {errors.parkinglotOptions?.isExternalRestricted && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.parkinglotOptions?.isExternalRestricted.message}</div>
        )}
      </div>
      <div style={{ width: '98%', margin: '2rem 0' }}>
        <h3>부가 설명(선택입력)</h3>
        <textarea style={{ width: '100%', height: '90px', resize: 'none' }} {...register('description')} />
      </div>
    </>
  )
}

export default FirstForm
