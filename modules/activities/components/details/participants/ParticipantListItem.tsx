import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ParticipantResponse } from '@/api/type';
import { Avatar } from 'react-native-ui-lib';

type Props = {
  participant?: ParticipantResponse;
  index: number;
};

const ParticipantListItem = ({ participant, index }: Props) => {
  const { styles } = useStyles(stylesheet, {
    isFirst: !index,
  });

  return (
    <View style={styles.container}>
      <Avatar
        source={{
          uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
        }}
        label={'test'}
      />
      <View style={styles.content}>
        <Text style={styles.username}>{participant?.username}</Text>
        <Text style={styles.sss}>เข้าร่วมเมื่อ</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    variants: {
      isFirst: {
        false: {
          marginTop: spacings.sm,
        },
      },
    },
  },
  content: {
    marginLeft: spacings.md,
  },
  username: {
    ...typography.mdB,
  },
}));

export default ParticipantListItem;
