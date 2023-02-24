import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import DaumPostCode from 'react-daum-postcode'
import { Roadview } from 'react-kakao-maps-sdk'
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { Address } from 'react-daum-postcode'
import type { FormValues } from '.'

const SecondForm = ({
  register,
  setValue,
  watch
}: {
  register: UseFormRegister<FormValues>
  setValue: UseFormSetValue<FormValues>
  watch: UseFormWatch<FormValues>
}) => {
  const navigate = useNavigate()
  const [openPostCode, setOpenPostCode] = useState(false)
  const [addressData, setAddressData] = useState<any[]>([])
  const [documentCount, setDocumentCount] = useState(-1)

  const roadviewPosition = useMemo(() => {
    if (addressData[0]) {
      const lng = Number(addressData[documentCount].documents[0].x)
      const lat = Number(addressData[documentCount].documents[0].y)
      return { lng, lat }
    } else {
      return {
        lat: 33.450701,
        lng: 126.570667
      }
    }
  }, [addressData])

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
    setAddressData((prev) => prev.concat(data))
    setDocumentCount((prev) => prev + 1)
  }

  const onSaveAddress = async (data: Address) => {
    const { roadAddress, jibunAddress } = data
    await searchAddress(roadAddress)
    setValue('roadAddress', roadAddress)
    setValue('jibunAddress', jibunAddress)
    setOpenPostCode(false)
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
            {...register('parkingLotName')}
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
          {...register('roadAddress')}
        />

        <input
          type="text"
          placeholder="지번 주소"
          onClick={openSearchBar}
          disabled
          style={{ width: '200px', height: '30px', padding: '3px' }}
          {...register('jibunAddress')}
        />

        <input
          type="text"
          placeholder="세부 주소를 입력해주세요"
          style={{ width: '200px', height: '30px', padding: '3px' }}
          {...register('detailAddress')}
        />
        <button style={{ width: '100px', height: '40px' }} type="button" onClick={openSearchBar}>
          주소 검색
        </button>
        {openPostCode && (
          <div>
            <DaumPostCode
              autoClose
              style={{ width: '50%', height: '400px', border: '1px solid black', margin: '1rem auto' }}
              onComplete={(data) => {
                onSaveAddress(data)
              }}
            />
          </div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <span>로드뷰 고정하기</span>
        <Roadview
          position={{
            lat: roadviewPosition.lat,
            lng: roadviewPosition.lng,
            radius: 50
          }}
          zoom={-1}
          style={{
            width: '50%',
            height: '400px',
            margin: '1rem auto'
          }}
        />
      </div>
      <div style={{ margin: '2rem 0' }}>
        <label>
          사진등록하기
          <input style={{ marginLeft: '1rem' }} type="file" multiple={true} {...register('parkingLotImage')} />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>유형</h3>
        <label>
          <input type="radio" value="apartment" {...register('parkingLotType')} />
          아파트
        </label>
        <label>
          <input type="radio" value="building" {...register('parkingLotType')} />
          빌딩
        </label>
        <label>
          <input type="radio" value="officetel" {...register('parkingLotType')} />
          오피스텔
        </label>
        <label>
          <input type="radio" value="house" {...register('parkingLotType')} />
          주택
        </label>
        <label>
          <input type="radio" value="emptySpace" {...register('parkingLotType')} />
          공터
        </label>
        <label>
          <input type="radio" value="etc" {...register('parkingLotType')} />
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
