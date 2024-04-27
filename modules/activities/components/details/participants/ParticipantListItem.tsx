import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Avatar, Chip } from 'react-native-ui-lib';
import { formatDate } from '@/utils/datetime';
import { Participant } from '@/api/activities/type';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppChip from '@/components/AppChip';

type Props = {
  participant: Participant;
  index: number;
  hostId?: number;
};

const ParticipantListItem = ({ participant, hostId, index }: Props) => {
  const { styles } = useStyles(stylesheet, {
    isFirst: !index,
  });

  const handlePress = () => {
    console.log(participant.activityId);

    // onPress(participant);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Avatar
        source={{
          uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
        }}
        // label={'test'}
      />
      <View style={styles.content}>
        <Text style={styles.username}>
          {participant.username} {hostId === participant.userId && '(เจ้าของ)'}
        </Text>
        {/* <Text style={styles.infoJoin}>เข้าร่วมเมื่อ {formatDate(participant.joinedAt)}</Text> */}
        <View style={styles.statusContainer}>
          {/* <Text style={styles.infoStatus}>
            {participant.rsvpStatus === 'going' ? 'จะไป' : 'ไม่ไป'}
          </Text> */}
          <AppChip
            label={participant.rsvpStatus === 'going' ? 'จะไป' : 'สนใจ'}
            color={participant.rsvpStatus === 'going' ? 'primary' : 'secondary'}
          />
        </View>
      </View>
    </TouchableOpacity>
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
  infoJoin: {
    ...typography.sm,
    lineHeight: 20,
    // color: colors.textSecondary,
  },
  infoStatus: {
    ...typography.sm,
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export default ParticipantListItem;
