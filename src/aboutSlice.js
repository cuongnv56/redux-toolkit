import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  about: '',
}

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    saveAbout: (state, action) => {
      return {
        ...state,
        about: action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveAbout } = aboutSlice.actions

export default aboutSlice.reducer