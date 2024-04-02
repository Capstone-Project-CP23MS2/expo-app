import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '@/constants'
import dayjs from 'dayjs'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import AppButton from '../shared/AppButton'
import { useRouter } from 'expo-router'

export default function PlaceItem({ place, onPlaceChange }: any) {
  const router = useRouter()

  const changePlace = (item: any) => {
    onPlaceChange(item)
  }

  return (
    <View
      style={{
        marginBottom: 20,
        width: Dimensions.get('screen').width,
      }}
    >
      <View style={styles.card}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: SIZES.large, fontFamily: FONT.bold }}>{place.title}</Text>
          <TouchableOpacity
            onPress={() => changePlace(place)}
            style={{
              height: 35,
              width: 35,
              backgroundColor: COLORS.black,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome5 name="location-arrow" size={15} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <MaterialIcons name="calendar-today" size={15} color={'black'} />
          <Text style={{ fontSize: SIZES.medium, fontFamily: FONT.regular }}>
            {dayjs(place.dateTime).format('ddd, MMMM D, YYYY h:mm')}
          </Text>
        </View>
        <View style={styles.content}>
          <FontAwesome5 name="box" size={15} color={'black'} />
          <Text style={{ fontSize: SIZES.medium, fontFamily: FONT.regular }}>
            {place.categoryName}
          </Text>
        </View>
        <AppButton
          label="Details"
          style={{
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            borderRadius: 15,
            marginTop: 5,
          }}
          onPress={() => router.push(`/activities/${place.activityId}`)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    gap: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
})
