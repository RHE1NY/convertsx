import { all, call, fork , takeEvery, put } from 'redux-saga/effects';
import {ConverterActionTypes} from "../actionTypes/converterActionTypes";
import {convertService} from "../services/convertService";
import {setAllCurrencies} from "../actions/converterActions";

function* getAllCurrencies() {
    try {
        const { data } = yield call(convertService.getAllCurrencies, '')
        yield put(setAllCurrencies(data))
    } catch(error) {

    }
}
function* watchOnConverter() {
    yield takeEvery(ConverterActionTypes.GET_ALL_CURRENCIES, getAllCurrencies);
}

export default function* converterSaga() {
    yield all([fork(watchOnConverter)]);
}
