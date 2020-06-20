import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as authActions from 'store/actions/auth';
import styled from "styled-components/native";
import FacebookButton from 'screens/loginScreen/components/FacebookButton';
import GoogleButton from "./components/GoogleButton";
const Container = styled.View`
  flex: 1;
  display: flex;
`;

const TitleSection = styled.View`
  flex: 2;
  background: yellow;
`;
const DescriptionSection = styled.View`
  flex: 1;
  background: green;
`;

const ButtonsContainer = styled.View`
  height: 100px;
  width: 100%;
  flex-direction: row;
  background: red;
  align-items: center;
  justify-content: space-around;
`;




const LoginScreen = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const getToken = useCallback(
        () => {
            console.log('1');
            dispatch(authActions.getToken())
        },
        [ dispatch ],
    );
    
    return (
        <Container>
            <TitleSection/>
            <DescriptionSection/>
            <ButtonsContainer>
                <FacebookButton/>
                <GoogleButton onPress={ getToken }/>
            </ButtonsContainer>
        </Container>
    )
}

export default LoginScreen
