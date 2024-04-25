import { View, Text } from 'react-native';
import React, { useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { FlashList } from '@shopify/flash-list';
import { UseGetCategories } from '@/hooks/useAPI';
import FiltersCategoryListItem, {
  FiltersCategoryListItemPressHandler,
} from './FiltersCategoryListItem';
import { Category } from '@/api/categories/categories.type';

type Props = {
  selectedCategoryIds: number[];
  onSelectedCategoryIdsChange: (selectedItemsChange: number[]) => void;
};

const FiltersCategoryList = ({ selectedCategoryIds, onSelectedCategoryIdsChange }: Props) => {
  const { styles } = useStyles(stylesheet);
  const { data } = UseGetCategories();
  const { categories } = data || {};

  function selectOption(category: number) {
    if (selectedCategoryIds.includes(category)) {
      onSelectedCategoryIdsChange(selectedCategoryIds.filter(o => o !== category));
    } else {
      onSelectedCategoryIdsChange([...selectedCategoryIds, category]);
    }
  }

  return (
    <>
      {/* <FlashList
        data={categories}
        extraData={categoryFilterState}
        renderItem={({ item: category, index }) => (
          <FiltersCategoryListItem
            category={category}
            index={index}
            categoryFilterState={categoryFilterState}
            onSelect={onCategorySelect}
          />
        )}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={styles.listGap} />}
      /> */}
      <View style={styles.container}>
        {categories?.map((category: Category) => (
          <FiltersCategoryListItem
            key={category.categoryId}
            category={category}
            onSelect={selectOption}
            selectedCategoryIds={selectedCategoryIds}
          />
        ))}
      </View>
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacings.sm,
  },
  list: {
    //
  },
  listGap: {
    height: spacings.sm,
    width: spacings.sm,
  },
}));

export default FiltersCategoryList;
