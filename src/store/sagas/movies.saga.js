import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import * as moviesConstants from 'store/constants/movies.constants';
import * as moviesSelectors from 'store/selectors/movies.selectors';
import * as moviesActions from 'store/actions/movies.actions';
import * as tmdbRequest from 'api/TMDB/requests';

function* getTmdbConfig() {
    try {
        const response = yield tmdbRequest.getConfiguration();
        yield put(moviesActions.getTmdbConfigSuccess(response.data))
        console.log({ response });
    } catch (e) {
        yield put(moviesActions.getTmdbConfigFailed(e))
        yield put(moviesActions.initializeMoviesStoreFailed(e));
        console.log({e});
    }
}
function* initializeMoviesStore() {
    try {
        const moviesConfig = yield select(moviesSelectors.tmdbConfig);
        if (!moviesConfig) return yield put(moviesActions.getTmdbConfig());
        console.log('we are here now with config:', moviesConfig);
        const response = yield tmdbRequest.getPopularMoviesList({language: 'en-US', page: 1, region: 'il'});
        const moviesArray = get(response, 'data.results', []);
        // TODO: implement get favourites from firebase
        const favouriteMovies = [];
        // parse movies for display
        const imagesBaseUrl = yield select(moviesSelectors.imagesBaseUrl);
        const posterSizes = yield select(moviesSelectors.posterSizes);
        const backdropSizes = yield select(moviesSelectors.backdropSizes);
        const parsedPopularMoviesArray = moviesArray.map(({ id, vote_average, title, overview, release_date, poster_path, backdrop_path }) =>
            ({
                id,
                vote_average,
                title,
                overview,
                release_date,
                poster_path: `${imagesBaseUrl}${posterSizes[2]}${poster_path}`,
                backdrop_path: `${imagesBaseUrl}${backdropSizes[1]}${backdrop_path}`,
            }));
        yield put(moviesActions.initializeMoviesStoreSuccess({favouriteMovies, popularMoviesList: parsedPopularMoviesArray}))
        
    } catch (e) {
        console.log('error getting popular movies list: ', {e});
    
    }
};

function* moviesSaga() {
    yield takeLatest(moviesConstants.GET_TMDB_CONFIG, getTmdbConfig);
    yield takeLatest(moviesConstants.GET_TMDB_CONFIG_SUCCESS, initializeMoviesStore);
    yield takeLatest(moviesConstants.INITIALIZE_MOVIES_STORE, initializeMoviesStore);
}

export default moviesSaga;
