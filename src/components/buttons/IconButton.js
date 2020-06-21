import React from "react";
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonText = styled.Text`
  font-family: Arial;
  font-size: 15px;
  color: white;
`;

const StyledButton  = styled(Icon.Button)`
  padding: 10px;
`;

const IconButton = ({ onPress, iconName, backgroundColor, children, ...rest }) => (
    <StyledButton name={iconName} backgroundColor={backgroundColor} onPress={onPress} {...rest}>
        <ButtonText >
            {children}
        </ButtonText>
    </StyledButton>
);

export default IconButton;
