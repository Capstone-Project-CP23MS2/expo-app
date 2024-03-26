const COLORS = {
  secondary: '#6f42c1',
  tertiary: '#FF7754',

  white: '#FFF',
  lightWhite: '#FAFAFC',

  primary: '#3E64FF',
  gray: '#5E5D5E',
  dark: '#1A1A1A',

  black: '#000',
  blue: '#5D5FEE',
  grey: '#BABBC3',
  light: '#F3F4FB',
  darkBlue: '#7978B5',
  red: '#CC0000',
  danger: 'red',
  disable: '#BABBC3',
}

const FONT = {
  regular: 'NotoSansThaiRegular',
  medium: 'NotoSansThaiMedium',
  semiBold: 'NotoSansThaiSemiBold',
  bold: 'NotoSansThaiBold',
  md: 'NunitoMedium',
  sb: 'NunitoSemiBold',
  b: 'NunitoBold',
}

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
}

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
}

const SPACINGS = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
  page: 24,
}

export { COLORS, FONT, SHADOWS, SIZES, SPACINGS }
