import React from 'react';
import styled from 'styled-components';
import { RADIUS } from './consts';

const CircleCutter = styled.View`
  width: ${RADIUS * 2}px;
  height: ${RADIUS}px;
  overflow: hidden;
`;

const Circle = styled.View`
  background-color: ${({ color }) => color};
  width: ${RADIUS * 2}px;
  height: ${RADIUS * 2}px;
  border-radius: ${RADIUS}px;
`;

const HalfCircle = ({ color }) => (
    <CircleCutter>
        <Circle color={color} />
    </CircleCutter>
)

export default HalfCircle;
