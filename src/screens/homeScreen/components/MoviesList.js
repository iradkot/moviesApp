import MovieCard from './MovieCard';
import { Animated, FlatList } from 'react-native';
import React from 'react';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MoviesList = ({ moviesList }) => {
    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], { useNativeDriver: true })
    return (
        <AnimatedFlatList
            scrollEventThrottle={ 16 }
            bounces={ false }
            data={ [ ...moviesList, {}, {} ] }
            renderItem={ ({ index, item }) => (
                <MovieCard movieData={ item } index={ index } y={ y }/>
            ) }
            keyExtractor={ item => item.id }
            { ...{ onScroll } }
        />
    );
};

export default MoviesList;
