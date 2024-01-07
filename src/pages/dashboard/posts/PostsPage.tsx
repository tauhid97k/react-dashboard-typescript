import PageHeader from '@/components/ui/page-header'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { useGetPostsQuery } from '@/redux/features/posts/postApi'
import { Button } from '@/components/ui/button'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PostSearchSchema } from '@/lib/formValidations'
import { useDebounce } from '@uidotdev/usehooks'
import { cn } from '@/lib/utils'
import { GoSearch } from 'react-icons/go'
import PageLoading from '@/components/page-loading'
import Error from '@/components/Error'
import AlertModal from '@/components/alert-modal'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import {
  deleteModalStatus,
  setDeleteModal,
} from '@/redux/features/posts/postSlice'

const PostsPage = () => {
  const isDeleteModalOpen = useAppSelector(deleteModalStatus)
  const dispatch = useAppDispatch()

  // Search, Pagination
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 1000)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  // Search register & handler
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
      setSearchInput(searchValue)
    }
  }

  const handleDelete = () => {}

  // Data Fetching
  const { data, isError, isLoading, isFetching } = useGetPostsQuery({
    search,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  })

  if (isLoading) return <PageLoading />
  if (isError) return <Error />

  return (
    <>
      <PageHeader>
        <Button size="sm" asChild>
          <Link to="/dashboard/posts/create">
            <BiPlus className="btn-icon" />
            <span>Add Post</span>
          </Link>
        </Button>
      </PageHeader>

      <div className="card">
        <div className="max-w-sm mb-4">
          <div className="relative">
            <GoSearch className="icon absolute top-2/4 left-3 -translate-y-2/4" />
            <input
              type="search"
              {...register('search')}
              onChange={onSearchChange}
              placeholder="Search here"
              className={cn('input', 'pl-10')}
              autoComplete="off"
            />
          </div>
          {errors?.search && (
            <span className="input-error">{errors.search.message}</span>
          )}
        </div>
        <DataTable
          columns={columns}
          data={data.data}
          totalData={data.meta.total}
          search={search}
          setSearch={setSearchInput}
          pagination={pagination}
          setPagination={setPagination}
          loading={isFetching}
        />
      </div>

      <AlertModal
        type="ALERT"
        title="Confirm Delete"
        description="This action cannot be undone. This will permanently delete your post and remove your data from the servers."
        isModalOpen={isDeleteModalOpen}
        setModalOpen={() => dispatch(setDeleteModal(!isDeleteModalOpen))}
        actionFn={handleDelete}
      />
    </>
  )
}

export default PostsPage
