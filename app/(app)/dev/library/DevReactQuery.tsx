import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useQuery } from '@tanstack/react-query';
import { RNUIButton } from '@/components';
import { Button } from 'react-native-ui-lib';

type Props = {};

export default function DevReactQuery(props: Props) {
  const { styles } = useStyles(stylesheet);
  const { data } = useQuery({
    //      ^? const data: string | undefined
    queryKey: ['test'],
    queryFn: () => Promise.resolve(5),
    select: data => {
      data.toString();
      return 'dd';
    },
  });

  const handleLog1 = () => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text>DevReactQuery</Text>
      <View style={styles.content}>
        <RNUIButton label="Test" onPress={handleLog1} />
        <Button label="Test" onPress={handleLog1} />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },
}));
