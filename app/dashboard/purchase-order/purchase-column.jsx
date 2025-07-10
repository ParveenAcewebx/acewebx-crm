'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { format } from 'date-fns'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const PurchaseOrderColumn = (
  handleDeletePurchase,
  handleEditPurchase,
  handlePreviewLeads,
  DCSOpenModal
) => [
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <EllipsisVertical className='h-5 w-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => handleEditPurchase(row)}
              className='cursor-pointer text-green-600'
            >
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeletePurchase(row)}
              className='cursor-pointer text-red-600'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
  {
    accessorKey: 'vendor',
    header: 'Vendor',
    cell: ({ row }) => {
      const vendorName = row.original?.vendor?.name || '-'
      const poNumber = row.original?.customerPo || ''
      return poNumber ? `${vendorName} (#${poNumber})` : vendorName
    }
  },
  {
    accessorKey: 'warehouse',
    header: 'Warehouse',
    cell: ({ row }) => row.original?.warehouse || '-'
  },
  {
    accessorKey: 'dateOrdered',
    header: 'Date Ordered',
    cell: ({ row }) =>
      row.original?.dateOrdered
        ? format(new Date(row.original.dateOrdered), 'MM/dd/yyyy')
        : '-'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original?.status || '-'
  }
]
