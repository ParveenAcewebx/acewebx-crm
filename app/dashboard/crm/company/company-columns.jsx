'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'
export const CompanyColumns = (
  handleDeleteContact,
  handleEditContact,
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
              <DropdownMenuItem
                onClick={() => handlePreviewOpen(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Eye className=' mr-2 h-5 w-5' />
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
    header: 'Name',
    cell: ({ row }) => row.original.name
  },
  {
    header: 'Address',
    accessorKey: 'address', // optional if only using cell
    cell: ({ row }) => {
      const { address, city, state, zip } = row.original
      return `${address || ''}, ${city || ''}, ${state || ''} ${zip || ''}`
        .trim()
        .replace(/^,|,$/g, '')
    }
  },

  {
    accessorKey: 'companyNotes',
    header: 'Company Notes',
    cell: ({ row }) => (
      <div
        dangerouslySetInnerHTML={{ __html: row.original.companyNotes || '' }}
      />
    )
  },
  {
    accessorKey: 'companyLeadScore',
    header: 'Company Lead Score',
    cell: ({ row }) => row.original.companyLeadScore
  }
]
