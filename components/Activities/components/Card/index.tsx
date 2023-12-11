import { COLORS, SHADOWS, SIZES } from '@/constants';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import dayjs from 'dayjs';

type ActivityCardProps = {
  activity: {
    activityId: number;
    title: string;
    description: string;
    dateTime: string;
    duration: number;
    place?: string;
    createdAt: string;
    updatedAt: string;
    currentParticipants?: number;
    maxParticipants?: number;
  };
  handleNavigate: () => void;
};

const index = ({ activity, handleNavigate }: ActivityCardProps) => {
  const {
    title,
    dateTime,
    duration,
    place,
    currentParticipants,
    maxParticipants,
  } = activity;
  // console.log(activity);
  const array = [1, 2];
  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      {/* <Pressable style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg',
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </Pressable> */}

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <Text style={styles.infoText}>
          {dayjs(dateTime).format('dddd, MMMM D, YYYY h:mm')}
        </Text>
        {/* <Text style={styles.infoText}>Duration: {duration}</Text> */}
        <Text style={styles.infoText}>{place}</Text>
        {/* <Text style={styles.infoText}>
          Participants: {1} / {1}
        </Text> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: 'DMBold',
    color: COLORS.primary,
  },
  infoText: {
    fontSize: SIZES.small + 2,
    fontFamily: 'DMRegular',
    color: COLORS.gray,
    marginTop: 3,
    textTransform: 'capitalize',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
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
    marginHorizontal: SIZES.medium,
  },
});

export default index;
