import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React from 'react'
import AppButton from '@/modules/shared/AppButton'
import { UseCreateParticipant, UseDeleteParticipant } from '@/hooks/useAPI'
import { objToFormData } from '@/utils'
import { useRouter } from 'expo-router'

type Props = {
  userId: string
  activityId: string
  isParticipant?: boolean
}

export default function JoinButton({ userId, activityId, isParticipant }: Props) {
  const router = useRouter()
  const createParticipantMutation = UseCreateParticipant()
  const deleteParticipantMutation = UseDeleteParticipant()

  const onJoinActivity = async () => {
    createParticipantMutation.mutate(objToFormData({ userId, activityId }), {
      onSuccess: data => {
        ToastAndroid.showWithGravity(
          "You've joined Activitiy",
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        )
        console.log('🚀 ~ createParticipantMutation.mutate ~ data:', data)
      },
      onError: error => {
        console.log(error)
      },
    })
  }

  const onLeaveActivity = async () => {
    deleteParticipantMutation.mutate(
      { activityId, userId },
      {
        onSuccess: () => {
          ToastAndroid.showWithGravity("You've left Activity", ToastAndroid.SHORT, ToastAndroid.TOP)
          router.push('/(app)/(tabs)/')
        },
        onError: error => {
          console.log(error)
        },
      },
    )
  }

  if (isParticipant) {
    return <AppButton variant="danger" label="Leave Activity" onPress={onLeaveActivity} fullWidth />
  }

  return <AppButton variant="primary" label="Join Activity" onPress={onJoinActivity} fullWidth />
}

const styles = StyleSheet.create({})
