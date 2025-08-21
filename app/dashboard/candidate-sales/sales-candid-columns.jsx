'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Edit, EllipsisVertical, Eye, Send, Trash2 } from 'lucide-react'

export const SalesCandidColumns = (
  handleDeleteCand,
  handleEditCand,
  handlePreviewCand,
  handleSendWalkInForm,
  handleEdit
) => [
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className='grid grid-cols-3 w-5'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <EllipsisVertical className='h-5 w-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => handlePreviewCand(row)}
                className='cursor-pointer text-blue-400'
              >
                <Eye className='mr-2 h-4 w-4' />
                View
              </DropdownMenuItem>
              {/* Edit */}
              <DropdownMenuItem
                onClick={() => handleEdit(row)}
                className='cursor-pointer text-green-400'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
                {/* <DropdownMenuItem
                  onClick={() => handlePreviewCand(row)}
                  className='cursor-pointer text-blue-400'
                >
                  <Eye className='mr-2 h-4 w-4' />
                  View
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem
                onClick={() => handleEditCand(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem> */}
                {/* <DropdownMenuItem
                  onClick={() => handleDeleteCand(row)}
                  className='cursor-pointer text-red-600'
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete
                </DropdownMenuItem> */}
                <DropdownMenuItem
                  onClick={() => handleSendWalkInForm(row)}
                  className='cursor-pointer text-yellow-600'
                >
                  <Send className='mr-2 h-4 w-4' />
                  Send Walk In Form
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    },
    {
      accessorKey: 'id',
      header: '#ID',
      size: 80,
      cell: ({ row }) => (
        <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
          {`#SALE-${row.original?.id}`}
        </div>
      )
    },

    {
      accessorKey: 'name',
      header: () => (
        <>
          Contact Information
        </>
      ),
      cell: ({ row }) => (
        <>
          <span>
            {`${row.original?.name} - ${row.original?.email} - ${row.original?.phone}`}
          </span>
        </>
      )
    },

    {
      accessorKey: 'currentSalary',
      header: () => (
        <>
          Current / Expected
        </>
      ),
      cell: ({ row }) => (
        <>
          <span>{row.original?.currentSalary}</span>
          -
          <span>{row.original?.expectedSalary}</span>

        </>
      )
    },
    {
      accessorKey: 'totalExperience',
      header: () => (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>Exp.</span>
            </TooltipTrigger>
            <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
              Total Experience
            </TooltipContent>
          </Tooltip>

        </>
      ),
      cell: ({ row }) => row.original?.totalExperience
    },

    {
      accessorKey: 'monthlySalesTarget',
      header: () => (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>M.S.T.</span>
            </TooltipTrigger>
            <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
              Monthly Sales Target
            </TooltipContent>
          </Tooltip>

        </>
      ),
      cell: ({ row }) => row.original?.monthlySalesTarget
    },
    {
      accessorKey: 'freshBusinessTarget',
      header: () => (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>F.B.T.</span>
            </TooltipTrigger>
            <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
              Fresh Business Target
            </TooltipContent>
          </Tooltip>

        </>
      ),
      cell: ({ row }) => row.original?.freshBusinessTarget
    },
    {
      accessorKey: 'businessMethods',
      header: 'Business Methods',
      cell: ({ row }) => {

        const data = row.original?.businessMethods?.replace(/[\[\]"]/g, '')
        return (
          <>
            {data}
          </>
        )
      }
    },
    {
      accessorKey: 'leadPlatforms',
      header: 'Lead Platforms',
      cell: ({ row }) => {
        const data = row.original?.leadPlatforms?.replace(/[\[\]"]/g, '')
        return (
          <>
            {data}
          </>
        )
      }

    },
    {
      accessorKey: 'preferredShift',
      header: 'Shift',
      cell: ({ row }) => {
        const data = row.original?.preferredShift?.replace(/[\[\]"]/g, '')
        return (
          <>
            {data}
          </>
        )
      }

    }
  ]