import {IData, IHistory} from "../../types/types";

export enum ConverterActionTypes {
    GET_ALL_CURRENCIES = 'converterActionTypes/GET_ALL_CURRENCIES',
    SET_ALL_CURRENCIES = 'converterActionTypes/SET_ALL_CURRENCIES',
    SET_HISTORY_ITEM = 'converterActionTypes/SET_HISTORY_ITEM'
}

export interface SetHistoryItemAction {
    type: ConverterActionTypes.SET_HISTORY_ITEM,
    payload: IHistory
}

export interface GetAllCurrenciesAction {
    type: ConverterActionTypes.GET_ALL_CURRENCIES
}

export interface SetAllCurrenciesAction {
    type: ConverterActionTypes.SET_ALL_CURRENCIES,
    payload: IData
}

export type ConverterAction = SetHistoryItemAction | SetAllCurrenciesAction
