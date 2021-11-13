import { applyMiddleware, createStore, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from "redux-logger";
import {rootReducer} from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

let middleware: Middleware[] = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, createLogger()];
}

export const store = createStore(rootReducer(), applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);
