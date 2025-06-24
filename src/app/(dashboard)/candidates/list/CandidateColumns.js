export const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'First name', width: 180 },

  {
    field: 'dob',
    headerName: 'D.O.B',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
  },
  { field: 'email', headerName: 'Email', width: 260 },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'number',
    width: 260
  },
  { field: null, headerName: 'Action', width: 160, sortable: false }
]
