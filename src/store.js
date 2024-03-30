import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
// import productReducer from './productSlice'
import rootReducer from "./rootReducer"
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    // reducer: {
    //     product: productReducer,
    //     product2: productReducer,
    // },
})

sagaMiddleware.run(rootSaga)
// const action = type => store.dispatch({type})

export { store }