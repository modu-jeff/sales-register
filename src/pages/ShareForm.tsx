import React from 'react'
import ShareFormContainer from '@/components/ShareForm'

const ShareForm = ({ setProgress }: { setProgress: React.Dispatch<React.SetStateAction<number>> }) => {
  return <ShareFormContainer setProgress={setProgress} />
}

export default ShareForm
