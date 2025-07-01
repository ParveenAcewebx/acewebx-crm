// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import { getSession } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'

const Layout = async ({ children }) => {
  const session = await getSession()

  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <BlankLayout>
        <ToastContainer />
        {children}
      </BlankLayout>
    </Providers>
  )
}

export default Layout
