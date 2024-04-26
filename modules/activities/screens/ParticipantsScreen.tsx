import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { SegmentedControl } from 'react-native-ui-lib';
import { UseGetActivityParticipants } from '@/hooks/useAPI';
import { useLocalSearchParams } from 'expo-router';
import ParticipantList from '../components/details/participants/ParticipantList';

type Props = {};

const ParticipantsScreen = (props: Props) => {
  const { styles } = useStyles(stylesheet);

  const { activityId } = useLocalSearchParams<{ activityId: string }>();

  const { data: participantsData, refetch: participantsRefetch } =
    UseGetActivityParticipants(activityId);
  const { content: participants } = participantsData || {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SegmentedControl
          segments={[{ label: 'ทั้งหมด' }, { label: 'จะไป' }, { label: 'ไม่ไป' }]}
        />
      </View>
      <ParticipantList participants={participants} />
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    // paddingHorizontal: spacings.md,
  },
  header: {
    padding: spacings.md,
  },
}));

export default ParticipantsScreen;
