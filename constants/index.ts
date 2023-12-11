// import images from "./images";
// import icons from "./icons";
import { COLORS, FONT, SIZES, SHADOWS } from './theme';
import { Dimensions, Platform } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('screen');

export const WIDTH = width;
export const HEIGHT = height;
export { COLORS, FONT, SIZES, SHADOWS };



