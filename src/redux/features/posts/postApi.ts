import baseQuery from '@/redux/api'

const postsApi = baseQuery.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ search, page, limit = 10 }) =>
        `/posts?search=${search}&page=${page}&limit=${limit}`,
      providesTags: ['posts'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts'],
    }),
  }),
})

export const { useGetPostsQuery, useDeletePostMutation } = postsApi
