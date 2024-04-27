import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { FlashList } from '@shopify/flash-list';
import { ActivityResponse, ParticipantResponse } from '@/api/type';
// import ActivityListItem from './ActivityListItem';
import ActivityCard from './ActivityCard';
import { RefreshControl } from 'react-native-gesture-handler';

type Props = {
  activities?: ActivityResponse[];
  onPress?: () => void;
  onRefresh?: () => void;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetching?: boolean;
};

const ParticipantList = ({
  activities,
  onPress,
  onRefresh,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: Props) => {
  const { styles } = useStyles(stylesheet);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh?.();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
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
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    // flex: 1,
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

export default ParticipantList;
