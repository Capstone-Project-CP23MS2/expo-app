import { StyleSheet, Pressable } from 'react-native'
import { View, Text, Colors, TouchableOpacity, Chip } from 'react-native-ui-lib'
import React from 'react'
import { FontAwesome5, Entypo } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '@/constants'
import { SHADOWS, SPACINGS } from '@/constants/theme'
import dayjs from 'dayjs'

type ActivityCardProps = {
  activity: {
    activityId: number
    title: string
    description: string
    dateTime: string
    duration: number
    place?: string
    createdAt: string
    updatedAt: string
    currentParticipants?: number
    maxParticipants?: number
  }
  handlePress?: () => void
}
const ActivityCard = ({ activity, handlePress }: ActivityCardProps) => {
  const { title, description, dateTime, duration, place, currentParticipants, maxParticipants } =
    activity

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container} activeOpacity={0.6}>
      <Text xs>{dayjs(dateTime).format('ddd, MMMM D, YYYY h:mm')}</Text>
      <Text md-b>{title}</Text>
      {/* <Text sm>{description}</Text> */}
      <Text xs>{place}</Text>

      {/* <View row spread centerV>
        <View row center gap-10 paddingV-page>
          <View
            backgroundColor={Colors.$backgroundPrimaryHeavy}
            width={38}
            height={38}
            br100
            padding-5
            center
          >
            <FontAwesome5 name="map-marker-alt" size={24} color="white" />
          </View>
          <View>
            <Text h5>serviceSpot.name</Text>
            <Text caption>getDistanceText(serviceSpot.distance)</Text>
          </View>
        </View>
        <Entypo name="chevron-thin-right" size={24} />
      </View> */}
    </TouchableOpacity>
  )
}

export default ActivityCard

const styles = StyleSheet.create({
  container: {
    // borderBottomColor: '#DCDCDC',
    // borderBottomWidth: 1,
    padding: SPACINGS.md,
    gap: SPACINGS.xs,
    // flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    // ...SHADOWS.medium,
    // shadowColor: COLORS.white,
  },
})
