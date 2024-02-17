import { COLORS, FONT, SIZES } from '@/constants'
import useFetch from '@/hooks/useFetch'
import { Link, Stack, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Button } from 'react-native'

import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'

import axios, { AxiosResponse } from 'axios'
import { ActivityCard } from '@/components/Activities'
import { MaterialIcons } from '@expo/vector-icons'
import FloatingActionButton from '@/components/Activities/components/FloatingActionButton'
import { useNavigation } from '@react-navigation/native'
import { UseGetActivities } from '@/api/activities'
import { FAB, Icon } from 'react-native-paper'
import { FloatingButton } from 'react-native-ui-lib'

type Props = {}
type DataProp = {
  content: any
}

const index = (props: Props) => {
  const router = useRouter()
  // const [activities, setActivities] = useState<any[]>([]);
  // console.log(activities);
  const { data, isLoading, isError, error, refetch } = UseGetActivities()
  const { content: activities, first, totalPages } = data || {}

  function ActivityTitle() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerArea}>
          <View>
            <Text style={styles.headerTitle}>Available Activities</Text>
            <Text style={styles.subHeader}>found {activities?.length} activites</Text>
          </View>
          <View style={{ padding: SIZES.small }}>
            <Pressable onPress={() => router.push('/activities/create-form')}>
              <MaterialIcons name="control-point" size={38} color="black" />
            </Pressable>
          </View>
          {/* <Pressable onPress={() => refetch()}>
              <Text style={styles.headerBtn}>Refresh</Text>
            </Pressable> */}
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <Stack.Screen
        options={{
          header: () => <ActivityTitle />,
          headerShadowVisible: true,
          headerShown: true,
          // headerLeft: () => (
          //   <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          // ),
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          // ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.gray} />
            ) : isError ? (
              <Text>Error! {error.message}</Text>
            ) : activities?.length ? (
              activities?.map(activity => (
                <ActivityCard
                  key={`activity-${activity.activityId}`}
                  activity={activity}
                  handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
                />
              ))
            ) : (
              <Text>no activity</Text>
            )}
          </View>
        </View>
      </ScrollView>
      {/* <FloatingButton
        visible={true}
        hideBackgroundOverlay
        button={{ label: 'Approve', onPress: () => console.log('approved') }}
      /> */}
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.lightWhite,
    elevation: 4,
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 5,
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
    color: COLORS.gray,
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
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
})
