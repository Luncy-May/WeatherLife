import React from 'react'
import { Map, Plan, Weather } from '../components'
const Report = () => {
  return (
    <div className='pt-5 space-y-5 text-4xl font-bold flex flex-col items-center justify-center'>
      <div className='border border-gray-300 border-solid shadow-md hover:shadow-2xl p-5'>
        <Weather />
      </div>
      <div className='border border-gray-300 border-solid shadow-md hover:shadow-2xl p-5'>
        <Plan />
      </div>
    </div>
  )
}

export default Report
