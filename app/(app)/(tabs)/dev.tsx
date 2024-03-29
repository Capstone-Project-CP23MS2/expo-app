import { View, Text, Button, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'

import { UseDeleteUser, UseGetCategories } from '@/hooks/useAPI'
import AppButton from '@/modules/shared/AppButton'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'expo-router'
import { SegmentedControl } from 'react-native-ui-lib'
import * as ImagePicker from 'expo-image-picker'

export default function dev() {
  const router = useRouter()
  const { user, onLogout } = useAuth()
  const deleteUserMutation = UseDeleteUser()
  const { data: categoriesData, isLoading: isLoadingCategories } = UseGetCategories()
  const { content: categories } = categoriesData || {}
  const [image, setImage] = useState(null)

  const onDeleteUser = async () => {
    deleteUserMutation.mutate(user?.userId!, {
      onSuccess() {
        console.log('🚮 Delete Test User Success')
        onLogout()
        router.push('/(auth)/login')
      },
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }
  return (
    <View>
      <Text>API</Text>
      <AppButton variant="primary" label="Get Categories" onPress={() => console.log(categories)} />
      <AppButton variant="primary" label="Logout" onPress={onLogout} />
      <SegmentedControl
        segments={[{ label: 'Available Activities' }, { label: 'Your Activity' }]}
        style={{ marginVertical: 15, marginTop: 20 }}
      />
      <AppButton variant="primary" label="Delete User" onPress={onDeleteUser} />
      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    </View>
  )
}
