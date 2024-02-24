import { View, Pressable, Text, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '@/constants'
import Colors from '@/constants/Colors'
import useFetch from '@/hooks/useFetch'
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
import { useAuth } from '@/context/auth'
import AppButton from '@/modules/shared/AppButton'
import JoinButton from './components/JoinButton'
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

  const { data: participantsData, refetch: participantsRefetch } =
    UseGetActivityParticipants(activityId)
  const { content: participants } = participantsData || {}

  const scrollRef = useAnimatedRef<Animated.ScrollView>()

  const deleteMutation = UseDeleteActivity()

  const onDelete = () => {
    deleteMutation.mutate(activityId, {
      onSuccess() {
        router.push('/(app)/(tabs)/activities')
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
    borderRadius: 20,
    gap: 5,
  }

  const isParticipant = participants?.some(participant => participant.userId === user?.userId)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await activityRefetch()
    await participantsRefetch()
    setRefreshing(false)
  }, [])

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* <Animated.ScrollView */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          // ref={scrollRef}
          scrollEventThrottle={16}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {/* <Animated.Image
          source={{ uri: listing.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        /> */}

          <View style={styles.infoContainer}>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>This activity will be gone.</Text>
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
                    style={[defaultStyles.btn, { backgroundColor: 'gray' }]}
                  >
                    <Text style={[defaultStyles.btnText, { color: 'black' }]}>Cancel</Text>
                  </BaseButton>
                  <BaseButton
                    style={[defaultStyles.btn, { backgroundColor: 'red' }]}
                    onPress={onDelete}
                  >
                    <Text style={[defaultStyles.btnText, { color: 'white' }]}>Confirm</Text>
                  </BaseButton>
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
                      <MaterialIcons name="account-circle" size={24} color="gray" />
                      <Text
                        style={[
                          user?.userId === activity?.hostUserId
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
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, gap: 10 }}>
                {/* <BaseButton
                  onPress={showModal}
                  style={[
                    defaultStyles.btn,
                    { backgroundColor: 'lightskyblue' },
                    { borderRadius: 30 },
                  ]}
                >
                  <Text style={[defaultStyles.btnText, { color: 'black' }]}>Edit</Text>
                </BaseButton> */}
              </View>
            </View>
            {/* <View style={styles.hostView}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View> */}

            {/* <View style={styles.divider} /> */}
          </View>
        </ScrollView>

        {/* <View style={defaultStyles.footer}>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <BaseButton>
            <MaterialIcons name="favorite-outline" size={36} color="black" />
          </BaseButton>
          <BaseButton
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}>
            <Text style={defaultStyles.btnText}>👋 Join</Text>
          </BaseButton>
        </View>
      </View> */}
      </View>
      {/* <ActivityFooter /> */}
      <View style={styles.footerContainer}>
        {user?.userId === activity?.hostUserId ? (
          <AppButton label="Delete" variant="danger" onPress={showModal} fullWidth />
        ) : (
          <JoinButton userId={user?.userId} activityId={activityId} isParticipant={isParticipant} />
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
  // participants: {
  //   backgroundColor: 'green',
  //   borderRadius: 20,
  //   padding: 8,
  // },
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
