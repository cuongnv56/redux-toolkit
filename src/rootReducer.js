import { combineReducers } from 'redux'
import productReducer from './productSlice'
import product2Reducer from './product2Slice'
import aboutReducer from './aboutSlice'
import userReducer from './userSlice'

export default combineReducers({
    productReducer,
    product2Reducer,
    aboutReducer,
    userReducer,
})
