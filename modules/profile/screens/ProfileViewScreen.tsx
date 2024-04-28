import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Stack, useLocalSearchParams } from 'expo-router';
import { UseGetActivityParticipants, UseGetParticipant, UseGetUserById } from '@/hooks/useAPI';
import { Avatar } from 'react-native-ui-lib';
import { UseGetReviewsUserByUserId } from '@/hooks/useAPI/reviews';
import { RNUIButton } from '@/components';
import { ReviewUser } from '@/api/reviews/type';
import { UserInterest } from '@/api/users/users.type';
import { getAge } from '@/utils/datetime';

type Props = {};

const ProfileViewScreen = (props: Props) => {
  const { styles, theme } = useStyles(stylesheet);
  const { id: userId } = useLocalSearchParams<{ id: string }>();
  const { data: user } = UseGetUserById(Number(userId));

  const { data: reviewsRes } = UseGetReviewsUserByUserId({ userId: Number(userId) });
  const { reviews } = reviewsRes || {};

  const { data: participantsRes, refetch } = UseGetActivityParticipants({ userId: user?.userId });
  const { participants } = participantsRes || {};

  const arrivedAmount = useMemo(() => {
    return participants?.reduce((acc, participant) => {
      return acc + (participant.status === 'arrived' ? 1 : 0);
    }, 0);
  }, [participants]);
  const notArrivedAmount = useMemo(() => {
    return participants?.reduce((acc, participant) => {
      return acc + (participant.status === 'not_arrived' ? 1 : 0);
    }, 0);
  }, [participants]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Participants',
          animation: 'slide_from_right',
          animationDuration: 200,
          // presentation: 'transparentModal',
        }}
      />
      <View style={styles.container}>
        <View style={styles.heroSectionContainer}>
          <Avatar
            source={{
              uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
            }}
            size={100}
          />
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.arrivedStatContainer}>
            <View style={styles.arrivedStatLabel}>
              <Text style={theme.typography.lg}>มา</Text>
              <Text style={theme.typography.h5}>{arrivedAmount}</Text>
            </View>
            <View style={styles.verticleLine}></View>

            <View style={styles.arrivedStatLabel}>
              <Text style={theme.typography.lg}>เท</Text>
              <Text style={theme.typography.h5}>{notArrivedAmount}</Text>
            </View>
          </View>
        </View>
        <Text>LineId: {user?.lineId}</Text>
        <Text>Gender: {user?.gender}</Text>
        <Text>อายุ: {getAge(user?.dateOfBirth!)}</Text>
        <Text>สนใจใน</Text>
        <View style={styles.interestListContainer}>
          {user?.userInterests?.map((interest: UserInterest) => (
            <Text key={interest.categoryId}>{interest.name}</Text>
          ))}
        </View>

        <Text>รีวิว</Text>
        <View style={styles.reviewListContainer}>
          {reviews?.map((review: ReviewUser) => (
            <View key={review.reviewId}>
              <Text>{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* <View style={styles.reviews}>
          
        </View> */}
      </View>
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    padding: spacings.page,
  },
  heroSectionContainer: {
    // flex: 1,
    alignItems: 'center',
  },
  username: {
    ...typography.h4,
  },
  email: {
    ...typography.md,
  },
  arrivedStatContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  arrivedStatLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacings.lg,
  },
  verticleLine: {
    height: '100%',
    width: 2,
    backgroundColor: '#909090',
  },
}));

export default ProfileViewScreen;
