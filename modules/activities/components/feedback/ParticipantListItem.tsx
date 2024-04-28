import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Avatar, Chip } from 'react-native-ui-lib';
import { formatDate } from '@/utils/datetime';
import { AttendanceStatus, Participant } from '@/api/activities/type';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppChip from '@/components/AppChip';
import { router } from 'expo-router';

type Props = {
  participant: Participant;
  onSelect: (userId: number, status: AttendanceStatus) => void;
};

const ParticipantListItem = ({ participant, onSelect }: Props) => {
  const { styles, theme } = useStyles(stylesheet);

  const handleArrivedPress = () => {
    onSelect(participant.userId, 'arrived');
  };
  const handleNotArrivedPress = () => {
    onSelect(participant.userId, 'not_arrived');
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.userContainer}> */}
      <Avatar
        source={{
          uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
        }}
        // label={'test'}
      />
      <View style={styles.content}>
        <Text style={styles.username}>{participant.username}</Text>
      </View>
      {/* </View> */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[
            styles.arrivedBtn,
            {
              backgroundColor:
                participant.status === 'arrived' ? theme.colors.success : theme.colors.gray,
            },
          ]}
          activeOpacity={0.5}
          onPress={handleArrivedPress}
        >
          <Text style={styles.arrivedText}>มา</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.arrivedBtn,
            {
              backgroundColor:
                participant.status === 'not_arrived' ? theme.colors.danger : theme.colors.gray,
            },
          ]}
          activeOpacity={0.5}
          onPress={handleNotArrivedPress}
        >
          <Text style={styles.notArrivedText}>ไม่มา</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.success,
    borderRadius: spacings.md,
    padding: spacings.sm,
  },
  content: {
    marginLeft: spacings.md,
    maxWidth: 'auto',
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    // flexGrow: 1,
    alignItems: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    gap: spacings.sm,
  },
  username: {
    ...typography.smB,
    // maxWidth: 100,
  },
  arrivedBtn: {
    borderRadius: spacings.md,
    paddingVertical: spacings.md,
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrivedText: {
    ...typography.md,
    color: colors.onPrimary,
  },
  notArrivedText: {
    ...typography.md,
    color: colors.onPrimary,
  },
}));

export default ParticipantListItem;
