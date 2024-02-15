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
      h1: { fontSize: 40, fontFamily: 'NunitoBold' },
      h2: { fontSize: 32, fontFamily: 'NunitoBold' },
      h3: { fontSize: 28, fontFamily: 'NunitoBold' },
      h4: { fontSize: 24, fontFamily: 'NunitoBold' },
      h5: { fontSize: 20, fontFamily: 'NunitoBold' },
      large: { fontSize: 18, fontFamily: 'NunitoRegular' },
      regular: { fontSize: 16, fontFamily: 'NunitoRegular' },
      regularB: { fontSize: 16, fontFamily: 'NunitoBold' },
      small: { fontSize: 14, fontFamily: 'NunitoRegular' },
      tiny: { fontSize: 12, fontFamily: 'NunitoRegular' },
      // test: {
      //   test2: {
      //     fontSize: 14,
      //     fontFamily: 'NunitoRegular',

      //   }
      // }
    });

    Spacings.loadSpacings({
      page: 20,
      card: 12,
      gridGutter: 16
    });
    // RNUIThemeManagerInit();

  }
}

