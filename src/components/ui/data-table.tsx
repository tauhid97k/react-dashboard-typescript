import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import ReactPaginate from 'react-paginate'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: {
    pageIndex: number
    pageSize: number
  }
  totalData: number
  setPagination: OnChangeFn<PaginationState>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  totalData,
  setPagination,
}: DataTableProps<TData, TValue>) {
  // Init table
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount: Math.ceil(totalData / pagination.pageSize),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-28 text-center text-lg text-gray-500"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ReactPaginate
        pageCount={table.getPageCount()}
        initialPage={table.getState().pagination.pageIndex}
        onPageChange={({ selected }) => table.setPageIndex(selected)}
        previousLabel={<IoChevronBack className="paginate-icon" />}
        previousLinkClassName="h-10 w-10 flex items-center justify-center gap-1 rounded-full whitespace-nowrap text-base font-medium text-gray-600 dark:text-gray-300 tracking-wide transition-colors focus:outline-none focus:ring-2 ring-offset-2 ring-gray-300 dark:ring-gray-700/60 dark:ring-offset-gray-900 bg-gray-200 hover:bg-gray-200/80 dark:bg-gray-700 dark:hover:bg-gray-700/90"
        nextLabel={<IoChevronForward className="paginate-icon" />}
        nextLinkClassName="h-10 w-10 flex items-center justify-center gap-1 rounded-full whitespace-nowrap text-base font-medium text-gray-600 dark:text-gray-300 tracking-wide transition-colors focus:outline-none focus:ring-2 ring-offset-2 ring-gray-300 dark:ring-gray-700/60 dark:ring-offset-gray-900 bg-gray-200 hover:bg-gray-200/80 dark:bg-gray-700 dark:hover:bg-gray-700/90"
        disabledClassName="pointer-events-none opacity-50"
        containerClassName="flex items-center justify-center gap-4 pt-4"
        pageClassName="w-10 h-10 font-medium rounded-full border-2 dark:border-gray-800 overflow-hidden"
        pageLinkClassName="w-full h-full flex items-center justify-center focus:outline-none"
        activeClassName="text-blue-700 !border-blue-500 dark:text-blue-300"
        activeLinkClassName="bg-blue-100 dark:bg-blue-950"
        breakLabel="..."
        pageRangeDisplayed={1}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
