import { View, Text } from 'react-native'
import React from 'react'
import { UseDeleteUser, UseGetCategories } from '@/hooks/useAPI'
import AppButton from '@/modules/shared/AppButton'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'expo-router'

export default function dev() {
  const router = useRouter()
  const { currentUser, onLogout } = useAuth()
  const deleteUserMutation = UseDeleteUser()
  const { data: categoriesData, isLoading: isLoadingCategories } = UseGetCategories()
  const { content: categories } = categoriesData || {}

  const onDeleteUser = async () => {
    deleteUserMutation.mutate(currentUser?.userId!, {
      onSuccess() {
        console.log('🚮 Delete Test User Success')
        onLogout()
        router.push('/(auth)/login')
      },
    })
  }

  return (
    <View>
      <Text>API</Text>
      <AppButton variant="primary" label="Get Categories" onPress={() => console.log(categories)} />
      <AppButton variant="primary" label="Logout" onPress={onLogout} />
      <AppButton variant="primary" label="Delete User" onPress={onDeleteUser} />
    </View>
  )
}
