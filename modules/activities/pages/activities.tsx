import { COLORS, FONT, SIZES } from '@/constants'
import { Link, Stack, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Button } from 'react-native'

import { BaseButton, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCallback, useEffect, useState } from 'react'

import axios, { AxiosResponse } from 'axios'

import { MaterialIcons } from '@expo/vector-icons'
import FloatingActionButton from '@/modules/activities/components/FloatingActionButton'
import { useNavigation } from '@react-navigation/native'
import { UseGetActivities } from '@/hooks/useAPI'
import { FAB, Icon } from 'react-native-paper'
import { FloatingButton, TouchableOpacity } from 'react-native-ui-lib'
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

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  function ActivityTitle() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerArea}>
          <View>
            <Text style={styles.headerTitle}>Available Activities</Text>
            <Text style={styles.subHeader}>found {activities?.length} activites</Text>
          </View>
          <Pressable onPress={() => router.push('/activities/create-form')}>
            <MaterialIcons name="control-point" size={38} color="black" />
          </Pressable>
          {/* <Pressable onPress={() => refetch()}>
              <Text style={styles.headerBtn}>Refresh</Text>
            </Pressable> */}
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <Stack.Screen
        options={{
          header: () => <ActivityTitle />,
          headerShadowVisible: true,
          headerShown: true,
          // headerLeft: () => (
          //   <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          // ),
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          // ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
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
        </View>
      </ScrollView>
      {/* <FloatingButton
        visible={true}
        hideBackgroundOverlay
        button={{ label: 'Approve', onPress: () => console.log('approved') }}
      /> */}
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.lightWhite,
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
    color: COLORS.gray,
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
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
})
