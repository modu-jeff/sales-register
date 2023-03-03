import axios from 'axios'
import React, { useEffect } from 'react'
import styled from 'styled-components'

const ThirdForm = ({
  setPreview,
  preview,
  setProgress
}: {
  setPreview: React.Dispatch<
    React.SetStateAction<
      {
        image: string
        name: string
      }[]
    >
  >
  preview: { image: string; name: string }[]
  setProgress: React.Dispatch<React.SetStateAction<number>>
}) => {
  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    // TODO: 해당 부분 api 따로 별도 제작 예정
    const formData = new FormData()
    const { files } = e.target
    if (files && files.length < 5) {
      Object.keys(files).forEach((key, i) => {
        if (preview.length < 4) {
          setPreview((prev) => prev.concat({ image: URL.createObjectURL(files[i]), name: files[i].name }))
        } else {
          e.target.value = ''
          return alert('파일은 4개까지만 업로드 가능합니다.')
        }
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

  const onDeletePreview = (image: string) => {
    setPreview((prev) => prev.filter((item) => item.image !== image))
  }

  useEffect(() => {
    setProgress(80)
  }, [])

  return (
    <>
      <h3 style={{ marginTop: '2rem', fontSize: '22px', lineHeight: '32px' }}>
        주차장 사진을 등록해주세요
        <br />
        4장까지 등록가능
      </h3>
      <div style={{ margin: '2rem 0' }}>
        {/* 파일 첨부는 최종단계에서 진행되어야 하는 문제로 로컬에 임시 저장하는 방법을 구상해야함 */}
        <ImageInput type="file" id="file" accept="image/*" multiple onChange={(e) => onSaveFiles(e)} />
        <ImageLabel htmlFor="file">파일찾기</ImageLabel>
      </div>
      {preview.length > 0 &&
        preview.map(({ image, name }, i) => {
          return (
            <ImageContainer key={i}>
              <PreviewImage alt={name} src={image} />
              <DeleteButton onClick={() => onDeletePreview(image)} type="button">
                X
              </DeleteButton>
            </ImageContainer>
          )
        })}
    </>
  )
}

export default ThirdForm

const PreviewImage = styled.img`
  width: 100%;
  object-fit: contain;
`

const ImageInput = styled.input`
  display: none;
`

const ImageLabel = styled.label`
  display: inline-block;
  width: 100%;
  height: 40px;
  border: 1px solid #0099fe;
  color: #0099fe;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
`

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 1rem;
`

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: -10px;
  background-color: transparent;
  border: none;
  color: lightgrey;
  font-size: 38px;
  font-weight: bolder;
  cursor: pointer;
`
