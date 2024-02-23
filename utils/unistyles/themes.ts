const sharedTheme = {
    margins: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    typography: {
        h1: {
            fontSize: 32,
            fontFamily: 'NotoSansThaiBold'
        },
        h2: {
            fontSize: 28,
            fontFamily: 'NotoSansThaiBold'
        },
        h3: {
            fontSize: 24,
            fontFamily: 'NotoSansThaiBold'
        },
        h4: {
            fontSize: 22,
            fontFamily: 'NotoSansThaiSemiBold'
        },
        h5: {
            fontSize: 20,
            fontFamily: 'NotoSansThaiSemiBold'
        },
        lg: {
            fontSize: 18,
            fontFamily: 'NotoSansThaiRegular'
        },
        md: {
            fontSize: 16,
            fontFamily: 'NotoSansThaiRegular'
        },
        sm: {
            fontSize: 14,
            fontFamily: 'NotoSansThaiRegular'
        },
        xs: {
            fontSize: 12,
            fontFamily: 'NotoSansThaiRegular'
        },
    },

};



export const lightTheme = {
    ...sharedTheme,
    colors: {
        primary: '#6200ee',
        secondary: '#03dac6',
        typography: '#000000',
        background: '#ffffff'
    },
} as const;

export const darkTheme = {
    ...sharedTheme,
    colors: {
        primary: '#bb86fc',
        secondary: '#03dac6',
        typography: '#ffffff',
        background: '#000000'
    },
} as const;

  // define other themes