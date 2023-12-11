import { Typography, Colors, Spacings } from 'react-native-ui-lib';

function RNUIThemeInit() {
  Colors.loadColors({
    pink: '#FF69B4',
    gold: '#FFD700',
  });
  Typography.loadTypographies({
    h1: { fontSize: 58, fontWeight: '300', lineHeight: 80 },
    h2: { fontSize: 46, fontWeight: '300', lineHeight: 64 },
  });
  // Spacings.loadSpacings({
  //   page: isSmallScreen ? 16 : 20,
  // });
}
export default RNUIThemeInit;
