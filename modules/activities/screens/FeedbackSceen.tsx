import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import {
  UseGetActivityParticipants,
  UseGetMyUserInfo,
  UseUpdateActivity,
  UseUpdateParticipant,
} from '@/hooks/useAPI';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ParticipantList from '../components/details/participants/ParticipantList';
import ParticipantListItem from '../components/details/participants/ParticipantListItem';
import { FlashList } from '@shopify/flash-list';
import { FeedbackParticipantListItem } from '../components';
import { AttendanceStatus, Participant } from '@/api/activities/type';
import { RNUIButton } from '@/components';

type Props = {};

const FeedbackSceen = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const { activityId } = useLocalSearchParams<{ activityId: string }>();
  const { data: user } = UseGetMyUserInfo();
  const {
    data: participantsData,
    refetch: participantsRefetch,
    selectedRSVPStatus,
    setSelectedRSVPStatus,
  } = UseGetActivityParticipants({
    activityId: Number(activityId),
  });
  const { participants } = participantsData || {};

  const participantsWithOutHost = useMemo(() => {
    return participants?.filter(participant => participant.userId !== user?.userId);
  }, [participants]);

  const isComplete = useMemo(() => {
    return participants?.some((participant: Participant) => participant.status !== 'waiting');
  }, [participants]);

  const { mutate: updateParticipantMutate } = UseUpdateParticipant();
  const { mutate: updateActivityMutate } = UseUpdateActivity();

  const handleGoingActivity = async (userId: number, status: AttendanceStatus) => {
    updateParticipantMutate(
      {
        params: { activityId: Number(activityId), userId: Number(userId) },
        updateRequest: {
          status: status,
          rsvpStatus: 'going', //TODO: ใส่เพราะบัคที่เซิฟเวอร์ ไม่มีขึ้น 500
        },
      },
      {
        onSuccess(data, variables, context) {
          console.log('🚀 ~ onSuccess ~ data:', data);
          console.log('🚀 ~ onSuccess ~ variables:', variables);
          console.log('🚀 ~ onSuccess ~ context:', context);
        },
      },
    );
  };

  const handleDone = () => {
    updateActivityMutate({ activityId: Number(activityId), updateRequest: { duration: 1001 } });
    router.replace('/(app)/(tabs)');
  };

  return (
    <View style={styles.container}>
      <FlashList
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={participantsWithOutHost}
        // extraData={selectedCategoryIds}
        renderItem={({ item: participant }) => (
          <>
            <FeedbackParticipantListItem participant={participant} onSelect={handleGoingActivity} />
          </>
        )}
        estimatedItemSize={100}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.listGap} />}

        // onEndReached={handleLoadMore}
      />
      <View style={styles.footerContainer}>
        <RNUIButton label="บันทึก" disabled={!isComplete} onPress={handleDone} />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography, component }) => ({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: spacings.md,
    paddingVertical: spacings.md,
  },
  listGap: {
    height: spacings.sm,
  },
  footerContainer: {
    ...component.footer,
  },
}));

export default FeedbackSceen;
