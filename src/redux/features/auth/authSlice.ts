import { createSlice } from '@reduxjs/toolkit'

// Type
type StateTypes = {
  accessToken: null | string
  user: null | {
    name: string
    email: string
    email_verified_at: string
    created_at: string
    role: string
    permissions: []
  }
}

// Initial states
const initialState: StateTypes = {
  accessToken: null,
  user: null,
}

// Slice
const postSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload
      state.accessToken = accessToken
      state.user = user
    },
    clearCredentials: (state) => {
      state.accessToken = null
      state.user = null
    },
  },
})

export const { setCredentials, clearCredentials } = postSlice.actions
export const selectAccessToken = (state: { auth: StateTypes }) =>
  state.auth.accessToken
export const selectAuthUser = (state: { auth: StateTypes }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: StateTypes }) =>
  Boolean(state.auth.accessToken)
export default postSlice.reducer
