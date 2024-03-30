import { combineReducers } from 'redux'
import productReducer from './productSlice'
import product2Reducer from './product2Slice'

export default combineReducers({
    productReducer,
    product2Reducer,
})
