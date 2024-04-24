import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        isLogged: action.payload
      }
    }
  },
})

export const { login } = userSlice.actions

export default userSlice.reducer