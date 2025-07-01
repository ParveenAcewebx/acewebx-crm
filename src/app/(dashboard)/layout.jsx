// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AuthProvider from '@/@core/SessionProvider'

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    // redirect('/login')
  }

  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navigation={<Navigation />} navbar={<Navbar />} footer={<VerticalFooter />}>
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  )
}

export default Layout
