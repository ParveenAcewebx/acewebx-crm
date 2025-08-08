'use client'

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
import { TablePagination } from './tabel-pagination'

export function DataTable({
  columns,
  data,
  totalRecord,
  page,
  loading,
  setPage,
  length,
  type
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <>
    <div className="w-full overflow-x-auto"> 
  <div className="rounded-6 border-color-grey custom-tabels border bg-white">
  <Table>
    <TableHeader className='theme-bg-light-rgba'>
      {table?.getHeaderGroups()?.length > 0 &&
        table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers?.map(header => (
              <TableHead
                key={header.id}
                className='border-color-grey text-dark-color theme-bg-light-rgba px-2 py-2 text-xs'
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column?.columnDef?.header,
                      header.getContext()
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
            colSpan={(columns?.length || 0) + 1}
            className='h-16 px-2 text-center'
          >
            Loading...
          </TableCell>
        </TableRow>
      ) : !data?.length ? (
        <TableRow>
          <TableCell
            colSpan={(columns?.length || 0) + 1}
            className='h-24 px-2 text-center text-gray-500'
          >
            No result found
          </TableCell>
        </TableRow>
      ) : table?.getRowModel()?.rows?.length ? (
        table.getRowModel().rows.map(row => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
          >
            {row.getVisibleCells()?.length > 0 ? (
              row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  className='border-color-grey border-b px-2'
                >
                  {flexRender(
                    cell.column?.columnDef?.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))
            ) : (
              <TableCell colSpan={(columns?.length || 0) + 1}>
                No visible cells
              </TableCell>
            )}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={(columns?.length || 0) + 1}
            className='h-24 px-2 py-3 text-center text-gray-500'
          >
            No rows to display
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>
</div>

      {totalRecord > 10 ? (
        <TablePagination
          totalRecord={totalRecord}
          page={page}
          setPage={setPage}
          length={length}
          type={type}
        />
      ) : (
        ''
      )}
    </>
  )
}