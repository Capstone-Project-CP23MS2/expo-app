import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { UseGetActivities, UseSearchActivities } from '@/hooks/useAPI'
import AppTextInput from '../shared/AppTextInputOld'
import { useQuery } from '@tanstack/react-query'
import activitiesApi from '@/api/activities'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import SearchHeader from './components/SearchHeader'
import { Button, Chip } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
export default function ActivitySearch() {
  const { styles } = useStyles(stylesheet)

  const [searchQuery, setSearchQuery] = useState<string>('')

  const debouncedSearchQuery = useDebounce(searchQuery, 200)
  // const { activities } = UseSearchActivities({
  //   title: searchQuery,
  // })

  // useEffect(() => {
  //   console.log('🚚 debouncedSearchQuery:', debouncedSearchQuery)
  // }, [debouncedSearchQuery])

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedSearchQuery],
    queryFn: () =>
      activitiesApi.getActivitiesNew({
        title: searchQuery,
      }),
  })
  const { activities, paginationData } = data || {}

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <SearchHeader searchQuery={searchQuery} onSearchChanged={setSearchQuery} />,
        }}
      />
      <Button label={'Press'} size={Button.sizes.large} />

      {activities?.map(activity => (
        <View key={activity.activityId}>
          <Text>{activity.title}</Text>
        </View>
      ))}
    </View>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    padding: theme.spacings.md,
    backgroundColor: theme.colors.background,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    ...theme.typography.md,
    color: theme.colors.typography,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
}))

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
