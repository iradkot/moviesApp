import React, { useCallback, useEffect } from 'react';
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
  font-size: 20px;
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

const FavouritesIconButton = styled(IconButton).attrs(({ theme }) => ({
    backgroundColor: theme.colors.favourite,
    name: 'star-outline',
}))`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const FavouritesComponent = () => {
    const favouriteMoviesList = useSelector(moviesSelectors.favouriteMoviesList);
    return (
        <FavouritesIconButton>
            { Object.keys(favouriteMoviesList).length + '' }
        </FavouritesIconButton>
    );
}

const HomeScreen = ({ navigation }) => {
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
    
    useEffect(() => {
        initializeMoviesStore()
    }, []);
    
    const authLoading = useSelector(authSelectors.isLoading);
    const moviesLoading = useSelector(moviesSelectors.isLoading);
    const moviesList = useSelector(moviesSelectors.popularMoviesList);
    const username = useSelector(authSelectors.usernameSelector);
    const profileImage = useSelector(authSelectors.profileImageUrlSelector);
    
    const handleMoviePress = useCallback(
        (movieData) => () => {
            navigation.navigate('Details', { movieData })
        },
        [],
    );
    
    const displayFavourites = useCallback(
        () => () => {
            navigation.navigate('Favourites')
        },
        [],
    );
    
    if ( authLoading ) return <Loader/>
    return (
        <Container>
            <Title>Welcome { username }!</Title>
            <Header>
                <LogoutButton onPress={ handleLogout }/>
                <UserAvatar source={ { uri: profileImage } }/>
                <FavouritesComponent onPress={ displayFavourites }/>
            </Header>
            <MoviesList refreshing={ !!moviesLoading } onRefresh={ initializeMoviesStore } moviesList={ moviesList }
                        handleMoviePress={ handleMoviePress }/>
        </Container>
    )
};

export default HomeScreen;
