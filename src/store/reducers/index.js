import { combineReducers } from 'redux';

import authStore from './auth.reducer';
import moviesStore from './movies.reducer';

const rootReducer = combineReducers({
    authStore,
    moviesStore
});

export default rootReducer;
