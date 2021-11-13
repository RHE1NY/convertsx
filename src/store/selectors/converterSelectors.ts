import {AppState} from "../reducers/rootReducer";

export const getHistory = (state: AppState) => state.converter.history
export const getCurrencies = (state: AppState) => state.converter.currencies
