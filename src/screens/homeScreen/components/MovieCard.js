import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { CARD_AREA, CARD_HEIGHT, height, MARGIN } from '../consts';
import AppGeneralButton from 'components/buttons/AppGeneralButton';

const Container = styled(Animated.View)`
  width: 90%;
  margin-vertical: ${ MARGIN }px;
  height: ${ CARD_HEIGHT }px;
  background: ${ ({ theme }) => theme.colors.primaryTransparent(0.99) };
  align-self: center;
  ${ ({ isEmpty }) => isEmpty && 'opacity: 0' };
  flex-direction: row;
`;

const MovieTitle = styled.Text`
  ${ ({ theme }) => theme.text.textDefault };
`;


const MovieBackdropBackground = styled.ImageBackground`
  flex: 1;
  
`;

const OverlayView = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0,0,0,0.66);
  align-items: center;
  justify-content: space-around;
`;

const MovieCard = ({ movieData, index, y, handleMoviePress }) => {
    const position = Animated.subtract(index * CARD_AREA, y);
    const isDisappearing = -CARD_AREA;
    const isTop = 0;
    const isBottom = height - CARD_AREA;
    const isAppearing = height;
    const translateY = Animated.add(y, y.interpolate({
        inputRange: [ 0, index * CARD_AREA ],
        outputRange: [ 0, -index * CARD_AREA ],
        extrapolateRight: 'clamp',
    }));
    const scale = position.interpolate({
        inputRange: [ isDisappearing, isTop, isBottom, isAppearing ],
        outputRange: [ 0.7, 1, 1, 0.8 ],
        extrapolate: 'clamp'
    })
    const blurRadius = position.interpolate({
        inputRange: [ isDisappearing, isTop, isBottom, isAppearing ],
        outputRange: [ 3, 1, 0, 4 ],
        extrapolate: 'clamp'
    })
    return (
        <Container isEmpty={ !movieData.title } style={ { transform: [ { translateY }, { scale } ] } }>
            <MovieBackdropBackground source={ { uri: movieData.backdrop_path } }>
                <OverlayView>
                    <MovieTitle>
                        { movieData.title }
                    </MovieTitle>
                    <AppGeneralButton onPress={ handleMoviePress(movieData) }>
                        Click for details
                    </AppGeneralButton>
                </OverlayView>
            </MovieBackdropBackground>
        </Container>
    );
};

export default MovieCard;
