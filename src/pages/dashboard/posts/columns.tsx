import { ColumnDef } from '@tanstack/react-table'
import { Post } from '@/lib/dataTypes'
import { Button } from '@/components/ui/button'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { IoEllipsisVertical } from 'react-icons/io5'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu'
import { useAppDispatch } from '@/redux/hooks'
import { setDeleteModal } from '@/redux/features/posts/postSlice'

export const columns: ColumnDef<Post>[] = [
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Created At',
    accessorKey: 'created_at',
  },
  {
    header: 'Actions',
    cell: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useAppDispatch()

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IoEllipsisVertical className="table-icon" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <BiEdit className="icon" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => dispatch(setDeleteModal(true))}
              className="text-red-400 dark:text-red-400"
            >
              <BiTrash className="icon" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
