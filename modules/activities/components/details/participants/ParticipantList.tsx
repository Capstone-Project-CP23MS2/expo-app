import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { FlashList } from '@shopify/flash-list';
import { ParticipantResponse } from '@/api/type';
import ParticipantListItem from './ParticipantListItem';

type Props = {
  participants?: ParticipantResponse[];
  onPress?: () => void;
};

const ParticipantList = ({ participants, onPress }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <FlashList
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={participants}
        // extraData={selectedCategoryIds}
        renderItem={({ item: participant, index }) => (
          <ParticipantListItem participant={participant} index={index} />
        )}
        estimatedItemSize={100}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        // onEndReached={handleLoadMore}
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
    paddingBottom: spacings.md,
  },
}));

export default ParticipantList;
