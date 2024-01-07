import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer `)

      return headers
    },
  }),
  tagTypes: ['posts'],
  endpoints: () => ({}),
})

export default baseApi
