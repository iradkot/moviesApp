import React from 'react';
import styled from 'styled-components/native';
import { posterRatio, SCREEN_WIDTH } from 'style/consts';
import AppGeneralButton from 'components/buttons/AppGeneralButton';

const pageSpacing = 'l';

const Container = styled.ScrollView.attrs(({ theme }) => ({
    contentContainerStyle: {
        alignItems: 'center',
        paddingHorizontal: theme.spacing[pageSpacing]
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
  height: 150px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  ${ ({ theme }) => theme.text.textDefault };
  font-size: ${ ({ theme }) => theme.text.fontSizes.xl };
  margin-top: ${ ({ theme }) => theme.spacing[pageSpacing] }px;
  flex: 3;
`;
const Overview = styled.Text`
  margin-top: ${ ({ theme }) => theme.spacing[pageSpacing] }px;
  ${ ({ theme }) => theme.text.textDefault };
 
`;

const ReleaseDateText = styled.Text`
  ${ ({ theme }) => theme.text.textDefault };
 
`;

const GoBackButton = styled(AppGeneralButton)`
  margin-top: ${ ({ theme }) => theme.spacing[pageSpacing] }px;
`;

const MovieDetailsScreen = ({ navigation, route }) => {
    const { vote_average, title, overview, release_date, poster_path } = route.params.movieData;
    return (
        <Container>
            <Header>
                <Title>{ title } <ReleaseDateText>({ release_date })</ReleaseDateText> </Title>
            </Header>
            <MovieCoverImage source={ { uri: poster_path } }/>
            <Overview>{ overview }</Overview>
            <GoBackButton onPress={ navigation.goBack }> go Back </GoBackButton>
        </Container>
    );
};

export default MovieDetailsScreen
