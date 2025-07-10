'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const MaterialItemColumn = (handleDeleteLeads, handleEditLeads) => [
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
                onClick={() => handleEditLeads(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteLeads(row)}
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
    accessorKey: 'item',
    header: 'Item',
    cell: ({ row }) => row.original.item
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => row.original.description
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    cell: ({ row }) => row.original.brand
  },
  {
    accessorKey: 'cost',
    header: 'Cost/Pack',
    cell: ({ row }) => row.original.cost
  },
  {
    accessorKey: 'qty',
    header: 'Pack Qty',
    cell: ({ row }) => row.original.qty
  },
  {
    accessorKey: 'total',
    header: 'Cost Each',
    cell: ({ row }) => row.original.total
  },
  {
    accessorKey: 'hardware_type',
    header: 'HardWare Type',
    cell: ({ row }) => row.original.hardware_type
  }
]
