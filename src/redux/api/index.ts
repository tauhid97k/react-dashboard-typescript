import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGF1aGlkQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MDQ0MzI3MzUsImV4cCI6MTcwNDUxOTEzNX0.pUdQeAF2dlZQwmahhr3i4sj7tBm0hl01jCNwI6tsbXE`
      )

      return headers
    },
  }),
  tagTypes: ['posts'],
  endpoints: () => ({}),
})

export default baseApi
