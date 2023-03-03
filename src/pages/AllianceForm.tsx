import React from 'react'
import AliianceFormContainer from '../components/AllianceForm'

const AllianceForm = ({ setProgress }: { setProgress: React.Dispatch<React.SetStateAction<number>> }) => {
  return <AliianceFormContainer setProgress={setProgress} />
}

export default AllianceForm
