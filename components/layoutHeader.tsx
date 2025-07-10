import React from 'react'

interface LayoutHeaderProps {
  pageTitle: string
}

const LayoutHeader = ({ pageTitle }: LayoutHeaderProps) => {
  return (
    <div className='mt-0 flex items-center gap-3  border-gray-300 pb-2'>
      <h2 className='text-3xl font-semibold text-gray-800'>{pageTitle}</h2>
    </div>
  )
}

export default LayoutHeader

  