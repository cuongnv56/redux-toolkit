import { combineReducers } from 'redux'
import productReducer from './productSlice'
import product2Reducer from './product2Slice'
import aboutReducer from './aboutSlice'
import userReducer from './userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistRootConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'product2']
}

const userConfig = {
    key: 'user',
    storage,
    blacklist: ['userName']
}

const rootReducer = combineReducers({
    user: persistReducer(userConfig, userReducer),
    about: aboutReducer,
    product: productReducer,
    product2: product2Reducer,
});
  
export default persistReducer(persistRootConfig, rootReducer);

// export default rootReducer

// export default persistReducer(persistConfig, rootReducer)

// export default combineReducers({
//     productReducer,
//     product2Reducer,
//     aboutReducer,
//     userReducer,
// })
