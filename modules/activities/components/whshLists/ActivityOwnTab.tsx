import { View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ActivityList from '../ActivityList';
import { UseGetMyActivities } from '@/hooks/useAPI';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
type Props = {};
//TODO: ทำเป็น Section List วันที่หรือกิจกรรมของวันนี้
// https://shopify.github.io/flash-list/docs/guides/section-list/
const ActivityOwnTab = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const { data, refetch } = UseGetMyActivities({ sortBy: 'dateTime' });
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
