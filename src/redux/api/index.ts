import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://657c58cd853beeefdb994115.mockapi.io/api/',
  }),
  tagTypes: ['posts'],
  endpoints: () => ({}),
})

export default baseApi
