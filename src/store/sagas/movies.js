import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as moviesConstants from 'store/constants/movies';

function* getMovie() {
    console.log('Getting Movie... :() ;)');
}

function* moviesSaga() {
    yield takeLatest(moviesConstants.GET_MOVIE, getMovie);
}

export default moviesSaga;
