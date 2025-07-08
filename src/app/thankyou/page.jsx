'use client' // Only if you're using Next.js App Router

import React from 'react'

const ThankYouPage = () => {
  return (
    <div
      className='min-h-screen flex flex-col items-center justify-start bg-white relative ace-wrp'
      role='img'
      aria-label='Left Background'
      style={{
        backgroundImage: "url('/images/backgroud-ace.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0
      }}
    >
      {/* Honeycomb Background Pattern */}
      <div className="absolute inset-0 bg-[url('/background-honeycomb.png')] opacity-10 bg-repeat" />

      {/* Left & Right Background Images */}
      {/* <img src='/backgroud-ace.png' alt='Left Background' className='absolute left-0 bottom-0 h-full  z-0 bg-cover
bg-no-repeat w-full' /> */}

      {/* Logo */}
      <div className=' text-center z-10 acewebx-logo'>
        <img src='./acewebxlogo.png' alt='Acewebx Logo' className='h-20 w-auto mx-auto' />
      </div>

      {/* Thank You Message Box */}
      <div
        className='bg-gradient-to-br from-red-100 via-white to-red-100 p-10 rounded-2xl shadow-md w-full max-w-5xl 
      z-10 border border-red-100 flex flex-col items-center justify-center text-center logo-ace-defferent'
      >
        <img
          src='/Vector.svg' // replace with your green check icon
          alt='Success'
          className='h-16 w-16 mb-6 even-arrow'
        />
        <p className=' text-black font-normal  text-xl content-wrp'>
          Your message has been sent successfully. We’ll get back
          <br />
          to you as soon as possible.
        </p>
      </div>
    </div>
  )
}

export default ThankYouPage
