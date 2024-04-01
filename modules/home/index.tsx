import { useAuth } from '@/context/authContext'
import { UseDeleteUser, UseGetActivities, UseGetMyUserInfo } from '@/hooks/useAPI'
import { BaseButton, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, Modal, StyleSheet, View } from 'react-native'
import { Button, Chip, Text } from 'react-native-ui-lib'
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '@/constants'
import { ActivityIndicator } from 'react-native-paper'
import ActivityCard from '../activities/components/Card/'
import { TouchableOpacity } from 'react-native-ui-lib'
import StatusListView from './components/StatusListView'

type Props = {}

const Page = (props: Props) => {
  const router = useRouter()

  const { data, isLoading, isError, error, refetch } = UseGetActivities({})
  const { content: activities } = data || {}

  const { user: userInfo } = useAuth()

  const [refreshing, setRefreshing] = useState(false)

  const [status, setStatus] = useState('ALL')
  const onDataChanged = (status: string) => {
    setStatus(status)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  const isInDuration = (activity: any) => {
    const currentTime = new Date().getTime()
    const startTime = new Date(activity.dateTime).getTime()
    const endTime = startTime + activity.duration * 60 * 1000 // Convert duration to milliseconds

    return currentTime >= startTime && currentTime <= endTime
  }

  const activityJoined = activities?.filter(
    activity =>
      activity.users.some((user: any) => user.userId === userInfo?.userId) &&
      activity.hostUserId !== userInfo?.userId,
  ).length

  const activityHost = activities?.filter(
    activity => activity.hostUserId === userInfo?.userId,
  ).length

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'white', paddingTop: 15 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
            <View style={{ gap: 5, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Joined Activities</Text>
              <Chip label={String(activityJoined)} />
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.gray} />
            ) : isError ? (
              <Text>Error! {error.message}</Text>
            ) : activityJoined ? (
              activities
                ?.filter(
                  activity =>
                    activity.users.some((user: any) => user.userId === userInfo?.userId) &&
                    activity.hostUserId !== userInfo?.userId,
                )
                .map(activity => (
                  <ActivityCard
                    key={`activity-${activity.activityId}`}
                    activity={activity}
                    handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
                  />
                ))
            ) : (
              <View style={styles.blank}>
                <Text>No Join Activity.</Text>
              </View>
            )}
            <View style={{ gap: 5, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Host Activities</Text>
              <Chip label={String(activityHost)} />
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.gray} />
            ) : isError ? (
              <Text>Error! {error.message}</Text>
            ) : activityHost ? (
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
              <View style={styles.blank}>
                <Text>No Host Activity.</Text>
              </View>
            )}
            <View style={{ gap: 2 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Activity Status</Text>
            </View>
            <StatusListView onStatusChanged={onDataChanged} />
            {activities?.length && (
              <View style={{ gap: 10, marginBottom: 15 }}>
                {status === 'ALL' &&
                  activities
                    ?.filter(activity =>
                      activity.users.some((user: any) => user.userId === userInfo?.userId),
                    )
                    .map(activity => (
                      <ActivityCard
                        key={`activity-${activity.activityId}`}
                        activity={activity}
                        handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
                      />
                    ))}
                {status === 'GOING' &&
                  activities
                    ?.filter(activity => isInDuration(activity))
                    .map(activity => (
                      <ActivityCard
                        key={`activity-${activity.activityId}`}
                        activity={activity}
                        handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
                      />
                    ))}
                {status === 'PAST' &&
                  activities
                    ?.filter(activity => !isInDuration(activity))
                    .map(activity => (
                      <ActivityCard
                        key={`activity-${activity.activityId}`}
                        activity={activity}
                        handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
                      />
                    ))}
              </View>
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
  blank: {
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
  },
})

export default Page
