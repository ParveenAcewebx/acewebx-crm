import { Button } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
export const columns = (handleView, handleEdit, handleRemove) => {
  return [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 110 },
    {
      field: '_designationApplyingFor',
      headerName: 'Skill',
      description: 'This column is not sortable.',
      sortable: false,
      width: 130,
      renderCell: params => params?.row?.meta?._designationApplyingFor || '-'
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150
    },
    {
      field: '_currentLocation',
      headerName: 'Current Location',
      width: 150,
      renderCell: params => params?.row?.meta?._currentLocation || '-'
    },
    {
      field: '_gender',
      headerName: 'Gender',
      width: 150,
      renderCell: params => params?.row?.meta?._gender || '-'
    },
    {
      field: '_resume',
      headerName: 'Action',
      width: 160,
      sortable: false,
      renderCell: params => (
        <>
          <Button onClick={() => handleView(params.row)}>
            <VisibilityIcon />
          </Button>
        </>
      )
    }
  ]
}
