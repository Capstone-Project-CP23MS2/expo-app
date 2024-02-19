import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppButton from '@/modules/shared/AppButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createParticipant } from '@/api/activities'
import { objToFormData } from '@/utils'

type Props = {
  userId: string
  activityId: string
  isParticipant?: boolean
}

export default function JoinButton({ userId, activityId, isParticipant }: Props) {
  const queryClient = useQueryClient()
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
  const joinActivity = async () => {
    try {
      await joinActivityMutation(objToFormData({ userId, activityId }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppButton
      variant={isParticipant ? 'disable' : 'primary'}
      label={isParticipant ? 'คุณอยู่ในกิจกรรมอยู่แล้ว' : 'เข้าร่วมกิจกรรม'}
      onPress={joinActivity}
      fullWidth
      enabled={!isParticipant}
    />
  )
}

const styles = StyleSheet.create({})
