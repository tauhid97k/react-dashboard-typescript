import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './features/darkModeSlice'
import baseApi from './api'

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
