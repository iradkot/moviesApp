import { all, fork } from 'redux-saga/effects';
import authSaga from './auth.saga';
import moviesSaga from './movies.saga';



export default function* () {
    yield all([fork(authSaga), fork(moviesSaga)]);
}
