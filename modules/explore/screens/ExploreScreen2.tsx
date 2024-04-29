import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ListingsBottomSheet from '@/modules/activities/components/map/ListingsBottomSheet';
import ExploreMap from '../components/ExploreMap';
import { Stack, useRouter } from 'expo-router';
import ExploreHeader from '../components/ExploreHeader';
import { UseGetActivities } from '@/hooks/useAPI';

type Props = {};

const ExploreScreen2 = (props: Props) => {
  const router = useRouter();
  const { styles } = useStyles(stylesheet);
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
      dateStatus: 'upcoming',
      sortBy: 'dateTime',
      orderBy: 'ASC',
    },
    'all',
  );

  const handleFilterPress = () => {
    router.push('/explore/filter');
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <ExploreHeader
              searchQuery={searchQuery}
              onSearchChanged={setSearchQuery}
              onFilterPress={handleFilterPress}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <ExploreMap />
        <ListingsBottomSheet />
      </View>
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },
}));

export default ExploreScreen2;
