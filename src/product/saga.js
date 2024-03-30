import { takeLatest, put, call } from "redux-saga/effects"
import axios from "axios"
import { saveProducts2 } from "../product2Slice";

function* onGetProducts() {
    try {
        const response = yield axios.get("https://dummyjson.com/products")
        // saveProducts2(response?.data?.products)  
        yield put(saveProducts2(response?.data?.products));
    } catch (error) {
        // yield put(getProductsFail(error.response));
    }
}

// function* onGetProductDetails({ payload: id }) {
//     try {
//         const response = yield call(getProductDetails, id)
//         yield put(getProductDetailsSuccess(response))
//     } catch (error) {
//         yield put(getProductDetailsFail(error.response))
//     }
// }

function*  ProductSaga() {
    yield takeLatest("products2/saveProducts2", onGetProducts)
    // yield takeLatest("GET_PRODUCT_DETAILS", onGetProductDetails)
}

export default ProductSaga
