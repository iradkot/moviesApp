import { get } from 'lodash';

const moviesSelector = (state) => state.moviesStore;

export const tmdbConfig = (state) => moviesSelector(state).tmdbConfig;
export const imagesBaseUrl = (state) => get(tmdbConfig(state), 'images.base_url');
export const posterSizes = (state) => get(tmdbConfig(state), 'images.poster_sizes');
export const backdropSizes = (state) => get(tmdbConfig(state), 'images.backdrop_sizes');

export const isLoading = (state) => moviesSelector(state).loading;
export const error = (state) => moviesSelector(state).error;
export const popularMoviesList = (state) => moviesSelector(state).popularMoviesList;
export const favouriteMoviesList = (state) => moviesSelector(state).favouriteMovies;
