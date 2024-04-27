import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { SegmentedControl } from 'react-native-ui-lib';
import { UseGetActivity, UseGetActivityParticipants } from '@/hooks/useAPI';
import { useLocalSearchParams } from 'expo-router';
import ParticipantList from '../components/details/participants/ParticipantList';

type Props = {};

const ParticipantsScreen = (props: Props) => {
  const { styles } = useStyles(stylesheet);

  const { activityId } = useLocalSearchParams<{ activityId: string }>();
  const {
    data: activity,
    isLoading,
    isError,
    error,
    refetch: activityRefetch,
  } = UseGetActivity(activityId);

  const {
    data: participantsData,
    refetch: participantsRefetch,
    selectedRSVPStatus,
    setSelectedRSVPStatus,
  } = UseGetActivityParticipants({
    activityId: Number(activityId),
  });
  const { participants } = participantsData || {};
  // const { data: participantsData, refetch: participantsRefetch } =
  //   UseGetActivityParticipantsOld(activityId);
  // const { content: participants } = participantsData || {};

  const handleSeqmentChange = (index: number) => {
    console.log(index);
    switch (index) {
      case 0:
        setSelectedRSVPStatus(undefined);
        break;
      case 1:
        setSelectedRSVPStatus('going');
        break;
      case 2:
        setSelectedRSVPStatus('interesting');
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SegmentedControl
          segments={[{ label: 'ทั้งหมด' }, { label: 'จะไป' }, { label: 'สนใจ' }]}
          onChangeIndex={handleSeqmentChange}
        />
      </View>
      <ParticipantList participants={participants} hostId={activity?.hostUserId} />
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // paddingHorizontal: spacings.md,
  },
  header: {
    padding: spacings.md,
  },
}));

export default ParticipantsScreen;
