'use client'
const PageExpired = () => {
  return (
    <div
      className='ace-wrp relative flex min-h-screen flex-col items-center justify-start bg-white'
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
      <div className="absolute inset-0 bg-[url('/background-honeycomb.png')] bg-repeat opacity-10" />
      {/* Left & Right Background Images */}
      {/* <img src='/backgroud-ace.png' alt='Left Background' className='absolute left-0 bottom-0 h-full  z-0 bg-cover
bg-no-repeat w-full' /> */}
      {/* Logo */}
      <div className='acewebx-logo z-10 text-center'>
        <img
          src='../acewebxlogo.png'
          alt='Acewebx Logo'
          className='mx-auto h-20 w-auto'
        />
      </div>
      {/* Thank You Message Box */}
      <div className='logo-ace-defferent z-10 flex w-full max-w-3xl flex-col items-center justify-center rounded-2xl border border-red-100 bg-gradient-to-br from-red-100 via-white to-red-100 p-10 text-center shadow-md'>
        <img
          src='/images/cross-icon.png' // replace with your green check icon
          alt='Success'
          className='even-arrow mb-6 h-16 w-16'
        />
         <p className='content-wrp text-xl font-normal text-black'>
            This URL has expired. Please request a new one or <br/> <a target="_blank" className="text-red-500 " href="https://acewebx.com/contact-us/">contact support.</a>
        </p>
      </div>
    </div>
  )
}
export default PageExpired