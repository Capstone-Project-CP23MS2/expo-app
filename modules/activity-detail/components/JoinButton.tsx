import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import React from 'react';
import AppButton from '@/modules/shared/AppButton';
import {
  UseCreateParticipant,
  UseDeleteParticipant,
  UseCreateNotification,
  UseUpdateParticipant,
  UseGetActivityParticipants,
  UseGetParticipant,
} from '@/hooks/useAPI';
import { objToFormData } from '@/utils';
import { useRouter } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { RNUIButton } from '@/components';

type Props = {
  userId?: number;
  userName?: string;
  activityId?: string;
  activityTitle?: string;
  isOwner?: boolean;
  isParticipant?: boolean;
  targetId?: number;
  isFull?: boolean;
};

export default function JoinButton({
  userId,
  userName,
  activityId,
  activityTitle,
  isParticipant,
  targetId,
  isFull,
}: Props) {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const createParticipantMutation = UseCreateParticipant();
  const deleteParticipantMutation = UseDeleteParticipant();
  const { mutate: updateParticipantMutate } = UseUpdateParticipant();
  const { data: participant, refetch: refetchParticipant } = UseGetParticipant(
    Number(activityId),
    Number(userId),
    isParticipant,
  );

  const createNotiMutation = UseCreateNotification();
  const unRead = true;

  const onJoinActivity = async () => {
    const type = 'join';
    const message = `${userName} joined ${activityTitle}`;

    createParticipantMutation.mutate(
      objToFormData({ userId, activityId, rsvpStatus: 'interesting', status: 'waiting' }),
      {
        onSuccess: data => {
          ToastAndroid.show("You've joined Activitiy", ToastAndroid.SHORT);
          console.log('🚀 ~ createParticipantMutation.mutate ~ data:', data);
        },
        onError: error => {
          console.log(error);
        },
      },
    );
    createNotiMutation.mutate(objToFormData({ targetId, message, unRead, type }), {
      onSuccess: data => {
        console.log('🚀 ~ notificationMutation.mutate ~ data:', data);
      },
      onError: error => {
        console.log(error);
      },
    });
  };

  const onLeaveActivity = async () => {
    const type = 'leave';
    const message = `${userName} left ${activityTitle}`;

    deleteParticipantMutation.mutate(
      { activityId, userId },
      {
        onSuccess: () => {
          ToastAndroid.show("You've left Activity", ToastAndroid.SHORT);
        },
        onError: error => {
          console.log(error);
        },
      },
    );
    createNotiMutation.mutate(objToFormData({ targetId, message, unRead, type }), {
      onSuccess: data => {
        console.log('🚀 ~ notificationMutation.mutate ~ data:', data);
      },
      onError: error => {
        console.log(error);
      },
    });
  };
  const handleGoingActivity = async () => {
    updateParticipantMutate(
      {
        params: { activityId: Number(activityId), userId: Number(userId) },
        updateRequest: {
          rsvpStatus: participant?.rsvpStatus === 'interesting' ? 'going' : 'interesting',
        },
      },
      {
        onSuccess(data, variables, context) {
          console.log('🚀 ~ handleGoingActivity ~ data', data);
        },
      },
    );
  };

  if (!isParticipant) {
    return <AppButton label="เข้าร่วมกิจกรรม" onPress={onJoinActivity} fullWidth />;
  }

  return (
    <View style={styles.container}>
      <RNUIButton color="danger" label="ออกจากกิจกรรม" onPress={onLeaveActivity} fullWidth />
      {participant?.rsvpStatus === 'interesting' ? (
        <RNUIButton
          label={isFull ? 'กิจกรรมเต็ม' : 'ยืนยันการไป'}
          onPress={handleGoingActivity}
          fullWidth
          disabled={isFull}
        />
      ) : (
        <RNUIButton label="ยกเลิกการยืนยัน" onPress={handleGoingActivity} fullWidth />
      )}
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    // flex: 1,
    flexDirection: 'row',
    gap: spacings.sm,
  },
}));
