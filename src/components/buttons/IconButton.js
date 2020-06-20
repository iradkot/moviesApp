import React from "react";
import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonText = styled.Text`
  font-family: Arial;
  font-size: 15px;
`;

const StyledButton  = styled(Icon.Button)`
  padding: 10px;
`;

const IconButton = ({ onPress, iconName, backgroundColor, children }) => (
    <StyledButton name={iconName} backgroundColor={backgroundColor} onPress={onPress}>
        <ButtonText >
            {children}
        </ButtonText>
    </StyledButton>
);

export default IconButton;
