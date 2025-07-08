// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'
import '@assets/iconify-icons/generated-icons.css'
import { Poppins } from 'next/font/google'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap'
})

const RootLayout = ({ children }) => {
  const direction = 'ltr'

  return (
    <html lang='en' id='__next' dir={direction}>
      {' '}
      <head>
        <title>AceWebX CRM</title>
        <meta
          name='description'
          content='Develop next-level web apps with Materio Dashboard Free - NextJS. Now, updated with lightning-fast routing powered by MUI and App router.'
        />
      </head>
      <body
        className={`${poppins.className} flex flex-col flex-auto min-h-screen w-full`}
       
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
