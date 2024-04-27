import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import React from 'react';
import AppButton from '@/modules/shared/AppButton';
import { UseCreateParticipant, UseDeleteParticipant, UseCreateNotification } from '@/hooks/useAPI';
import { objToFormData } from '@/utils';
import { useRouter } from 'expo-router';
import { scheduleNotification } from '@/modules/notification/schedule';

type Props = {
  userId?: number;
  userName?: string;
  activityId?: string;
  activityTitle?: string;
  isOwner?: boolean;
  isParticipant?: boolean;
  targetId?: number;
  onDeleteActivity?: () => void;
};

export default function JoinButton({
  userId,
  userName,
  activityId,
  activityTitle,
  isOwner,
  isParticipant,
  targetId,
  onDeleteActivity,
}: Props) {
  const router = useRouter();
  const createParticipantMutation = UseCreateParticipant();
  const deleteParticipantMutation = UseDeleteParticipant();
  const createNotiMutation = UseCreateNotification();
  const unRead = true;

  const onJoinActivity = async () => {
    const type = 'join';
    const message = `${userName} joined ${activityTitle}`;

    scheduleNotification('Join Activity', "You're just joined activty", 3);

    createParticipantMutation.mutate(objToFormData({ userId, activityId }), {
      onSuccess: data => {
        ToastAndroid.show("You've joined Activitiy", ToastAndroid.SHORT);
        console.log('🚀 ~ createParticipantMutation.mutate ~ data:', data);
      },
      onError: error => {
        console.log(error);
      },
    });

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
  if (isOwner) {
    return <AppButton variant="danger" label="ลบกิจกรรม" onPress={onDeleteActivity} fullWidth />;
  }

  if (isParticipant) {
    return <AppButton variant="danger" label="ออกจากกิจกรรม" onPress={onLeaveActivity} fullWidth />;
  }

  return <AppButton label="เข้าร่วมกิจกรรม" onPress={onJoinActivity} fullWidth />;
}

const styles = StyleSheet.create({});
