import React, { useCallback, useEffect } from 'react';
import AppGeneralButton from 'components/buttons/AppGeneralButton';
import Loader from 'components/loader';
import styled from "styled-components";
import * as authActions from 'store/actions/auth.actions';
import * as moviesActions from 'store/actions/movies.actions';
import * as authSelectors from 'store/selectors/auth.selectors';
import * as moviesSelectors from 'store/selectors/movies.selectors';
import { useDispatch, useSelector } from "react-redux";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
`;

const HomeScreen = () => {
    const dispatch = useDispatch();
    const handleLogout = useCallback(
        () => {
            dispatch(authActions.logout(handleLogout));
        },
        [ dispatch ],
    );
    const initializeMoviesStore = useCallback(() => {
        dispatch(moviesActions.initializeMoviesStore())
    }, [ dispatch ]);
    const isLoading = useSelector(authSelectors.isLoading) || useSelector(moviesSelectors.isLoading);
    const moviesList = useSelector(moviesSelectors.popularMoviesList);
    const username = useSelector(authSelectors.usernameSelector);
    useEffect(() => {
        initializeMoviesStore()
    }, []);
    
    return (
        <Container>
            { !isLoading && <Title>Hello { username }!</Title> }
            { isLoading || !username ? <Loader/> :
                <AppGeneralButton title={ 'Logout?' } onPress={ handleLogout }/>
            }
        </Container>
    )
};

export default HomeScreen;
