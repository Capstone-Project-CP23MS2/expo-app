import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = {};

const Listings = (props: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text>Listings</Text>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },
}));

export default Listings;
