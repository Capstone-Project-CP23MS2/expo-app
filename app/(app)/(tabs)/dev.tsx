import { View, Text, Alert, Image, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { UseDeleteUser, UseGetCategories } from '@/hooks/useAPI';
import AppButton from '@/modules/shared/AppButton';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';
import { SegmentedControl } from 'react-native-ui-lib';
import * as ImagePicker from 'expo-image-picker';
import { RNUIButton } from '@/components';

export default function dev() {
  const router = useRouter();
  const { user, onLogout } = useAuth();
  const deleteUserMutation = UseDeleteUser();

  const [image, setImage]: any = useState(null);
  // const { data: categoriesData, isLoading: isLoadingCategories } = UseGetCategories()
  // const { content: categories } = categoriesData || {}

  const onDeleteUser = async () => {
    deleteUserMutation.mutate(user?.userId!, {
      onSuccess() {
        console.log('🚮 Delete Test User Success');
        onLogout();
        router.push('/(auth)/login');
      },
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

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
      <View>
        <AppButton label="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
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
      <AppButton label={'3-Button Alert'} onPress={createThreeButtonAlert} />
    </View>
  );
}
