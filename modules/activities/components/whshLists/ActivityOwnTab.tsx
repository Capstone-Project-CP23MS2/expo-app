import { View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ActivityList from '../ActivityList';
import { UseGetActivities, UseGetMyUserInfo } from '@/hooks/useAPI';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
type Props = {};
//TODO: ทำเป็น Section List วันที่หรือกิจกรรมของวันนี้
// https://shopify.github.io/flash-list/docs/guides/section-list/
const ActivityOwnTab = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const { data: user } = UseGetMyUserInfo();

  const { data, refetch } = UseGetActivities(
    {
      hostId: user?.userId,
      dateStatus: 'upcoming',
      sortBy: 'dateTime',
    },
    'my-activities',
  );
  const { activities, paginationData } = data || { activities: [] };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityList activities={activities} onRefresh={refetch} />
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
