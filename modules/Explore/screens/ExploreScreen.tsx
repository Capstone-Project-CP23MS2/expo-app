import { View, Text, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Listings from '../components/Listings';
import { UseGetActivities, UseGetActivity } from '@/hooks/useAPI';
import { FlashList } from '@shopify/flash-list';
import { ActivityCard } from '@/modules/activities/components';
import ExploreFilter from '../components/ExploreFilter';
import { Stack, useRouter } from 'expo-router';
import ExploreHeader from '@/modules/dev-test/ExploreHeader';
import { useCounterStore } from '@/modules/dev-test/stores/counter-store';
import { RNUIButton } from '@/components';

import { RefreshControl } from 'react-native-gesture-handler';
import { useFilterStore } from '../stores/filter-store';

type Props = {};

const ExploreScreen = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    searchQuery,
    setSearchQuery,
    selectedCategoryIds,
    setSelectedCategoryIds,
    debouncedSearchQuery,
  } = UseGetActivities(
    {
      // categoryIds: [1],
      pageSize: 5,
    },
    'all',
  );
  const { activities } = data || {};

  const handleFilterPress = () => {
    router.push('/explore/filter');
  };
  // const [searchQuery, setSearchQuery] = useState<string>('');

  const { filters } = useFilterStore(state => ({
    filters: state.filters,
    setFilters: state.setFilters,
  }));

  const { count, increase } = useCounterStore(state => ({
    count: state.count,
    increase: state.increase,
  }));

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setSelectedCategoryIds(filters.categoryIds!);
    console.log('filters', filters);
  }, [filters]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const handleActivityPress = (activityId: number) => router.push(`/activities/${activityId}`);

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <ExploreFilter
              searchQuery={searchQuery}
              onSearchChanged={setSearchQuery}
              onFilterPress={handleFilterPress}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <FlashList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={activities}
            // extraData={selectedCategoryIds}
            renderItem={({ item: activity, index }) => (
              <ActivityCard
                activity={activity}
                onPress={() => handleActivityPress(activity.activityId)}
              />
            )}
            estimatedItemSize={100}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.listGap} />}
            // onEndReached={handleLoadMore}
            // CellRendererComponent={}
            onEndReached={fetchNextPage}
            // onRefresh={refetch}
            // onEndReachedThreshold={0.1}
            ListFooterComponent={() =>
              hasNextPage && (
                <View style={{ paddingVertical: 20, justifyContent: 'center' }}>
                  {isFetching && <ActivityIndicator size="large" color={'black'} />}
                </View>
              )
            }
          />
        </View>

        {/* <Listings /> */}
      </View>
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },
  listWrapper: {
    flexGrow: 1,
  },
  listContainer: {
    paddingHorizontal: spacings.md,
    paddingVertical: spacings.md,
  },
  listGap: {
    height: spacings.sm,
  },
}));

export default ExploreScreen;
