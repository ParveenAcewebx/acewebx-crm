'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const InventoryItemsColumn = (handleDeleteItems, handleEditItems) => [
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
                onClick={() => handleEditItems(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteItems(row)}
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
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => row.original.sku
  },
  {
    accessorKey: 'title_tag',
    header: 'Title Tag',
    cell: ({ row }) => row.original.title_tag
  },
  {
    accessorKey: 'freeform',
    header: 'Free From',
    cell: ({ row }) => row.original.freeform
  },
  {
    accessorKey: 'meta_description',
    header: 'Meta',
    cell: ({ row }) => row.original.meta_description
  },
  {
    accessorKey: 'website_id',
    header: 'Website Id',
    cell: ({ row }) => row.original.website_id
  },

]
