// Component Imports
import AuthProvider from '@/@core/SessionProvider'
import Providers from '@components/Providers'
import { getSession } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'

const Layout = async ({ children }) => {
  const session = await getSession()

  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <AuthProvider session={session}>
        <ToastContainer />
        {children}
      </AuthProvider>
    </Providers>
  )
}

export default Layout
