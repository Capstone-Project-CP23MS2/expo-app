import { View, Text, Alert, Image, Platform, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { UseDeleteUser } from '@/hooks/useAPI';
import AppButton from '@/modules/shared/AppButton';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';
import { SegmentedControl } from 'react-native-ui-lib';
import * as ImagePicker from 'expo-image-picker';
import { RNUIButton } from '@/components';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function dev() {
  const { styles } = useStyles(stylesheet);

  const router = useRouter();
  const { user, onLogout } = useAuth();
  const deleteUserMutation = UseDeleteUser();

  const itemList = [
    {
      id: 'screen',
      title: 'Test Screen',
      content: [
        {
          id: 'screen-new-interests',
          title: 'Interests Screen',
          onPress: () => router.push('/profile/onboarding/interests'),
        },
        {
          id: 'screen-new-activities',
          title: 'New Activities Screen',
          onPress: () => router.push('/activities/new'),
        },
        {
          id: 'screen-new-activities-form',
          title: 'New Activities Form Screen',
          onPress: () => router.push('/activities/activity-create'),
        },
      ],
    },
    {
      id: 'component',
      title: 'Component',
      content: [
        {
          id: 'component-button',
          title: 'RNUI Button',
          onPress: () => router.push('/dev/DevButtonView'),
        },
        {
          id: 'component-textfield',
          title: 'RNUI Textfield',
          onPress: () => router.push('/dev/DevButtonView'),
        },
        {
          id: 'component-modal',
          title: 'Modal',
          onPress: () => router.push('/dev/DevModalView'),
        },
        {
          id: 'component-wizard',
          title: 'Wizard',
          onPress: () => router.push('/dev/DevWizard'),
        },
      ],
    },
    {
      id: 'lib',
      title: 'Library',
      content: [
        {
          id: 'lib-react-query',
          title: 'React Query',
          onPress: () => router.push('/dev/library/DevReactQuery'),
        },
        {
          id: 'lib-unistyles',
          title: 'Unistyles',
          onPress: () => router.push('/dev/library/DevUnistyles'),
        },
        {
          id: 'lib-map',
          title: 'Map',
          onPress: () => router.push('/dev/library/DevMapView'),
        },
        {
          id: 'lib-rn-map',
          title: 'React Native Map',
          onPress: () => router.push('/dev/library/DevRNMap'),
        },
        {
          id: 'lib-expo-location',
          title: 'Expo Location',
          onPress: () => router.push('/dev/library/DevExpoLocation'),
        },
        {
          id: 'lib-expo-image-picker',
          title: 'Image Picker',
          onPress: () => router.push('/dev/library/DevReactQuery'),
        },
      ],
    },
  ];

  const [image, setImage]: any = useState(null);

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

  const renderItem = (key: string, title: string, onPress: () => void) => {
    return (
      <Pressable
        key={key}
        style={styles.listItemContainer}
        onPress={onPress}
        android_ripple={{ color: 'gray' }}
      >
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{title}</Text>
          <MaterialIcons name="chevron-right" size={24} color="black" />
        </View>
      </Pressable>
    );
  };
  return (
    <ScrollView>
      {itemList.map(item => (
        <View key={item.id}>
          <Text style={styles.title}>{item.title}</Text>
          {item.content.map(content => renderItem(content.id, content.title, content.onPress))}
        </View>
      ))}

      <View>
        <AppButton label="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },

  title: {
    ...typography.lgB,
    paddingHorizontal: spacings.lg,
    paddingTop: spacings.xl,
  },

  listItemContainer: {
    paddingHorizontal: spacings.lg,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacings.lg,
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
  },

  listItemTitle: {
    ...typography.md,
  },
}));
