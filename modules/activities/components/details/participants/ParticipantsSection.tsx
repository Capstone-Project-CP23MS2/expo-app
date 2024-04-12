import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  noOfMembers?: number;
  memberCounts?: number;
  onPress: () => void;
};

const ParticipantsSection = ({ noOfMembers, memberCounts, onPress }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="account-group" size={24} color="black" />
        </View>
        <Text style={styles.noOfMembers}>{`${memberCounts}/${noOfMembers}`}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="black" />

      {/* <View style={{ flexDirection: 'row' }}>
        <Text>รูป</Text>
        <Text>รูป</Text>
        <Text>รูป</Text>
        <Text>+3</Text>
      </View> */}
    </Pressable>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'white',
    // padding: spacings.md,
    // elevation: 2,
    // borderRadius: spacings.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noOfMembers: {
    marginLeft: spacings.md,
    ...typography.mdB,
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: 'white',
    borderRadius: spacings.sm / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default ParticipantsSection;
