import { View, Text, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import activitiesApi from '@/api/activities';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';
import SearchHeader from './components/SearchHeader';
import BottomSheet, { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import AppBottomSheetModal from '../shared/AppBottomSheetModal';
import CategoriesFilterBottomSheet from './components/CategoriesFilterBottomSheet';
import { ActivityCard } from '../activities/components/';
import { COLORS, SIZES } from '@/constants';

export default function ActivitySearch() {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const handleApplyPress = (categoryIds: number[]) => {
    console.log(categoryIds);
    setSelectedCategoryIds(categoryIds);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['search', debouncedSearchQuery, selectedCategoryIds],
    queryFn: () =>
      activitiesApi.getActivitiesNew({
        title: searchQuery,
        categoryIds: selectedCategoryIds,
      }),
  });

  const { activities, paginationData } = data || {};

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { dismiss } = useBottomSheetModal();

  const handlePresentModalOpenPress = () => bottomSheetModalRef.current?.present();
  const handlePresentModalClosePress = () => bottomSheetModalRef.current?.close();

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
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
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.gray} />
            ) : activities?.length ? (
              activities.map(activity => (
                <ActivityCard
                  key={activity.activityId}
                  activity={activity}
                  onPress={() => router.push(`/activities/${activity.activityId}`)}
                />
              ))
            ) : (
              <Text>no activity</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <AppBottomSheetModal ref={bottomSheetModalRef} title="Bottom Sheet Modal" enableDynamicSizing>
        <CategoriesFilterBottomSheet onApplyPress={handleApplyPress} />
      </AppBottomSheetModal>
    </View>
  );
}

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flex: 1,
    padding: theme.spacings.lg,
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
  cardsContainer: {
    gap: SIZES.small,
  },
}));

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
