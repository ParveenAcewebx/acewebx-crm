'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const SalesColumn = (handleDeleteSalesOrder, handleEditSalesOrder) => [
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
                onClick={() => handleEditSalesOrder(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteSalesOrder(row)}
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
    header: 'Customer Name',
    cell: ({ row }) => row.original.customers?.name
  },
  {
    accessorKey: 'ship_to',
    header: 'Ship To',
    cell: ({ row }) => row.original.ship_to
  },
  {
    accessorKey: 'material_total',
    header: 'Material Total',
    cell: ({ row }) => row.original.material_total
  },
  {
    accessorKey: 'additional_total',
    header: 'Additional Total',
    cell: ({ row }) => row.original.additional_total
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => row.original.total
  }
]
