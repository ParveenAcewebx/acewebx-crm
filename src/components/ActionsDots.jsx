import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, Menu, MenuItem } from '@mui/material'

function ActionsDots() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        // onMouseEnter={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // onMouseLeave={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Button style={{ color: 'green' }}> Edit</Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {' '}
          <Button style={{ color: 'red' }}> Delete</Button>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ActionsDots
