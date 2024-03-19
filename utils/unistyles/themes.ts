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
    // xxxxl: 72,
    page: 20,
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
    md: {
      fontSize: 16,
      fontFamily: 'NotoSansThaiRegular',
    },
    sm: {
      fontSize: 14,
      fontFamily: 'NotoSansThaiRegular',
    },
    xs: {
      fontSize: 12,
      fontFamily: 'NotoSansThaiRegular',
    },
  },
  component: {
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
    },
    utils: {},
  },
}

export const lightTheme = {
  ...sharedTheme,
  colors: {
    primary: '#3E64FF',
    secondary: '#03dac6',
    typography: '#000000',
    background: '#ffffff',
  },
} as const

export const darkTheme = {
  ...sharedTheme,
  colors: {
    primary: '#bb86fc',
    secondary: '#03dac6',
    typography: '#ffffff',
    background: '#000000',
  },
} as const
