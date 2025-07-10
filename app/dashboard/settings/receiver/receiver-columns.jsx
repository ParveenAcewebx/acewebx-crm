'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const ReceiverColumns = (
  handleDeleteReceiver,
  handleEditReceiver
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
                onClick={() => handleEditReceiver(row)}
                className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteReceiver(row)}
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
    id: 'purchaseOrder',
    header: 'Purchase Order',
    cell: ({ row }) => row.original.purchaseOrder
  },
  {
    accessorKey: 'receivedBy',
    header: 'Received By',
    cell: ({ row }) => row.original.receivedBy
  },
  {
    accessorKey: 'receivedDate',
    header: 'received Date',
    cell: ({ row }) => row.original.receivedDate
  },

  {
    accessorKey: 'receivedQty',
    header: 'Received Qty',
    cell: ({ row }) => row.original.receivedQty
  },

  {
    accessorKey: 'orderedQty',
    header: 'Ordered Qty',
    cell: ({ row }) => row.original.orderedQty
  }
]
