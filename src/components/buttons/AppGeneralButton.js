import styled from "styled-components/native";
import React from 'react';

const Container = styled.TouchableOpacity`
  width: 200px;
  height: 50px;
  padding: 4px;
  background: ${({ theme, variant }) => theme.colors[variant] || theme.colors.primary};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
    ${({ theme }) => theme.text.textDefault};
    color: white;
`;

const AppGeneralButton = ({ onPress, children, variant = 'primary', ...rest }) => (
    <Container onPress={onPress} variant={variant} {...rest}>
        <ButtonText>
            { children }
        </ButtonText>
    </Container>
)

export default AppGeneralButton;
