import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { UseGetActivities } from '@/hooks/useAPI';
import { ScrollView } from 'react-native-gesture-handler';
import { RNUIButton } from '@/components';
import { FlashList } from '@shopify/flash-list';
import { ActivityCard } from '../components/';

type Props = {};

export default function ActivitiesScreen(props: Props) {
  const { styles } = useStyles(stylesheet);

  const { data, isLoading, isError, error, refetch } = UseGetActivities();
  const { activities } = data;
  console.log('activities', activities);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.activitiesList}>
          <FlashList
            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={activities}
            // extraData={selectedCategoryIds}
            renderItem={({ item, index }) => <ActivityCard key={index} activity={item} />}
            estimatedItemSize={100}
            numColumns={1}
            showsVerticalScrollIndicator={false}

            // onEndReached={handleLoadMore}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },
  activitiesList: {
    flexGrow: 1,
    padding: spacings.md,
  },
}));
