import axios from 'axios'
import React, { useMemo, useState } from 'react'
import DaumPostCode from 'react-daum-postcode'
import { Roadview } from 'react-kakao-maps-sdk'

import type { IShareForm } from '.'
import type { Address } from 'react-daum-postcode'
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

const SecondForm = ({
  register,
  setValue,
  watch,
  errors
}: {
  register: UseFormRegister<IShareForm>
  setValue: UseFormSetValue<IShareForm>
  watch: UseFormWatch<IShareForm>
  errors: FieldErrors<IShareForm>
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

  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 해당 부분 api 따로 별도 제작 예정
    const formData = new FormData()
    const { files } = e.target
    if (files && files.length < 5) {
      Object.keys(files).forEach((key, i) => {
        formData.append('files', files[i])
      })
      // POST요청
      // hosturl: 뭐지?
      // params: /online-sales-request/file/parkinglot-photo
      // headers: { 'Content-Type': 'multipart/form-data' }
      // body: formData중 files만
      // response: data.files[i].path로 옴 files는 배열, 배열안에 {path, thumbnailPath, width, height}로 옴
      // setValue('parkinglotPhotos', `api응답값`)
    } else {
      return alert('파일은 4개까지만 업로드 가능합니다.')
    }
  }

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
      <div style={{ margin: '2rem 0' }}>
        <label>
          {/* 파일 첨부는 최종단계에서 진행되어야 하는 문제로 로컬에 임시 저장하는 방법을 구상해야함 */}
          주차장 사진을 사진첨부해 주세요(선택)
          <input
            style={{ marginLeft: '1rem' }}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onSaveFiles(e)}
            maxLength={4}
          />
        </label>
      </div>
    </>
  )
}

export default SecondForm
