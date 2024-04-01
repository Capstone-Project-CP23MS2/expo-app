import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { CategoryResponse } from '@/api/type'
import { Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
  category: CategoryResponse
  index: number
  onPress?: RegisterInterestsListItemPressHandler
  selectedCategoryIds: number[]
}
export type RegisterInterestsListItemPressHandler = (categoryId: number) => void

export default function RegisterInterestsListItem({
  category,
  index,
  onPress,
  selectedCategoryIds,
}: Props) {
  const isSelected = useMemo(
    () => (selectedCategoryIds.indexOf(category.categoryId) !== -1 ? true : false),
    [selectedCategoryIds],
  )
  const { styles } = useStyles(stylesheet, {
    isSelected: isSelected,
    isFirst: !index,
  })

  const handlePress = () => {
    onPress?.(category.categoryId)
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.title}>{category.name}</Text>
      <MaterialIcons name="check" size={24} style={styles.icon} />
    </Pressable>
  )
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    padding: spacings.md,
    // backgroundColor: colors.primary,

    borderWidth: 2,
    borderRadius: spacings.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',

    variants: {
      isSelected: {
        true: {
          borderColor: colors.primary,
        },
        false: {
          borderColor: colors.gray,
        },
      },
      isFirst: {
        default: {
          marginTop: 0,
        },
        false: {
          marginTop: spacings.sm,
        },
      },
    },
  },
  icon: {
    variants: {
      isSelected: {
        true: {
          color: colors.primary,
        },
        false: {
          color: colors.gray,
        },
      },
    },
  },

  title: {
    ...typography.md,
  },
}))
