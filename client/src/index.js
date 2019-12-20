import React from 'react';
import { render } from 'react-dom'
import App from './App';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'

import '../node_modules/bulma/bulma.sass'
import './css/index.scss';

// Logging middleware for the store
const logger = store => next => action => {
    if (!action.type) {
        next(action); return;
    }
    let result = next(action);
    return result
};

const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk)
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);