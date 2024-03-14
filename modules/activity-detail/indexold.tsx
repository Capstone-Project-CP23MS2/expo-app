import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import {
  Button,
  Colors,
  Incubator,
  Picker,
  Text,
  TextField,
  View,
  PanningProvider,
  Assets,
} from 'react-native-ui-lib'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONT } from '@/constants'
// import Colors from '@/constants/Colors'

import dayjs from 'dayjs'
import { defaultStyles } from '@/constants/Styles'
import { TouchableOpacity, BaseButton, ScrollView } from 'react-native-gesture-handler'
import ActivityFooter from '@/modules/activity-detail/components/ActivityFooter'
import axios from 'axios'

import { UseGetActivity, UseGetActivityParticipants } from '@/hooks/useAPI'
import { useQuery } from '@tanstack/react-query'
import { UseGetCategory } from '@/hooks/useAPI'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivityInfo from './components/ActivityInfo'
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ActivityInfo
          title={title}
          dateTime={dateTime}
          category={category?.name}
          noOfMembers={noOfMembers}
        />
        {/* <Participant /> */}
      </ScrollView>
      {/* <Footer /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'white',
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
