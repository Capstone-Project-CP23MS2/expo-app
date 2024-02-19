import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppButton from '@/modules/shared/AppButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createParticipant, deleteParticipant } from '@/api/activities'
import { objToFormData } from '@/utils'
import { useRouter } from 'expo-router'

type Props = {
  userId: string
  activityId: string
  isParticipant?: boolean
}

export default function JoinButton({ userId, activityId, isParticipant }: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutateAsync: joinActivityMutation } = useMutation({
    mutationFn: createParticipant,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['activityParticipants', activityId] })
      //   router.push('/(app)/(tabs)/activities')
    },
    onError: error => {
      console.log(error)
    },
  })
  const { mutateAsync: leaveActivityMutation } = useMutation({
    mutationFn: deleteParticipant,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['activityParticipants', activityId] })
      router.push('/(app)/(tabs)/activities')
    },
    onError: error => {
      console.log(error)
    },
  })

  const joinActivity = async () => {
    try {
      await joinActivityMutation(objToFormData({ userId, activityId }))
    } catch (error) {
      console.log(error)
    }
  }
  const leaveActivity = async () => {
    try {
      await leaveActivityMutation({ userId, activityId })
    } catch (error) {
      console.log(error)
    }
  }

  if (isParticipant) {
    return <AppButton variant="tertiary" label="ออกจากกิจกรรม" onPress={leaveActivity} fullWidth />
  }

  return <AppButton variant="primary" label="เข้าร่วมกิจกรรม" onPress={joinActivity} fullWidth />
}

const styles = StyleSheet.create({})
