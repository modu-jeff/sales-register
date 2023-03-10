import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import DaumPostCode from 'react-daum-postcode'
import { Roadview } from 'react-kakao-maps-sdk'

import type { IAllianceForm } from '@/components/AllianceForm'

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
    setProgress(60)
  }, [])

  return (
    <>
      <h3 style={{ marginTop: '3rem' }}>??????????????? ?????? ???????????????</h3>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>????????????(?????????)(????????????)</span>
          <input
            type="text"
            style={{ width: '200px', height: '30px', padding: '3px' }}
            {...register('parkinglotName')}
          />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <h3>?????? ??? ?????? ??????????????????*</h3>
          <input
            type="number"
            {...register('numberOfParkinglot', {
              required: '?????? ??? ?????? ??????????????????'
            })}
          />
        </label>
        {errors.numberOfParkinglot && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.numberOfParkinglot.message}</div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>??????*</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <label>
            <input
              type="radio"
              value={1}
              {...register('buildingType', {
                required: '????????? ??????????????????'
              })}
            />
            ?????????
          </label>
          <label>
            <input
              type="radio"
              value={2}
              {...register('buildingType', {
                required: '????????? ??????????????????'
              })}
            />
            ??????
          </label>
          <label>
            <input
              type="radio"
              value={3}
              {...register('buildingType', {
                required: '????????? ??????????????????'
              })}
            />
            ??????
          </label>
          <label>
            <input
              type="radio"
              value={4}
              {...register('buildingType', {
                required: '????????? ??????????????????'
              })}
            />
            ????????????
          </label>
          <label>
            <input
              type="radio"
              value={5}
              {...register('buildingType', {
                required: '????????? ??????????????????'
              })}
            />
            ??????
          </label>
          <label>
            <input
              type="radio"
              value={6}
              {...register('buildingType', {
                required: '????????? ??????????????????'
              })}
            />
            ??????
          </label>
        </div>
        {errors.buildingType && <div style={{ color: 'red', fontSize: '12px' }}>{errors.buildingType.message}</div>}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <span style={{ marginRight: '1rem' }}>???????????????*</span>

        <input
          type="text"
          placeholder="????????? ??????"
          onClick={openSearchBar}
          style={{ width: '200px', height: '30px', padding: '3px' }}
          {...register('address', {
            required: '????????? ??????????????????'
          })}
        />

        {/* <input
          type="text"
          placeholder="?????? ??????"
          onClick={openSearchBar}
          disabled
          style={{ width: '200px', height: '30px', padding: '3px' }}
          {...register('jibunAddress')}
        /> */}

        {/* <input
          type="text"
          placeholder="?????? ????????? ??????????????????"
          style={{ width: '200px', height: '30px', padding: '3px' }}
          {...register('detailAddress')}
        /> */}
        <button style={{ width: '100px', height: '40px' }} type="button" onClick={openSearchBar}>
          ?????? ??????
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
        <span>?????? ????????? ????????? ??? ????????? ???????????? ??????????????????(??????)</span>
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
