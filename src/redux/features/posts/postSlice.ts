import { createSlice } from '@reduxjs/toolkit'
// Type
type StateTypes = {
  isDeleteModalOpen: boolean
}

// Initial states
const initialState: StateTypes = {
  isDeleteModalOpen: false,
}

// Slice
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setDeleteModal: (state, action) => {
      state.isDeleteModalOpen = action.payload
    },
  },
})

export const { setDeleteModal } = postSlice.actions
export const deleteModalStatus = (state: { post: StateTypes }) =>
  state.post.isDeleteModalOpen
export default postSlice.reducer
