'use client'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { blankLayoutClasses } from './utils/layoutClasses'
import AuthProvider from '@/@core/SessionProvider'
import { useSession } from 'next-auth/react'

const BlankLayout = ({ children }) => {
  const session = useSession()
  return (
    <div className={classnames(blankLayoutClasses.root, 'is-full bs-full')}>
      {/* <AuthProvider session={session}> */}
        {children}
        {/* </AuthProvider> */}
    </div>
  )
}

export default BlankLayout
