import instance from './tmdbAxiosInstance';
import * as routes from './routes';

export const getPopularMoviesList = ({ language, page, region }) =>
    instance.get(routes.GET_POPULAR_MOVIES_LIST({language, page, region}));

export const getConfiguration = () => instance.get(routes.GET_CONFIGURATION);
