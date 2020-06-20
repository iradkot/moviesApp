export const HOST = 'https://api.themoviedb.org/3';
import config from 'config';

// https://developers.themoviedb.org/3/movies/get-popular-movies
export const GET_POPULAR_MOVIES_LIST = ({ language, page, region }) =>
    `/movie/popular?api_key=${config.TMDB_API_KEY}&language=${language}&page=${page}&region=${region}`;

export const GET_CONFIGURATION = `/configuration?api_key=${config.TMDB_API_KEY}`;
