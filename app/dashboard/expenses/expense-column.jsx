'use client'

import { paymentMode } from '@/components/constants/StaticData'
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
    cell: ({ row }) => {
      const newData = paymentMode?.filter((item) => item?.value == row?.original?.paymentMode)

      return (
        newData[0]?.label
      )
    }
  },
  {
    accessorKey: "paidBy",
    header: "Paid By",
    cell: ({ row }) => {
      let candidateOptions = [];

      // 🔹 Get managers list from localStorage
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

      // 🔹 Parse paidBy safely (can be null, "[]", or valid JSON string)
      let paidByList = [];
      try {
        if (row?.original?.paidBy) {
          paidByList = JSON.parse(row.original?.paidBy);
        }
      } catch (e) {
        console.warn("Invalid paidBy format", row?.original?.paidBy);
      }

      // 🔹 Map emails → names (fallback to email if no name found)
      const matchedLabels = paidByList.map((email) => {
        const match = candidateOptions.find((opt) => opt.value === email);
        return match ? match.label : email; // fallback to email
      });

      return matchedLabels?.length > 0 ? matchedLabels.join(", ") : "-";
    },
  }

  ,
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
      <a href={row?.original?.receiptUrl} target='_blank' >  {row?.original?.receiptNumber} </a>
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
