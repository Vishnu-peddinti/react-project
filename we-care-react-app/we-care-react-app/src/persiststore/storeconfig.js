import rootReducer from '../reducers/Rootreducer';
import storage from 'redux-persist/lib/storage';
import {applyMiddleware, legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { thunk } from 'redux-thunk';
const persistconfig = {
    key:'root',
    storage
};

const persistedReducer = persistReducer(persistconfig, rootReducer);

export const store = applyMiddleware(thunk)(createStore)(persistedReducer);
export const persistor = persistStore(store);