import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = {};

export default function ActivityDetailScreen(props: Props) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text>ActivityDetailScreen</Text>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },
}));
