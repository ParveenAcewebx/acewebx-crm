import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, Menu, MenuItem } from '@mui/material'

function ActionsDots({ id, getByIdMsgHandler, deleteMsgHandler }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    getByIdMsgHandler(id)
    handleClose()
  }

  const handleDelete = () => {
    deleteMsgHandler(id)
    handleClose()
  }

  return (
    <>
      <Button
        aria-controls={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>
          <span style={{ color: 'green' }}>Edit</span>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <span style={{ color: 'red' }}>Delete</span>
        </MenuItem>
      </Menu>
    </>
  )
}

export default ActionsDots
