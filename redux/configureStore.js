import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { productos } from './productos';
//import { comments } from './comments';
//import { promotions } from './promotions';
//import { partners } from './partners';
//import { favorites } from './favorites';

import { persistStore, persistCombineReducers } from 'redux-persist'; //Week3 Redux-Persist
import storage from 'redux-persist/es/storage'; //Week3 Redux-Persist

const config = {
    key: 'root',
    storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            productos,
            //comments,
            //partners,
            //promotions,
            //favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return { persistor, store };
}