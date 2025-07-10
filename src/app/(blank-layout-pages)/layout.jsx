// Component Imports
import Providers from '@components/Providers'
import { ToastContainer } from 'react-toastify'

const Layout = async ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
        <ToastContainer />
        {children}
    </Providers>
  )
}

export default Layout
