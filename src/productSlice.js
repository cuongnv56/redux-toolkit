import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: [],
}

export const getProducts = createAsyncThunk(
  'products/fetch_products',
  async () => {
    const response = await axios.get("https://dummyjson.com/products")
    return response?.data?.products
  }
)

// export const getProducts = async () => {
//     const response = await axios.get("https://dummyjson.com/products")
//     console.log('?????????????? => ', response)
//     return response?.data?.products
// }

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveProducts: (state, action) => {
      return {
        ...state,
        products: action.payload
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const { saveProducts } = productSlice.actions

export default productSlice.reducer