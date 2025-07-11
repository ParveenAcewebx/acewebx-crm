'use client'

export const UsersColumns = (
  handleDeleteLeads,
  handleEditLeads,
  handlePreviewLeads,
  DCSOpenModal
) => [
  {
    accessorKey: 'id',
    header: '#ID',
    cell: ({ row }) => row.original?.id
  },

  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original?.name
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original?.email
  },

  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => row.original?.phone
  },

  {
    accessorKey: 'totalExperience ',
    header: 'Experience',
    cell: ({ row }) => row.original?.totalExperience
  }
]
