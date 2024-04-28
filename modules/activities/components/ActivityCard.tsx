import { StyleSheet, Pressable, View, Text } from 'react-native';
import { TouchableOpacity, Chip, Text as RNUIText } from 'react-native-ui-lib';
import React from 'react';
import dayjs from 'dayjs';
import { ActivityResponse } from '@/api/type';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useRouter } from 'expo-router';
import { Activity } from '@/api/activities/type';

type ActivityCardProps = {
  activity: Activity;
  onPress?: () => void;
};
const ActivityCard = ({ activity, onPress }: ActivityCardProps) => {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();

  const handlePress = () => {
    if (onPress) return onPress();
    //default behavior
    router.push(`/activities/${activity.activityId}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container} activeOpacity={0.6}>
      <View>
        <Text style={styles.textDatetime}>
          {dayjs(activity.dateTime).format('ddd, MMMM D, YYYY h:mm')}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {activity.title}
        </Text>
        <View style={styles.chipsList}>
          <Chip label={activity.categoryName} />
          <Chip label={`${activity.goingCounts}/${activity.noOfMembers}`} />
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
    borderRadius: spacings.md,
    backgroundColor: '#FFF',
    elevation: 3,
    borderColor: colors.lightgray,
    borderWidth: 1,
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
