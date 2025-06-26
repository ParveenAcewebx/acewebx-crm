'use client'

// MUI Imports
import IconButton from '@mui/material/IconButton'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

const NavSearch = () => {
  const { isBreakpointReached } = useVerticalNav()

  return isBreakpointReached ? (
    <IconButton className='text-textPrimary'>
      <i className='ri-search-line' />
    </IconButton>
  ) : (
    <div className='flex items-center gap-2 cursor-pointer border '>
      <IconButton className='text-textPrimary'>
        <i className='ri-search-line' />
      </IconButton>
      <input
        placeholder='Search ⌘K'
        className='bg-transparent outline-none text-sm text-textDisabled placeholder-textDisabled'
        aria-label='Search'
      />
    </div>
  )
}

export default NavSearch
