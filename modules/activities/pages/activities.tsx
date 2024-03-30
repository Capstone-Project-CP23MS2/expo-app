import { COLORS, FONT, SIZES } from '@/constants'
import { Link, Stack, useRouter, Tabs } from 'expo-router'
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Button } from 'react-native'

import { BaseButton, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCallback, useEffect, useState } from 'react'

import { FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons'
import FloatingActionButton from '@/modules/activities/components/FloatingActionButton'
import { useNavigation } from '@react-navigation/native'
import { UseGetActivities, UseGetCategories, UseGetMyUserInfo } from '@/hooks/useAPI'
import { FAB, Icon, AnimatedFAB } from 'react-native-paper'
import { FloatingButton, TouchableOpacity, SegmentedControl } from 'react-native-ui-lib'
import ActivityCard from '../components/Card/'
import AppButton from '@/modules/shared/AppButton'
import MapActivities from '../components/MapActivities'

import * as Location from 'expo-location'
import { UserLocationContext } from '@/context/userLocationContext'

type Props = {}

type DataProp = {
  content: any
}

const index = (props: Props) => {
  const router = useRouter()
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

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <Tabs.Screen
        options={{
          header: () => (
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.headerArea}>
                <AppButton
                  label="search"
                  variant="primary"
                  onPress={() => router.push('/(app)/activities/search')}
                  fullWidth
                />
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
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Find Your Activities</Text>
          <MapActivities />
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
              activities
                ?.filter(
                  activity =>
                    !activity.users.some((user: any) => user.userId === userInfoData?.userId),
                )
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
    flex: 1,
    paddingTop: 15,
    padding: SIZES.medium,
    gap: 10,
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
