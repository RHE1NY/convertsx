import ConverterReducer, {ConverterReducerState} from "./converterReducer";
import {combineReducers} from 'redux';

export interface AppState {
    converter: ConverterReducerState
}

export const rootReducer = () => combineReducers<AppState>({
  converter: ConverterReducer
})
