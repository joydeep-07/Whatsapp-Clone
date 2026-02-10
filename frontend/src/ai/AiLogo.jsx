import { Circle } from 'lucide-react'
import React from 'react'
import meta from '../assets/animations/meta.json'
import Lottie from 'lottie-react'

const AiLogo = () => {
  return (
    <div className='h-13 w-13 flex justify-center items-center'>
       <Lottie animationData={meta} loop={true} />
    </div>
  )
}

export default AiLogo