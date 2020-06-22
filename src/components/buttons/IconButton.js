import React from "react";
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonText = styled.Text`
  font-family: Arial;
  font-size: 15px;
  color: white;
  margin-left: ${({ theme }) => theme.spacing.m}px;
`;

const StyledButton  = styled(Icon.Button)`
`;

const IconButton = ({ onPress, iconName, children, ...rest }) => (
    <StyledButton iconStyle={{ marginRight: 0 }} name={iconName} onPress={onPress} {...rest}>
        { children && <ButtonText>
            { children }
        </ButtonText> }
    </StyledButton>
);

export default IconButton;
