'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Eye } from 'lucide-react'

import React from 'react'
import { TablePagination } from '../tabel-pagination'

export function LeadPreviewQuotesTable({
  columns,
  data,
  totalRecord,
  page,
  loading,
  setPage,
  length,
  type,
  expandedRowId,
  handleEditAction,
  handleEyeAction,
  handlePreviewAction
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className='rounded-6 border-color-grey custom-tabels border bg-white'>
        <Table>
          <TableHeader className='theme-bg-light-rgba'>
            {table?.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup?.id}>
                {headerGroup?.headers.map(header => (
                  <TableHead
                    key={header?.id}
                    className='border-color-grey text-dark-color theme-bg-light-rgba !w-48 px-3 py-4 text-sm'
                  >
                    {header?.isPlaceholder
                      ? null
                      : flexRender(
                          header?.column?.columnDef?.header,
                          header?.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length + 1}
                  className='h-16 px-2 py-3 text-center'
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length + 1}
                  className='h-24 px-2 py-3 text-center text-gray-500'
                >
                  No result found
                </TableCell>
              </TableRow>
            ) : (
              table?.getRowModel()?.rows?.map(row => (
                <React.Fragment key={row?.id}>
                  {/* Main Row */}
                  <TableRow
                    data-state={row?.getIsSelected() && 'selected'}
                    className='!bg-blue-100'
                  >
                    {row?.getVisibleCells()?.map(cell => (
                      <TableCell
                        key={cell?.id}
                        className='border-color-grey border-b px-2 py-3'
                      >
                        {flexRender(
                          cell?.column?.columnDef?.cell,
                          cell?.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Expanded Child Row */}
                  {expandedRowId === row.original.id && (
                    <TableRow className='bg-muted'>
                      <TableCell colSpan={columns.length + 1} className='p-0'>
                        <Accordion
                          type='single'
                          collapsible
                          defaultValue='item-1'
                          className='w-full'
                        >
                          <AccordionItem value='item-1'>
                            <AccordionContent>
                              <Table className='w-full table-fixed'>
                                <TableHeader className='theme-bg-light-rgba !h-0'>
                                  {table?.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup?.id}>
                                      {headerGroup?.headers.map(header => (
                                        <TableHead
                                          key={header?.id}
                                          className='!h-0 !p-0 !px-0 !py-0'
                                        ></TableHead>
                                      ))}
                                    </TableRow>
                                  ))}
                                </TableHeader>
                                <TableBody>
                                  {row?.original?.budgetBookChild?.length >
                                  0 ? (
                                    row.original.budgetBookChild.map(
                                      (data, index) => (
                                        <TableRow key={index}>
                                          <TableCell className='border-color-grey flex w-[5%] gap-2 border-b px-3 py-2'>
                                            <TooltipProvider>
                                              {/* <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <div
                                                    onClick={() =>
                                                      handleEditAction(data.id)
                                                    }
                                                    className='cursor-pointer text-green-600'
                                                  >
                                                    <Edit className='mr-2 h-4 w-4' />
                                                  </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                  <p>Edit</p>
                                                </TooltipContent>
                                              </Tooltip> */}

                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  {/* <div
                                                    onClick={() =>
                                                      handlePreviewAction(
                                                        data?.id
                                                      )
                                                    }
                                                    className='cursor-pointer text-blue-600'
                                                  >
                                                    <ExternalLink className='mr-2 h-4 w-4' />
                                                  </div> */}
                                                  <div
                                                    onClick={() =>
                                                      handlePreviewAction(
                                                        data?.id
                                                      )
                                                    }
                                                    className='cursor-pointer text-blue-600'
                                                  >
                                                    <Eye className='mr-2 h-4 w-4' />
                                                  </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                  <p>Preview</p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          </TableCell>
                                          <TableCell className='border-color-grey border-b px-2 py-3'>
                                            REV-{data?.id || '-'}
                                          </TableCell>
                                          <TableCell className='border-color-grey border-b px-2 py-3'>
                                            {data?.parsed_log?.budgetBook
                                              ?.name || '-'}
                                          </TableCell>
                                          <TableCell className='border-color-grey border-b px-2 py-3'>
                                            {data?.parsed_log?.lead?.project
                                              ?.name || '-'}
                                          </TableCell>
                                          <TableCell className='border-color-grey border-b px-2 py-3'>
                                            {data?.parsed_log?.address || '-'}
                                          </TableCell>
                                          <TableCell className='border-color-grey border-b px-2 py-3'>
                                            {data?.parsed_log?.quote_date
                                              ? new Date(
                                                  data.parsed_log.quote_date
                                                ).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                                  day: '2-digit'
                                                })
                                              : '-'}
                                          </TableCell>
                                          <TableCell className='border-color-grey border-b px-2 py-3'>
                                            {data?.parsed_log?.total ||
                                              '0.0000'}
                                          </TableCell>
                                          <TableCell className='border-color-grey border-b px-2 py-3'>
                                            {data?.parsed_log?.plan_status ||
                                              '-'}
                                          </TableCell>
                                          <TableCell className=''></TableCell>
                                        </TableRow>
                                      )
                                    )
                                  ) : (
                                    <TableRow>
                                      <TableCell
                                        colSpan={8}
                                        className='py-4 text-center'
                                      >
                                        No child data found
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalRecord > 10 && (
        <TablePagination
          totalRecord={totalRecord}
          page={page}
          setPage={setPage}
          length={length}
          type={type}
        />
      )}
    </>
  )
}
