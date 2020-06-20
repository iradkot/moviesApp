import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import moviesSaga from './movies';



export default function* () {
    yield all([fork(authSaga), fork(moviesSaga)]);
}
