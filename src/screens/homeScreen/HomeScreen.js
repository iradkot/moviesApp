import React, { useCallback } from 'react';
import AppGeneralButton from 'components/buttons/AppGeneralButton';
import Loader from 'components/loader';
import styled from "styled-components";
import * as authActions from 'store/actions/auth';
import * as authSelectors from 'store/selectors/auth';
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
    const isLoading = useSelector(authSelectors.loadingSelector);
    const username = useSelector(authSelectors.usernameSelector);
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
