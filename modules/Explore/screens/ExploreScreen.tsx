import { View, Text, ActivityIndicator } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { List } from 'react-native-paper';
import Listings from '../components/Listings';
import { UseGetActivities, UseGetActivity } from '@/hooks/useAPI';
import { FlashList } from '@shopify/flash-list';
import { ActivityCard } from '@/modules/activities/components';
import ExploreFilter from '../components/ExploreFilter';
import { Stack } from 'expo-router';
import ExploreHeader from '@/modules/dev-test/ExploreHeader';
import { useCounterStore } from '@/modules/dev-test/stores/counter-store';
import { RNUIButton } from '@/components';
import { useInfiniteQuery } from '@tanstack/react-query';
import activitiesApi from '@/api/activities';
import { RefreshControl } from 'react-native-gesture-handler';

type Props = {};

const ExploreScreen = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const { data, fetchNextPage, hasNextPage, refetch, isFetching } = UseGetActivities();
  const { activities } = data || {};

  const [searchQuery, setSearchQuery] = useState<string>('');

  const { count, increase } = useCounterStore(state => ({
    count: state.count,
    increase: state.increase,
  }));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          // header: () => <ExploreHeader onCategoryChanged={() => {}} />,
          header: () => (
            <ExploreFilter searchQuery={searchQuery} onSearchChanged={setSearchQuery} />
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <FlashList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={activities}
            // extraData={selectedCategoryIds}
            renderItem={({ item: activity, index }) => <ActivityCard activity={activity} />}
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
