import MovieCard from './MovieCard';
import { Animated, FlatList } from 'react-native';
import React from 'react';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MoviesList = ({ moviesList, handleMoviePress, onRefresh, refreshing }) => {
    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
        useNativeDriver: true,
    });
    
    return (
        <AnimatedFlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            scrollEventThrottle={ 16 }
            bounces={ false }
            data={ [ ...moviesList, {id: 'empty1'}, {id: 'empty2'} ] }
            renderItem={ ({ index, item }) => (
                <MovieCard movieData={ item } index={ index } y={ y } handleMoviePress={handleMoviePress}/>
            ) }
            keyExtractor={ item => item.id + '' }
            { ...{ onScroll } }
        />
    );
};

export default MoviesList;
