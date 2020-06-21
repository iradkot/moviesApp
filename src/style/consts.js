import { Platform } from 'react-native';
import { css } from 'styled-components';
const isIphone = Platform.OS === 'ios';

export const fontSizes = {
    s: 12,
    m: 16,
    l: 20
}

export const textDefault = css`
    font-family: ${isIphone ? 'San Francisco' : 'Roboto'};
    font-size: ${fontSizes.m}px;
    color: white;
 `;
