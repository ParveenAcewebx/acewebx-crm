'use client'

export const SalePipelineColumns = (handleDeleteLeads, handleEditLeads) => [
  {
    header: 'Lead Id',
    cell: ({ row }) => `#0${row.index + 1}`
  }
,
  {
    accessorKey: 'assignee',
    header: 'Assign',
    cell: ({ row }) => row.original.assignee
  },
  {
    accessorKey: 'projectName',
    header: 'Project Name',
    cell: ({ row }) => row.original.projectName
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => row.original.company
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => row.original.company
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => row.original.priority
  },
  {
    accessorKey: 'dateRecieved',
    header: 'Received',
    cell: ({ row }) => row.original.dateRecieved
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => row.original.dueDate
  },
  {
    accessorKey: 'nextStep',
    header: 'Next Step',
    cell: ({ row }) => row.original.nextStep 
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  }
]
