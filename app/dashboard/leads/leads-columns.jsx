'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { format } from 'date-fns'
import { Edit, EllipsisVertical, Eye, File, Trash2 } from 'lucide-react'
import UploadDocumentDummy from '../budget-book/preview/UploadDocumentDummy'

export const LeadsColumns = (
  handleDeleteLeads,
  handleEditLeads,
  handlePreviewLeads,
  DCSOpenModal
) => [
 

  {
    accessorKey: 'id',
    header: '#ID',
       cell: ({ row }) => row.original?.id


     
    },


  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original?.name
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original?.email,
  },

   {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => row.original?.phone,
  },


      {
    accessorKey: 'totalExperience ',
    header: 'Experience',
    cell: ({ row }) => row.original?.totalExperience,   
  },


  
]
