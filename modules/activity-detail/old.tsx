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
import dayjs from 'dayjs'
import { defaultStyles } from '@/constants/Styles'
import { TouchableOpacity, BaseButton } from 'react-native-gesture-handler'
import ActivityFooter from '@/modules/activity-detail/components/ActivityFooter'
import axios from 'axios'
import { Button, Chip, Modal, Portal, PaperProvider } from 'react-native-paper'
import { UseGetActivity, UseGetActivityParticipants, getActivity } from '@/hooks/useAPI'
import { useQuery } from '@tanstack/react-query'
import { UseGetCategory } from '@/hooks/useAPI'
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
      router.push('/(app)/(tabs)/activities')
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

          <Text style={styles.name}>{title}</Text>
          <Text style={styles.location}>{place}</Text>

          <Text style={styles.rooms}>{dayjs(dateTime).format('dddd, MMMM D, YYYY h:mm')}</Text>
          <Text style={styles.rooms}>{duration} min</Text>
          <Chip icon="information">{category?.name}</Chip>

          <Text style={[styles.location, { paddingTop: 20 }]}>Description</Text>

          <Text style={styles.description}>{description}</Text>

          <Text style={[styles.location, { paddingTop: 20 }]}>
            Participants - {participants?.length} / {noOfMembers}
          </Text>
          <View>
            {participants?.map(participant => (
              <View key={participant.userId} style={{ flex: 1, flexDirection: 'row' }}>
                <MaterialIcons name="person" size={24} color="black" />
                <Text>{participant.username}</Text>
              </View>
            ))}
          </View>

          <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
            {/* <BaseButton
                onPress={showModal}
                style={[defaultStyles.btn, { backgroundColor: 'yellow' }]}>
                <Text style={[defaultStyles.btnText, { color: 'black' }]}>
                  Edit
                </Text>
              </BaseButton> */}
            <BaseButton style={[defaultStyles.btn, { backgroundColor: 'red' }]} onPress={showModal}>
              <Text style={defaultStyles.btnText}>Delete</Text>
            </BaseButton>
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
      <ActivityFooter />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // image: {
  //   height: IMG_HEIGHT,
  //   width: width,
  // },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: FONT.semiBold,
  },
  location: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: FONT.semiBold,
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: FONT.regular,
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
    marginTop: 10,
    fontFamily: FONT.regular,
  },
})

export default Page
