/*
  @desc responsible for initiating redux including middleware.
*/
import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import omit from 'lodash/omit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';

/* Setting up redux-persist */
const blacklistTransform = createTransform( // Doesn't persist errors and loading for selected keys
    (inboundState, key) => {
        if (key === 'authStore') {
            return omit(inboundState, ['error', 'loading']);
        }
        if (key === 'moviesStore') {
            return omit(inboundState, ['error', 'loading']);
        }
        return inboundState;
    },
);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: null,
    transforms: [blacklistTransform],
    blacklist: ['moviesReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* To support redux dev-tool, set up composeEnhancers to dev-tool if exists.
if not use standard redux compose. */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Setting up saga */
const Saga = createSagaMiddleware();

/* Create the store with our middle wares */
const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(Saga),
    ),
);

Saga.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
