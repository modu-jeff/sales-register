import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import DaumPostCode from 'react-daum-postcode'
import { Roadview } from 'react-kakao-maps-sdk'

import type { IAllianceForm } from '.'
import type { Address } from 'react-daum-postcode'
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

const SecondForm = ({
  register,
  setValue,
  watch,
  errors,
  setProgress
}: {
  register: UseFormRegister<IAllianceForm>
  setValue: UseFormSetValue<IAllianceForm>
  watch: UseFormWatch<IAllianceForm>
  errors: FieldErrors<IAllianceForm>
  setProgress: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [openPostCode, setOpenPostCode] = useState(false)

  const { latitude, longitude, roadViewPan, roadViewTilt, roadViewZoom } = watch()

  const roadviewPosition = useMemo(() => {
    if (latitude && longitude) {
      return { latitude, longitude, pan: roadViewPan, tilt: roadViewTilt, zoom: roadViewZoom }
    } else {
      return {
        latitude: 33.450701,
        longitude: 126.570667,
        pan: 0,
        tilt: 0,
        zoom: 0
      }
    }
  }, [latitude, longitude])

  const openSearchBar = () => {
    setOpenPostCode((prev) => !prev)
  }

  const searchAddress = async (address: string) => {
    const host = 'https://dapi.kakao.com'
    const url = '/v2/local/search/address.json'
    const Authorization = import.meta.env.VITE_KAKAO_API_REST
    const response = await axios.get(`${host}${url}?query=${address}`, {
      headers: { Authorization }
    })
    const { data } = response

    setValue('longitude', Number(data.documents[0].x))
    setValue('latitude', Number(data.documents[0].y))
  }

  const onSaveAddress = async (address: Address) => {
    const { roadAddress, sigunguCode } = address
    setValue('address', roadAddress)
    setValue('regionCode', sigunguCode)

    await searchAddress(roadAddress)
    setOpenPostCode(false)
  }

  const onSaveRoadViewData = (roadview: kakao.maps.Roadview) => {
    const { pan, tilt, zoom } = roadview.getViewpoint()
    const position = roadview.getPosition()

    setValue('latitude', position.getLat())
    setValue('longitude', position.getLng())
    setValue('roadViewPan', pan)
    setValue('roadViewTilt', tilt)
    setValue('roadViewZoom', zoom ? zoom : 0)
  }

  useEffect(() => {
    setProgress(50)
  }, [])

  return (
    <>
      <h3 style={{ marginTop: '3rem' }}>주차공간에 대해 알려주세요</h3>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>주차장명(건물명)(선택입력)</span>
          <input
            type="text"
            style={{ width: '200px', height: '30px', padding: '3px' }}
            {...register('parkinglotName')}
          />
        </label>
      </div>
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
        <h3>유형*</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <label>
            <input
              type="radio"
              value={1}
              {...register('buildingType', {
                required: '유형을 선택해주세요'
              })}
            />
            아파트
          </label>
          <label>
            <input
              type="radio"
              value={2}
              {...register('buildingType', {
                required: '유형을 선택해주세요'
              })}
            />
            주택
          </label>
          <label>
            <input
              type="radio"
              value={3}
              {...register('buildingType', {
                required: '유형을 선택해주세요'
              })}
            />
            빌딩
          </label>
          <label>
            <input
              type="radio"
              value={4}
              {...register('buildingType', {
                required: '유형을 선택해주세요'
              })}
            />
            오피스텔
          </label>
          <label>
            <input
              type="radio"
              value={5}
              {...register('buildingType', {
                required: '유형을 선택해주세요'
              })}
            />
            공터
          </label>
          <label>
            <input
              type="radio"
              value={6}
              {...register('buildingType', {
                required: '유형을 선택해주세요'
              })}
            />
            기타
          </label>
        </div>
        {errors.buildingType && <div style={{ color: 'red', fontSize: '12px' }}>{errors.buildingType.message}</div>}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <span style={{ marginRight: '1rem' }}>주차장주소*</span>

        <input
          type="text"
          placeholder="도로명 주소"
          onClick={openSearchBar}
          style={{ width: '200px', height: '30px', padding: '3px' }}
          {...register('address', {
            required: '주소를 입력해주세요'
          })}
        />

        {/* <input
          type="text"
          placeholder="지번 주소"
          onClick={openSearchBar}
          disabled
          style={{ width: '200px', height: '30px', padding: '3px' }}
          {...register('jibunAddress')}
        /> */}

        {/* <input
          type="text"
          placeholder="세부 주소를 입력해주세요"
          style={{ width: '200px', height: '30px', padding: '3px' }}
          {...register('detailAddress')}
        /> */}
        <button style={{ width: '100px', height: '40px' }} type="button" onClick={openSearchBar}>
          주소 검색
        </button>
        {openPostCode && (
          <div>
            <DaumPostCode
              autoClose
              style={{ width: '100%', height: '350px', border: '1px solid black', margin: '1rem auto' }}
              onComplete={onSaveAddress}
            />
          </div>
        )}
        {errors.address && <div style={{ color: 'red', fontSize: '12px' }}>{errors.address.message}</div>}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <span>주차 환경을 파악할 수 있도록 로드뷰를 조정해주세요(선택)</span>
        <Roadview
          position={{
            lat: roadviewPosition.latitude,
            lng: roadviewPosition.longitude,
            radius: 50
          }}
          pan={roadviewPosition.pan}
          tilt={roadviewPosition.tilt}
          zoom={roadviewPosition.zoom}
          onPositionChanged={onSaveRoadViewData}
          onViewpointChange={onSaveRoadViewData}
          style={{
            width: '100%',
            height: '350px',
            margin: '1rem auto'
          }}
        />
      </div>
    </>
  )
}

export default SecondForm
