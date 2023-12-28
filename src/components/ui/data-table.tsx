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
import TableLoading from './table-loading'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PostSearchSchema } from '@/lib/formValidations'
import { useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading: boolean
  search: string
  pagination: {
    pageIndex: number
    pageSize: number
  }
  totalData: number
  setSearch: OnChangeFn<any>
  setPagination: OnChangeFn<PaginationState>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  search,
  pagination,
  totalData,
  setSearch,
  setPagination,
}: DataTableProps<TData, TValue>) {
  // Search debounce
  const [searchInputChange, setSearchInputChange] = useState('')
  const debouncedSearchInput = useDebounce(searchInputChange, 600)

  // Init table
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      globalFilter: search,
    },
    manualFiltering: true,
    manualPagination: true,
    pageCount: Math.ceil(totalData / pagination.pageSize),
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PostSearchSchema),
    defaultValues: {
      search: '',
    },
  })

  const onSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue: string = e.target.value
    const isValid = await trigger('search')
    if (isValid) {
      setValue('search', searchValue)
      setSearchInputChange(searchValue)
    }
  }

  // Rerender on search change
  useEffect(() => {
    table.setGlobalFilter(debouncedSearchInput)
    table.resetPagination()
  }, [debouncedSearchInput])

  return (
    <div className="card relative overflow-hidden">
      {loading && <TableLoading />}
      <div className="max-w-sm mb-4">
        <input
          type="search"
          {...register('search')}
          onChange={onSearchChange}
          placeholder="Search here"
          className="input"
          autoComplete="off"
        />
        {errors?.search && (
          <span className="input-error">{errors.search.message}</span>
        )}
      </div>
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
      {data.length > 0 && (
        <ReactPaginate
          pageCount={table.getPageCount()}
          forcePage={table.getState().pagination.pageIndex}
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
      )}
    </div>
  )
}
