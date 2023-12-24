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
} from '@/components/ui/dropdown-menu'

export const postColumns: ColumnDef<Post>[] = [
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Published',
    accessorKey: 'is_published',
  },
  {
    header: 'Created At',
    accessorKey: 'created_at',
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      const { id } = row.original
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IoEllipsisVertical className="table-icon" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <BiEdit className="dropdown-icon" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BiTrash className="dropdown-icon" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
