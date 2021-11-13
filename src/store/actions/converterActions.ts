import {IData, IHistory} from "../../types/types";
import {
    ConverterActionTypes,
    GetAllCurrenciesAction,
    SetAllCurrenciesAction,
    SetHistoryItemAction
} from "../actionTypes/converterActionTypes";

export const setNewHistoryItem = (historyItem: IHistory): SetHistoryItemAction => ({
    type: ConverterActionTypes.SET_HISTORY_ITEM,
    payload: historyItem
})

export const getAllCurrencies = (): GetAllCurrenciesAction => ({
    type: ConverterActionTypes.GET_ALL_CURRENCIES
})

export const setAllCurrencies = (data: IData): SetAllCurrenciesAction => ({
    type: ConverterActionTypes.SET_ALL_CURRENCIES,
    payload: data
})
