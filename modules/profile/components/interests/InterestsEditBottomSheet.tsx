import { View, Text } from 'react-native';
import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetVirtualizedList,
  BottomSheetModalProps,
  BottomSheetTextInput,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UseGetCategories, UseGetMyUserInfo } from '@/hooks/useAPI';
import AppChip from '@/components/AppChip';
import { Category } from '@/api/categories/categories.type';
import { RNUIButton } from '@/components';
import { UseCreateUserInterests } from '@/hooks/useAPI/userInterests';

type Props = BottomSheetModalProps & {
  // title: string;
  // children?: ReactNode;
  // snapPoints?: Array<number | `${number}%`>;
  // indicatorHidden?: boolean;
  // onEdit: () => void;
  // onOpenDeleteModal: () => void;
  // onDismiss?: () => void;
  // isOwner: boolean;
};

export type InterestsEditBottomSheetRef = {
  open: () => void;
  close: () => void;
};

const InterestsEditBottomSheet = forwardRef<InterestsEditBottomSheetRef, Props>(({}, ref) => {
  const { styles } = useStyles(stylesheet, {
    indicatorHidden: false,
  });
  // const snapPoints = useMemo(() => ['50%', '75%', '90%'], [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    open() {
      BottomSheetModalRef.current?.present();
    },
    close() {
      BottomSheetModalRef.current?.dismiss();
    },
  }));

  const { data: user } = UseGetMyUserInfo();
  const { data } = UseGetCategories({ pageSize: 50 });
  const { categories } = data || {};

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
    user?.userInterests || [],
  );

  function selectOption(category: number) {
    if (selectedCategoryIds.includes(category)) {
      setSelectedCategoryIds(selectedCategoryIds.filter(o => o !== category));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, category]);
    }
  }

  const createUserInterestMutation = UseCreateUserInterests();

  // const handleSelectPress = () => {
  //   console.log('selectedCategoryIds', selectedCategoryIds);
  //   createUserInterestMutation.mutate(
  //     {
  //       userId: user?.userId!,
  //       categoryIds: selectedCategoryIds,
  //     },
  //     {
  //       onSuccess: () => {
  //         router.replace('/(app)/(tabs)');
  //       },
  //       onError: () => {
  //         console.log('onError');
  //       },
  //     },
  //   );
  // };

  return (
    <BottomSheetModal
      ref={BottomSheetModalRef}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableDynamicSizing
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>กิจกรรมที่คุณสนใจ</Text>
          <Text style={styles.desc}>เพิ่มกิจกรรมที่คุณสนใจ</Text>
        </View>
        <View style={styles.categoryListContainer}>
          {categories?.map((category: Category) => (
            <AppChip
              key={category.categoryId}
              label={category.name}
              onPress={() => selectOption(category.categoryId)}
              color={selectedCategoryIds.includes(category.categoryId) ? 'primary' : 'gray'}
            />
          ))}
        </View>
        <View style={styles.footerContainer}>
          <RNUIButton label="บันทึก" onPress={() => console.log('save')} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  contentContainer: {
    // backgroundColor: '#DAF7A6',
    paddingHorizontal: spacings.page,
    paddingTop: spacings.page,
    paddingBottom: spacings.page,
    gap: spacings.xs,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.95)',
  },
  handleIndicator: {
    variants: {
      indicatorHidden: {
        true: {
          height: 0,
        },
      },
    },
  },
  headerContainer: {
    marginBottom: spacings.sm,
  },
  title: {
    ...typography.h2,
  },
  desc: {
    ...typography.md,
  },
  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacings.xs,
  },
  footerContainer: {
    marginTop: spacings.md,
  },
}));

export default InterestsEditBottomSheet;
