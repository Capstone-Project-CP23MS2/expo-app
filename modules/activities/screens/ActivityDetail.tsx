import { View, Text, ToastAndroid, Pressable } from 'react-native';
import React, { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import {
  UseDeleteActivity,
  UseGetActivity,
  UseGetActivityParticipants,
  UseGetMyUserInfo,
} from '@/hooks/useAPI';
import AppLoaderScreen from '@/components/AppLoaderScreen';
import { AppConfirmModal, RNUIButton } from '@/components';
import { isAxiosError } from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityDatetime, ActivityPlace, ActivityParticipants } from '../components';
import { Chip } from 'react-native-ui-lib';
import JoinButton from '@/modules/activity-detail/components/JoinButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {};
// note: ต้องเห็นข้อมูลทุกอย่างที่ใช้ในการตัดสินใจใน 1 หน้าจอ
const ActivityDetail = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  //route
  const router = useRouter();
  const { id: activityId } = useLocalSearchParams<{ id: string }>();
  console.log('render ActivityDetail');

  const {
    data: activity,
    isLoading,
    isError,
    error,
    refetch: activityRefetch,
  } = UseGetActivity(activityId);

  // TODO: ย้ายการเช็ค isParticipant ไปที่ server แทนเพื่อลดโอกาสที่จะต้อง fetch participants
  const { data: participantsData } = UseGetActivityParticipants(activityId);
  const { content: participants } = participantsData || {};
  const { data: user } = UseGetMyUserInfo();
  const isParticipant = participants?.some(participant => participant.userId === user?.userId);
  const isOwner = user?.userId === activity?.hostUserId;

  const handlePressParticipants = () =>
    router.push({
      pathname: '/activities/participants',
      params: { activityId },
    });

  const handlePressDatetime = () =>
    router.push({
      pathname: '/activities/participants',
      params: { activityId },
    });

  const { mutate: deleteMutate, mutateAsync: deleteMutateAsync } = UseDeleteActivity();
  // const deleteParticipantMutation = UseDeleteParticipant()

  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleOpenDeleteModal = () => setShowSignOutModal(true);
  const handleCloseDeleteModal = () => setShowSignOutModal(false);

  const handleDelete = async () => {
    try {
      await deleteMutateAsync(activityId, {
        onSuccess() {
          console.log('delete success');
          ToastAndroid.show('Activity deleted', ToastAndroid.SHORT);
          router.push('/(app)/(tabs)/home');
        },
      });
    } catch (e) {
      if (isAxiosError(error)) {
        console.log('error test');

        return;
      }
    }
    handleCloseDeleteModal();
  };
  const handleEdit = () => {
    router.push({ pathname: '/(app)/activities/edit', params: { activityId } });
  };

  const renderButton = () => {
    if (isParticipant) {
      return (
        <JoinButton
          userId={user?.userId}
          userName={user?.username}
          activityId={activityId}
          activityTitle={activity?.title}
          isParticipant={isParticipant}
          targetId={activity?.hostUserId}
        />
      );
    }
    return null;
    // if (activity?.isOwner) {
    //   return (
    //     <RNUIButton
    //       label="แก้ไขกิจกรรม"
    //       onPress={() => router.push(`/activities/edit?id=${activityId}`)}
    //     />
    //   );
    // }

    // return null;
  };

  // const handlePressDe

  if (isLoading) {
    return <AppLoaderScreen />;
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <Tabs.Screen
        options={{
          headerRight(props) {
            return (
              <Pressable onPress={handleEdit}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
              </Pressable>
            );
          },
        }}
      />
      <View style={styles.container}>
        <ScrollView style={{}} contentContainerStyle={styles.content}>
          <View style={{ flexDirection: 'row' }}>
            <Chip label={activity?.categoryName} />
          </View>
          <Text style={styles.title}>{activity?.title}</Text>
          {/* <Text>{activity?.description}</Text> */}
          <View style={styles.infoList}>
            <ActivityDatetime
              datetime={activity?.dateTime}
              duration={activity?.duration}
              onPress={handlePressDatetime}
            />
            <ActivityPlace place={activity?.location} />

            <ActivityParticipants
              noOfMembers={activity?.noOfMembers}
              memberCounts={activity?.memberCounts}
              onPress={handlePressParticipants}
            />
          </View>

          <Text style={styles.description}>
            {activity?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Recusandae excepturi, iste possimus incidunt accusantium necessitatibus minima sed quis,
            fugit itaque harum maiores ab, voluptatum consequatur. Soluta, iure? Reiciendis, fuga
            ducimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi id commodi quae
            in tempora, aspernatur voluptate ut ex maiores eum error quibusdam enim vero. Maiores
            aspernatur, molestias minus accusantium doloribus veritatis modi aperiam, vero tenetur
            perspiciatis velit! Voluptatibus, et culpa. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Placeat tenetur aspernatur nemo provident officia illo iste assumenda
            nihil fuga suscipit minus velit molestiae iure, ipsa esse cupiditate magnam quaerat
            quae. Minima quia harum quae ut quod quo laborum repellendus nulla reiciendis officia
            consequuntur, quasi earum, sit ea placeat animi facere vitae soluta possimus, iure
            sapiente doloribus voluptas sequi eos? Impedit aperiam fugiat optio maxime mollitia
            sequi enim, voluptatem velit rem tempore repellat officiis natus veniam sunt, architecto
            veritatis eos ullam eligendi? Est cupiditate asperiores eveniet doloremque quasi, ipsam
            voluptatum, ducimus a nam quidem, provident ratione. Eveniet enim impedit laboriosam
            perspiciatis?
          </Text>

          {/* <RNUIButton label="แก้ไขกิจกรรม" onPress={() => router.push(`/activities/edit?id=${activityId}`)} /> */}
        </ScrollView>
        <View style={styles.footerWrapper}>
          <JoinButton
            userId={user?.userId}
            userName={user?.username}
            activityId={activityId}
            activityTitle={activity?.title}
            isOwner={isOwner}
            isParticipant={isParticipant}
            targetId={activity?.hostUserId}
            onDeleteActivity={handleOpenDeleteModal}
          />
        </View>
      </View>

      <AppConfirmModal
        visible={showSignOutModal}
        transparent
        title="ยืนยันเพื่อทำการลบกิจกรรม"
        subheading='หลังจาก "ยืนยัน" จะไม่สามารถนำกิจกรรมกลับมาได้'
        onConfirm={handleDelete}
        onCancel={handleCloseDeleteModal}
        btnColor="red"
      />
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography, component }) => ({
  container: {
    flex: 1,
    // backgroundColor: colors.background,
  },
  content: {
    padding: spacings.lg,
  },
  title: {
    ...typography.lgB,
    marginVertical: spacings.sm,
  },
  infoList: {
    marginBottom: spacings.md,
    gap: spacings.sm,
  },
  description: {
    ...typography.sm,
    color: colors.gray,
  },
  footerWrapper: {
    padding: spacings.lg,
  },
  footer: {
    ...component.footer,
  },
}));

export default ActivityDetail;
