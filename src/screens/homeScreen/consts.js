import { Dimensions } from 'react-native';

const { height: wHeight } = Dimensions.get("window");
export const CARD_HEIGHT = 200;
export const MARGIN = 8;
export const HEADER_HEIGHT = 200;
export const height = wHeight - HEADER_HEIGHT;
export const CARD_AREA = MARGIN * 2 + CARD_HEIGHT