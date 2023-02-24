import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { FormValues } from '.';

const ThirdForm = ({
  register,
  watch,
}: {
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
}) => {
  const phoneValidation = () => {
    if (!watch().phoneNumber) return alert('폰번을 넣어주셈');
    else return alert('오 진짜 넣었누?');
  };
  return (
    <>
      <h3 style={{ marginTop: '3rem' }}>이름과 연락처를 알려주세요</h3>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>이름</span>
          <input
            type="text"
            placeholder="담당자 이름"
            {...register('userName')}
          />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>휴대폰 번호</span>
          <input
            type="tel"
            placeholder="숫자만 입력"
            {...register('phoneNumber')}
          />
        </label>
        <button type="button" onClick={phoneValidation}>
          인증하기
        </button>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <div>소유관계</div>
        <label>
          <input type="radio" value="owner" {...register('relationship')} />
          소유주
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input type="radio" value="employee" {...register('relationship')} />
          임차인 또는 직원
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <label>
          <span style={{ marginRight: '1rem' }}>추천코드</span>
          <input
            type="text"
            placeholder="추천코드 입력"
            {...register('recommendCode')}
          />
        </label>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <div>개인정보 수집에 동의</div>
        <label>
          <input
            type="radio"
            value="true"
            {...register('approvalCollectingInfo')}
          />
          동의
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            value="false"
            {...register('approvalCollectingInfo')}
          />
          비동의
        </label>
      </div>
    </>
  );
};

export default ThirdForm;
