'use client'
import React from 'react'


const LayoutHeader = ({ pageTitle }) => {
  return (
    <div className="headerSection border-color-grey flex h-20 shrink-0 items-center gap-2 border-b bg-white shadow-[0_0_15px_-10px_black] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <h2 className='text-3xl font-semibold text-gray-800'>{pageTitle}</h2>
  </div>
  )
}

export default LayoutHeader
