import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import DaumPostCode from 'react-daum-postcode'
import { Roadview } from 'react-kakao-maps-sdk'
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { Address } from 'react-daum-postcode'
import type { State } from '.'

const SecondForm = ({
  register,
  setValue,
  watch
}: {
  register: UseFormRegister<State>
  setValue: UseFormSetValue<State>
  watch: UseFormWatch<State>
}) => {
  const navigate = useNavigate()
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

  const onSaveFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 해당 부분 api 따로 별도 제작 예정
    const formData = new FormData()
    const { files } = e.target
    if (files) {
      Object.keys(files).forEach((key, i) => {
        formData.append('files', files[i])
        formData.append('type', files[i].type.includes('image') ? 'parkinglotPhotos' : 'documents') // 타입은 documents랑 parkinglotPhotos 두가지가 있다.
        formData.append('hashCode', 'aaaaaa') // 여기의 해쉬코드는 신청하기 누른 후 api의 응답 값으로 받아야한다.
      })
      setValue('parkingLotImage', formData)
    } else {
      setValue('parkingLotImage', formData)
    }
  }

  const nextPage = () => {
    navigate('/register/user-info')
  }

  const prevPage = () => {
    navigate('/register/service')
  }

  return (
    <>
      <h3 style={{ marginTop: '3rem' }}>주차공간에 대해 알려주세요</h3>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>주차장명(건물명)</span>
          <input
            type="text"
            style={{ width: '200px', height: '30px', padding: '3px' }}
            {...register('parkinglotName')}
          />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <span style={{ marginRight: '1rem' }}>주소입력</span>

        <input
          type="text"
          placeholder="도로명 주소"
          onClick={openSearchBar}
          disabled
          style={{ width: '200px', height: '30px', padding: '3px' }}
          {...register('address')}
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
      </div>
      <div style={{ margin: '2rem 0' }}>
        <span>로드뷰 고정하기</span>
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
          사진등록하기
          <input
            style={{ marginLeft: '1rem' }}
            type="file"
            accept="image/*, .pdf"
            {...(register('parkingLotImage'),
            {
              onChange: (e) => onSaveFiles(e),
              multiple: true
            })}
          />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>유형</h3>
        <label>
          <input
            type="radio"
            value={1}
            {...register('buildingType', {
              valueAsNumber: true
            })}
          />
          아파트
        </label>
        <label>
          <input
            type="radio"
            value={2}
            {...register('buildingType', {
              valueAsNumber: true
            })}
          />
          주택
        </label>
        <label>
          <input
            type="radio"
            value={3}
            {...register('buildingType', {
              valueAsNumber: true
            })}
          />
          빌딩
        </label>
        <label>
          <input
            type="radio"
            value={4}
            {...register('buildingType', {
              valueAsNumber: true
            })}
          />
          오피스텔
        </label>
        <label>
          <input
            type="radio"
            value={5}
            {...register('buildingType', {
              valueAsNumber: true
            })}
          />
          공터
        </label>
        <label>
          <input
            type="radio"
            value={6}
            {...register('buildingType', {
              valueAsNumber: true
            })}
          />
          기타
        </label>
      </div>
      <ButtonWrapper>
        <CancelButton type="button" onClick={prevPage}>
          이전
        </CancelButton>
        <NextButton onClick={nextPage}>다음</NextButton>
      </ButtonWrapper>
    </>
  )
}

export default SecondForm

const ButtonWrapper = styled.div``

const CancelButton = styled.button``

const NextButton = styled.button``
