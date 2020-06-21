import React, { useCallback, useEffect } from 'react';
import AppGeneralButton from 'components/buttons/AppGeneralButton';
import Loader from 'components/loader';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as authActions from 'store/actions/auth.actions';
import * as moviesActions from 'store/actions/movies.actions';
import * as authSelectors from 'store/selectors/auth.selectors';
import * as moviesSelectors from 'store/selectors/movies.selectors';
import MoviesList from './components/MoviesList';
import { HEADER_HEIGHT } from './consts';


const Header = styled.View`
  height: ${ HEADER_HEIGHT }px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 20px;
`;

const HomeScreen = () => {
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
    const isLoading =  authLoading || moviesLoading;
    const moviesList = useSelector(moviesSelectors.popularMoviesList);
    const username = useSelector(authSelectors.usernameSelector);
    if ( isLoading || !username ) return <Loader/>
    return (
        <Container>
            <Header>
                <Title>Hello { username }!</Title>
                <AppGeneralButton title={ 'Logout?' } onPress={ handleLogout }/>
            </Header>
            <MoviesList moviesList={ moviesList }/>
        </Container>
    )
};

export default HomeScreen;
