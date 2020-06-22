import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Loader from 'components/loader';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components/native";
import * as authActions from 'store/actions/auth.actions';
import * as moviesActions from 'store/actions/movies.actions';
import * as authSelectors from 'store/selectors/auth.selectors';
import * as moviesSelectors from 'store/selectors/movies.selectors';
import MoviesList from './components/MoviesList';
import IconButton from 'components/buttons/IconButton';
import { HEADER_HEIGHT } from './consts';

const Container = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  ${ ({ theme }) => theme.text.textDefault };
  font-size: ${ ({ theme }) => theme.text.fontSizes.xl };
  color: ${ ({ theme }) => theme.colors.primary };
  align-self: center;
  margin-top: ${ ({ theme }) => theme.spacing.l }px;
`;

const Header = styled.View`
  height: ${ HEADER_HEIGHT }px;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`;

const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const LogoutButton = styled(IconButton).attrs(({ theme }) => ({
    backgroundColor: theme.colors.secondary,
    borderRadius: 30,
    name: 'logout'
}))`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const FavouritesIconButton = styled(IconButton).attrs(({ theme, showFavorites }) => ({
    backgroundColor: theme.colors.favourite,
    name: showFavorites ? 'star' : 'star-outline',
}))`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const FavouritesComponent = ({ showFavorites, onPress }) => {
    const favouriteMoviesList = useSelector(moviesSelectors.favouriteMoviesList);
    return (
        <FavouritesIconButton onPress={ onPress } showFavorites={ showFavorites }>
            { Object.keys(favouriteMoviesList).length + '' }
        </FavouritesIconButton>
    );
}

const HomeScreen = ({ navigation }) => {
    const [ showFavorites, setShowFavorites ] = useState(false);
    
    const dispatch = useDispatch();
    const handleLogout = useCallback(
        () => {
            dispatch(authActions.logout());
        },
        [ dispatch ],
    );
    const initializeMoviesStore = useCallback(() => {
        dispatch(moviesActions.initializeMoviesStore())
    }, [ dispatch ]);
    const getMorePopularMovies = useCallback(() => {
        dispatch(moviesActions.getMorePopularMovies())
    }, [ dispatch ]);
    
    useEffect(() => {
        initializeMoviesStore()
    }, []);
    
    
    const favouriteMoviesList = useSelector(moviesSelectors.favouriteMoviesList);
    const pulledAllPopularMovies = useSelector(moviesSelectors.pulledAllPopularMovies);
    const moreMoviesLoading = useSelector(moviesSelectors.moreMoviesLoading);
    const moviesLoading = useSelector(moviesSelectors.isLoading);
    const moviesList = useSelector(moviesSelectors.popularMoviesList);
    const authLoading = useSelector(authSelectors.isLoading);
    const username = useSelector(authSelectors.usernameSelector);
    const profileImage = useSelector(authSelectors.profileImageUrlSelector);
    
    const handleMoviePress = useCallback(
        (movieData) => () => {
            navigation.navigate('Details', { movieData })
        },
        [],
    );
    
    const toggleShowFavourites = useCallback(() => setShowFavorites(!showFavorites), [ showFavorites ]);
    const titleText = useMemo(() => showFavorites ? `Your favourites` : `Welcome ${ username }!`, [ showFavorites ])
    const handleLoadMoreMovies = useCallback(() => {
        if ( !moviesLoading && !moreMoviesLoading && !pulledAllPopularMovies ) {
            console.log('more movies?');
            getMorePopularMovies()
        }
    }, [ moviesLoading, moreMoviesLoading ])
    if ( authLoading ) return <Loader/>
    return (
        <Container>
            <Title>{ titleText }</Title>
            <Header>
                <LogoutButton onPress={ handleLogout }/>
                <UserAvatar source={ { uri: profileImage } }/>
                <FavouritesComponent onPress={ toggleShowFavourites } showFavorites={ showFavorites }/>
            </Header>
            { showFavorites ?
                <MoviesList id={ '12' } key={ '12' } moviesList={ Object.values(favouriteMoviesList) }
                            handleMoviePress={ handleMoviePress }/> :
                <MoviesList id={ '34' } key={ '34' } refreshing={ !!moviesLoading } onRefresh={ initializeMoviesStore }
                            moviesList={ moviesList }
                            handleMoviePress={ handleMoviePress } handleLoadMoreMovies={ handleLoadMoreMovies }/>
            }
        </Container>
    )
};

export default HomeScreen;
