import * as moviesConstants from 'store/constants/movies.constants';

const initialState = {
    popularMoviesList: [],
    favouriteMovies: {},
    tmdbConfig: null,
    error: false,
    loading: false,
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case moviesConstants.GET_TMDB_CONFIG_SUCCESS:
            return { ...state, tmdbConfig: payload }
        case moviesConstants.INITIALIZE_MOVIES_STORE:
            return { ...state, popularMoviesList: [], loading: true }
        case moviesConstants.INITIALIZE_MOVIES_STORE_SUCCESS:
            return { ...state, loading: false, favouriteMovies: payload.favouriteMovies, popularMoviesList: payload.popularMoviesList,  }
        case moviesConstants.SET_FAVOURITE_MOVIES_LIST:
            return { ...state, favouriteMovies: payload  }
        case moviesConstants.INITIALIZE_MOVIES_STORE_FAILED:
            return { ...state, loading: false, error: payload }
        default:
            return state;
    }
}

export default authReducer;
