import { COLORS, FONT, SIZES } from '@/constants';
import useFetch from '@/hooks/useFetch';
import { Link, Stack, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {
  BaseButton,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';
import { ActivityCard } from '@/components/Activities';
import { MaterialIcons } from '@expo/vector-icons';
import FloatingActionButton from '@/components/Activities/components/FloatingActionButton';

type Props = {};
type DataProp = {
  content: any;
};

const index = (props: Props) => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch(`activities`, {});
  const { content: activities, first, last } = data;
  // console.log(activities);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerShown: false, // TODO: change to true
          // headerLeft: () => (
          //   <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          // ),
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          // ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Activities</Text>

              <Pressable>
                <Text style={styles.headerBtn}>Show all</Text>
              </Pressable>
            </View>

            <View style={styles.cardsContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : error ? (
                <Text>Something went wrong</Text>
              ) : (
                activities?.map(activity => (
                  <ActivityCard
                    activity={activity}
                    key={`activity-${activity.activityId}`}
                    handleNavigate={() =>
                      router.push(`/activities/${activity.activityId}`)
                    }
                  />
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <FloatingActionButton
        handleNavigate={() => router.push('/activities/create')}
      />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    // marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
});
