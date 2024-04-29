import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Stack, useLocalSearchParams } from 'expo-router';
import { UseGetActivityParticipants, UseGetParticipant, UseGetUserById } from '@/hooks/useAPI';
import { Avatar } from 'react-native-ui-lib';
import { UseGetReviewsUserByUserId } from '@/hooks/useAPI/reviews';
import { RNUIButton, RNUITextField } from '@/components';
import { ReviewUser } from '@/api/reviews/type';
import { UserInterest } from '@/api/users/users.type';
import { getAge } from '@/utils/datetime';
import AppTextInput from '@/modules/shared/AppTextInput';
import { ScrollView } from 'react-native-gesture-handler';

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
      <ScrollView>
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
          </View>
          <View style={{ gap: 10, marginTop: 15 }}>
            <View style={{ gap: 5 }}>
              <Text style={styles.textBold}>สถานะการเข้าร่วมกิจกรรม</Text>
              <View style={styles.textbox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.text}>
                    เข้าร่วมกิจกรรม {arrivedAmount ? arrivedAmount : '0'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.text}>
                    ไม่เข้าร่วมกิจกรรม {notArrivedAmount ? notArrivedAmount : '0'}
                  </Text>
                </View>
              </View>
            </View>
            {/* <View style={{ gap: 5 }}>
              <Text style={styles.textBold}>ไลน์ไอดี</Text>
              <Text style={[styles.text, styles.textbox]}>{user?.lineId}</Text>
            </View> */}
            <View style={{ gap: 5 }}>
              <Text style={styles.textBold}>เพศ</Text>
              <Text style={[styles.text, styles.textbox]}>{user?.gender}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.textBold}>อายุ</Text>
              <Text style={[styles.text, styles.textbox]}>{getAge(user?.dateOfBirth!)} ปี</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.textBold}>สนใจใน</Text>
              <View style={[styles.interestListContainer, styles.textbox]}>
                {user && user.userInterests && user.userInterests.length > 0 ? (
                  user.userInterests.map((interest: UserInterest) => (
                    <Text style={styles.text} key={interest.categoryId}>
                      {interest.name}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.text}>ไม่มีสิ่งที่สนใจ</Text>
                )}
              </View>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.textBold}>รีวิว</Text>
              <View style={[styles.reviewListContainer, styles.textbox]}>
                {reviews && reviews.length > 0 ? (
                  reviews.map((review: ReviewUser) => (
                    <View key={review.reviewId}>
                      <Text style={styles.text}>{review.comment}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.text}>ไม่มีรีวิว</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    padding: spacings.page,
    backgroundColor: 'white',
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
  textBold: {
    ...typography.mdB,
  },
  text: {
    ...typography.md,
  },
  textbox: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: spacings.md,
    borderRadius: spacings.sm,
  },
}));

export default ProfileViewScreen;
