import baseQuery from '@/redux/api'

const authApi = baseQuery.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.query({
      query: () => '/auth/refresh-token',
    }),
    authUser: builder.query({
      query: () => '/auth/user',
      providesTags: ['user'],
    }),
    logout: builder.mutation({
      query: () => '/auth/logout',
    }),
  }),
})

export const { useLoginMutation, useAuthUserQuery, useRefreshTokenQuery } =
  authApi
