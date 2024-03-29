import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { CategoryResponse } from '@/api/type'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type Props = {
  category: CategoryResponse
  index: number
  onPress?: CategoryFilterListItemPressHandler
}

export type CategoryFilterListItemPressHandler = (item: CategoryResponse) => void

export default function CategoryFilterListItem({ category, index, onPress }: Props) {
  const { styles } = useStyles(stylesheet, {
    isFirst: !index,
  })

  const handlePress = () => {
    onPress?.(category)
  }

  return (
    <Pressable style={styles.container} onPress={handlePress} activeOpacity={0.5}>
      <Text style={styles.title}>{category.name}</Text>
    </Pressable>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: ({ pressed }) => ({
    textAlign: 'center',
    padding: theme.spacings.lg,
    backgroundColor: '#eee',
    opacity: pressed ? 0.5 : 1,

    borderWidth: 1,
    borderRadius: 6,
    borderColor: theme.colors.primary,

    variants: {
      isFirst: {
        true: {
          marginTop: 0,
        },
        false: {
          marginTop: theme.spacings.sm,
        },
      },
    },
  }),

  title: {
    ...theme.typography.md,
  },
}))
