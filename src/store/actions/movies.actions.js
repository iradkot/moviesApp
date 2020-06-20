import * as moviesConstants from 'store/constants/movies.constants';

export const getPopularMovies = () => ({
    type: moviesConstants.GET_POPULAR_MOVIES_LIST
});
export const getPopularMoviesSuccess = payload => ({
    type: moviesConstants.GET_POPULAR_MOVIES_LIST_SUCCESS,
    payload
});
export const getPopularMoviesFailed = error => ({
    type: moviesConstants.GET_POPULAR_MOVIES_LIST_FAILED,
    payload: error
});

export const initializeMoviesStore = () => ({
    type: moviesConstants.INITIALIZE_MOVIES_STORE
});
export const initializeMoviesStoreSuccess = payload => ({
    type: moviesConstants.INITIALIZE_MOVIES_STORE_SUCCESS,
    payload
});
export const initializeMoviesStoreFailed = error => ({
    type: moviesConstants.INITIALIZE_MOVIES_STORE_FAILED,
    payload: error
});

export const getTmdbConfig = () => ({
    type: moviesConstants.GET_TMDB_CONFIG
});
export const getTmdbConfigSuccess = payload => ({
    type: moviesConstants.GET_TMDB_CONFIG_SUCCESS,
    payload
});
export const getTmdbConfigFailed = error => ({
    type: moviesConstants.GET_TMDB_CONFIG_FAILED,
    payload: error
});

