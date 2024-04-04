import { View, Text, FlatList } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { RNUIButton } from '@/components';
import { FlashList } from '@shopify/flash-list';
import { UseGetCategories } from '@/hooks/useAPI';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import RegisterInterestsListItem, {
  RegisterInterestsListItemPressHandler,
} from '@/modules/interests/components/RegisterInterestsListItem';
import { Stack, Tabs, useRouter } from 'expo-router';
import { UseCreateUserInterests } from '@/hooks/useAPI/userInterests';
import { useAuth } from '@/context/authContext';
import { FONT } from '@/constants';

type Props = {};

export default function userInterests(props: Props) {
  const router = useRouter();
  const { styles } = useStyles(stylesheet);
  const { user } = useAuth();

  const { data, refetch } = UseGetCategories();
  const { categories, paginationData } = data;

  const createUserInterestMutation = UseCreateUserInterests();

  const handleSelectPress = () => {
    console.log('selectedCategoryIds', selectedCategoryIds);
    createUserInterestMutation.mutate(
      {
        userId: user?.userId!,
        categoryIds: selectedCategoryIds,
      },
      {
        onSuccess: () => {
          router.replace('/(app)/(tabs)');
        },
        onError: () => {
          console.log('onError');
        },
      },
    );
  };
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<number[]>([]);
  const selectedCategoryIdsAmount = useMemo(
    () => selectedCategoryIds.length,
    [selectedCategoryIds],
  );

  const handleItemPress: RegisterInterestsListItemPressHandler = categoryId => {
    const index = selectedCategoryIds.indexOf(categoryId);
    if (index === -1) {
      setSelectedCategoryIds([...selectedCategoryIds, categoryId]); // เพิ่ม categoryId ลงใน selectedCategories ถ้ายังไม่มี
    } else {
      const updatedCategories = selectedCategoryIds.filter(id => id !== categoryId); // ลบ categoryId ออกจาก selectedCategories ถ้ามีอยู่แล้ว
      setSelectedCategoryIds(updatedCategories);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'เลือกกีฬาที่คุณสนใจ',
          headerTitleStyle: { fontFamily: FONT.regular },
        }}
      />
      <View style={styles.content}>
        {/* <Text style={styles.title}>เลือกกีฬาที่คุณสนใจ</Text> */}

        <View style={styles.list}>
          <FlashList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={categories}
            extraData={selectedCategoryIds}
            renderItem={({ item: category, index }) => (
              <RegisterInterestsListItem
                category={category}
                index={index}
                onPress={handleItemPress}
                selectedCategoryIds={selectedCategoryIds}
              />
            )}
            estimatedItemSize={100}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 15,
            }}

            // onEndReached={handleLoadMore}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <RNUIButton
          label={`เลือก ${selectedCategoryIdsAmount} รายการ`}
          onPress={handleSelectPress}
        />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    fontFamily: FONT.regular,
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    ...typography.lgB,
  },
  list: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: '#fff',
    // backgroundColor: 'transparent',
    padding: spacings.md,
    // borderTopColor: '#ccc',
    // borderTopWidth: 1,
  },
}));
