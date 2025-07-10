'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const WarehouseColumns = (handleDeleteContact, handleEditContact) => [
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
                onClick={() => handleEditContact(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteContact(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }
  },
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name
  },
  {
    id: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email
  },
  {
    id: 'phone',
    header: 'Phone',
    cell: ({ row }) => row.original.phone
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => row.original.address
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: ({ row }) => row.original.city
  },

  {
    accessorKey: 'state',
    header: 'State',
    cell: ({ row }) => row.original.state
  },
  {
    accessorKey: 'zip',
    header: 'Zip',
    cell: ({ row }) => row.original.zip
  }
]
