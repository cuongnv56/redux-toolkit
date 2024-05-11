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
    whitelist: ['about', 'product']
}

const userConfig = {
    key: 'user',
    storage,
    blacklist: ['userName']
}

const persistedReducer = persistReducer(persistRootConfig, combineReducers({
    user: persistReducer(userConfig, userReducer),
    about: aboutReducer,
    product: productReducer,
    product2: product2Reducer,
}))

const rootReducer = combineReducers({
    // user: persistReducer(userConfig, userReducer),
    root: persistedReducer,
    // about: aboutReducer,
    // product: productReducer,
    // product2: product2Reducer,
})

export default rootReducer

// export default persistReducer(persistConfig, rootReducer)

// export default combineReducers({
//     productReducer,
//     product2Reducer,
//     aboutReducer,
//     userReducer,
// })
