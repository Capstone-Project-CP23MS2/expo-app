import { View, Text } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { CategoryResponse } from '@/api/type'
import CategoryFilterListItem, {
  CategoryFilterListItemPressHandler,
} from './CategoryFilterListItem'
import { FlashList } from '@shopify/flash-list'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
  categories: CategoryResponse[]
  onItemPress?: CategoryFilterListItemPressHandler
}
const numColumns = 2
const GAP_BETWEEN_ROWS = 5

export default function CategoryFilterList({ categories, onItemPress }: Props) {
  const { styles } = useStyles(stylesheet)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlashList
        data={categories}
        renderItem={({ item, index }) => (
          <CategoryFilterListItem category={item} index={index} onPress={onItemPress} />
        )}
        estimatedItemSize={20}
        numColumns={1}
      />
    </ScrollView>
  )
}

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flexGrow: 1,
    width: runtime.screen.width,
    padding: theme.spacings.md,
  },
  listContainer: {
    gap: theme.spacings.md,
  },
}))
