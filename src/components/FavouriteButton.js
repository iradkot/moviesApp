import React, { useCallback, useMemo } from 'react';
import * as moviesSelectors from 'store/selectors/movies.selectors';
import * as moviesActions from 'store/actions/movies.actions';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native/dist/styled-components.native.esm';
import IconButton from 'components/buttons/IconButton';
import theme from 'style/theme'

const FavouritesIcon = styled(IconButton).attrs(({ isFavourite }) => {
    return ({
        backgroundColor: 'rgba(255,255,255,0)',
        color: theme.colors.favourite,
        borderRadius: 30,
        name: isFavourite ? 'star' : 'star-outline'
    });
})`
  background: rgba(255,255,255,0.83);
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const FavouriteButton = ({ movieData }) => {
    const dispatch = useDispatch();
    const favouriteMoviesList = useSelector(moviesSelectors.favouriteMoviesList);
    const movieId = movieData.id;
    const isFavourite = useMemo(() => favouriteMoviesList[movieId], [favouriteMoviesList]);
    const toggleFavouriteMovie = useCallback(
        (favouriteToggle) => {
            if ( favouriteToggle ) {
                dispatch(moviesActions.setFavouriteMovies({ ...favouriteMoviesList, [movieId]: movieData }))
            } else {
                const { [movieId]: deletedMovie, ...newFavourites } = favouriteMoviesList;
                dispatch(moviesActions.setFavouriteMovies(newFavourites))
            }
        },
        [ favouriteMoviesList ],
    );
    
    return (
        <FavouritesIcon isFavourite={ favouriteMoviesList[movieId] } onPress={ () => toggleFavouriteMovie(!isFavourite) }/>
    )
};

export default FavouriteButton;
