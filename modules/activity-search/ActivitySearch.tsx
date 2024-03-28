import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { UseGetActivities, UseSearchActivities } from '@/hooks/useAPI'
import AppTextInput from '../shared/AppTextInputOld'
import { useQuery } from '@tanstack/react-query'
import activitiesApi from '@/api/activities'
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles'
import SearchHeader from './components/SearchHeader'
import { Button, Chip } from 'react-native-ui-lib'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetModal,
  useBottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AppBottomSheetModal from '../shared/AppBottomSheetModal'
import CategoriesFilterBottomSheet from './components/CategoriesFilterBottomSheet'
import { CategoryFilterListItemPressHandler } from './components/CategoryFilterListItem'
import AppButton from '../shared/AppButton'

export default function ActivitySearch() {
  const { styles } = useStyles(stylesheet)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])

  // const handleFilterSelect: CategoryFilterListItemPressHandler = category => {
  //   setSelectedCategoryIds(prev => {
  //     if (prev.includes(category.categoryId)) {
  //       return prev.filter(id => id !== category.categoryId)
  //     } else {
  //       return [...prev, category.categoryId]
  //     }
  //   })
  //   console.log('🚚 selectedCategoryIds:', selectedCategoryIds)

  // }

  const debouncedSearchQuery = useDebounce(searchQuery, 200)
  // const { activities } = UseSearchActivities({
  //   title: searchQuery,
  // })

  // useEffect(() => {
  //   console.log('🚚 debouncedSearchQuery:', debouncedSearchQuery)
  // }, [debouncedSearchQuery])

  const handleApplyPress = (categoryIds: number[]) => {
    console.log(categoryIds)
    setSelectedCategoryIds(categoryIds)
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['search', debouncedSearchQuery, selectedCategoryIds],
    queryFn: () =>
      activitiesApi.getActivitiesNew({
        title: searchQuery,
        categoryIds: selectedCategoryIds,
      }),
  })

  const { activities, paginationData } = data || {}

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const { dismiss } = useBottomSheetModal()

  const handlePresentModalOpenPress = () => bottomSheetModalRef.current?.present()
  const handlePresentModalClosePress = () => bottomSheetModalRef.current?.close()

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <SearchHeader
              searchQuery={searchQuery}
              onSearchChanged={setSearchQuery}
              onFilterPress={handlePresentModalOpenPress}
            />
          ),
        }}
      />

      {activities?.map(activity => (
        <View key={activity.activityId}>
          <Text>{activity.title}</Text>
        </View>
      ))}

      <AppBottomSheetModal
        ref={bottomSheetModalRef}
        // snapPoints={['1%', '2%']}
        title="Bottom Sheet Modal"
        enableDynamicSizing
        // onDismiss={dismiss}
      >
        <CategoriesFilterBottomSheet onApplyPress={handleApplyPress} />
      </AppBottomSheetModal>
      {/* <CustomBottomSheet title="Custom Bottom Sheet" /> */}
    </View>
  )
}

const stylesheet = createStyleSheet((theme, runtime) => ({
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
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
