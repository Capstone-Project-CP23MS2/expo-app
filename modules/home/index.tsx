import { useAuth } from '@/context/authContext'
import { UseDeleteUser, UseGetActivities, UseGetMyUserInfo } from '@/hooks/useAPI'
import { BaseButton, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, Modal, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-ui-lib'
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '@/constants'
import { ActivityIndicator } from 'react-native-paper'
import ActivityCard from '../activities/components/Card/'
import { TouchableOpacity } from 'react-native-ui-lib'

type Props = {}

const Page = (props: Props) => {
  const router = useRouter()

  const { data, isLoading, isError, error, refetch } = UseGetActivities({})
  const { content: activities } = data || {}

  const { user: userInfo } = useAuth()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

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
        ) : activities?.filter(activity =>
            activity.users.some(user => user.userId === userInfo?.userId),
          ).length ? (
          activities
            ?.filter(activity => activity.users.some(user => user.userId === userInfo?.userId))
            .map(activity => (
              <ActivityCard
                key={`activity-${activity.activityId}`}
                activity={activity}
                handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
              />
            ))
        ) : (
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFF',
              padding: 20,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              borderRadius: SIZES.small,
            }}
          >
            <Text>No Join Activity.</Text>
          </View>
        )}
        <View style={{ gap: 2 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Host Activities</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.gray} />
        ) : isError ? (
          <Text>Error! {error.message}</Text>
        ) : activities?.filter(activity => activity.hostUserId === userInfo?.userId).length ? (
          activities
            ?.filter(activity => activity.hostUserId === userInfo?.userId)
            .map(activity => (
              <ActivityCard
                key={`activity-${activity.activityId}`}
                activity={activity}
                handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
              />
            ))
        ) : (
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFF',
              padding: 20,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              borderRadius: SIZES.small,
            }}
          >
            <Text>No Host Activity.</Text>
          </View>
        )}
        <View style={{ gap: 2 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Your Calendar</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'white', paddingTop: 15 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <YourActivities />
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

export default Page
