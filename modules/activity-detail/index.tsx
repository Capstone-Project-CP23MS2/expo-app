import { View, Pressable, Text, StyleSheet, ToastAndroid } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '@/constants'
import Colors from '@/constants/Colors'
import dayjs from 'dayjs'
import { defaultStyles } from '@/constants/Styles'
import {
  TouchableOpacity,
  BaseButton,
  ScrollView,
  RefreshControl,
} from 'react-native-gesture-handler'
import ActivityFooter from '@/modules/activity-detail/components/ActivityFooter'
import { Button, Chip, Modal, Portal, PaperProvider, Icon, Card } from 'react-native-paper'
import { UseDeleteActivity, UseGetActivity, UseGetActivityParticipants } from '@/hooks/useAPI'

import AppButton from '@/modules/shared/AppButton'
import JoinButton from './components/JoinButton'
import { useAuth } from '@/context/authContext'
type Props = {}

const Page = (props: Props) => {
  const router = useRouter()
  const { id: activityId } = useLocalSearchParams<{ id: string }>()
  const { user } = useAuth()
  const {
    data: activity,
    isLoading,
    isError,
    error,
    refetch: activityRefetch,
  } = UseGetActivity(activityId)

  const isOwner = user?.userId === activity?.hostUserId

  const { data: participantsData, refetch: participantsRefetch } =
    UseGetActivityParticipants(activityId)
  const { content: participants } = participantsData || {}

  const scrollRef = useAnimatedRef<Animated.ScrollView>()

  const deleteMutation = UseDeleteActivity()

  const onDelete = () => {
    deleteMutation.mutate(activityId, {
      onSuccess() {
        ToastAndroid.show('Activity deleted', ToastAndroid.SHORT)
        router.push('/(app)/(tabs)')
      },
    })
  }

  const [visible, setVisible] = React.useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 15,
  }

  const isParticipant = participants?.some(participant => participant.userId === user?.userId)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await activityRefetch()
    await participantsRefetch()
    setRefreshing(false)
  }, [])

  const onEdit = () => {
    console.log(activityId)

    router.push({ pathname: '/(app)/activities/edit', params: { activityId } })
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          scrollEventThrottle={16}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.infoContainer}>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                  <AntDesign name="warning" size={60} color={COLORS.red} />
                  <View style={{ alignItems: 'center', gap: 3 }}>
                    <Text
                      style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.red }}
                    >
                      Delete Activity
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONT.regular,
                        fontSize: 13,
                        color: COLORS.gray,
                      }}
                    >
                      This action cannot be undone. Are you sure?
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <BaseButton
                      onPress={hideModal}
                      style={[defaultStyles.btn, { backgroundColor: COLORS.grey, height: 45 }]}
                    >
                      <Text style={{ color: 'white', fontFamily: FONT.bold }}>No, Keep it.</Text>
                    </BaseButton>

                    <BaseButton
                      style={[defaultStyles.btn, { backgroundColor: COLORS.red, height: 45 }]}
                      onPress={onDelete}
                    >
                      <Text style={{ color: 'white', fontFamily: FONT.bold }}>Yes, Delete!</Text>
                    </BaseButton>
                  </View>
                </View>
              </Modal>
            </Portal>

            <View style={styles.infoHeader}>
              <Text style={styles.name}>{activity?.title}</Text>
              <View>
                <Text style={[{ color: 'white' }, { fontWeight: 'bold' }]}>
                  {participants?.length} / {activity?.noOfMembers}
                </Text>
              </View>
            </View>
            <Text style={styles.location}>{activity?.place}</Text>
            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 5,
                marginBottom: 5,
                opacity: 0.3,
              }}
            />
            <View style={styles.block}>
              <View>
                <Text style={styles.subHeader}>{activity?.categoryName}</Text>
                <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { gap: 5 }]}>
                  <MaterialIcons name="date-range" size={20} color="black" />
                  <Text style={styles.rooms}>
                    {dayjs(activity?.dateTime).format('ddd, MMM D h:mm A')}
                  </Text>
                </View>
                <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { gap: 5 }]}>
                  <MaterialIcons name="timer" size={20} color="black" />
                  <Text style={styles.rooms}>{activity?.duration} Minutes</Text>
                </View>
              </View>
              <View>
                <Text style={styles.subHeader}>Description</Text>
                <View style={styles.descriptionBox}>
                  <Text style={styles.description}>{activity?.description}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.subHeader}>
                  Participants {participants?.length} / {activity?.noOfMembers}
                </Text>
                <View style={styles.descriptionBox}>
                  {participants?.map(participant => (
                    <View
                      key={participant.userId}
                      style={{ flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center' }}
                    >
                      <MaterialIcons
                        name="account-circle"
                        size={24}
                        color={
                          participant?.userId === activity?.hostUserId
                            ? COLORS.primary
                            : COLORS.gray
                        }
                      />
                      <Text
                        style={[
                          participant?.userId === activity?.hostUserId
                            ? { color: COLORS.primary }
                            : { color: COLORS.gray },
                        ]}
                      >
                        {participant.username}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footerContainer}>
        {isOwner ? (
          <View style={{ flex: 1, gap: 10 }}>
            <Pressable
              onPress={onEdit}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLORS.grey,
                borderWidth: 1,
                borderRadius: 10,
                padding: 12,
                elevation: 4,
                backgroundColor: COLORS.white,
                gap: 10,
              }}
            >
              <Feather name="edit" size={24} color={COLORS.gray} />
              <Text style={{ color: COLORS.gray, fontFamily: FONT.regular }}>
                Edit your activity
              </Text>
            </Pressable>
            <AppButton label="Delete" variant="danger" onPress={showModal} fullWidth />
          </View>
        ) : (
          <JoinButton
            userId={user?.userId}
            userName={user?.username}
            activityId={activityId}
            activityTitle={activity?.title}
            isParticipant={isParticipant}
            targetId={activity?.hostUserId}
          />
        )}
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  block: {
    gap: 5,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  infoContainer: {
    padding: SIZES.medium,
  },
  name: {
    fontSize: 20,
    fontFamily: FONT.bold,
  },
  location: {
    fontSize: 18,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: FONT.regular,
  },
  subHeader: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: FONT.semiBold,
  },
  ratings: {
    fontSize: 16,
    fontFamily: FONT.semiBold,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: FONT.semiBold,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  description: {
    fontSize: 16,
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },
  descriptionBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.large,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default Page
