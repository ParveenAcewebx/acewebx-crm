'use client'

import { TablePagination } from '@/components/tabel-pagination'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

export function QuoteBulkDataTable({
  columns,
  data,
  totalRecord,
  page,
  loading,
  setPage,
  length,
  rowSelection,
  setRowSelection
}) {
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getRowId: (row, index) => index.toString(), // 👈 use index as fallback ID
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className='rounded-6 border-color-grey custom-tabels border'>
        <Table>
          <TableHeader className='theme-bg-light-rgba'>
            {table?.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup?.id}>
                {headerGroup?.headers.map(header => (
                  <TableHead
                    key={header?.id}
                    className='border-color-grey text-dark-color theme-bg-light-rgba border-b p-3 text-sm'
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
                  className='h-16 text-center'
                >
                  <Spinner
                    size='lg'
                    className='m-auto bg-black dark:bg-white'
                  />
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length + 1}
                  className='h-24 text-center text-gray-500'
                >
                  No result found
                </TableCell>
              </TableRow>
            ) : (
              table?.getRowModel()?.rows?.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className={row.getIsSelected() ? 'bg-gray-100' : ''}
                >
                  {row?.getVisibleCells()?.map(cell => (
                    <TableCell
                      key={cell?.id}
                      className='border-color-grey border-b p-3'
                    >
                      {flexRender(
                        cell?.column?.columnDef?.cell,
                        cell?.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          totalRecord={totalRecord}
          page={page}
          setPage={setPage}
          length={length}
        />
      </div>
    </>
  )
}
