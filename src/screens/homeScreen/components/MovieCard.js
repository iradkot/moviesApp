import React from 'react';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components';
import { CARD_AREA, CARD_HEIGHT, height, MARGIN } from '../consts';


const Container = styled(Animated.View)`
  width: 90%;
  margin-vertical: ${MARGIN}px;
  height: ${CARD_HEIGHT}px;
  background: yellow;
  align-self: center;
  ${({ isEmpty }) => isEmpty && 'opacity: 0'};
  flex-direction: row;
`;

const MovieTitle = styled.Text`

`;

const imageRatio = 1.5;
const posterHeight = CARD_HEIGHT;
const posterWidth = posterHeight / imageRatio;
const MovieCoverImage = styled.Image`
  height: ${posterHeight};
  width: ${posterWidth};
`;

const MovieCard = ({movieData, index, y}) => {
    const position = Animated.subtract(index * CARD_AREA, y);
    const isDisappearing = -CARD_AREA;
    const isTop = 0;
    const isBottom = height - CARD_AREA;
    const isAppearing = height;
    const translateY = Animated.add(y, y.interpolate({
        inputRange: [0, index * CARD_AREA],
        outputRange: [0, -index * CARD_AREA],
        extrapolateRight: 'clamp',
    }));
    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.7, 1, 1, 0.8],
        extrapolate: 'clamp'
    })
    return (
        <Container isEmpty={!movieData.title} style={ { transform: [ { translateY }, { scale } ] } }>
            <MovieCoverImage source={{ uri: movieData.poster_path }}/>
            <MovieTitle>
                { movieData.title }
            </MovieTitle>
        </Container>
    );
};

export default MovieCard;
