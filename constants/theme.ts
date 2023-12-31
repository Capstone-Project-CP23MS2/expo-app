const COLORS = {
  // primary: '#312651',
  // textPrimary: '#312651',
  secondary: '#444262',
  // textSecondary: '#312651',
  tertiary: '#FF7754',

  // gray: '#83829A',
  gray2: '#C1C0C8',

  white: '#F3F4F8',
  lightWhite: '#FAFAFC',

  primary: '#FF385C',
  gray: '#5E5D5E',
  dark: '#1A1A1A',
};
//gradients 
// const gradients = {
//   blueLight: {start: '#5A71FA', end: colors.blue3}, // buttons
//   blue: {start: '#5E55FB', end: colors.blue3}, // fab
//   blueDark: {start: '#5F45E0', end: colors.blue3}, // avis, banner
// }

const FONT = {
  //   regular: 'DMRegular',
  //   medium: 'DMMedium',
  // semiBold: 'DMMedium',
  //   bold: 'DMBold',
  regular: 'NunitoRegular',
  medium: 'NunitoMedium',
  semiBold: 'NunitoSemiBold',
  bold: 'NunitoBold',
  md: 'NunitoMedium',
  sb: 'NunitoSemiBold',
  b: 'NunitoBold',
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

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
};

export { COLORS, FONT, SHADOWS, SIZES };
