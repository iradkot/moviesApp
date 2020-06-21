import { backdropRatio, SCREEN_HEIGHT, SCREEN_WIDTH } from 'style/consts';

// 2 make card larger make the margin smaller and vice versa
export const MARGIN = 8;
const CARD_WIDTH = SCREEN_WIDTH - MARGIN * 2;
export const CARD_HEIGHT = CARD_WIDTH * backdropRatio;
export const HEADER_HEIGHT = 150;
export const height = SCREEN_HEIGHT - HEADER_HEIGHT;
export const CARD_AREA = MARGIN * 2 + CARD_HEIGHT
