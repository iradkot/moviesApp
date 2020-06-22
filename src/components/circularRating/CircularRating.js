import React from 'react';
import styled from 'styled-components';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, lessThan, multiply, set, useCode, Value } from 'react-native-reanimated';
import { timing } from 'utils/animation';
import theme from 'style/theme';
import HalfCircle from './HalfCircle';
import { RADIUS } from './consts';

const Container = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  transform: rotate(90deg);
`;

const RatingText = styled.Text`
  ${ ({ theme }) => theme.text.textDefault };
`;

const TopLayer = styled.View`
  z-index: 1;
`;
const BottomLayer = styled.View`
  transform: rotate(180deg);
`;

const CoveringCircle = styled.View`
  width: ${RADIUS * 1.5}px;
  height: ${RADIUS * 1.5}px;
  border-radius: ${RADIUS * 1.5 * 2}px;;
  z-index: 5;
  background-color: black;
  position: absolute;
  transform: rotate(-90deg);
  align-items: center;
  justify-content: center;
`;

const { PI } = Math;

const CircularRating = ({ rating, bg = theme.colors.primary, fg = theme.colors.secondary }) => {
    const Progress = new Value(0);
    useCode(() => set(Progress, timing({ duration: 500 })), [ Progress ])
    const theta = multiply(Progress, rating / 10 * 2 * PI);
    const rotateTop = interpolate(theta,
        {
            inputRange: [ 0, PI ],
            outputRange: [ 0, PI ],
            extrapolate: 'clamp'
        }
    )
    const opacity = lessThan(theta, PI);
    const rotate = interpolate(theta, {
        inputRange: [ PI, 2 * PI ],
        outputRange: [ 0, PI ],
        extrapolate: 'clamp'
    })
    return (
        <Container>
            <CoveringCircle>
                <RatingText>
                    {rating}
                </RatingText>
            </CoveringCircle>
            <TopLayer>
                <HalfCircle color={ fg }/>
                <Animated.View
                    style={ {
                        ...StyleSheet.absoluteFillObject,
                        transform: [ { translateY: RADIUS / 2 }, { rotate: rotateTop }, { translateY: -RADIUS / 2 } ],
                        opacity
                    } }
                >
                    <HalfCircle color={ bg }/>
                </Animated.View>
            </TopLayer>
            <BottomLayer>
                <HalfCircle color={ fg }/>
                <Animated.View
                    style={ {
                        ...StyleSheet.absoluteFillObject,
                        transform: [ { translateY: RADIUS / 2 }, { rotate }, { translateY: -RADIUS / 2 } ],
                    } }
                >
                    <HalfCircle color={ bg }/>
                </Animated.View>
            </BottomLayer>
        </Container>
    );
};

export default CircularRating;
