import { Colors, Typography, Spacings } from 'react-native-ui-lib';
// import { RNUIThemeManagerInit } from './ComponentsConfig';

export class DesignSystem {
  static setup() {
    //https://wix.github.io/react-native-ui-lib/docs/foundation/colors#add-your-own-design-tokens
    Colors.loadDesignTokens({
      primaryColor: '#2364AA',
    });

    Colors.loadColors({
      secondaryColor: '#81C3D7',
      lightGray: '#DCDCDC',
      textColor: '##221D23',
      errorColor: '#E63B2E',
      successColor: '#ADC76F',
      warnColor: '##FF963C',
    });

    Typography.loadTypographies({
      h1: { fontSize: 32, fontFamily: 'NotoSansThaiBold' },
      h2: { fontSize: 28, fontFamily: 'NotoSansThaiBold' },
      h3: { fontSize: 24, fontFamily: 'NotoSansThaiBold' },
      h4: { fontSize: 22, fontFamily: 'NotoSansThaiSemiBold' },
      h5: { fontSize: 20, fontFamily: 'NotoSansThaiSemiBold' },
      lg: { fontSize: 18, fontFamily: 'NotoSansThaiRegular' },
      md: { fontSize: 16, fontFamily: 'NotoSansThaiRegular' },
      sm: { fontSize: 14, fontFamily: 'NotoSansThaiRegular' },
      xs: { fontSize: 12, fontFamily: 'NotoSansThaiRegular' },
      "md-b": { fontSize: 16, fontFamily: 'NotoSansThaiBold' },
      "lg-b": { fontSize: 16, fontFamily: 'NotoSansThaiBold' },
      "sm-b": { fontSize: 14, fontFamily: 'NotoSansThaiBold' },
      "xs-b": { fontSize: 12, fontFamily: 'NotoSansThaiBold' },
    });

    Spacings.loadSpacings({
      page: 20,
      card: 12,
      gridGutter: 16,
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 40,
    });
    // RNUIThemeManagerInit();

  }
}

