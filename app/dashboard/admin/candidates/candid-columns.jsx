'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'

export const CandidColumns = (
  handleDeleteCand,
  handleEditCand,
  handlePreviewCand,
  DCSOpenModal
) => [
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
                onClick={() => handlePreviewCand(row)}
                className='cursor-pointer text-blue-400'
              >
                <Eye className='mr-2 h-4 w-4' />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleEditCand(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteCand(row)}
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
    accessorKey: 'id',
    header: '#ID',
    cell: ({ row }) => row.original?.id
  },

  {
    accessorKey: 'name',
    header: () => (
      <>
        <span>Name</span>
        <br />
        <span>Email</span>
        <br />
        <span>Phone</span>
      </>
    ),
    cell: ({ row }) => (
      <>
        <span>{row.original?.name}</span>
        <br />
        <span>{row.original?.email}</span>
        <br />
        <span>{row.original?.phone}</span>
      </>
    )
  },

  {
    accessorKey: 'noticePeriod',
    header: 'Notice Period',
    cell: ({ row }) => row.original?.noticePeriod
  },
  {
    accessorKey: 'totalExperience',
    header: 'Experience',
    cell: ({ row }) => row.original?.totalExperience
  },
  {
    accessorKey: 'dob',
    header: 'DOB',
    cell: ({ row }) => row.original?.dob
  },
  {
    accessorKey: '_currentCompanyName',
    header: 'C. C. Name',
    cell: ({ row }) => row.original?.meta?._currentCompanyName
  },
  {
    accessorKey: '_currentLocation',
    header: 'Current Location',
    cell: ({ row }) => row.original?.meta?._currentLocation
  },
  {
    accessorKey: '_designationApplyingFor',
    header: 'Skill',
    cell: ({ row }) => row.original?.meta?._designationApplyingFor
  },
  {
    accessorKey: '_gender',
    header: 'Gender',
    cell: ({ row }) => row.original?.meta?._gender
  },
  {
    accessorKey: '_preferredShift',
    header: 'Preferred Shift',
    cell: ({ row }) => row.original?.meta?._preferredShift
  }
]
