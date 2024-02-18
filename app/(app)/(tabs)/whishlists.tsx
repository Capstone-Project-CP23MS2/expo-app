import { Image, StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native'
import { useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import categories from '@/modules/test/demo/components/ExploreHeader/categories'
import { Stack, Link, useNavigation, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UseGetActivities, deleteActivity, getActivities } from '@/api/activities'
import { useMutation, useQuery } from '@tanstack/react-query'
import { COLORS, SIZES } from '@/constants'
import ActivityCard from '@/modules/activities/components/Card'
import { FAB } from 'react-native-paper'

type Props = {}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
  )
}

export default function Page(props: Props) {
  const router = useRouter()
  const navigation = useNavigation()
  const { data, isLoading, isError, error } = UseGetActivities({})
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ['activities'],
  //   queryFn: getActivities,
  // });
  const { content: activities, first, totalPages } = data || {}

  const { mutate } = useMutation({
    mutationFn: () => deleteActivity(20),
    onSuccess: data => {
      console.log(data)
    },
  })

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView>
        {/* TODO */}
        <Button title="delete" onPress={() => mutate()} />
        <View style={styles.activitiesContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : isError ? (
            <Text>Error! {error.message}</Text>
          ) : activities?.length ? (
            activities?.map(activity => (
              <ActivityCard
                key={`nearby-job-${activity.activityId}`}
                activity={activity}
                handleNavigate={() => router.push(`/activities/${activity.activityId}`)}
              />
            ))
          ) : (
            <Text>no activity</Text>
          )}
        </View>
        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            borderRadius: 9999,
          }}
          onPress={() => console.log('Pressed')}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: COLORS.lightWhite,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  activitiesContainer: {
    // backgroundColor: COLORS.lightWhite,
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
})
