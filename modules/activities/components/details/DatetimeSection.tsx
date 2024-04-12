import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import dayjs from 'dayjs';
import { formatDate } from '@/utils/datetime';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import 'dayjs/locale/th';

type Props = {
  datetime?: string;
  duration?: number;
  onPress: () => void;
};

const DatetimeSection = ({ datetime, duration, onPress }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="calendar-clock" size={24} color="black" />
      </View>
      <View style={styles.content}>
        <Text style={styles.date}>{formatDate(datetime!)} น.</Text>
      </View>
    </Pressable>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // padding: spacings.md,
    // backgroundColor: 'white',
    borderRadius: spacings.md,
  },
  content: {
    marginLeft: spacings.md,
  },
  date: {
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

export default DatetimeSection;
