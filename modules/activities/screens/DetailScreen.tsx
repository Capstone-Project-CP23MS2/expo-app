import { View, Text, ToastAndroid, Pressable } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import {
  UseDeleteActivity,
  UseGetActivity,
  UseGetActivityParticipants,
  UseGetMyUserInfo,
} from '@/hooks/useAPI';
import AppLoaderScreen from '@/components/AppLoaderScreen';
import { AppBottomSheetModal, AppConfirmModal, RNUIButton } from '@/components';
import { isAxiosError } from 'axios';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { ActivityDatetime, ActivityPlace, ActivityParticipants } from '../components';
import { Button, Chip } from 'react-native-ui-lib';
import JoinButton from '@/modules/activity-detail/components/JoinButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OptionsBottomSheet from '../components/details/OptionsBottomSheet';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import GroupURLSection from '../components/details/GroupURLSection';

type Props = {};
// note: ต้องเห็นข้อมูลทุกอย่างที่ใช้ในการตัดสินใจใน 1 หน้าจอ
const DetailScreen = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  //route
  const router = useRouter();
  const { id: activityId } = useLocalSearchParams<{ id: string }>();

  const {
    data: activity,
    isLoading,
    isError,
    error,
    refetch: activityRefetch,
  } = UseGetActivity(activityId);

  // TODO: ย้ายการเช็ค isParticipant ไปที่ server แทนเพื่อลดโอกาสที่จะต้อง fetch participants
  const { data: participantsData } = UseGetActivityParticipants({ activityId: Number(activityId) });
  const { participants } = participantsData || {};

  const { data: user } = UseGetMyUserInfo();
  const isParticipant = useMemo(
    () => participants?.some(participant => participant.userId === user?.userId),
    [participants],
  );

  const isOwner = user?.userId === activity?.hostUserId;

  const diffTime = dayjs().diff(dayjs(activity?.dateTime!));
  const remainingTime = dayjs.duration(diffTime).humanize();
  const activityStart = dayjs(activity?.dateTime!);
  const activityExpire = dayjs(activity?.dateTime!).add(12, 'hour');
  const isLive = dayjs().isBetween(activityStart, activityExpire, 'm', '[)');
  const isFuture = dayjs().isBefore(activityStart);
  const remainingExpireTime = dayjs.duration(activityExpire.diff(dayjs())).humanize();
  const isExpired = dayjs().isAfter(activityExpire);

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

  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleOpenDeleteModal = () => setShowSignOutModal(true);
  const handleCloseDeleteModal = () => setShowSignOutModal(false);

  const handleDelete = async () => {
    console.log('delete activity');

    try {
      deleteMutate(activityId, {
        onSuccess() {
          console.log('delete success');
        },
        onSettled() {
          console.log('delete settled');
        },
      });

      ToastAndroid.show('Activity deleted', ToastAndroid.SHORT);
      router.push('/(app)/(tabs)');
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
    dismiss();
  };

  const optionBottomSheetRef = useRef<BottomSheetModal>(null);

  const { dismiss } = useBottomSheetModal();

  const handleOptionOpen = useCallback(() => {
    optionBottomSheetRef.current?.present();
  }, []);
  const handleOptionClose = useCallback(() => {
    optionBottomSheetRef.current?.dismiss();
  }, []);

  const handleEventCompleted = useCallback(() => {
    // Toast.show({
    //   type: 'success',
    //   text1: 'เดินทางสำเร็จ',
    //   text2: 'ขอบคุณที่ใช้บริการของเรา',
    //   visibilityTime: 6000
    // })
    router.push({
      pathname: '/activities/feedback',
      params: { activityId },
    });
  }, []);

  const renderButton = () => {
    if (activity?.duration === 1001) return <RNUIButton label={'กิจกรรมเสร็จสิ้น'} disabled />;
    if (!isFuture && activity?.goingCounts === 1)
      return <RNUIButton label={'กิจกรรมหมดเวลา'} disabled />;

    if (isOwner)
      return (
        <RNUIButton
          label={
            isFuture
              ? `กิจกรรมจะเริ่มในอีก ${remainingTime}`
              : `จบกิจกรรม (เหลือเวลาอีก ${remainingExpireTime})`
          }
          onPress={handleEventCompleted}
          disabled={!isLive}
        />
      );
    return (
      <JoinButton
        userId={user?.userId}
        userName={user?.username}
        activityId={activityId}
        activityTitle={activity?.title}
        isParticipant={isParticipant}
        isOwner={isOwner}
        targetId={activity?.hostUserId}
      />
    );
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await activityRefetch();
    setRefreshing(false);
  }, []);

  if (isLoading) return <AppLoaderScreen />;

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
              isOwner && (
                <Pressable
                  onPress={() => {
                    console.log('press');
                    handleOptionOpen();
                  }}
                >
                  <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
                </Pressable>
              )
            );
          },
        }}
      />
      <View style={styles.container}>
        <ScrollView
          style={{}}
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={{ flexDirection: 'row' }}>
            <Chip label={activity?.categoryName} />
          </View>
          <Text style={styles.title}>{activity?.title}</Text>
          {/* <Text>{activity?.description}</Text> */}
          <View style={styles.infoList}>
            <ActivityDatetime
              datetime={activity?.dateTime}
              duration={activity?.duration}
              // onPress={handlePressDatetime}
            />
            <GroupURLSection url={activity?.lineGroupUrl} />
            <ActivityPlace place={activity?.location} />
            <ActivityParticipants
              noOfMembers={activity?.noOfMembers}
              memberCounts={activity?.goingCounts}
              onPress={handlePressParticipants}
            />
          </View>

          <Text style={styles.description}>{activity?.description}</Text>
        </ScrollView>
        {isExpired || <View style={styles.footerWrapper}>{renderButton()}</View>}
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
      <OptionsBottomSheet
        ref={optionBottomSheetRef}
        onOpenDeleteModal={handleOpenDeleteModal}
        onEdit={handleEdit}
        isOwner={isOwner}

        // onDismiss={handleOptionClose}
      >
        <></>
      </OptionsBottomSheet>
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

export default DetailScreen;
