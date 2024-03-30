import { all, fork } from "redux-saga/effects"
import ProductSaga from "./product/saga"

export default function* rootSaga() {
    yield all([fork(ProductSaga)])
}
