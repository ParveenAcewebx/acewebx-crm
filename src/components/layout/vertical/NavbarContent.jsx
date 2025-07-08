// Next Imports
import Link from 'next/link'

// MUI Imports
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import NavSearch from '@components/layout/shared/search'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import AuthProvider from '@/@core/SessionProvider'
import { getSession } from 'next-auth/react'

const NavbarContent = async() => {
  const session = await getSession()
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-2 sm:gap-4'>
        <NavToggle />
        {/* <NavSearch /> */}
      </div>
      <div className='flex items-center'>
        <ModeDropdown />
        <AuthProvider session={session}>
          <UserDropdown />
        </AuthProvider>
      </div>
    </div>
  )
}

export default NavbarContent
