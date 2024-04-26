import { COLORS, FONT, SIZES } from '@/constants';
import { Link, Stack, useRouter, Tabs } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Button } from 'react-native';

import { BaseButton, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';

import { FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { UseGetActivities, UseGetMyUserInfo } from '@/hooks/useAPI';
import { TouchableOpacity } from 'react-native-ui-lib';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ActivityCard } from '../components';
import MapActivities from '../components/MapActivities';
import AppTextInput from '@/modules/shared/AppTextInput';

type Props = {};

type DataProp = {
  content: any;
};

const index = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = UseGetActivities();

  const { activities } = data || {};

  const { data: userInfoData } = UseGetMyUserInfo();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <Tabs.Screen
        options={{
          header: () => (
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.headerArea}>
                <Pressable onPress={() => router.push('/(app)/(tabs)/explore')}>
                  <AppTextInput placeholder="ค้นหากิจกรรม" icon iconName="search" disabled />
                </Pressable>
              </View>
            </SafeAreaView>
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'white' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <Text style={styles.headerTitle}>สำรวจกิจกรรม</Text>
          <MapActivities />
          <View style={styles.cardsContainer}>
            <View>
              <Text style={styles.headerTitle}>กิจกรรมที่เข้าร่วมได้</Text>
              <Text style={styles.subHeader}>
                เจอ {activities?.length} กิจกรรม เลือกเข้าร่วมกันเลย !
              </Text>
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.gray} />
            ) : isError ? (
              <Text>Error! {error.message}</Text>
            ) : activities?.length ? (
              activities
                ?.filter(
                  activity =>
                    !activity.users.some((user: any) => user.userId === userInfoData?.userId),
                )
                .map(activity => (
                  <ActivityCard
                    key={`activity-${activity.activityId}`}
                    activity={activity}
                    onPress={() => router.push(`/activities/${activity.activityId}`)}
                  />
                ))
            ) : (
              <Text>ไม่มีกิจกรรม</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => router.push('/activities/create-form')}>
          <AntDesign name="pluscircle" size={48} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  safeArea: {
    backgroundColor: 'white',
    elevation: 4,
  },
  headerArea: {
    padding: 15,
  },
  container: {
    flex: 1,
    paddingTop: spacings.lg,
    padding: spacings.lg,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeader: {
    ...typography.sm,
  },
  headerTitle: {
    ...typography.lgB,
  },
  cardsContainer: {
    gap: spacings.md,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
}));
