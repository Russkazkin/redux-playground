import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";

import './index.css';

const rootReducer = combineReducers({
    counter: counterReducer,
    result: resultReducer
});

const logger = store => next => action => {
    console.log('[Middleware] Dispatching', action);
    const result = next(action);
    console.log('[Middleware] Next state', store.getState());
    return result;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
