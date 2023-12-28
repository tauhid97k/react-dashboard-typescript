import baseApi from '@/redux/api'

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ search, page, limit = 10 }) =>
        `/posts?search=${search}&page=${page}&limit=${limit}`,
      providesTags: ['posts'],
    }),
  }),
})

export const { useGetPostsQuery } = postsApi
