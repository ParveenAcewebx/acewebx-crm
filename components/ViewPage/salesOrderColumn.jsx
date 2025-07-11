'use client'

import { ChevronDown, ChevronLeft, Edit } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

export const SalesOrderColumn = (
  handleEditSalesOrder,
  expandedRowId,
  handleToggleAccordion
) => [
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => handleEditSalesOrder(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
              </div>
            </TooltipTrigger>
            <TooltipContent className='!mr-40'>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    id: 'revId',
    header: '',
    cell: () => ''
  },
  {
    accessorKey: 'name',
    header: 'Customer Name',
    cell: ({ row }) => row.original.customer?.name || '-'
  },
  {
    accessorKey: 'ship_to',
    header: 'Ship To',
    cell: ({ row }) => row.original.ship_to || '-'
  },
  {
    accessorKey: 'material_total',
    header: 'Material Total',
    cell: ({ row }) => row.original.material_total || '-'
  },
  {
    accessorKey: 'additional_total',
    header: 'Additional Total',
    cell: ({ row }) => row.original.additional_total || '-'
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => row.original.total || '-'
  },
  {
    id: 'expand_icon',
    header: '',
    cell: ({ row }) => {
      const isExpanded = expandedRowId === row?.original?.id
      const budgetChildLength = row?.original?.budgetBookChild?.length > 0

      return budgetChildLength ? (
        <div
          onClick={() => handleToggleAccordion(row.original.id)}
          className='cursor-pointer'
        >
          {isExpanded ? (
            <ChevronDown className='!h-4 !w-4' />
          ) : (
            <ChevronLeft className='!h-4 !w-4' />
          )}
        </div>
      ) : null
    }
  }
]
