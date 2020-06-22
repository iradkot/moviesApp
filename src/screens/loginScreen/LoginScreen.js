import React, { useCallback } from 'react';
import { useDispatch } from "react-redux";
import * as authActions from 'store/actions/auth.actions';
import styled from "styled-components/native";
import FacebookButton from 'screens/loginScreen/components/FacebookButton';
import GoogleButton from "./components/GoogleButton";
const Container = styled.View`
  flex: 1;
  display: flex;
`;

const TitleSection = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.l}px;
`;

const TitleText = styled.Text`
  ${({ theme }) => theme.text.textDefault};
  font-size: ${({ theme }) => theme.text.fontSizes.xl};
  color: black;
`;

const DescriptionSection = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.l}px;
`;

const DescriptionText = styled.Text`
  ${({ theme }) => theme.text.textDefault};
  font-size: ${({ theme }) => theme.text.fontSizes.l};
  color: black;
  text-align: center;
`;

const ButtonsContainer = styled.View`
  height: 100px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;




const LoginScreen = () => {
    const dispatch = useDispatch();
    const getToken = useCallback(
        () => {
            dispatch(authActions.getToken())
        },
        [ dispatch ],
    );
    
    return (
        <Container>
            <TitleSection>
                <TitleText>
                    Welcome Stranger!
                </TitleText>
            </TitleSection>
            <DescriptionSection>
                <DescriptionText>
                    Please log in to continue to the awesomness
                </DescriptionText>
            </DescriptionSection>
            <ButtonsContainer>
                <FacebookButton/>
                <GoogleButton onPress={ getToken }/>
            </ButtonsContainer>
        </Container>
    )
}

export default LoginScreen
