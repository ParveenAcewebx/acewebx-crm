'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const IncrementColumn = (handleDeleteIncrement, handleEditIncrement) => [
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      return (
        <div className='grid grid-cols-3 w-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <EllipsisVertical className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
              onClick={() => handleEditIncrement(row)}
              className='cursor-pointer text-green-600'
            >
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteIncrement(row)}
                className='cursor-pointer text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name
  },
  {
    accessorKey: 'acewebxTenure',
    header: 'Tenureo',
    cell: ({ row }) => (
      <>
        <span>
          {row.original?.acewebxTenure}
        </span>
      </>
    )
  },
  {
    accessorKey: 'totalProjects',
    header: 'Total Projects',
    cell: ({ row }) =>
      row?.original?.totalProjects
  },
  {
    accessorKey: 'clientCalls',
    header: 'Client Calls',
    cell: ({ row }) =>
      row?.original?.clientCalls
  },
  {
    accessorKey: 'longTermGoals',
    header: 'ShortTermGoals/ longTermGoals',
    cell: ({ row }) => (
      <>
        <span>
          {row.original?.ShortTermGoals} - {row.original?.longTermGoals}
        </span>
      </>
    )
  },
]
