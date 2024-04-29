import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { url } from '@/api/urls/urls.type';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  url?: url;
};

const GroupURLSection = ({ url }: Props) => {
  const { styles } = useStyles(stylesheet);
  const handlePress = () => {
    Linking.openURL(url);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="link" size={24} color="black" />
      </View>
      <View style={styles.content}>
        <View style={styles.urlNameWrapper}>
          <Text style={styles.urlName}>กลุ่ม Line หรือ Discord</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: spacings.md,
    // backgroundColor: 'white',
    borderRadius: spacings.md,
  },
  content: {
    marginLeft: spacings.md,
    flexGrow: 1,
    flexShrink: 1,
    // flexWrap: 'wrap',
  },
  urlNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  urlName: {
    ...typography.mdB,
  },
  location: {
    ...typography.sm,
    color: colors.gray,
    // flexWrap: 'wrap',
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: 'white',
    borderRadius: spacings.sm / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    // flexGrow: 1,
    // flexShrink: 0,
  },
}));

export default GroupURLSection;
