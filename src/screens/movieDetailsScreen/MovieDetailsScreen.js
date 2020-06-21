import React from 'react';
import styled from 'styled-components/native';
import AppGeneralButton from 'components/buttons/AppGeneralButton';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const imageRatio = 1.5;
const posterHeight = 300;
const posterWidth = posterHeight / imageRatio;
const MovieCoverImage = styled.Image`
  height: ${posterHeight}px;
  width: ${posterWidth}px;
  position: absolute;
  top: 0;
  left: 0;
`;

const MovieDetailsScreen = ({ navigation, route }) => {
    const { movieData } = route.params;
    console.log({ movieData });
    return (
        <Container>
            <MovieCoverImage source={{ uri: movieData.poster_path }} />
            <AppGeneralButton onPress={navigation.goBack}> go Back </AppGeneralButton>
        </Container>
    );
};

export default MovieDetailsScreen
