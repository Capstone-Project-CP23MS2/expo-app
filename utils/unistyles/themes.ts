const sharedTheme = {
  spacings: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
    page: 16,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontFamily: 'NotoSansThaiBold',
    },
    h2: {
      fontSize: 28,
      fontFamily: 'NotoSansThaiBold',
    },
    h3: {
      fontSize: 24,
      fontFamily: 'NotoSansThaiBold',
    },
    h4: {
      fontSize: 22,
      fontFamily: 'NotoSansThaiSemiBold',
    },
    h5: {
      fontSize: 20,
      fontFamily: 'NotoSansThaiSemiBold',
    },
    lg: {
      fontSize: 18,
      fontFamily: 'NotoSansThaiRegular',
    },
    lgB: {
      fontSize: 18,
      fontFamily: 'NotoSansThaiBold',
    },
    md: {
      fontSize: 16,
      fontFamily: 'NotoSansThaiRegular',
      lineHeight: 24,
    },
    mdB: {
      fontSize: 16,
      fontFamily: 'NotoSansThaiSemiBold',
      lineHeight: 24,
    },
    sm: {
      fontSize: 14,
      fontFamily: 'NotoSansThaiRegular',
      lineHeight: 24,
    },
    smB: {
      fontSize: 14,
      fontFamily: 'NotoSansThaiSemiBold',
      lineHeight: 24,
    },
    xs: {
      fontSize: 12,
      fontFamily: 'NotoSansThaiRegular',
    },
    xsB: {
      fontSize: 12,
      fontFamily: 'NotoSansThaiSemiBold',
    },
  },
  component: {
    footer: {
      // backgroundColor: '#fff',
      padding: 16,
      borderTopColor: '#000',
      borderTopWidth: 1,
    },
    test: {
      fontSize: 12,
      fontFamily: 'NotoSansThaiSemiBold',
    },
    button: {
      contained: {
        // borderRadius: 20,
        // padding: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      outlined: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
      },
      absoluteFillStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    utils: {},
  },
};

const sharedColors = {
  backgroundModal: 'rgba(0,0,0,0.5)',
};

export const lightTheme = {
  ...sharedTheme,
  colors: {
    ...sharedColors,

    "primary": "rgb(150, 73, 0)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 220, 198)",
    "onPrimaryContainer": "rgb(49, 19, 0)",
    "secondary": "rgb(0, 99, 154)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(206, 229, 255)",
    "onSecondaryContainer": "rgb(0, 29, 50)",
    "tertiary": "rgb(96, 97, 52)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(229, 230, 173)",
    "onTertiaryContainer": "rgb(28, 29, 0)",

    typography: '#000000',
    background: '#ffffff',

    info: '#5598FC',
    success: '#7CDD58',
    danger: '#FF7560',
    warning: '#F7DE22',
    disable: '#ff5252',
    test: '#DAF7A6',
    gray: '#505050',
    outline: 'rgb(124, 117, 126)',
    lightgray: '#cdced4',
    red: '#CC0000',
  },
} as const;

export const darkTheme = {
  ...sharedTheme,
  colors: {
    ...sharedColors,

    "primary": "rgb(255, 183, 134)",
    "onPrimary": "rgb(80, 36, 0)",
    "primaryContainer": "rgb(114, 54, 0)",
    "onPrimaryContainer": "rgb(255, 220, 198)",
    "secondary": "rgb(150, 204, 255)",
    "onSecondary": "rgb(0, 51, 83)",
    "secondaryContainer": "rgb(0, 74, 117)",
    "onSecondaryContainer": "rgb(206, 229, 255)",
    "tertiary": "rgb(201, 202, 147)",
    "onTertiary": "rgb(49, 50, 10)",
    "tertiaryContainer": "rgb(72, 73, 31)",
    "onTertiaryContainer": "rgb(229, 230, 173)",

    typography: '#ffffff',
    background: '#000000',

    info: '#5598FC',
    success: '#7CDD58',
    danger: '#FF7560',
    disable: '#ff5252',
    test: '#DAF7A6',
    gray: '#505050',
    outline: 'rgb(124, 117, 126)',
    lightgray: '#cdced4',
  },
} as const;

const test = {
  colors: {
    primary: 'rgb(120, 69, 172)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(240, 219, 255)',
    onPrimaryContainer: 'rgb(44, 0, 81)',
    secondary: 'rgb(102, 90, 111)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(237, 221, 246)',
    onSecondaryContainer: 'rgb(33, 24, 42)',
    tertiary: 'rgb(128, 81, 88)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 217, 221)',
    onTertiaryContainer: 'rgb(50, 16, 23)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(29, 27, 30)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(29, 27, 30)',
    surfaceVariant: 'rgb(233, 223, 235)',
    onSurfaceVariant: 'rgb(74, 69, 78)',
    outline: 'rgb(124, 117, 126)',
    outlineVariant: 'rgb(204, 196, 206)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(50, 47, 51)',
    inverseOnSurface: 'rgb(245, 239, 244)',
    inversePrimary: 'rgb(220, 184, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 242, 251)',
      level2: 'rgb(244, 236, 248)',
      level3: 'rgb(240, 231, 246)',
      level4: 'rgb(239, 229, 245)',
      level5: 'rgb(236, 226, 243)',
    },
    surfaceDisabled: 'rgba(29, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)',
    backdrop: 'rgba(51, 47, 55, 0.4)',
  },
};


const oldColor = {
  primary: '#3E64FF',
  secondary: '#03dac6',
};