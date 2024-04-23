import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products2: [],
}

export const product2Slice = createSlice({
  name: 'products2',
  initialState,
  reducers: {
    saveProducts2: (state, action) => {
      return {
        ...state,
        products2: action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveProducts2 } = product2Slice.actions

export default product2Slice.reducer