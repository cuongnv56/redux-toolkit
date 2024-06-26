import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
// import productReducer from './productSlice'
import rootReducer from "./rootReducer"
// import aboutReducer from "./aboutSlice"
// import userReducer from "./userSlice"
import rootSaga from './sagas'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const sagaMiddleware = createSagaMiddleware()

// const persistRootConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['user', 'about']
// }

// const persistedReducer = persistReducer(persistRootConfig, rootReducer)

const store = configureStore({
    reducer: rootReducer,
    // reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    // reducer: {
    //     product: productReducer,
    //     product2: productReducer,
    //     about: aboutReducer,
    //     user: userReducer,
    // },
})

// sagaMiddleware.run(rootSaga)
const action = type => store.dispatch({type})

export const persistor = persistStore(store)

export { store }