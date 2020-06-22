import * as moviesConstants from 'store/constants/movies.constants';

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

// export const getPopularMovies = () => ({
//     type: moviesConstants.GET_POPULAR_MOVIES_LIST
// });
// export const getPopularMoviesSuccess = payload => ({
//     type: moviesConstants.GET_POPULAR_MOVIES_LIST_SUCCESS,
//     payload
// });
// export const getPopularMoviesFailed = error => ({
//     type: moviesConstants.GET_POPULAR_MOVIES_LIST_FAILED,
//     payload: error
// });
//
// export const getFavouriteMovies = () => ({
//     type: moviesConstants.GET_FAVOURITE_MOVIES_LIST
// });
// export const getFavouriteMoviesSuccess = payload => ({
//     type: moviesConstants.GET_FAVOURITE_MOVIES_LIST_SUCCESS,
//     payload
// });
// export const getFavouriteMoviesFailed = error => ({
//     type: moviesConstants.GET_FAVOURITE_MOVIES_LIST_FAILED,
//     payload: error
// });

export const setFavouriteMovies = (payload) => ({
    type: moviesConstants.SET_FAVOURITE_MOVIES_LIST,
    payload
});
export const setFavouriteMoviesSuccess = payload => ({
    type: moviesConstants.SET_FAVOURITE_MOVIES_LIST_SUCCESS,
});
export const setFavouriteMoviesFailed = error => ({
    type: moviesConstants.SET_FAVOURITE_MOVIES_LIST_FAILED,
    payload: error
});


