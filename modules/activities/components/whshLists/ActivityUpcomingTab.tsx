import { View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ActivityList from '../ActivityList';
import { UseGetActivities, UseGetMyUserInfo } from '@/hooks/useAPI';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
type Props = {
  // activities?: Activity[];
  // onRefresh?: () => void;
  // fetchNextPage?: () => void;
  // hasNextPage?: boolean;
  // isFetching?: boolean;
};
//TODO: ทำเป็น Section List วันที่หรือกิจกรรมของวันนี้
// https://shopify.github.io/flash-list/docs/guides/section-list/
const ActivityOwnTab = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const { data: user } = UseGetMyUserInfo();

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
    setDateStatus,
  } = UseGetActivities({
    hostId: user?.userId,
    pageSize: 5,
    sortBy: 'dateTime',
    dateStatus: 'upcoming',
  });
  const { activities } = data || {};

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityList
          activities={activities}
          onRefresh={refetch}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
        />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
}));

export default ActivityOwnTab;
