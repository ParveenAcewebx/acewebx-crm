// Component Imports
import AuthProvider from '@/@core/SessionProvider'
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import { getSession } from 'next-auth/react'

const Layout = async ({ children }) => {
  const session = await getSession()

  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      {/* <AuthProvider session={session}> */}
        <BlankLayout>{children}</BlankLayout>
      {/* </AuthProvider> */}
    </Providers>
  )
}

export default Layout
