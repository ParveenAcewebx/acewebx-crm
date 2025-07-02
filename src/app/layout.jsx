export const dynamic = 'force-dynamic'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'
import '@assets/iconify-icons/generated-icons.css'
import { ToastContainer } from 'react-toastify'
import { Poppins } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AuthProvider from '@/@core/SessionProvider'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap'
})

export const metadata = {
  title: 'AceWebX CRM',
  description:
    'Develop next-level web apps with Materio Dashboard Free - NextJS. Now, updated with lightning-fast routing powered by MUI and App router.'
}

const RootLayout = async ({ children }) => {
  const direction = 'ltr'
  const session = await getServerSession(authOptions)

 
  return (
    <html id='__next' dir={direction}>
      <body className={`${poppins.className} flex is-full min-bs-full flex-auto flex-col`}>
        <AuthProvider session={session}>
          <ToastContainer />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
