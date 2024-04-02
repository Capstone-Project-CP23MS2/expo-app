import { COLORS, SHADOWS, SIZES, FONT } from '@/constants';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import dayjs from 'dayjs';
import { ActivityResponse } from '@/api/type';

type ActivityCardProps = {
  activity: ActivityResponse;
  handleNavigate: () => void;
};

const index = ({ activity, handleNavigate }: ActivityCardProps) => {
  const { styles } = useStyles(stylesheet);

  const array = [1, 2];
  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {activity.title}
        </Text>
        <Text>{activity.dateTime} ssss</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoSubContainer}>
            <Icon source={'calendar'} color={COLORS.gray} size={18}></Icon>
            <Text style={styles.infoText}>{dayjs(activity.dateTime).format('ddd, MMM D')}</Text>
          </View>
          <View style={styles.infoSubContainer}>
            <Icon source={'clock'} color={COLORS.gray} size={18}></Icon>
            <Text style={styles.infoText}>{dayjs(activity.dateTime).format('h:mm A')}</Text>
          </View>
        </View>
        <Text style={styles.infoText}>Location: {activity.location.name}</Text>
      </View>
    </Pressable>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.black,
  },
  infoText: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.medium,
    color: COLORS.gray,
    textTransform: 'capitalize',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    gap: 10,
  },
  infoSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    gap: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '70%',
    height: '70%',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.small,
  },
}));

export default index;
