import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { clearCredentials, setCredentials } from '../features/auth/authSlice'

// Base Query
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

// Interceptor
const baseQueryWithInterceptor: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 403) {
    const refreshResult = await baseQuery(
      '/auth/refresh-token',
      api,
      extraOptions
    )

    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user
      api.dispatch(setCredentials({ ...refreshResult.data, user }))

      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(clearCredentials())
    }
  }

  return result
}

// Base API Setup
export const baseApiQuery = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['user', 'posts'],
  endpoints: () => ({}),
})

export default baseApiQuery
