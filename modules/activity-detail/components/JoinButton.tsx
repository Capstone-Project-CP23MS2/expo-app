import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import React from 'react';
import AppButton from '@/modules/shared/AppButton';
import {
  UseCreateParticipant,
  UseDeleteParticipant,
  UseCreateNotification,
  UseUpdateParticipant,
} from '@/hooks/useAPI';
import { objToFormData } from '@/utils';
import { useRouter } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = {
  userId?: number;
  userName?: string;
  activityId?: string;
  activityTitle?: string;
  isOwner?: boolean;
  isParticipant?: boolean;
  targetId?: number;
};

export default function JoinButton({
  userId,
  userName,
  activityId,
  activityTitle,
  isParticipant,
  targetId,
}: Props) {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const createParticipantMutation = UseCreateParticipant();
  const deleteParticipantMutation = UseDeleteParticipant();
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
          router.push('/(app)/(tabs)/');
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
  const { mutate: updateParticipantMutate } = UseUpdateParticipant();
  const handleGoingActivity = async () => {
    console.log('d');
    updateParticipantMutate(
      {
        params: { activityId: Number(activityId), userId: Number(userId) },
        updateRequest: { rsvpStatus: 'going', status: 'waiting' },
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
      <AppButton variant="danger" label="ออกจากกิจกรรม" onPress={onLeaveActivity} fullWidth />
      <AppButton label="ยืนยันการไป" onPress={handleGoingActivity} fullWidth />
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
