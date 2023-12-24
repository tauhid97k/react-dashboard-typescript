import { createSlice } from '@reduxjs/toolkit'

// Add/Remove dark class in root element
const setDarkClass = (isEnabled: boolean) => {
  if (isEnabled) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Type
type DarkModeType = {
  isEnabled: boolean
}

// Initial states
const initialState: DarkModeType = {
  isEnabled: false,
}

// Slice
const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isEnabled = !state.isEnabled
      setDarkClass(state.isEnabled)
    },
  },
})

export const { toggleDarkMode } = darkModeSlice.actions
export const selectDarkMode = (state: { darkMode: DarkModeType }) =>
  state.darkMode.isEnabled
export default darkModeSlice.reducer
