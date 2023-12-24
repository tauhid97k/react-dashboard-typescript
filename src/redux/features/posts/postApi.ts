import baseApi from '@/redux/api'
// import { Post } from '@/lib/dataTypes'

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['posts'],
    }),
  }),
})

export const { useGetPostsQuery } = postsApi
