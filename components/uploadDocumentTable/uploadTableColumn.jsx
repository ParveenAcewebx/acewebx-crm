'use client'

import { DocumentTypes } from '@/components/static-Values'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

export const UploadTableColumn = (handleDeleteDocument, setTableData, form) => [
  {
    id: 'file_name',
    header: 'File Name',
    cell: ({ row }) => row?.original?.file_name || '-'
  },
  {
    id: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const value = row?.original?.type || ''
      const handleTypeChange = e => {
        const newValue = e.target.value
        setTableData(prev =>
          prev.map((item, index) =>
            index === row.index ? { ...item, type: newValue } : item
          )
        )
      }

      return (
        <select
          className='h-10 w-72 rounded border px-2 py-1 text-sm'
          value={value}
          onChange={handleTypeChange}
        >
          <option value=''>Select Type...</option>
          {DocumentTypes.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )
    }
  },
  {
    id: 'notes',
    header: 'Notes',
    cell: ({ row }) => {
      const value = row?.original?.notes || ''
  
      const handleChange = e => {
        const newValue = e.target.value
        setTableData(prev =>
          prev.map(item =>
            item.id === row.original.id ? { ...item, notes: newValue } : item
          )
        )
      }
  
      return (
        <input
          defaultValue={value}
          onBlur={handleChange}
          placeholder='Enter notes...'
          className='!h-10 !min-h-10 !w-96 rounded border px-2 py-1 text-sm'
        />
      )
    }
  }
  ,
  {
    id: 'is_display',
    header: 'Display To Customer',
    cell: ({ row }) => {
      const isChecked = row?.original?.is_display == '1'

      const handleSwitchChange = value => {
        const newValue = value ? 1 : 0
        setTableData(prev =>
          prev.map((item, i) =>
            i === row.index ? { ...item, is_display: newValue } : item
          )
        )
      }

      return (
        <div className='scope-radio flex items-center gap-2'>
          <Switch checked={isChecked} onCheckedChange={handleSwitchChange} />
          <span>{isChecked ? 'On' : 'Off'}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => (
      <TooltipProvider>
        <div className='flex space-x-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='text-red-600 hover:bg-red-50'
                  onClick={() => handleDeleteDocument(row)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    )
  }
]
