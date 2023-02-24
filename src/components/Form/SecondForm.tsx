import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DaumPostCode from 'react-daum-postcode';
import { Roadview } from 'react-kakao-maps-sdk';
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import type { Address } from 'react-daum-postcode';
import type { FormValues } from '.';
import axios from 'axios';

const SecondForm = ({
  register,
  setValue,
  watch,
}: {
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
}) => {
  const navigate = useNavigate();
  const [openPostCode, setOpenPostCode] = useState(false);
  const [addressData, setAddressData] = useState<Address[]>([]);

  const openSearchBar = () => {
    setOpenPostCode((prev) => !prev);
  };

  const onSaveAddress = (data: Address) => {
    setValue('address', data.address);
    setOpenPostCode(false);
  };

  const nextPage = () => {
    navigate('/register/user-info');
  };

  const prevPage = () => {
    navigate(-1);
  };

  const searchAddress = async () => {
    const host = 'https://dapi.kakao.com';
    const url = '/v2/local/search/address.json';
    const Authorization = import.meta.env.VITE_KAKAO_API_REST;

    const response = await axios.get<Address>(
      `${host}${url}?query=${watch().address}`,
      {
        headers: { Authorization },
      }
    );
    const { data } = await response;
    setAddressData((prev) => prev.concat(data));
  };
  console.log(addressData);
  return (
    <>
      <h3 style={{ marginTop: '3rem' }}>주차공간에 대해 알려주세요</h3>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>주차장명(건물명)</span>
          <input type="text" {...register('parkingLotName')} />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <span style={{ marginRight: '1rem' }}>주소입력</span>

        <input type="text" {...register('address')} />
        <button onClick={searchAddress}>주소 검색</button>

        {openPostCode && (
          <div>
            {/* html태그로 안감싸주면 렌더링중 에러 발생  */}
            <DaumPostCode
              autoClose
              style={{ height: '400px' }}
              onComplete={(data) => {
                onSaveAddress(data);
              }}
            />
          </div>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <span>로드뷰 고정하기</span>
        <span
          style={{
            marginLeft: '1rem',
            width: '100px',
            height: '30px',
            border: '1px solid black',
          }}
        >
          여기에 이제 로드뷰 넣을거임
        </span>
        {/* <Roadview position={} /> */}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <label>
          사진등록하기
          <input
            style={{ marginLeft: '1rem' }}
            type="file"
            multiple={true}
            {...register('parkingLotImage')}
          />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <h3>유형</h3>
        <label>
          <input
            type="radio"
            value="apartment"
            {...register('parkingLotType')}
          />
          아파트
        </label>
        <label>
          <input
            type="radio"
            value="building"
            {...register('parkingLotType')}
          />
          빌딩
        </label>
        <label>
          <input
            type="radio"
            value="officetel"
            {...register('parkingLotType')}
          />
          오피스텔
        </label>
        <label>
          <input type="radio" value="house" {...register('parkingLotType')} />
          주택
        </label>
        <label>
          <input
            type="radio"
            value="emptySpace"
            {...register('parkingLotType')}
          />
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
  );
};

export default SecondForm;

const ButtonWrapper = styled.div``;

const CancelButton = styled.button``;

const NextButton = styled.button``;
