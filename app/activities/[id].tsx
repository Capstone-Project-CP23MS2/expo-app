import { View, Pressable, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONT } from '@/constants'
import Colors from '@/constants/Colors'
import useFetch from '@/hooks/useFetch'
import dayjs from 'dayjs'
import { defaultStyles } from '@/constants/Styles'
import { TouchableOpacity, BaseButton } from 'react-native-gesture-handler'
import ActivityFooter from '@/components/ActivityDetails/ActivityFooter'
import axios from 'axios'
import { Button, Chip, Modal, Portal, PaperProvider, Icon, Card } from 'react-native-paper'
import { UseGetActivity, UseGetActivityParticipants, getActivity } from '@/api/activities'
import { useQuery } from '@tanstack/react-query'
import { UseGetCategory, getCategory } from '@/api/category'
type Props = {}
const apiUrl: string = process.env.EXPO_PUBLIC_BASE_URL_API!

const Page = (props: Props) => {
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const { data: activity, isLoading, isError, error, refetch } = UseGetActivity(id)

  const {
    title,
    description,
    dateTime,
    duration,
    place,
    // currentParticipants,
    noOfMembers,
    // categoryId,
  } = activity || {} // Add a default empty object to prevent undefined error
  const categoryId = activity?.categoryId

  const { data: category } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategory(categoryId),
    enabled: !!categoryId,
  })

  const { data: participantsData } = UseGetActivityParticipants(id)
  const { content: participants } = participantsData || {}

  const scrollRef = useAnimatedRef<Animated.ScrollView>()

  const onDeleteActivitiy = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/activities/${id}`, {})
      router.push('/(tabs)/activities')
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      // setLoading(false);
    }
  }

  const [visible, setVisible] = React.useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Animated.ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          ref={scrollRef}
          scrollEventThrottle={16}
        >
          {/* <Animated.Image
          source={{ uri: listing.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        /> */}

          <View style={styles.infoContainer}>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Confirm to delete</Text>
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
                    onPress={onDeleteActivitiy}
                  >
                    <Text style={defaultStyles.btnText}>Confirm</Text>
                  </BaseButton>
                </View>
              </Modal>
            </Portal>

            <View style={styles.infoHeader}>
              <Text style={styles.name}>{title}</Text>
              <View style={styles.participants}>
                <Text style={[{ color: 'white' }, { fontWeight: 'bold' }]}>
                  {participants?.length} / {noOfMembers}
                </Text>
              </View>
            </View>
            <Text style={styles.location}>{place}</Text>
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
                <Text style={styles.subHeader}>{category?.name}</Text>
                <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { gap: 5 }]}>
                  <MaterialIcons name="date-range" size={20} color="black" />
                  <Text style={styles.rooms}>{dayjs(dateTime).format('ddd, MMM D h:mm A')}</Text>
                </View>
                <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { gap: 5 }]}>
                  <MaterialIcons name="timer" size={20} color="black" />
                  <Text style={styles.rooms}>{duration} Minutes</Text>
                </View>
              </View>
              <View>
                <Text style={styles.subHeader}>Description</Text>
                <View style={styles.descriptionBox}>
                  <Text style={styles.description}>{description}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.subHeader}>Participants</Text>
                <View style={styles.descriptionBox}>
                  {participants?.map(participant => (
                    <View
                      key={participant.userId}
                      style={{ flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center' }}
                    >
                      <MaterialIcons name="account-circle" size={24} color="gray" />
                      <Text style={{ color: COLORS.gray }}>{participant.username}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* <BaseButton
                onPress={showModal}
                style={[defaultStyles.btn, { backgroundColor: 'yellow' }]}>
                <Text style={[defaultStyles.btnText, { color: 'black' }]}>
                  Edit
                </Text>
              </BaseButton> */}
                <BaseButton
                  style={[defaultStyles.btn, { backgroundColor: 'red' }]}
                  onPress={showModal}
                >
                  <Text>Delete</Text>
                </BaseButton>
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
        </Animated.ScrollView>

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
      <ActivityFooter />
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
  participants: {
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
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
})

export default Page
