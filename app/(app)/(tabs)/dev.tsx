import { View, Text } from 'react-native'
import React from 'react'
import { UseDeleteUser, UseGetCategories } from '@/hooks/useAPI'
import AppButton from '@/modules/shared/AppButton'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'expo-router'
import { SegmentedControl } from 'react-native-ui-lib'
import { RNUIButton } from '@/components'

export default function dev() {
  const router = useRouter()
  const { user, onLogout } = useAuth()
  const deleteUserMutation = UseDeleteUser()
  // const { data: categoriesData, isLoading: isLoadingCategories } = UseGetCategories()
  // const { content: categories } = categoriesData || {}

  const onDeleteUser = async () => {
    deleteUserMutation.mutate(user?.userId!, {
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
      {/* <AppButton variant="primary" label="Get Categories" onPress={() => console.log(categories)} /> */}
      <AppButton variant="primary" label="Logout" onPress={onLogout} />
      <SegmentedControl
        segments={[{ label: 'Available Activities' }, { label: 'Your Activity' }]}
        style={{ marginVertical: 15, marginTop: 20 }}
      />
      <AppButton variant="primary" label="Delete User" onPress={onDeleteUser} />
      <AppButton
        variant="primary"
        label="Button"
        onPress={() => router.push('/dev/DevButtonView')}
      />
      <AppButton variant="primary" label="Wizard" onPress={() => router.push('/dev/DevWizard')} />
      <AppButton
        variant="primary"
        label="Interests"
        onPress={() => router.push('/profile/onboarding/interests')}
      />
      <AppButton
        variant="primary"
        label="Modal View"
        onPress={() => router.push('/dev/DevModalView')}
      />
    </View>
  )
}
