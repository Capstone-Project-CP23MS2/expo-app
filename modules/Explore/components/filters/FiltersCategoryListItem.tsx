import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Checkbox } from 'react-native-ui-lib';
import { Category } from '@/api/categories/categories.type';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  category: Category;
  onSelect: (categoryId: number) => void;
  selectedCategoryIds: number[];
};
export type FiltersCategoryListItemPressHandler = (args: {
  categoryId: number;
  index: number;
}) => void;

const FiltersCategoryListItem = ({ category, onSelect, selectedCategoryIds }: Props) => {
  const isCategorySelected = selectedCategoryIds.includes(category.categoryId);
  const { styles } = useStyles(stylesheet, {
    isSelected: isCategorySelected,
    // isSelected: !categoryFilterState.findIndex(item => item === category.categoryId),
  });

  const handlePress = () => {
    // onSelect?.({ categoryId: category.categoryId, index });
    onSelect(category.categoryId);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    padding: spacings.sm,
    borderRadius: spacings.md,
    borderWidth: 1,
    variants: {
      isSelected: {
        true: {
          borderColor: colors.primary,
          backgroundColor: colors.primaryContainer,
          // color: colors.white,
        },
        false: {
          borderColor: colors.gray,
          backgroundColor: colors.background,
          // color: colors.black,
        },
      },
    },
  },
  name: {
    ...typography.sm,
  },
}));

export default FiltersCategoryListItem;
