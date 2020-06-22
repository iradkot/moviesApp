import React, { useMemo, useRef, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Animated, FlatList } from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MoviesList = ({ moviesList, handleMoviePress, onRefresh, refreshing, ...rest }) => {
    const y = useMemo(() => new Animated.Value(0), []);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
        useNativeDriver: true,
    });
    
    const ListRef = useRef(null);
    
    useEffect(() => {
        ListRef.current.scrollToOffset({ animated: false, offset: 0 });
    }, []);
    
    return (
        <AnimatedFlatList
            ref={ListRef}
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
            {...rest}
        />
    );
};

export default MoviesList;
// export default React.memo(MoviesList);
