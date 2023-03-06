import React from 'react'
import ConsignmentFormContainer from '@/components/ConsignmentForm'

const ConsignmentForm = ({ setProgress }: { setProgress: React.Dispatch<React.SetStateAction<number>> }) => {
  return <ConsignmentFormContainer setProgress={setProgress} />
}

export default ConsignmentForm
