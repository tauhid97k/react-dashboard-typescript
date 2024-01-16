import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './features/darkModeSlice'
import authReducer from './features/auth/authSlice'
import postReducer from './features/posts/postSlice'
import baseApiQuery from './api'
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    post: postReducer,
    [baseApiQuery.reducerPath]: baseApiQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiQuery.middleware),
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
