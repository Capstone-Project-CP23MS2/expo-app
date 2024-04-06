import { View, Text } from 'react-native';
import React, { ReactNode, forwardRef, useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { UseGetCategories } from '@/hooks/useAPI';
import { FlashList } from '@shopify/flash-list';
import CategoryFilterListItem, {
  CategoryFilterListItemPressHandler,
} from './CategoryFilterListItem';
import { ScrollView } from 'react-native-gesture-handler';
import AppButton from '@/modules/shared/AppButton';
import { Chip } from 'react-native-paper';
type Props = {
  children?: ReactNode;
  onApplyPress: (categoryIds: number[]) => void;
};
type Ref = BottomSheetModal;

const CategoriesFilterBottomSheet = ({ onApplyPress }: Props) => {
  const { styles } = useStyles(stylesheet);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const { data: categoriesData } = UseGetCategories();
  const { categories, paginationData } = categoriesData || {};

  const handleApplyPress = () => {
    // onApplyPress({ selectedCategoryIds })
    onApplyPress(selectedCategoryIds);
  };

  const handleFilterSelect: CategoryFilterListItemPressHandler = category => {
    setSelectedCategoryIds(prevSelectedCategoryIds => {
      const newSelectedCategoryIds = [...prevSelectedCategoryIds];
      const index = newSelectedCategoryIds.indexOf(category.categoryId);

      if (index === -1) {
        // Add category ID
        newSelectedCategoryIds.push(category.categoryId);
      } else {
        // Remove category ID
        newSelectedCategoryIds.splice(index, 1);
      }

      return newSelectedCategoryIds;
    });
  };

  return (
    <BottomSheetView style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <Text>{selectedCategoryIds.toString()}</Text>
      {categories ? (
        <ScrollView contentContainerStyle={styles.listContainer}>
          <FlashList
            data={categories}
            renderItem={({ item, index }) => (
              <CategoryFilterListItem category={item} index={index} onPress={handleFilterSelect} />
            )}
            estimatedItemSize={20}
            numColumns={1}
          />
        </ScrollView>
      ) : (
        <View>
          <Text>ไม่พบ</Text>
        </View>
      )}
      <AppButton label="Apply" variant="primary" onPress={handleApplyPress} />
    </BottomSheetView>
  );
};

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    // flex: 1,
    backgroundColor: '#DAF7A6',
    padding: theme.spacings.md,
  },
  title: {
    ...theme.typography.lg,
  },
  contentContainer: {
    // flex: 1,
    // alignItems: 'center',
    backgroundColor: '#DAF7A6',
  },
  categoriesList: {
    // flex: 1,
    flexDirection: 'row',
  },
  categoriesTitle: {
    ...theme.typography.md,
  },
  listContainer: {
    height: 200,
    flexGrow: 1,
  },
}));

export default CategoriesFilterBottomSheet;
