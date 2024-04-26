import { View, Text } from 'react-native';
import React, { ReactNode, forwardRef, useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { UseGetActivities, UseGetCategories } from '@/hooks/useAPI';
import { FlashList } from '@shopify/flash-list';
import ActivityList from '@/modules/activities/components/ActivityList';

import { ScrollView } from 'react-native-gesture-handler';
import AppButton from '@/modules/shared/AppButton';
import { Chip } from 'react-native-paper';
import { Activity } from '@/api/activities/type';
import { AppBottomSheetModal } from '@/components';
type Props = {
  children?: ReactNode;
  activities?: Activity[];
  placeId?: string | null;
  onApplyPress?: (categoryIds: number[]) => void;
};
type Ref = BottomSheetModal;

const ActivityListMapBottomSheet = forwardRef<Ref, Props>(({ placeId, onApplyPress }, ref) => {
  const { styles } = useStyles(stylesheet);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const { data: activitiesData } = UseGetActivities({});
  const { activities } = activitiesData || {};
  const { data: categoriesData } = UseGetCategories();
  const { categories, paginationData } = categoriesData || {};
  // console.log(activities);

  const handleApplyPress = () => {
    // onApplyPress({ selectedCategoryIds })
    onApplyPress?.(selectedCategoryIds);
  };

  return (
    <AppBottomSheetModal ref={ref} title="Bottom Sheet Modal" enableDynamicSizing>
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Places: {placeId}</Text>
        <Text>{selectedCategoryIds.toString()}</Text>
        <ScrollView style={styles.listContainer}>
          <ActivityList activities={activities} />
        </ScrollView>
        <AppButton label="Apply" variant="primary" onPress={handleApplyPress} />
      </BottomSheetView>
    </AppBottomSheetModal>
  );
});

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flex: 1,
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
    flexGrow: 1,
  },
}));

export default ActivityListMapBottomSheet;
