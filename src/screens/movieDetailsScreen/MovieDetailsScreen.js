import React from 'react';
import styled from 'styled-components/native';
import { posterRatio, SCREEN_WIDTH } from 'style/consts';
import FavouriteButton from 'components/FavouriteButton';
import CircularRating from 'components/circularRating';

const pageSpacing = 'l';

const Container = styled.ScrollView.attrs(({ theme }) => ({
    contentContainerStyle: {
        alignItems: 'center',
        padding: theme.spacing[pageSpacing]
    }
}))`
  background: black;
  flex: 1;
`;

const posterWidth = SCREEN_WIDTH * 0.7;
const posterHeight = posterWidth * posterRatio;
const MovieCoverImage = styled.Image`
  margin-top: ${ ({ theme }) => theme.spacing[pageSpacing] }px;
  height: ${ posterHeight }px;
  width: ${ posterWidth }px;
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${ ({ theme }) => theme.spacing.m }px;
`;

const Title = styled.Text`
  ${ ({ theme }) => theme.text.textDefault };
  font-size: ${ ({ theme }) => theme.text.fontSizes.xl };
  flex: 3;
  text-align: center;
  height: 100%;
`;
const Overview = styled.Text`
  margin-top: ${ ({ theme }) => theme.spacing[pageSpacing] }px;
  ${ ({ theme }) => theme.text.textDefault };
 
`;

const ReleaseDateText = styled.Text`
  ${ ({ theme }) => theme.text.textDefault };
`;

const HeaderRight = styled.View`
  flex: 1
`;

const MovieDetailsScreen = ({ route }) => {
    const { vote_average, title, overview, release_date, poster_path } = route.params.movieData;
    
    return (
        <Container>
            <Header>
                <FavouriteButton movieData={ route.params.movieData }/>
                <Title>{ title } <ReleaseDateText>({ release_date })</ReleaseDateText> </Title>
                <HeaderRight>
                    <CircularRating rating={ vote_average }/>
                </HeaderRight>
            </Header>
            <MovieCoverImage source={ { uri: poster_path } }/>
            <Overview>{ overview }</Overview>
        </Container>
    );
};

export default MovieDetailsScreen
