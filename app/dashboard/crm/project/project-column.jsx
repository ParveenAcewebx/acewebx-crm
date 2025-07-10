'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { format } from 'date-fns'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'
export const projectColumn = (
  handleDeleteProject,
  handleEditProject,
  handlePreviewOpen
) => [
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <EllipsisVertical className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => handleEditProject(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteProject(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePreviewOpen(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Eye className='mr-2 h-5 w-5' />
                Preview
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }
  },
  {
    id: 'name',
    header: 'Project Name',
    cell: ({ row }) => row.original.name
  },
  {
    id: 'start_date',
    header: 'Start Date',
    cell: ({ row }) => format(new Date(row.original.start_date), 'MM/dd/yyyy')
  },
  {
    id: 'end_date',
    header: 'End Date',
    cell: ({ row }) => format(new Date(row.original.end_date), 'MM/dd/yyyy')
  },
  {
    id: 'engineerDetails',
    header: 'Engineer Name',
    cell: ({ row }) =>  row?.original?.engineerDetails?.name
  },
  {
    id: 'architectDetails',
    header: 'Architect Name',
    cell: ({ row }) =>  row?.original?.architectDetails?.name
  },
  {
    id: 'address',
    header: 'Address',
    cell: ({ row }) =>  row.original.address
  },
]
