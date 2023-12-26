import PageHeader from '@/components/ui/page-header'
import { DataTable } from '@/components/ui/data-table'
import { postColumns } from './columns'
import { useGetPostsQuery } from '@/redux/features/posts/postApi'
import { Button } from '@/components/ui/button'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loading from '@/components/ui/loading'
import Error from '@/components/ui/Error'

const PostsPage = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isError, isLoading } = useGetPostsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  })

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <>
      <PageHeader>
        <Button asChild>
          <Link to="/dashboard/posts/create">
            <BiPlus className="btn-icon" />
            <span>Add Post</span>
          </Link>
        </Button>
      </PageHeader>
      <DataTable
        columns={postColumns}
        data={data}
        totalData={71}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  )
}

export default PostsPage
