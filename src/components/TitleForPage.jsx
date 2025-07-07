import React from 'react'

function TitleForPage({title}) {
  return (
    <div className='flex justify-between items-center bg-white px-6 py-4 rounded-t-xl shadow-sm mb-4'>
    <h2 className='text-2xl font-semibold text-gray-800'>{title}</h2>
  </div>

  )
}

export default TitleForPage
