import { Dimensions, Platform } from 'react-native';
import { css } from 'styled-components';
const isIphone = Platform.OS === 'ios';

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
export const SCREEN_WIDTH = windowWidth;
export const SCREEN_HEIGHT = windowHeight;

export const fontSizes = {
    s: '12px',
    m: '16px',
    l: '20px',
    xl: '28px'
}

export const textDefault = css`
    font-family: ${isIphone ? 'San Francisco' : 'Roboto'};
    font-size: ${fontSizes.m};
    color: white;
 `;

// TMDB images ratio(height/width): (according to this thread: https://www.themoviedb.org/talk/5abcef779251411e97025408)
export const backdropRatio = 0.5625;
export const posterRatio = 1.5;
