import { StyleSheet, Pressable, View, Text } from 'react-native';
import { TouchableOpacity, Chip, Text as RNUIText } from 'react-native-ui-lib';
import React from 'react';
import dayjs from 'dayjs';
import { ActivityResponse } from '@/api/type';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ActivityCardProps = {
  activity: ActivityResponse;
  onPress?: () => void;
};
const ActivityCard = ({ activity, onPress }: ActivityCardProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.6}>
      <View style={styles.content}>
        <Text style={styles.textDatetime}>
          {dayjs(activity.dateTime).format('ddd, MMMM D, YYYY h:mm')}
        </Text>
        <Text style={styles.title}>{activity.title}</Text>
        {/* <RNUIText md-b>{activity.title}</RNUIText> */}

        {/* <Text sm>{activity.description}</Text> */}
        <View style={styles.chipsList}>
          <Chip label={activity.categoryName} />
          <Chip label={`${activity.users.length}/${activity.noOfMembers}`} />
        </View>
        <View style={styles.placeContainer}>
          <Text style={styles.textDescription}>{activity.location.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCard;

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    padding: spacings.lg,
    // gap: spacings.xs,
    // flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    borderRadius: spacings.md,
    backgroundColor: '#FFF',
    elevation: 3,
    // ...SHADOWS.medium,
    // shadowColor: COLORS.white,
  },
  content: {
    // gap: 4,
  },
  title: {
    ...typography.mdB,
  },
  textDatetime: {
    ...typography.xsB,
    color: colors.primary,
  },
  chipsList: {
    flexDirection: 'row',
    gap: spacings.xs,
    marginBottom: spacings.xs,
  },
  //TODO: style
  textDescription: {
    ...typography.xsB,
    color: '#888693',
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacings.xs,
  },
}));
