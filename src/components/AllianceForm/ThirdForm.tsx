import axios from 'axios'
import React from 'react'

import type { IAllianceForm } from '.'
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

const ThirdForm = ({
  register,
  watch,
  setValue,
  errors
}: {
  register: UseFormRegister<IAllianceForm>
  watch: UseFormWatch<IAllianceForm>
  setValue: UseFormSetValue<IAllianceForm>
  errors: FieldErrors<IAllianceForm>
}) => {
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
      {/* 이부분에 올린사진 예시 추가 최대 4장 */}
    </>
  )
}

export default ThirdForm
