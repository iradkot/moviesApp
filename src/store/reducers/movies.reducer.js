import * as moviesConstants from 'store/constants/movies.constants';
import { uniqBy } from 'lodash';

const initialState = {
    popularMoviesList: [],
    favouriteMovies: {},
    tmdbConfig: null,
    error: false,
    loading: false,
    moreMoviesLoading: false,
    popularMoviesTotalPages: 0, // we fetch first page regardless of total pages, this is redundant at app start
    popularMoviesLastFetchedPage: 1
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case moviesConstants.GET_TMDB_CONFIG_SUCCESS:
            return { ...state, tmdbConfig: payload }
        case moviesConstants.INITIALIZE_MOVIES_STORE:
            return { ...state, popularMoviesList: [], loading: true, popularMoviesLastFetchedPage: 1 }
        case moviesConstants.GET_MORE_POPULAR_MOVIES_LIST:
            return { ...state, moreMoviesLoading: true }
        case moviesConstants.SET_FAVOURITE_MOVIES_LIST:
            return { ...state, favouriteMovies: payload  }
            
        case moviesConstants.INITIALIZE_MOVIES_STORE_SUCCESS:
            return { ...state, loading: false, favouriteMovies: payload.favouriteMovies,
                popularMoviesList: payload.popularMoviesList, popularMoviesTotalPages: payload.popularMoviesTotalPages }
        case moviesConstants.GET_MORE_POPULAR_MOVIES_LIST_SUCCESS:
            return { ...state, popularMoviesList: uniqBy([...state.popularMoviesList, ...payload.popularMoviesList], item => item.id),
                popularMoviesLastFetchedPage:  payload.popularMoviesLastFetchedPage, moreMoviesLoading: false }
                
        case moviesConstants.GET_MORE_POPULAR_MOVIES_LIST_FAILED:
            return { ...state, moreMoviesLoading: false, error: payload }
        case moviesConstants.INITIALIZE_MOVIES_STORE_FAILED:
            return { ...state, loading: false, error: payload }
        default:
            return state;
    }
}

export default authReducer;
