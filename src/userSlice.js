import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false,
  userName: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        isLogged: action.payload,
        userName: 'admin'
      }
    },
    logout: (state) => {
      return {
        ...state,
        isLogged: false,
        userName: ''
      }
    }
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer