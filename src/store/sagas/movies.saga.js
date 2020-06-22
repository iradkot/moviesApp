import { put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import * as authSelectors from 'store/selectors/auth.selectors';
import * as moviesSelectors from 'store/selectors/movies.selectors';
import * as moviesConstants from 'store/constants/movies.constants';
import * as moviesActions from 'store/actions/movies.actions';
import * as tmdbRequest from 'api/TMDB/requests';
import * as firestoreActions from 'firebase/firestore';

const POSTER_SIZE_QUALITY = 3; // HIGHER IS BETTER
const BACKDROP_SIZE_QUALITY = 1; // HIGHER IS BETTER

function* getTmdbConfig() {
    try {
        const response = yield tmdbRequest.getConfiguration();
        yield put(moviesActions.getTmdbConfigSuccess(response.data))
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
        const response = yield tmdbRequest.getPopularMoviesList({language: 'en-US', page: 1, region: 'il'});
        console.log('response.data', response.data);
        const moviesArray = get(response, 'data.results', []);
        const popularMoviesTotalPages = get(response, 'data.total_pages', 0);
        const userId = yield select(authSelectors.userIdSelector)
        const favouritesResponse = yield firestoreActions.getFavourites(userId);
        const favouriteMovies = get(favouritesResponse, 'favourites', {});
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
                poster_path: `${imagesBaseUrl}${posterSizes[POSTER_SIZE_QUALITY]}${poster_path}`,
                backdrop_path: `${imagesBaseUrl}${backdropSizes[BACKDROP_SIZE_QUALITY]}${backdrop_path}`,
            }));
        yield put(moviesActions.initializeMoviesStoreSuccess({
            favouriteMovies, popularMoviesList: parsedPopularMoviesArray, popularMoviesTotalPages }))
        
    } catch (e) {
        console.log('error getting popular movies list: ', {e});
        yield put(moviesActions.initializeMoviesStoreFailed(e))
    
    }
}

function* getMorePopularMovies() {
    try {
        const lastFetchedPage = yield select(moviesSelectors.popularMoviesLastFetchedPage);
        const response = yield tmdbRequest.getPopularMoviesList({language: 'en-US', page: lastFetchedPage+1, region: 'il'});
        const moviesArray = get(response, 'data.results', []);
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
                poster_path: `${imagesBaseUrl}${posterSizes[POSTER_SIZE_QUALITY]}${poster_path}`,
                backdrop_path: `${imagesBaseUrl}${backdropSizes[BACKDROP_SIZE_QUALITY]}${backdrop_path}`,
            }));
        yield put(moviesActions.getMorePopularMoviesSuccess({ popularMoviesLastFetchedPage: lastFetchedPage + 1, popularMoviesList: parsedPopularMoviesArray}))
        
    } catch (e) {
        console.log('error getting popular movies list: ', {e});
        yield put(moviesActions.initializeMoviesStoreFailed(e))
    
    }
}

function* setFavouriteMovies() {
    try {
        const userId = yield select(authSelectors.userIdSelector);
        const favourites = yield select(moviesSelectors.favouriteMoviesList);
        yield firestoreActions.setFavourites(userId, favourites )
        yield put(moviesActions.setFavouriteMoviesSuccess());
        
    } catch (e) {
        console.log({ e });
        yield put(moviesActions.setFavouriteMoviesFailed(e));
    }
}

function* moviesSaga() {
    yield takeLatest(moviesConstants.GET_TMDB_CONFIG, getTmdbConfig);
    yield takeLatest(moviesConstants.GET_TMDB_CONFIG_SUCCESS, initializeMoviesStore);
    yield takeLatest(moviesConstants.INITIALIZE_MOVIES_STORE, initializeMoviesStore);
    yield takeLatest(moviesConstants.SET_FAVOURITE_MOVIES_LIST, setFavouriteMovies);
    yield takeLatest(moviesConstants.GET_MORE_POPULAR_MOVIES_LIST, getMorePopularMovies);
}

export default moviesSaga;
