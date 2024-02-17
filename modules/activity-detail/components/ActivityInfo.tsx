import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, View } from 'react-native-ui-lib'
import { MaterialIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
type Props = {
  title?: string
  category?: string
  description?: string
  dateTime?: string
  duration?: string
  place?: string
  noOfMembers?: number
}

const ActivityInfo = ({ title, dateTime, category, noOfMembers }: Props) => {
  return (
    <View padding-16>
      <Text h3>{title}</Text>
      <Text regular>{dayjs(dateTime).format('dddd, MMMM D, YYYY h:mm')}</Text>
      <Text regular>{category}</Text>
      <Text regular>{noOfMembers}</Text>
    </View>
  )
}

export default ActivityInfo

const styles = StyleSheet.create({})
