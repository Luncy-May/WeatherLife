import React from 'react'
import { Plan, Weather } from '../components'
const Report = () => {
  return (
    <div className='pt-5 space-y-5 flex flex-col items-center justify-center'>
      <div className='border border-gray-300 border-solid shadow-md hover:shadow-2xl p-5'>
        <Weather />
      </div>
      <div>
        <Plan />
      </div>
    </div>
  )
}

export default Report
