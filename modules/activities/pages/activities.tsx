import { COLORS, FONT, SIZES } from '@/constants'
import { Link, Stack, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Button } from 'react-native'

import { BaseButton, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCallback, useEffect, useState } from 'react'

import axios, { AxiosResponse } from 'axios'

import { FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons'
import FloatingActionButton from '@/modules/activities/components/FloatingActionButton'
import { useNavigation } from '@react-navigation/native'
import { UseGetActivities, UseGetCategories, UseGetMyUserInfo } from '@/hooks/useAPI'
import { FAB, Icon, AnimatedFAB } from 'react-native-paper'
import { FloatingButton, TouchableOpacity, SegmentedControl } from 'react-native-ui-lib'
import ActivityCard from '../components/Card/'

type Props = {}
type DataProp = {
  content: any
}

const index = (props: Props) => {
  const router = useRouter()
  // const [activities, setActivities] = useState<any[]>([]);
  // console.log(activities);
  const { data, isLoading, isError, error, refetch } = UseGetActivities({})
  const { content: activities, first, totalPages } = data || {}

  const { data: userInfoData } = UseGetMyUserInfo()

  const [refreshing, setRefreshing] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  function AvailableActivities() {
    return (
      <View style={styles.cardsContainer}>
        <View style={{ gap: 2 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Available Activities</Text>
          <Text style={styles.subHeader}>
            We found {activities?.length} activites. feel free to join !
          </Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.gray} />
        ) : isError ? (
          <Text>Error! {error.message}</Text>
        ) : activities?.length ? (
          activities?.map(activity => (
            <ActivityCard
              key={`activity-${activity.activityId}`}
              activity={activity}
              handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
            />
          ))
        ) : (
          <Text>no activity</Text>
        )}
      </View>
    )
  }

  function YourActivities() {
    return (
      <View style={styles.cardsContainer}>
        <View style={{ gap: 2 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Joined Activities</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.gray} />
        ) : isError ? (
          <Text>Error! {error.message}</Text>
        ) : activities?.length ? (
          activities
            ?.filter(activity => activity.users.some(user => user.userId === userInfoData?.userId))
            .map(activity => (
              <ActivityCard
                key={`activity-${activity.activityId}`}
                activity={activity}
                handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
              />
            ))
        ) : (
          <Text>no activity</Text>
        )}
        <View style={{ gap: 2 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Host Activities</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.gray} />
        ) : isError ? (
          <Text>Error! {error.message}</Text>
        ) : activities?.length ? (
          activities
            ?.filter(activity => activity.hostUserId === userInfoData?.userId)
            .map(activity => (
              <ActivityCard
                key={`activity-${activity.activityId}`}
                activity={activity}
                handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
              />
            ))
        ) : (
          <Text>no activity</Text>
        )}
      </View>
    )
  }

  const onChangeIndex = useCallback((index: number) => {
    console.log('Index ' + index + ' of the second segmentedControl was pressed')
    setSelectedIndex(index)
    onRefresh()
  }, [])

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.headerArea}>
                <TouchableOpacity onPress={() => router.push('/(app)/profile/profile')}>
                  <MaterialIcons name="account-circle" size={48} color="black" />
                </TouchableOpacity>
                <View>
                  <Text style={styles.headerTitle}>Activities</Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.black,
                    padding: 5,
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => router.push('/(app)/notification/notification')}
                >
                  <Ionicons name="notifications-outline" size={25} color="white" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          ),
          headerShadowVisible: true,
          headerShown: true,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'white' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <SegmentedControl
            onChangeIndex={onChangeIndex}
            segments={[{ label: 'Available Activities' }, { label: 'Your Activity' }]}
            style={{ marginVertical: 15, marginTop: 20 }}
          />

          {selectedIndex === 0 ? <AvailableActivities /> : <YourActivities />}
        </View>
      </ScrollView>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => router.push('/activities/create-form')}>
          <AntDesign name="pluscircle" size={48} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  container: {
    paddingTop: 0,
    padding: SIZES.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeader: {
    color: COLORS.black,
    fontWeight: 'normal',
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    gap: SIZES.small,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
})
