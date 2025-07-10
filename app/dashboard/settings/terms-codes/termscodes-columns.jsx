'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'
export const TermsCodesColumns = (
  handleDeleteTermsCodes,
  handleEditTermsCodes
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
                onClick={() => handleEditTermsCodes(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteTermsCodes(row)}
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
    
    id: 'term_type',
    header: 'Term Type',
    cell: ({ row }) => row.original.term_type
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => row.original.code
  },
  {
    accessorKey: 'due_type',
    header: 'Due Type',
    cell: ({ row }) => row.original.due_type
  },

  {
    accessorKey: 'days_due',
    header: 'Days Due',
    cell: ({ row }) => row.original.days_due
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div
        dangerouslySetInnerHTML={{ __html: row.original.description || '' }}
      />
    )
  },
  {
    accessorKey: 'discount_percent',
    header: 'Discount Percent',
    cell: ({ row }) => row.original.discount_percent
  }
]
