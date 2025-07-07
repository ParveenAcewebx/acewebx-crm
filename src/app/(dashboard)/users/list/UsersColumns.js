import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export const UsersColumns = ({ handleEdit, handleRemove }) => {
  return [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 110 },

    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150
    },
    // {
    //   field: 'currentSalary',
    //   headerName: 'Current Salary',
    //   width: 150,
    //   renderCell: params => params?.row?.currentSalary || '-'
    // },
    // {
    //   field: 'expectedSalary',
    //   headerName: 'Expected Salary',
    //   width: 150,
    //   renderCell: params => params?.row?.currentSalary || '-'
    // },
    // {
    //   field: 'designation',
    //   headerName: 'Designation',
    //   width: 150,
    //   renderCell: params => params?.row?.designation || '-'
    // },
    {
      field: '_resume',
      headerName: 'Action',
      width: 160,
      sortable: false,
      renderCell: params => {
        const [anchorEl, setAnchorEl] = React.useState(null)

        const handleClick = event => {
          setAnchorEl(event.currentTarget)
        }

        const handleClose = () => {
          setAnchorEl(null)
        }

        return (
          <>
            <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
              <MoreVertIcon />
            </Button>
            <Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  handleEdit(params.row)
                  handleClose()
                }}
              >
                <span style={{ color: 'green' }}>Edit</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleRemove(params.row)
                  handleClose()
                }}
              >
                <span style={{ color: 'red' }}>Delete</span>
              </MenuItem>
            </Menu>
          </>
        )
      }
    }
  ]
}
