'use client'

import { paymentMode } from '@/components/constants/StaticData'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Eye, Link, Trash2 } from 'lucide-react'

export const ExpenseColumn = (handleDeleteExpense, handleEditExpense, getList) => {

  const totalAmount = getList?.reduce((sum, item) => sum + (item.amount || 0), 0);
  return [
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

    {
      accessorKey: 'paymentMode',
      header: 'Payment Mode',
      cell: ({ row }) => {
        const newData = paymentMode?.filter((item) => item?.value == row?.original?.paymentMode)
        return newData[0]?.label
      }
    },

    {
      accessorKey: "paidBy",
      header: "Paid By",
      cell: ({ row }) => {
        let candidateOptions = [];

        if (typeof window !== "undefined" && window.localStorage) {
          const storedData = localStorage.getItem("globalSettings");
          const skillDataOption = storedData ? JSON.parse(storedData) : null;

          if (skillDataOption?.reportingManager) {
            candidateOptions = skillDataOption.reportingManager?.map((item) => ({
              value: item?.email,
              label: item?.name,
            }));
          }
        }

        let paidByList = [];
        try {
          if (row?.original?.paidBy) {
            paidByList = JSON.parse(row.original?.paidBy);
          }
        } catch (e) {
          console.warn("Invalid paidBy format", row?.original?.paidBy);
        }

        const matchedLabels = paidByList.map((email) => {
          const match = candidateOptions.find((opt) => opt.value === email);
          return match ? match.label : email;
        });

        return matchedLabels?.length > 0 ? matchedLabels.join(", ") : "-";
      },
    },

    {
      accessorKey: 'amount',
      header: `Amount (${totalAmount})`, // ✅ Show total here
      cell: ({ row }) => row?.original?.amount || 0, // show per-row value
      footer: () => `Total: ${totalAmount}`, // ✅ (optional) show total in footer too
    },

    {
      accessorKey: 'receiptNumber',
      header: 'Receipt Number',
      cell: ({ row }) => (
        <a
          href={row?.original?.receiptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-red-500"
        >
          <Link size={12} />
          <span>{row?.original?.receiptNumber}</span>
        </a>
      )
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
}
