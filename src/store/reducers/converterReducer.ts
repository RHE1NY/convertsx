import {IHistory} from "../../types/types";
import {ConverterAction, ConverterActionTypes} from "../actionTypes/converterActionTypes";


export interface ConverterReducerState {
    currencies: string[]
    history: IHistory[]
}

const initialState: ConverterReducerState = {
    history: [],
    currencies: []
}

export default function ConverterReducer(state: ConverterReducerState = initialState, action: ConverterAction): ConverterReducerState {
    switch (action.type) {
        case ConverterActionTypes.SET_HISTORY_ITEM:
            return { ...state, history: [...state.history, action.payload]}
        case ConverterActionTypes.SET_ALL_CURRENCIES:
            return { ...state, currencies: Object.keys(action.payload.rates)}
        default: return state
    }
}
