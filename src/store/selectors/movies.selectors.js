import { get } from 'lodash';
import { createSelector } from 'reselect';

const moviesSelector = (state) => state.moviesStore;

export const tmdbConfig = (state) => moviesSelector(state).tmdbConfig;
export const imagesBaseUrl = (state) => get(tmdbConfig(state), 'images.secure_base_url');
export const posterSizes = (state) => get(tmdbConfig(state), 'images.poster_sizes');
export const backdropSizes = (state) => get(tmdbConfig(state), 'images.backdrop_sizes');

export const isLoading = (state) => moviesSelector(state).loading;
export const moreMoviesLoading = (state) => moviesSelector(state).moreMoviesLoading;
export const error = (state) => moviesSelector(state).error;
export const favouriteMoviesList = (state) => moviesSelector(state).favouriteMovies;
export const popularMoviesList = (state) => moviesSelector(state).popularMoviesList;
export const popularMoviesTotalPages = (state) => moviesSelector(state).popularMoviesTotalPages;
export const popularMoviesLastFetchedPage = (state) => moviesSelector(state).popularMoviesLastFetchedPage;

export const pulledAllPopularMovies = createSelector([popularMoviesTotalPages, popularMoviesLastFetchedPage],
    (totalPages, lastFetchedPage) => totalPages === lastFetchedPage);
