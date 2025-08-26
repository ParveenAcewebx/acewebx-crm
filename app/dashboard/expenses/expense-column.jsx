'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'

export const ExpenseColumn = (handleDeleteExpense, handleEditExpense) => [
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
                onClick={() => handleEditExpense(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteExpense(row)}
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
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.original.title
  },
  // {
  //   accessorKey: 'description',
  //   header: 'Description',
  //   cell: ({ row }) => {

  //     // util (put somewhere shared)
  //     const toPlainText = (html) => {
  //       if (!html) return '';
  //       const doc = new DOMParser().parseFromString(html, 'text/html');
  //       // remove script/style entirely
  //       doc.querySelectorAll('script,style').forEach((el) => el.remove());
  //       return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  //     };

  //     return (
  //       <span>{toPlainText(row?.original?.description)}</span>
  //     )
  //   }


  // }
  ,
  {
    accessorKey: 'paymentMode',
    header: 'Payment Mode',
    cell: ({ row }) =>
      row?.original?.paymentMode
  },
  {
    accessorKey: 'paidBy',
    header: 'Paid By',
    cell: ({ row }) =>
      (row?.original?.paidBy ?? '')
        .replace(/[\[\]"']/g, '')
        .replace(/\s*,\s*/g, ', ')
        .trim()
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) =>
      row?.original?.amount
  },

  {
    accessorKey: 'receiptNumber',
    header: 'Receipt Number',
    cell: ({ row }) =>
      row?.original?.receiptNumber
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => row?.original?.date || "-"

  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      row?.original?.status == "0" ? "Pending" : "Approved"
  },
]
