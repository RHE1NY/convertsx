import {all} from "redux-saga/effects";
import converterSaga from "./converterSaga";

export default function* rootSaga() {
    yield all([
        converterSaga()
    ]);
}
