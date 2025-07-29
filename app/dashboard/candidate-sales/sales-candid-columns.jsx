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
    header: '',
    cell: ({ row }) => {
      return (
        <div className='grid grid-cols-3 w-5'>
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
              {/* <DropdownMenuItem
                onClick={() => handleEditCand(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem> */}
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
    size: 80, 
    cell: ({ row }) => (
      <div className="max-w-[60px] overflow-hidden text-ellipsis whitespace-nowrap">
        {`#DEV-${row.original?.id}`}
      </div>
    )},

    {
      accessorKey: 'name',
      header: () => (
        <>
          Contact Information
        </>
      ),
      cell: ({ row }) => (
        <>
          <span>
            {`${row.original?.name} - ${row.original?.email} - ${row.original?.phone}`}
          </span>
        </>
      )
    },

    {
      accessorKey: 'currentSalary',
      header: () => (
        <>
          Current / Expected 
        </>
      ),
      cell: ({ row }) => (
        <>
          <span>{row.original?.currentSalary}</span>
   -
          <span>{row.original?.expectedSalary}</span>

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
    cell: ({ row }) => {

      const data = row.original?.businessMethods?.replace(/[\[\]"]/g, '')
      return (
        <>
        {data}
        </>
      )
    }
  },
  {
    accessorKey: 'leadPlatforms',
    header: 'Lead Platforms',
    cell: ({ row }) =>
    {    const data = row.original?.leadPlatforms?.replace(/[\[\]"]/g, '')
      return (
        <>
        {data}
        </>
      )}
      
  },
  {
    accessorKey: 'preferredShift',
    header: 'Preferred Shift',
    cell: ({ row }) => 
      
      {    const data = row.original?.preferredShift?.replace(/[\[\]"]/g, '')
        return (
          <>
          {data}
          </>
        )}
      
  }
]
