import { View, Text } from 'react-native';
import React, { forwardRef } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { LoaderScreen } from 'react-native-ui-lib';

type Props = {};
type Ref = typeof LoaderScreen;
const AppLoaderScreen = forwardRef<Ref, Props>((props, ref) => {
  // const { styles } = useStyles(stylesheet)

  return <LoaderScreen ref={ref} />;
});

// const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
//   container: {
//     flex: 1,
//   },
// }))

export default AppLoaderScreen;
