// Third-party Imports
import classnames from 'classnames'

// Component Imports
import LayoutContent from './components/vertical/LayoutContent'

// Util Imports
import { verticalLayoutClasses } from './utils/layoutClasses'
import AuthProvider from '@/@core/SessionProvider'
import { getServerSession } from 'next-auth'

const VerticalLayout = async props => {
  // Props
  const { navbar, footer, navigation, children } = props
  const session = await getServerSession()

  return (
    <div className={classnames(verticalLayoutClasses.root, 'flex flex-auto')}>
      {navigation || null}
      <div className={classnames(verticalLayoutClasses.contentWrapper, 'flex flex-col min-is-0 is-full')}>
        {navbar || null}
        {/* Content */}
        <LayoutContent>
          {/* <AuthProvider session={session}> */}
            {children}
            {/* </AuthProvider> */}
        </LayoutContent>
        {footer || null}
      </div>
    </div>
  )
}

export default VerticalLayout
