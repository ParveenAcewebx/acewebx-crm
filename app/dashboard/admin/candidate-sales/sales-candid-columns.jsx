'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Eye, Send, Trash2 } from 'lucide-react'

export const SalesCandidColumns = (
  handleDeleteCand,
  handleEditCand,
  handlePreviewCand,
  handleSendWalkInForm
) => [
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className='grid grid-cols-3'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <EllipsisVertical className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => handlePreviewCand(row)}
                className='cursor-pointer text-blue-400'
              >
                <Eye className='mr-2 h-4 w-4' />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleEditCand(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteCand(row)}
                className='cursor-pointer text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSendWalkInForm(row)}
                className='cursor-pointer text-yellow-600'
              >
                <Send className='mr-2 h-4 w-4' />
                Send Walk In Form
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  },
  {
    accessorKey: 'id',
    header: '#ID',
    cell: ({ row }) => row.original?.id
  },

  {
    accessorKey: 'name',
    header: () => (
      <>
        <span>Name</span>
        <br />
        <span>Email</span>
        <br />
        <span>Phone</span>
      </>
    ),
    cell: ({ row }) => (
      <>
        <span>{row.original?.name}</span>
        <br />
        <span>{row.original?.email}</span>
        <br />
        <span>{row.original?.phone}</span>
      </>
    )
  },

  
  {
    accessorKey: 'totalExperience',
    header: 'Experience',
    cell: ({ row }) => row.original?.totalExperience
  },
  {
    accessorKey: 'joiningDate',
    header: 'Joining Date',
    cell: ({ row }) => row.original?.joiningDate
  },
  {
    accessorKey: 'monthlySalesTarget',
    header: 'Monthly Sales Target',
    cell: ({ row }) => row.original?.monthlySalesTarget
  },
  {
    accessorKey: 'freshBusinessTarget',
    header: 'Fresh Business Target',
    cell: ({ row }) => row.original?.freshBusinessTarget
  },
  {
    accessorKey: 'businessMethods',
    header: 'Business Methods',
    cell: ({ row }) => row.original?.businessMethods
  },
  {
    accessorKey: 'leadPlatforms',
    header: 'Lead Platforms',
    cell: ({ row }) => row.original?.leadPlatforms
  },
  {
    accessorKey: 'preferredShift',
    header: 'Preferred Shift',
    cell: ({ row }) => row.original?.preferredShift
  }
]
